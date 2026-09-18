"use server";

import { prisma } from "@/lib/prisma";
import { buildProductSlug } from "@/lib/slug";

/**
 * Fetches single product by ID with complete details.
 * CRITICAL: Converts Prisma Decimal price to number for client serialization.
 */

interface Options {
  id: string
}

export async function getProductById(options: Options) {
  const product = await prisma.product.findUnique({
    select: {
      id: true,
      product_name: true,
      description: true,
      price: true,
      category: true,
      profile_id: true,
      profile: {
        select: {
          name: true,
          social_name: true,
          instagram: true,
        },
      },
      media: { include: { media: { select: { url: true, media_type: true } } } }
    },
    where: {
      id: options.id
    }
  });

  if (!product) {
    return null;
  }

  // CRITICAL: Convert Decimal to number for Next.js client serialization
  return {
    ...product,
    price: product.price ? Number(product.price) : null,
    // Produtos nao guardam slug: ele e derivado da produtora + nome.
    slug: buildProductSlug({
      produtora: product.profile?.name,
      nome: product.product_name,
    }),
  };
}
