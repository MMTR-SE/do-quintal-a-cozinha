#!/usr/bin/env node
/**
 * Migra o conteudo do Strapi de PRODUCAO para o Postgres do site (schema Prisma).
 *
 * Uso:
 *   STRAPI_SRC_URL=https://conteudos.mulheresrurais.com.br \
 *   STRAPI_SRC_TOKEN=<token de leitura> \
 *   node prisma/scripts/migrate-producao.mjs [--dry-run]
 *
 * - Os itens do CMS entram com id "strapi-<documentId>", preservando as URLs
 *   antigas (/nossa-producao/strapi-..., /nossas-receitas/strapi-...).
 * - Idempotente: pode rodar de novo que faz upsert pelos mesmos ids.
 * - Nao baixa arquivos: guarda a URL da midia (os dominios ja estao liberados
 *   no next.config.ts).
 */
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "node:crypto";

const prisma = new PrismaClient();
const DRY_RUN = process.argv.includes("--dry-run");

const SRC_URL = (process.env.STRAPI_SRC_URL || "").replace(/\/$/, "");
const SRC_TOKEN = process.env.STRAPI_SRC_TOKEN || "";

if (!SRC_URL || !SRC_TOKEN) {
  console.error("Defina STRAPI_SRC_URL e STRAPI_SRC_TOKEN (token de leitura do Strapi de producao).");
  process.exit(1);
}

// ---------------------------------------------------------------- helpers

const field = (obj, ...names) => {
  for (const n of names) {
    if (obj && obj[n] !== undefined && obj[n] !== null) return obj[n];
  }
  return undefined;
};

const blocksToText = (value) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) {
    return value
      .map((block) =>
        (block?.children || [])
          .map((child) => child?.text || "")
          .join("")
      )
      .join("\n")
      .trim();
  }
  return String(value);
};

