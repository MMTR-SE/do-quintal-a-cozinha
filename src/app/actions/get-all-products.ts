/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { prisma } from "@/lib/prisma";
import { buildProductSlug } from "@/lib/slug";
import { Category } from "@prisma/client";
import { getCollection } from "@/lib/strapi";

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

/**
 * Retrieves all products with optional filtering.
 *
 * BUSINESS RULE: Price filtering uses OR logic to support multiple ranges.
 * Price ranges: under-50, 50-100, 100-200, over-200
 * 
 * NOTE: Combines products from both Prisma database and Strapi CMS.
 * Strapi products have IDs prefixed with 'strapi-'.
 *
 * NOTE: Combines products from both Prisma database and Strapi CMS.
 * Strapi products have IDs prefixed with 'strapi-'.
 *
 * Fonte unica: banco do site via Prisma.
 *
 * @param options - Filter options (search, categories, price ranges)
 * @returns Array of products matching the criteria
 */
export async function getAllProducts(options?: Options) {
  const where = {} as Where;

  if (options?.categories) {
    where.category = {
      in: options.categories
    }
  }

  if (options?.search) {
    where.product_name = {
      contains: options.search,
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

  // Convert Decimal to number for client component serialization
  const prismaProducts = products.map(product => ({
    ...product,
    slug: buildProductSlug({
      produtora: product.profile?.name,
      nome: product.product_name,
    }),
    price: product.price ? Number(product.price) : null,
  }));

  // Buscar produtos do Strapi
  const strapiProducts = await getProductsFromStrapi();

  // Mesclar produtos do Prisma e do Strapi
  let allProducts = [...prismaProducts, ...strapiProducts];

  // Aplicar filtros nos produtos do Strapi (os do Prisma já vêm filtrados)
  if (strapiProducts.length > 0) {
    // Filtrar por busca
    if (options?.search) {
      allProducts = allProducts.filter(p =>
        p.product_name.toLowerCase().includes(options.search!.toLowerCase())
      );
    }

    // Filtrar por categoria
    if (options?.categories && options.categories.length > 0) {
      allProducts = allProducts.filter(p =>
        options.categories!.includes(p.category)
      );
    }

    // Filtrar por preço
    if (options?.price && options.price.length > 0) {
      allProducts = allProducts.filter(p => {
        if (!p.price) return false;
        return options.price!.some(range => {
          switch (range) {
            case "under-50":
              return p.price! < 50;
            case "50-100":
              return p.price! >= 50 && p.price! <= 100;
            case "100-200":
              return p.price! >= 100 && p.price! <= 200;
            case "over-200":
              return p.price! > 200;
            default:
              return false;
          }
        });
      });
    }
  }

  return allProducts;
}
