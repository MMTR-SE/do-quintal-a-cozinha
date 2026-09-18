#!/usr/bin/env node
/**
 * Importa os dados de um banco SQLite (producao) para o Postgres do site.
 *
 * Uso:
 *   SQLITE_SRC=/caminho/prod.db npm run db:importar-sqlite
 *   SQLITE_SRC=/caminho/prod.db node prisma/scripts/importar-sqlite.mjs --dry-run
 *
 * - Preserva os ids (as URLs/id continuam as mesmas).
 * - Idempotente: faz upsert; passos e ligacoes de midia sao recriados.
 * - Datas em SQLite (Prisma) ficam como INTEGER (ms) — convertidas para Date.
 * - O campo `ingredients` (Json) e mantido como a string JSON original, que e
 *   o formato que a UI espera (JSON.parse).
 */
import Database from "better-sqlite3";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const DRY_RUN = process.argv.includes("--dry-run");
const SRC = process.env.SQLITE_SRC || process.argv.find((a) => a.endsWith(".db"));

if (!SRC) {
  console.error("Informe o banco de origem: SQLITE_SRC=/caminho/prod.db npm run db:importar-sqlite");
  process.exit(1);
}

const db = new Database(SRC, { readonly: true });
const stats = {};

const toDate = (v, fallback = new Date()) => {
  if (v === null || v === undefined) return fallback;
  if (typeof v === "number") return new Date(v);
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? fallback : d;
};

function rows(table) {
  try {
    return db.prepare(`SELECT * FROM "${table}"`).all();
  } catch {
    return []; // tabela inexistente na origem
  }
}

function count(table) {
  const n = rows(table).length;
  stats[table] = n;
  return n;
}

async function main() {
  console.log(`Origem: ${SRC}${DRY_RUN ? "  [DRY-RUN: nada sera escrito]" : ""}`);
  console.log("Linhas na origem:", {
    Region: count("Region"),
    Profile: count("Profile"),
    Media: count("Media"),
    Product: count("Product"),
    Recipe: count("Recipe"),
    RecipeStep: count("RecipeStep"),
    Story: count("Story"),
  });

  if (DRY_RUN) {
    console.log("Total no destino:", {
      Profile: await prisma.profile.count(),
      Product: await prisma.product.count(),
      Story: await prisma.story.count(),
      Recipe: await prisma.recipe.count(),
      Media: await prisma.media.count(),
    });
    return;
  }

  // 1) referencias primeiro
  for (const r of rows("Region")) {
    await prisma.region.upsert({
      where: { id: r.id },
      create: { id: r.id, name: r.name },
      update: { name: r.name },
    });
  }

  for (const p of rows("Profile")) {
    await prisma.profile.upsert({
      where: { id: p.id },
      create: {
        id: p.id,
        name: p.name,
        phone_number: p.phone_number,
        social_name: p.social_name ?? null,
        instagram: p.instagram ?? null,
      },
      update: {
        name: p.name,
        phone_number: p.phone_number,
        social_name: p.social_name ?? null,
        instagram: p.instagram ?? null,
      },
    });
  }

  for (const m of rows("Media")) {
    const media_type = String(m.media_type || "IMAGE").toUpperCase();
    await prisma.media.upsert({
      where: { id: m.id },
      create: { id: m.id, url: m.url, media_type },
      update: { url: m.url, media_type },
    });
  }

  // 2) historias (+ midias)
  for (const s of rows("Story")) {
    const data = {
      title: s.title,
      name: s.name,
      description: s.description,
      content: s.content,
      regionId: s.regionId,
      slug: s.slug,
    };
    await prisma.story.upsert({ where: { id: s.id }, create: { id: s.id, ...data }, update: data });
    await prisma.storyMedia.deleteMany({ where: { storyId: s.id } });
  }
  for (const sm of rows("StoryMedia")) {
    await prisma.storyMedia.create({ data: { storyId: sm.storyId, mediaId: sm.mediaId } }).catch(() => {});
  }

  // 3) receitas (+ passos e midias)
  for (const r of rows("Recipe")) {
    const data = {
      title: r.title,
      description: r.description,
      preparation_time_in_minutes: Number(r.preparation_time_in_minutes ?? 0),
      cooking_time_in_minutes: Number(r.cooking_time_in_minutes ?? 0),
      number_of_servings: Number(r.number_of_servings ?? 1),
      difficulty: String(r.difficulty || "INTERMEDIARY").toUpperCase(),
      ingredients: r.ingredients, // string JSON, como a UI espera
      profile_id: r.profile_id,
      created_at: toDate(r.created_at),
    };
    await prisma.recipe.upsert({
      where: { id: r.id },
      create: { id: r.id, ...data },
      update: data,
    });
    await prisma.recipeStep.deleteMany({ where: { recipe_id: r.id } });
  }
  for (const st of rows("RecipeStep")) {
    await prisma.recipeStep.create({
      data: {
        step_number: Number(st.step_number),
        instruction: st.instruction,
        recipe_id: st.recipe_id,
      },
    });
  }
  for (const rm of rows("RecipeMedia")) {
    await prisma.recipeMedia.create({ data: { recipeId: rm.recipeId, mediaId: rm.mediaId } }).catch(() => {});
  }

  // 4) produtos (+ midias)
  for (const p of rows("Product")) {
    const data = {
      product_name: p.product_name,
      description: p.description ?? null,
      price: p.price ?? null,
      category: String(p.category || "AGRICOLA").toUpperCase(),
      profile_id: p.profile_id,
    };
    await prisma.product.upsert({ where: { id: p.id }, create: { id: p.id, ...data }, update: data });
    await prisma.productMedia.deleteMany({ where: { productId: p.id } });
  }
  for (const pm of rows("ProductMedia")) {
    await prisma.productMedia.create({ data: { productId: pm.productId, mediaId: pm.mediaId } }).catch(() => {});
  }

  console.log("Total no destino:", {
    Profile: await prisma.profile.count(),
    Product: await prisma.product.count(),
    Story: await prisma.story.count(),
    Recipe: await prisma.recipe.count(),
    Media: await prisma.media.count(),
    RecipeStep: await prisma.recipeStep.count(),
  });
}

main()
  .catch((e) => {
    console.error("Falha na importacao:", e);
    process.exit(1);
  })
  .finally(async () => {
    db.close();
    await prisma.$disconnect();
  });
