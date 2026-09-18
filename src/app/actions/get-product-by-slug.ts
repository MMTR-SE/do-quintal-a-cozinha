"use server";

import { getProductById } from "@/app/actions/get-product-by-id";
import { prisma } from "@/lib/prisma";
import { buildProductSlug } from "@/lib/slug";

/**
 * Resolve um produto pela URL publica.
 *
 * O slug e a produtora + o nome do produto (ex.: "dona-fatima-mel-de-engenho").
 * Como os produtos nao guardam slug, ele e derivado dos mesmos campos da
 * listagem (get-all-products), garantindo que listagem e detalhe concordem.
 *
 * URLs antigas (/nossa-producao/strapi-<documentId> e ids locais) continuam
 * funcionando pelo fallback em getProductById.
 */
export async function getProductBySlug({ slug }: { slug: string }) {
  if (!slug) return null;

  // Compatibilidade com as URLs antigas baseadas no id do CMS/local.
  if (slug.startsWith("strapi-")) {
    return getProductById({ id: slug });
  }

  const products = await prisma.product.findMany({
    select: {
      id: true,
      product_name: true,
      profile: { select: { name: true } },
    },
  });

  const match = products.find(
    (product) =>
      buildProductSlug({
        produtora: product.profile?.name,
        nome: product.product_name,
      }) === slug
  );

  if (match) {
    return getProductById({ id: match.id });
  }

  // Ultimo recurso: id de produto direto.
  return getProductById({ id: slug });
}
