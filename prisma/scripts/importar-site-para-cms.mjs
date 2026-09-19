#!/usr/bin/env node
/**
 * Importa o conteudo do Postgres do site para o CMS (Strapi).
 *
 * Uso:
 *   node prisma/scripts/importar-site-para-cms.mjs [--dry-run]
 *
 * - Preenche o campo `site_id` de cada item do CMS com o id do registro no site
 *   (para a sincronizacao CMS -> site atualizar no lugar, sem duplicar).
 * - Faz upload das imagens (arquivos locais de `public/` ou URLs remotas).
 * - Idempotente: procura por `site_id` e, se nao achar, pelo nome/titulo.
 */
import fs from "node:fs";
import path from "node:path";
import { PrismaClient } from "@prisma/client";

/** Carrega o .env sem dependencia externa (o Next carrega sozinho; aqui e script node). */
function loadEnv() {
  try {
    const envPath = path.join(process.cwd(), ".env");
    for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
      const match = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);
      if (match && process.env[match[1]] === undefined) {
        process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
      }
    }
  } catch {
    // sem .env: usa apenas o ambiente
  }
}
loadEnv();

const prisma = new PrismaClient();
const DRY_RUN = process.argv.includes("--dry-run");

const STRAPI_URL = (process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337").replace(/\/$/, "");
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || process.env.STRAPI_API_TOKEN || "";
const PUBLIC_DIR = path.join(process.cwd(), "public");

if (!STRAPI_TOKEN) {
  console.error("STRAPI_API_TOKEN nao configurado (no .env ou no ambiente).");
  process.exit(1);
}

const headers = { Authorization: `Bearer ${STRAPI_TOKEN}`, "Content-Type": "application/json" };
const mediaCache = new Map();
const stats = { produtoras: 0, produtos: 0, historias: 0, receitas: 0, midias: 0, atualizados: 0 };

const MIME = { ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif", ".svg": "image/svg+xml" };

async function api(method, endpoint, body) {
  const res = await fetch(`${STRAPI_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`${method} ${endpoint} -> ${res.status} ${JSON.stringify(json).slice(0, 200)}`);
  return json;
}

async function uploadMedia(url) {
  if (!url) return null;
  if (mediaCache.has(url)) return mediaCache.get(url);

  try {
    let buffer;
    let filename;
    let mime;

    if (url.startsWith("/")) {
      const filePath = path.join(PUBLIC_DIR, url);
      if (!fs.existsSync(filePath)) return null;
      buffer = fs.readFileSync(filePath);
      filename = path.basename(filePath);
      mime = MIME[path.extname(filename).toLowerCase()] || "application/octet-stream";
    } else {
      const res = await fetch(url);
      if (!res.ok) return null;
      buffer = Buffer.from(await res.arrayBuffer());
      filename = path.basename(new URL(url).pathname) || "imagem";
      mime = res.headers.get("content-type")?.split(";")[0] || "image/jpeg";
    }

    if (DRY_RUN) return null;

    const form = new FormData();
    form.append("files", new Blob([buffer], { type: mime }), filename);
    const res = await fetch(`${STRAPI_URL}/api/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
      body: form,
    });
    const json = await res.json();
    const id = json?.[0]?.id ?? null;
    mediaCache.set(url, id);
    if (id) stats.midias++;
    return id;
  } catch (error) {
    console.warn(`  ! falha ao subir midia ${url}: ${error.message}`);
    return null;
  }
}

const blocksFromText = (text) =>
  text ? [{ type: "paragraph", children: [{ type: "text", text: String(text) }] }] : undefined;

const richTextFromText = (text) =>
  text ? String(text).split(/\n{2,}/).map((p) => `<p>${p.replace(/\n/g, "<br/>")}</p>`).join("") : "";

const mapCategory = (c) => ({ AGRICOLA: "agricola", ARTESANATO: "artesanato", PROCESSADO: "processado" })[c] || "outros";
const mapDifficulty = (d) => ({ EASY: "facil", INTERMEDIARY: "intermediaria", HARD: "dificil" })[d] || "intermediaria";

/** Procura um item no CMS por site_id e, se nao achar, por nome/titulo. */
async function findExisting(plural, siteId, campoNome, nome) {
  const bySite = await api("GET", `/api/${plural}?filters[site_id][$eq]=${encodeURIComponent(siteId)}&status=draft`);
  if (bySite.data?.[0]) return bySite.data[0];

  if (nome) {
    const byName = await api("GET", `/api/${plural}?filters[${campoNome}][$eq]=${encodeURIComponent(nome)}&status=draft`);
    if (byName.data?.[0]) return byName.data[0];
  }
  return null;
}

