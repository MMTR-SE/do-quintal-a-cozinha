/* eslint-disable @typescript-eslint/no-explicit-any */
import { randomUUID } from "node:crypto";

import { prisma } from "@/lib/prisma";

/**
 * Sincroniza o conteudo do CMS (Strapi) para o Postgres do site.
 *
 * O site le apenas o Postgres; o CMS e uma interface de edicao. Quando algo e
 * publicado no CMS, o lifecycle hook chama POST /api/cms-sync, que roda estas
 * funcoes e faz upsert no banco da aplicacao.
 *
 * - Itens do CMS entram com id `strapi-<documentId>` (preserva as URLs antigas
 *   e torna a sincronizacao idempotente).
 * - Tipos do CMS (enumeration/decimal/json) sao convertidos para o schema do
 *   Prisma.
 */

const CMS_URL = (
  process.env.CMS_SYNC_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://localhost:1337"
).replace(/\/$/, "");
const CMS_TOKEN = process.env.CMS_SYNC_TOKEN || process.env.STRAPI_API_TOKEN || "";

export type CmsCollection = "produtoras" | "produtos" | "historias" | "receitas";

export interface SyncStats {
  produtoras: number;
  produtos: number;
  historias: number;
  receitas: number;
  midias: number;
}

const field = (obj: any, ...names: string[]) => {
  for (const name of names) {
    if (obj && obj[name] !== undefined && obj[name] !== null) return obj[name];
  }
  return undefined;
};

const blocksToText = (value: any): string => {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) {
    return value
      .map((block: any) => (block?.children || []).map((child: any) => child?.text || "").join(""))
      .join("\n")
      .trim();
  }
  return String(value);
};

