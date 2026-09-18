/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { prisma } from "@/lib/prisma";
import { buildProductSlug } from "@/lib/slug";
import { Category } from "@prisma/client";

interface Options {
  search?: string
  categories?: string[]
  price?: string[]
}

interface CategorySearch {
  in: Category[]
}

interface PriceCondition {
  gte?: number
  lte?: number
  lt?: number
  gt?: number
}

interface Where {
  category?: CategorySearch
  product_name?: { contains: string; mode?: "insensitive" }
  OR?: Array<{ price: PriceCondition }>
}

/**
 * Retrieves all products with optional filtering.
 *
 * BUSINESS RULE: Price filtering uses OR logic to support multiple ranges.
 * Price ranges: under-50, 50-100, 100-200, over-200
 *
 * Fonte unica: banco Postgres via Prisma (conteudo migrado do CMS).
 *
 * @param options - Filter options (search, categories, price ranges)
 * @returns Array of products matching the criteria
 */
export async function getAllProducts(options?: Options) {
  const where = {} as Where;

  if (options?.categories) {
    where.category = {
      in: options.categories as Category[]
    }
  }

  if (options?.search) {
    where.product_name = {
      contains: options.search,
      mode: "insensitive",
    }
  }

  // Implement price range filtering
  if (options?.price && options.price.length > 0) {
    const priceConditions: Array<{ price: PriceCondition }> = [];

    for (const range of options.price) {
      switch (range) {
        case "under-50":
          priceConditions.push({ price: { lt: 50 } });
          break;
        case "50-100":
          priceConditions.push({ price: { gte: 50, lte: 100 } });
          break;
        case "100-200":
          priceConditions.push({ price: { gte: 100, lte: 200 } });
          break;
        case "over-200":
          priceConditions.push({ price: { gt: 200 } });
          break;
      }
    }

    if (priceConditions.length > 0) {
      where.OR = priceConditions;
    }
  }

  const products = await prisma.product.findMany({
    select: {
      id: true,
      product_name: true,
      description: true,
      price: true,
      category: true,
      profile: {
        select: {
          name: true,
          social_name: true,
          instagram: true,
        },
      },
      media: {
        include: {
          media: {
            select: { url: true, media_type: true }
          }
        }
      }
    },
    where
  });

  // Convert Decimal to number for client component serialization
  return products.map(product => ({
    ...product,
    price: product.price ? Number(product.price) : null,
    // Produtos nao guardam slug: ele e derivado da produtora + nome.
    slug: buildProductSlug({
      produtora: product.profile?.name,
      nome: product.product_name,
    }),
  }));
}