/** Cria ou atualiza um item do CMS (com site_id). */
async function upsertItem(plural, siteId, campoNome, nome, data) {
  const existente = await findExisting(plural, siteId, campoNome, nome);

  if (DRY_RUN) {
    console.log(`  [dry] ${existente ? "atualizaria" : "criaria"} ${plural}: ${nome}`);
    return existente?.documentId ?? null;
  }

  if (existente) {
    await api("PUT", `/api/${plural}/${existente.documentId}`, { data: { ...data, site_id: siteId } });
    stats.atualizados++;
    return existente.documentId;
  }

  const criado = await api("POST", `/api/${plural}`, { data: { ...data, site_id: siteId } });
  return criado.data?.documentId ?? null;
}

async function importarProdutoras() {
  const profiles = await prisma.profile.findMany();
  console.log(`produtoras: ${profiles.length}`);
  const mapa = new Map();

  for (const profile of profiles) {
    const documentId = await upsertItem("produtoras", profile.id, "nome", profile.name, {
      nome: profile.name,
      telefone: profile.phone_number?.startsWith("sem-telefone") ? undefined : profile.phone_number,
      instagram: profile.instagram || undefined,
    });
    mapa.set(profile.id, documentId);
    stats.produtoras++;
  }
  return mapa;
}

async function importarProdutos(mapaProdutoras) {
  const produtos = await prisma.product.findMany({ include: { media: { include: { media: true } }, profile: true } });
  console.log(`produtos: ${produtos.length}`);

  for (const produto of produtos) {
    const imagens = (await Promise.all(produto.media.map((m) => uploadMedia(m.media.url)))).filter(Boolean);
    const documentId = await upsertItem("produtos", produto.id, "Nome", produto.product_name, {
      Nome: produto.product_name,
      descricao: blocksFromText(produto.description),
      preco: produto.price ? Number(produto.price) : undefined,
      categoria: mapCategory(produto.category),
      telefone: produto.profile?.phone_number?.startsWith("sem-telefone") ? undefined : produto.profile?.phone_number,
      produtora: mapaProdutoras.get(produto.profile_id) ? { connect: [mapaProdutoras.get(produto.profile_id)] } : undefined,
      imagem: imagens.length ? imagens : undefined,
    });
    if (documentId) stats.produtos++;
  }
}

async function importarHistorias() {
  const historias = await prisma.story.findMany({ include: { media: { include: { media: true } }, region: true } });
  console.log(`historias: ${historias.length}`);

  for (const historia of historias) {
    const imagens = (await Promise.all(historia.media.map((m) => uploadMedia(m.media.url)))).filter(Boolean);
    const documentId = await upsertItem("historias", historia.id, "nome", historia.name, {
      titulo: historia.title || historia.name,
      nome: historia.name,
      descricao: historia.description,
      slug: historia.slug,
      conteudo: richTextFromText(historia.content),
      regiao: historia.region?.name,
      imagem: imagens.length ? imagens : undefined,
    });
    if (documentId) stats.historias++;
  }
}

async function importarReceitas() {
  const receitas = await prisma.recipe.findMany({
    include: { steps: true, media: { include: { media: true } }, profile: true },
  });
  console.log(`receitas: ${receitas.length}`);

  for (const receita of receitas) {
    const imagens = (await Promise.all(receita.media.map((m) => uploadMedia(m.media.url)))).filter(Boolean);
    let ingredientes;
    try {
      ingredientes = typeof receita.ingredients === "string" ? JSON.parse(receita.ingredients) : receita.ingredients;
    } catch {
      ingredientes = receita.ingredients;
    }

    const documentId = await upsertItem("receitas", receita.id, "titulo", receita.title, {
      titulo: receita.title,
      descricao: receita.description,
      tempo_preparo: receita.preparation_time_in_minutes,
      tempo_cozimento: receita.cooking_time_in_minutes,
      porcoes: receita.number_of_servings,
      dificuldade: mapDifficulty(receita.difficulty),
      ingredientes,
      passos: receita.steps
        .sort((a, b) => a.step_number - b.step_number)
        .map((s) => ({ numero: s.step_number, instrucao: s.instruction })),
      imagem: imagens.length ? imagens : undefined,
    });
    if (documentId) stats.receitas++;
  }
}

async function main() {
  console.log(`CMS: ${STRAPI_URL}${DRY_RUN ? "  [DRY-RUN]" : ""}`);
  const mapaProdutoras = await importarProdutoras();
  await importarProdutos(mapaProdutoras);
  await importarHistorias();
  await importarReceitas();

  console.log("\nResumo:", stats);
  if (DRY_RUN) console.log("(dry-run: nada foi escrito no CMS)");
}

main()
  .catch((error) => {
    console.error("Falha na importacao:", error.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
