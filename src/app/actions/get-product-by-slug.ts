/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getProductById } from "@/app/actions/get-product-by-id";
import { getCollection } from "@/lib/strapi";
import { mapStrapiProduct, strapiProductSlug } from "@/lib/strapi-content";

/**
 * Resolve um produto pela URL publica.
 *
 * O slug e a produtora + o nome do produto (ex.: "dona-fatima-mel-de-engenho").
 * Como os produtos vem do CMS e do banco local, o slug nao fica guardado: ele e
 * derivado dos mesmos campos nos dois lados, entao a listagem e o detalhe sempre
 * chegam ao mesmo valor.
 *
 * URLs antigas (/nossa-producao/strapi-<documentId> e ids locais) continuam
 * funcionando pelo fallback em getProductById.
 */
export async function getProductBySlug({ slug }: { slug: string }) {
  if (!slug) return null;

  // Compatibilidade com as URLs antigas baseadas no id do CMS.
  if (slug.startsWith("strapi-")) {
    return getProductById({ id: slug });
  }

  try {
    const items = await getCollection("produtos", { populate: "*" });

    // Usa o mesmo helper da listagem: e o que garante que os dois lados
    // calculem exatamente o mesmo slug (inclusive com a produtora como relacao).
    const match = (items ?? []).find(
      (item: any) => strapiProductSlug(item) === slug
    );

    if (match) {
      return mapStrapiProduct(match);
    }
  } catch (error) {
    console.error("Erro ao buscar produto por slug:", error);
  }

  // Ultimo recurso: id de produto local (Prisma).
  return getProductById({ id: slug });
}
