/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getProductById } from "@/app/actions/get-product-by-id";
import { prisma } from "@/lib/prisma";
import { buildProductSlug } from "@/lib/slug";

export async function getProductBySlug({ slug }: { slug: string }) {
  if (!slug) return null;

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

  return getProductById({ id: slug });
}
