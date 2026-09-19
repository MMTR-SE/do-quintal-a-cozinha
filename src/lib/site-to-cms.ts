/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "node:fs";
import path from "node:path";

import { prisma } from "@/lib/prisma";

/**
 * Espelha no CMS (Strapi) o conteudo cadastrado pela API do site (fluxo do
 * Typebot), preenchendo `site_id` com o id do registro no Postgres.
 *
 * Assim o painel do CMS mostra e permite editar tambem o que entrou pela API:
 *
 *   Typebot -> API do site -> Postgres -> SITE
 *                          \-> CMS (aqui)
 *
 * Nao ha loop: a sincronizacao de volta (CMS -> site) escreve direto no Prisma,
 * sem passar pela API.
 */

const CMS_URL = (process.env.CMS_API_URL || process.env.NEXT_PUBLIC_STRAPI_URL || "").replace(/\/$/, "");
const CMS_TOKEN = process.env.CMS_API_TOKEN || process.env.STRAPI_API_TOKEN || "";
const PUBLIC_DIR = path.join(process.cwd(), "public");

const MIME: Record<string, string> = {
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

const mediaCache = new Map<string, number | null>();

const ativo = () => Boolean(CMS_URL && CMS_TOKEN) && process.env.CMS_SYNC_DISABLED !== "1";

async function cms(method: string, endpoint: string, body?: unknown, isForm = false) {
  const res = await fetch(`${CMS_URL}${endpoint}`, {
    method,
    headers: isForm
      ? { Authorization: `Bearer ${CMS_TOKEN}` }
      : { Authorization: `Bearer ${CMS_TOKEN}`, "Content-Type": "application/json" },
    body: isForm ? (body as FormData) : body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`${method} ${endpoint} -> ${res.status} ${JSON.stringify(json).slice(0, 160)}`);
  return json;
}

async function uploadMedia(url?: string | null): Promise<number | null> {
  if (!url) return null;
  if (mediaCache.has(url)) return mediaCache.get(url) ?? null;

  try {
    let buffer: Buffer;
    let filename: string;
    let mime: string;

    if (url.startsWith("/")) {
      const filePath = path.join(PUBLIC_DIR, url);
      if (!fs.existsSync(filePath)) return null;
      buffer = fs.readFileSync(filePath);
      filename = path.basename(filePath);
      mime = MIME[path.extname(filename).toLowerCase()] || "application/octet-stream";
    } else {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) return null;
      buffer = Buffer.from(await res.arrayBuffer());
      filename = path.basename(new URL(url).pathname) || "imagem";
      mime = res.headers.get("content-type")?.split(";")[0] || "image/jpeg";
    }

    const form = new FormData();
    form.append("files", new Blob([Uint8Array.from(buffer)], { type: mime }), filename);
    const json = await cms("POST", "/api/upload", form, true);
    const id = json?.[0]?.id ?? null;
    mediaCache.set(url, id);
    return id;
  } catch (error) {
    console.warn(`[site->cms] falha ao subir midia ${url}: ${(error as Error).message}`);
    return null;
  }
}

const blocksFromText = (text?: string | null) =>
  text ? [{ type: "paragraph", children: [{ type: "text", text: String(text) }] }] : undefined;

const mapCategory = (c: string) => ({ AGRICOLA: "agricola", ARTESANATO: "artesanato", PROCESSADO: "processado" })[c] || "outros";
const mapDifficulty = (d: string) => ({ EASY: "facil", INTERMEDIARY: "intermediaria", HARD: "dificil" })[d] || "intermediaria";

/** Cria ou atualiza um item do CMS procurando pelo `site_id`. */
async function upsertPorSiteId(plural: string, siteId: string, data: Record<string, unknown>) {
  const busca = await cms("GET", `/api/${plural}?filters[site_id][$eq]=${encodeURIComponent(siteId)}&status=draft`);
  const existente = busca.data?.[0];

  if (existente) {
    await cms("PUT", `/api/${plural}/${existente.documentId}`, { data: { ...data, site_id: siteId } });
    return existente.documentId as string;
  }

  const criado = await cms("POST", `/api/${plural}`, { data: { ...data, site_id: siteId } });
  return criado.data?.documentId as string;
}

/** Garante a produtora no CMS (com site_id) e devolve o documentId para a relacao. */
export async function enviarProdutoraParaCms(profileId: string): Promise<string | null> {
  const profile = await prisma.profile.findUnique({ where: { id: profileId } });
  if (!profile) return null;

  return upsertPorSiteId("produtoras", profile.id, {
    nome: profile.name,
    telefone: profile.phone_number?.startsWith("sem-telefone") ? undefined : profile.phone_number,
    instagram: profile.instagram || undefined,
  });
}

/** Espelha um produto (e a produtora) no CMS. */
export async function enviarProdutoParaCms(productId: string): Promise<void> {
  if (!ativo()) return;

  const produto = await prisma.product.findUnique({
    where: { id: productId },
    include: { profile: true, media: { include: { media: true } } },
  });
  if (!produto) return;

  const produtora = produto.profile ? await enviarProdutoraParaCms(produto.profile.id) : null;
  const imagens = (await Promise.all(produto.media.map((m) => uploadMedia(m.media.url)))).filter(Boolean);

  await upsertPorSiteId("produtos", produto.id, {
    Nome: produto.product_name,
    descricao: blocksFromText(produto.description),
    preco: produto.price ? Number(produto.price) : undefined,
    categoria: mapCategory(produto.category),
    telefone: produto.profile?.phone_number?.startsWith("sem-telefone") ? undefined : produto.profile?.phone_number,
    produtora: produtora ? { connect: [produtora] } : undefined,
    imagem: imagens.length ? imagens : undefined,
  });
}

/** Espelha uma receita no CMS. */
export async function enviarReceitaParaCms(recipeId: string): Promise<void> {
  if (!ativo()) return;

  const receita = await prisma.recipe.findUnique({
    where: { id: recipeId },
    include: { steps: true, profile: true, media: { include: { media: true } } },
  });
  if (!receita) return;

  if (receita.profile) await enviarProdutoraParaCms(receita.profile.id);
  const imagens = (await Promise.all(receita.media.map((m) => uploadMedia(m.media.url)))).filter(Boolean);

  let ingredientes: unknown = receita.ingredients;
  if (typeof ingredientes === "string") {
    try {
      ingredientes = JSON.parse(ingredientes);
    } catch {
      /* mantem a string */
    }
  }

  await upsertPorSiteId("receitas", receita.id, {
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
}

/** Remove do CMS o item espelhado (procurando pelo `site_id`). */
async function removerDoCmsPorSiteId(plural: string, siteId: string): Promise<boolean> {
  const filtro = `filters%5Bsite_id%5D%5B%24eq%5D=${encodeURIComponent(siteId)}`;

  // O item pode estar publicado ou ainda em rascunho: procura nos dois estados.
  for (const status of ["", "&status=draft"]) {
    const busca = await cms("GET", `/api/${plural}?${filtro}${status}`);
    const existente = busca.data?.[0];
    if (existente) {
      await cms("DELETE", `/api/${plural}/${existente.documentId}`);
      return true;
    }
  }

  return false;
}

/** Remove do CMS o produto apagado pela API. */
export async function removerProdutoDoCms(productId: string): Promise<void> {
  if (!ativo()) return;
  await removerDoCmsPorSiteId("produtos", productId);
}

/** Remove do CMS a receita apagada pela API. */
export async function removerReceitaDoCms(recipeId: string): Promise<void> {
  if (!ativo()) return;
  await removerDoCmsPorSiteId("receitas", recipeId);
}