const slugify = (s) =>
  String(s || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const entityId = (item) => item.documentId || String(item.id);

const mediaUrl = (media) => {
  const url = media?.url || media?.attributes?.url;
  if (!url) return null;
  return url.startsWith("http") ? url : `${SRC_URL}${url.startsWith("/") ? "" : "/"}${url}`;
};

const mediaList = (value) => {
  if (!value) return [];
  const arr = Array.isArray(value) ? value : [value];
  return arr.map(mediaUrl).filter(Boolean);
};

const mapCategory = (v) => {
  const map = {
    agricola: "AGRICOLA",
    hortalicas: "AGRICOLA",
    frutas: "AGRICOLA",
    graos: "AGRICOLA",
    outros: "AGRICOLA",
    processado: "PROCESSADO",
    processados: "PROCESSADO",
    artesanato: "ARTESANATO",
  };
  return map[String(v || "").toLowerCase()] || "AGRICOLA";
};

const mapDifficulty = (v) => {
  const map = { easy: "EASY", facil: "EASY", intermediary: "INTERMEDIARY", intermediario: "INTERMEDIARY", hard: "HARD", dificil: "HARD" };
  return map[String(v || "").toLowerCase()] || "INTERMEDIARY";
};

async function fetchCollection(plural) {
  // Colchetes codificados: o Strapi de producao trava (timeout) com "pagination[...]".
  const base = `${SRC_URL}/api/${plural}?populate=*&pagination%5BpageSize%5D=100`;
  const items = new Map();

  // Busca publicados e rascunhos (uniao por documentId) — a pre-producao recebe tudo.
  for (const suffix of ["", "&status=draft"]) {
    try {
      const res = await fetch(base + suffix, {
        headers: { Authorization: `Bearer ${SRC_TOKEN}` },
      });
      if (!res.ok) {
        console.warn(`  ! ${plural}${suffix}: HTTP ${res.status}`);
        continue;
      }
      const json = await res.json();
      for (const item of json.data || []) items.set(entityId(item), item);
    } catch (e) {
      console.warn(`  ! ${plural}${suffix}: ${e.message}`);
    }
  }
  return [...items.values()];
}

async function ensureMedia(url, created) {
  const id = `strapi-media-${slugify(url).slice(-32)}-${Buffer.from(url).toString("base64url").slice(0, 10)}`;
  if (DRY_RUN) return id;
  await prisma.media.upsert({
    where: { id },
    create: { id, url, media_type: "IMAGE" },
    update: { url },
  });
  created.push(id);
  return id;
}

async function ensureProfile(data) {
  const phone = data.phone || `sem-telefone-${data.key}`;
  const existing = await prisma.profile.findUnique({ where: { phone_number: phone } });
  if (existing) return existing.id;
  if (DRY_RUN) return `profile-${slugify(phone)}`;
  const created = await prisma.profile.upsert({
    where: { phone_number: phone },
    create: {
      id: randomUUID(),
      name: data.name || "Produtora",
      phone_number: phone,
      social_name: data.socialName || null,
      instagram: data.instagram || null,
    },
    update: { name: data.name || undefined },
  });
  return created.id;
}

async function ensureRegion(name) {
  const regionName = name || "Sergipe";
  const existing = await prisma.region.findFirst({ where: { name: regionName } });
  if (existing) return existing.id;
  if (DRY_RUN) return `region-${slugify(regionName)}`;
  const created = await prisma.region.create({
    data: { id: randomUUID(), name: regionName },
  });
  return created.id;
}

// ---------------------------------------------------------------- migracao

const stats = { produtoras: 0, produtos: 0, historias: 0, receitas: 0, midias: 0 };

async function migrateProdutoras() {
  const items = await fetchCollection("produtoras");
  console.log(`produtoras: ${items.length}`);
  for (const item of items) {
    const phone = field(item, "telefone", "Telefone", "phone", "whatsapp");
    await ensureProfile({
      key: entityId(item),
      name: field(item, "nome", "Nome", "name"),
      phone,
      socialName: field(item, "nome_social", "social_name"),
      instagram: field(item, "instagram", "Instagram"),
    });
    stats.produtoras++;
  }
}

async function migrateProdutos() {
  const items = await fetchCollection("produtos");
  console.log(`produtos: ${items.length}`);
  const defaultProfile = await ensureProfile({ key: "default", name: "MMTR-SE", phone: "sem-telefone-mmtr" });

  for (const item of items) {
    const id = `strapi-${entityId(item)}`;
    const produtora = field(item, "produtora", "Produtora");
    const produtoraName = typeof produtora === "object" ? field(produtora, "nome", "name") : produtora;

    const profileId = await ensureProfile({
      key: entityId(item),
      name: produtoraName || "MMTR-SE",
      phone: field(item, "telefone", "Telefone") || (produtora && typeof produtora === "object" ? field(produtora, "telefone", "Telefone") : undefined),
      instagram: produtora && typeof produtora === "object" ? field(produtora, "instagram") : undefined,
    }) || defaultProfile;

    const data = {
      product_name: field(item, "Nome", "nome") || "Produto sem nome",
      description: blocksToText(field(item, "descricao", "description")) || null,
      price: field(item, "preco", "price") ?? null,
      category: mapCategory(field(item, "categoria", "category")),
      profile_id: profileId,
    };

    const urls = mediaList(field(item, "imagem", "Imagem", "image"));

    if (!DRY_RUN) {
      await prisma.product.upsert({ where: { id }, create: { id, ...data }, update: data });
      await prisma.productMedia.deleteMany({ where: { productId: id } });
      for (const url of urls) {
        const mediaId = await ensureMedia(url, []);
        await prisma.productMedia.create({ data: { productId: id, mediaId } }).catch(() => {});
        stats.midias++;
      }
    }
    stats.produtos++;
  }
}

async function migrateHistorias() {
  const items = await fetchCollection("historias");
  console.log(`historias: ${items.length}`);
  for (const item of items) {
    const id = `strapi-${entityId(item)}`;
    const name = field(item, "nome", "name") || field(item, "titulo", "title") || "Historia sem nome";
    const regiao = field(item, "regiao", "region");
    const regiaoName = typeof regiao === "object" ? field(regiao, "nome", "name") : regiao;
    const regionId = await ensureRegion(regiaoName);

    const data = {
      title: field(item, "titulo", "title") || "",
      name,
      description: blocksToText(field(item, "descricao", "description")),
      content: blocksToText(field(item, "conteudo", "content")),
      regionId,
      slug: field(item, "slug") || slugify(name),
    };

    const urls = mediaList(field(item, "imagem", "Imagem", "image"));

    if (!DRY_RUN) {
      await prisma.story.upsert({ where: { id }, create: { id, ...data }, update: data });
      await prisma.storyMedia.deleteMany({ where: { storyId: id } });
      for (const url of urls) {
        const mediaId = await ensureMedia(url, []);
        await prisma.storyMedia.create({ data: { storyId: id, mediaId } }).catch(() => {});
        stats.midias++;
      }
    }
    stats.historias++;
  }
}

async function migrateReceitas() {
  const items = await fetchCollection("receitas");
  console.log(`receitas: ${items.length}`);
  const defaultProfile = await ensureProfile({ key: "default", name: "MMTR-SE", phone: "sem-telefone-mmtr" });

  for (const item of items) {
    const id = `strapi-${entityId(item)}`;
    const produtora = field(item, "produtora", "Produtora");
    const produtoraName = typeof produtora === "object" ? field(produtora, "nome", "name") : produtora;
    const profileId = produtoraName
      ? await ensureProfile({ key: entityId(item), name: produtoraName })
      : defaultProfile;

    // A UI faz JSON.parse(recipe.ingredients): guardamos como string JSON (igual ao seed/API).
    const ingredientes = field(item, "ingredientes", "ingredients") || [];
    const ingredients = typeof ingredientes === "string" ? ingredientes : JSON.stringify(ingredientes);

    const passos = field(item, "passos", "steps") || [];
    const steps = (Array.isArray(passos) ? passos : []).map((step, index) => ({
      step_number: Number(step?.numero ?? step?.step_number ?? index + 1),
      instruction: String(step?.instrucao ?? step?.instruction ?? ""),
    }));

    const data = {
      title: field(item, "titulo", "title") || "Receita sem titulo",
      description: blocksToText(field(item, "descricao", "description")),
      preparation_time_in_minutes: Number(field(item, "tempo_preparo", "preparation_time_in_minutes") || 0),
      cooking_time_in_minutes: Number(field(item, "tempo_cozimento", "cooking_time_in_minutes") || 0),
      number_of_servings: Number(field(item, "porcoes", "number_of_servings") || 1),
      difficulty: mapDifficulty(field(item, "dificuldade", "difficulty")),
      ingredients,
      profile_id: profileId,
    };

    const urls = mediaList(field(item, "imagem", "Imagem", "image"));

    if (!DRY_RUN) {
      await prisma.recipe.upsert({ where: { id }, create: { id, ...data }, update: data });
      await prisma.recipeStep.deleteMany({ where: { recipe_id: id } });
      for (const step of steps) {
        await prisma.recipeStep.create({ data: { ...step, recipe_id: id } });
      }
      await prisma.recipeMedia.deleteMany({ where: { recipeId: id } });
      for (const url of urls) {
        const mediaId = await ensureMedia(url, []);
        await prisma.recipeMedia.create({ data: { recipeId: id, mediaId } }).catch(() => {});
        stats.midias++;
      }
    }
    stats.receitas++;
  }
}

// ---------------------------------------------------------------- main

async function main() {
  console.log(`Origem: ${SRC_URL}${DRY_RUN ? "  [DRY-RUN: nada sera escrito]" : ""}`);
  await migrateProdutoras();
  await migrateProdutos();
  await migrateHistorias();
  await migrateReceitas();

  console.log("\nResumo:", stats);
  if (!DRY_RUN) {
    const counts = {
      Profile: await prisma.profile.count(),
      Product: await prisma.product.count(),
      Story: await prisma.story.count(),
      Recipe: await prisma.recipe.count(),
      Media: await prisma.media.count(),
    };
    console.log("Total no destino:", counts);
  }
}

main()
  .catch((e) => {
    console.error("Falha na migracao:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