const slugify = (value: unknown) =>
  String(value || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const entityId = (item: any): string => item?.documentId || String(item?.id);

/**
 * Id do registro no Postgres: usa o `site_id` (preenchido quando o conteudo
 * veio do site para o CMS) ou `strapi-<documentId>` para o que nasceu no CMS.
 * Assim o conteudo existente e atualizado no lugar, sem duplicar.
 */
const recordId = (item: any): string => {
  const siteId = field(item, "site_id");
  return siteId ? String(siteId) : `strapi-${entityId(item)}`;
};

const mediaUrl = (media: any): string | null => {
  const url = media?.url || media?.attributes?.url;
  if (!url) return null;
  return url.startsWith("http") ? url : `${CMS_URL}${url.startsWith("/") ? "" : "/"}${url}`;
};

const mediaList = (value: any): string[] => {
  if (!value) return [];
  return (Array.isArray(value) ? value : [value]).map(mediaUrl).filter(Boolean) as string[];
};

const mapCategory = (value: unknown) => {
  const map: Record<string, "AGRICOLA" | "ARTESANATO" | "PROCESSADO"> = {
    agricola: "AGRICOLA",
    hortalicas: "AGRICOLA",
    frutas: "AGRICOLA",
    graos: "AGRICOLA",
    outros: "AGRICOLA",
    processado: "PROCESSADO",
    processados: "PROCESSADO",
    artesanato: "ARTESANATO",
  };
  return map[String(value || "").toLowerCase()] || "AGRICOLA";
};

const mapDifficulty = (value: unknown) => {
  const map: Record<string, "EASY" | "INTERMEDIARY" | "HARD"> = {
    easy: "EASY",
    facil: "EASY",
    intermediary: "INTERMEDIARY",
    intermediaria: "INTERMEDIARY",
    intermediario: "INTERMEDIARY",
    hard: "HARD",
    dificil: "HARD",
  };
  return map[String(value || "").toLowerCase()] || "INTERMEDIARY";
};

async function fetchCollection(plural: CmsCollection): Promise<any[]> {
  const base = `${CMS_URL}/api/${plural}?populate=*&pagination%5BpageSize%5D=100`;
  const items = new Map<string, any>();

  for (const suffix of ["", "&status=draft"]) {
    try {
      const res = await fetch(base + suffix, {
        headers: { Authorization: `Bearer ${CMS_TOKEN}` },
        cache: "no-store",
      });
      if (!res.ok) continue;
      const json = await res.json();
      for (const item of json.data || []) items.set(entityId(item), item);
    } catch {
      // CMS fora do ar: mantem o que ja existe no Postgres
    }
  }
  return [...items.values()];
}

async function ensureProfile(data: { key: string; name?: string; phone?: string; socialName?: string; instagram?: string }) {
  const phone = data.phone || `sem-telefone-${data.key}`;
  const existing = await prisma.profile.findUnique({ where: { phone_number: phone } });
  if (existing) return existing.id;

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

async function ensureRegion(name?: string) {
  const regionName = name || "Sergipe";
  const existing = await prisma.region.findFirst({ where: { name: regionName } });
  if (existing) return existing.id;
  const created = await prisma.region.create({ data: { id: randomUUID(), name: regionName } });
  return created.id;
}

async function ensureMedia(url: string) {
  const id = `strapi-media-${slugify(url).slice(-32)}-${Buffer.from(url).toString("base64url").slice(0, 10)}`;
  await prisma.media.upsert({
    where: { id },
    create: { id, url, media_type: "IMAGE" },
    update: { url },
  });
  return id;
}

async function syncProdutoras(stats: SyncStats) {
  for (const item of await fetchCollection("produtoras")) {
    await ensureProfile({
      key: entityId(item),
      name: field(item, "nome", "Nome", "name"),
      phone: field(item, "telefone", "Telefone", "phone", "whatsapp"),
      socialName: field(item, "nome_social", "social_name"),
      instagram: field(item, "instagram", "Instagram"),
    });
    stats.produtoras++;
  }
}

async function syncProdutos(stats: SyncStats) {
  const fallbackProfile = await ensureProfile({ key: "default", name: "MMTR-SE", phone: "sem-telefone-mmtr" });

  for (const item of await fetchCollection("produtos")) {
    const id = recordId(item);
    const produtora = field(item, "produtora", "Produtora");
    const produtoraObj = typeof produtora === "object" ? produtora : null;

    const profileId =
      (await ensureProfile({
        key: entityId(item),
        name: produtoraObj ? field(produtoraObj, "nome", "name") : produtora,
        phone: field(item, "telefone", "Telefone") || (produtoraObj ? field(produtoraObj, "telefone", "Telefone") : undefined),
        instagram: produtoraObj ? field(produtoraObj, "instagram") : undefined,
      })) || fallbackProfile;

    const data = {
      product_name: field(item, "Nome", "nome") || "Produto sem nome",
      description: blocksToText(field(item, "descricao", "description")) || null,
      price: field(item, "preco", "price") ?? null,
      category: mapCategory(field(item, "categoria", "category")),
      profile_id: profileId,
    };

    await prisma.product.upsert({ where: { id }, create: { id, ...data }, update: data });
    await prisma.productMedia.deleteMany({ where: { productId: id } });
    for (const url of mediaList(field(item, "imagem", "Imagem", "image"))) {
      const mediaId = await ensureMedia(url);
      await prisma.productMedia.create({ data: { productId: id, mediaId } }).catch(() => {});
      stats.midias++;
    }
    stats.produtos++;
  }
}

async function syncHistorias(stats: SyncStats) {
  for (const item of await fetchCollection("historias")) {
    const id = recordId(item);
    const name = field(item, "nome", "name") || field(item, "titulo", "title") || "Historia sem nome";
    const regiao = field(item, "regiao", "region");
    const regionId = await ensureRegion(typeof regiao === "object" ? field(regiao, "nome", "name") : regiao);

    const data = {
      title: field(item, "titulo", "title") || "",
      name,
      description: blocksToText(field(item, "descricao", "description")),
      content: blocksToText(field(item, "conteudo", "content")),
      regionId,
      slug: field(item, "slug") || slugify(name),
    };

    await prisma.story.upsert({ where: { id }, create: { id, ...data }, update: data });
    await prisma.storyMedia.deleteMany({ where: { storyId: id } });
    for (const url of mediaList(field(item, "imagem", "Imagem", "image"))) {
      const mediaId = await ensureMedia(url);
      await prisma.storyMedia.create({ data: { storyId: id, mediaId } }).catch(() => {});
      stats.midias++;
    }
    stats.historias++;
  }
}

async function syncReceitas(stats: SyncStats) {
  const fallbackProfile = await ensureProfile({ key: "default", name: "MMTR-SE", phone: "sem-telefone-mmtr" });

  for (const item of await fetchCollection("receitas")) {
    const id = recordId(item);
    const produtora = field(item, "produtora", "Produtora");
    const produtoraName = typeof produtora === "object" ? field(produtora, "nome", "name") : produtora;
    const profileId = produtoraName
      ? await ensureProfile({ key: entityId(item), name: produtoraName })
      : fallbackProfile;

    const ingredientes = field(item, "ingredientes", "ingredients") || [];
    const ingredients = typeof ingredientes === "string" ? ingredientes : JSON.stringify(ingredientes);

    const passos = field(item, "passos", "steps") || [];
    const steps = (Array.isArray(passos) ? passos : []).map((step: any, index: number) => ({
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

    await prisma.recipe.upsert({ where: { id }, create: { id, ...data }, update: data });
    await prisma.recipeStep.deleteMany({ where: { recipe_id: id } });
    for (const step of steps) {
      await prisma.recipeStep.create({ data: { ...step, recipe_id: id } });
    }
    await prisma.recipeMedia.deleteMany({ where: { recipeId: id } });
    for (const url of mediaList(field(item, "imagem", "Imagem", "image"))) {
      const mediaId = await ensureMedia(url);
      await prisma.recipeMedia.create({ data: { recipeId: id, mediaId } }).catch(() => {});
      stats.midias++;
    }
    stats.receitas++;
  }
}

/**
 * Sincroniza o CMS com o Postgres do site.
 * Sem `collection`, sincroniza tudo (usado pelos hooks de publicacao).
 */
export async function syncCmsContent(collection?: CmsCollection): Promise<SyncStats> {
  const stats: SyncStats = { produtoras: 0, produtos: 0, historias: 0, receitas: 0, midias: 0 };

  if (!CMS_TOKEN) {
    throw new Error("CMS_SYNC_TOKEN/STRAPI_API_TOKEN nao configurado");
  }

  if (!collection || collection === "produtoras") await syncProdutoras(stats);
  if (!collection || collection === "produtos") await syncProdutos(stats);
  if (!collection || collection === "historias") await syncHistorias(stats);
  if (!collection || collection === "receitas") await syncReceitas(stats);

  return stats;
}
