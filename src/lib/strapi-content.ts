/* eslint-disable @typescript-eslint/no-explicit-any */
import { Category } from "@prisma/client";

import { buildProductSlug } from "@/lib/slug";
import {
  getStrapiField,
  getStrapiMedia,
  getStrapiMediaItems,
  StrapiEntity,
} from "@/lib/strapi";

export function strapiRichTextToString(value: any): string {
  if (typeof value === "string") return value;
  if (!Array.isArray(value)) return "";

  return value
    .map((block) => {
      if (typeof block === "string") return block;
      if (Array.isArray(block.children)) {
        return block.children.map((child: any) => child.text || "").join("");
      }
      return "";
    })
    .filter(Boolean)
    .join("\n");
}

export function strapiMedia(value: any, id: string, relation: "product" | "recipe" | "story"): any[] {
  return getStrapiMediaItems(value).flatMap((item, index) => {
    const url = getStrapiMedia(item.url);
    if (!url) return [];

    return [{
      media: { url, media_type: "IMAGE" as const },
      mediaId: `strapi-${relation}-media-${id}-${index}`,
      [`${relation}Id`]: `strapi-${id}`,
    }];
  });
}

export function mapStrapiDifficulty(value: string | null): "EASY" | "INTERMEDIARY" | "HARD" {
  switch (value?.toLowerCase()) {
    case "intermediaria":
    case "intermediary":
      return "INTERMEDIARY";
    case "dificil":
    case "hard":
      return "HARD";
    default:
      return "EASY";
  }
}

export function mapStrapiRegion(value: any) {
  if (!value) return { id: "", name: "" };
  if (typeof value === "string") return { id: value, name: value };
  return {
    id: String(value.id ?? value.documentId ?? value.name ?? ""),
    name: value.name ?? value.nome ?? "",
  };
}

export function strapiEntityId(item: StrapiEntity) {
  return String(item.documentId || item.id);
}

/** Categoria do produto no enum do Prisma, a partir do valor vindo do CMS. */
const PRODUCT_CATEGORY_MAP: Record<string, Category> = {
  agricola: "AGRICOLA",
  hortalicas: "AGRICOLA",
  frutas: "AGRICOLA",
  graos: "AGRICOLA",
  processados: "PROCESSADO",
  processado: "PROCESSADO",
  artesanato: "ARTESANATO",
  outros: "AGRICOLA",
};

export function mapStrapiProductCategory(value: string | null): Category {
  if (!value) return "AGRICOLA";
  return PRODUCT_CATEGORY_MAP[value.toLowerCase()] ?? "AGRICOLA";
}

/**
 * Normaliza a produtora de um produto. O campo virou relacao (colecao
 * "produtora"), mas toleramos tambem o formato antigo em texto e as duas
 * formas de resposta do Strapi (v5 plana e v4 aninhada em `attributes`).
 */
export function strapiProdutora(value: any): {
  name: string | null;
  phone: string | null;
  instagram: string | null;
} {
  const empty = { name: null, phone: null, instagram: null };
  if (!value) return empty;

  if (typeof value === "string") {
    return { ...empty, name: value.trim() || null };
  }

  const entity = Array.isArray(value.data) ? value.data[0] : value.data ?? value;
  if (!entity) return empty;

  const attrs = entity.attributes ?? entity;
  const pick = (...keys: string[]) => {
    for (const key of keys) {
      const v = attrs[key];
      if (typeof v === "string" && v.trim()) return v;
    }
    return null;
  };

  return {
    name: pick("nome", "name", "Nome"),
    phone: pick("telefone", "phone", "Telefone"),
    instagram: pick("instagram", "Instagram"),
  };
}

/** Slug publico de um produto do CMS (nome da produtora + nome do produto). */
export function strapiProductSlug(item: StrapiEntity): string {
  return buildProductSlug({
    produtora: strapiProdutora(getStrapiField(item, "produtora", "Produtora")).name,
    nome: getStrapiField<string>(item, "Nome", "nome"),
  });
}

/** Mapeia um produto do CMS para o formato consumido pela UI. */
export function mapStrapiProduct(item: StrapiEntity) {
  const id = strapiEntityId(item);
  const nome = getStrapiField<string>(item, "Nome", "nome");
  const produtora = strapiProdutora(getStrapiField(item, "produtora", "Produtora"));

  return {
    id: `strapi-${id}`,
    slug: buildProductSlug({ produtora: produtora.name, nome }),
    product_name: nome || "Produto sem nome",
    description:
      strapiRichTextToString(getStrapiField(item, "descricao", "description")) || null,
    price: getStrapiField<number>(item, "preco", "price") ?? null,
    category: mapStrapiProductCategory(
      getStrapiField<string>(item, "categoria", "Categoria")
    ),
    profile: {
      name: produtora.name || "MMTR-SE",
      social_name: null,
      instagram: produtora.instagram,
      // O telefone digitado no produto tem prioridade; senao usa o da produtora.
      phone_number:
        getStrapiField<string>(item, "telefone", "Telefone") ?? produtora.phone,
    },
    media: strapiMedia(getStrapiField(item, "imagem", "Imagem"), id, "product"),
  };
}

export { getStrapiField };
