"use server";

import { prisma } from "@/lib/prisma";
import { Category } from "@prisma/client";

/**
 * Fetches products with filtering by category, price range, and search.
 * CRITICAL: Converts Prisma Decimal prices to numbers for client serialization.
 */

interface Options {
  search?: string
  categories?: Category[]
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
  product_name?: { contains: string }
  OR?: Array<{ price: PriceCondition }>
}

export async function getAllProducts(options?: Options) {
  const where = {} as Where;

  if (options?.categories) {
    where.category = {
      in: options.categories
    }
  }

  if (options?.search) {
    where.product_name = {
      contains: options.search
    }
  }

  // OR logic allows users to select multiple price brackets
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

  // CRITICAL: Convert Decimal to number for Next.js client serialization
  return products.map(product => ({
    ...product,
    price: product.price ? Number(product.price) : null
  }));
}
