"use server";

import { prisma } from "@/lib/prisma";
import { getCollection } from "@/lib/strapi";
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
  product_name?: { contains: string }
  OR?: Array<{ price: PriceCondition }>
}

/**
 * Fetches products from Strapi CMS and converts them to Product format
 */
async function getProductsFromStrapi() {
  try {
    const strapiProducts = await getCollection('produtos', { populate: '*' });
    
    if (!strapiProducts || strapiProducts.length === 0) {
      return [];
    }

    // Debug: log da estrutura do primeiro produto
    if (strapiProducts.length > 0) {
      console.log('Estrutura do produto Strapi:', JSON.stringify(strapiProducts[0], null, 2));
    }

    return strapiProducts.map((item: any) => {
      console.log('Item do Strapi:', item);
      
      // Mapear categoria do Strapi para o enum Category do Prisma
      let category: Category = 'OUTROS';
      const categoriaValue = item.categoria || item.attributes?.categoria;
      if (categoriaValue) {
        const categoryMap: Record<string, Category> = {
          'hortalicas': 'HORTALICAS',
          'frutas': 'FRUTAS',
          'graos': 'GRAOS',
          'processados': 'PROCESSADOS',
          'artesanato': 'ARTESANATO',
          'outros': 'OUTROS'
        };
        category = categoryMap[categoriaValue.toLowerCase()] || 'OUTROS';
      }

      // Extrair campos (Strapi v5 coloca diretamente no objeto)
      // NOTA: Strapi pode criar campos com primeira letra maiúscula
      const nome = item.Nome || item.nome || item.attributes?.nome || item.attributes?.Nome;
      const descricao = item.descricao || item.attributes?.descricao;
      const preco = item.preco || item.attributes?.preco;
      const produtora = item.Produtora || item.produtora || item.attributes?.produtora || item.attributes?.Produtora;
      const imagem = item.Imagem || item.imagem || item.attributes?.imagem || item.attributes?.Imagem;

      console.log('Campos extraídos:', { nome, descricao, preco, produtora, categoria: categoriaValue });

      // Converter Rich Text para string simples
      let descriptionText = null;
      if (typeof descricao === 'string') {
        descriptionText = descricao;
      } else if (Array.isArray(descricao)) {
        // Rich Text é um array de blocos
        descriptionText = descricao
          .map((block: any) => {
            if (block.children) {
              return block.children.map((child: any) => child.text || '').join('');
            }
            return '';
          })
          .join('\n');
      }

      return {
        id: `strapi-${item.documentId || item.id}`,
        product_name: nome || 'Produto sem nome',
        description: descriptionText,
        price: preco || null,
        category,
        profile: {
          name: produtora || 'MMTR-SE',
          social_name: null,
          instagram: null,
        },
        media: imagem?.url ? [{
          media: {
            url: `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${imagem.url}`,
            media_type: 'IMAGE' as const
          },
          mediaId: `strapi-media-${item.documentId || item.id}`,
          productId: `strapi-${item.documentId || item.id}`
        }] : []
      };
    });
  } catch (error) {
    console.error('Erro ao buscar produtos do Strapi:', error);
    return [];
  }
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
      contains: options.search
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
  const prismaProducts = products.map(product => ({
    ...product,
    price: product.price ? Number(product.price) : null
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
