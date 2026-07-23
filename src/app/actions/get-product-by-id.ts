/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { prisma } from "@/lib/prisma";
import {
  getSingle,
  getStrapiField,
  getStrapiMedia,
  getStrapiMediaItems,
  StrapiEntity,
} from "@/lib/strapi";
import { Category } from "@prisma/client";

/**
 * Fetches single product by ID with complete details.
 * CRITICAL: Converts Prisma Decimal price to number for client serialization.
 */

interface Options {
  id: string
}

export async function getProductById(options: Options) {
  // Verificar se é um produto do Strapi (ID começa com 'strapi-')
  if (options.id.startsWith('strapi-')) {
    const documentId = options.id.replace('strapi-', '');
    
    try {
      const strapiProduct = await getSingle('produtos', documentId, { populate: '*' });
      
      if (!strapiProduct) {
        return null;
      }

      const item = strapiProduct as StrapiEntity;
      let category: Category = 'AGRICOLA';
      const categoriaValue = getStrapiField<string>(item, 'categoria', 'Categoria');
      if (categoriaValue) {
        const categoryMap: Record<string, Category> = {
          'agricola': 'AGRICOLA',
          'hortalicas': 'AGRICOLA',
          'frutas': 'AGRICOLA',
          'graos': 'AGRICOLA',
          'processados': 'PROCESSADO',
          'processado': 'PROCESSADO',
          'artesanato': 'ARTESANATO',
          'outros': 'AGRICOLA'
        };
        category = categoryMap[categoriaValue.toLowerCase()] || 'AGRICOLA';
      }

      const nome = getStrapiField<string>(item, 'Nome', 'nome');
      const descricao = getStrapiField<any>(item, 'descricao');
      const preco = getStrapiField<number>(item, 'preco');
      const produtora = getStrapiField<string>(item, 'Produtora', 'produtora');
      const telefone = getStrapiField<string>(item, 'telefone', 'Telefone');
      const imagens = getStrapiMediaItems(getStrapiField(item, 'Imagem', 'imagem'));

      // Converter Rich Text para string
      let descriptionText = null;
      if (typeof descricao === 'string') {
        descriptionText = descricao;
      } else if (Array.isArray(descricao)) {
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
        id: options.id,
        product_name: nome || 'Produto sem nome',
        description: descriptionText,
        price: preco ?? null,
        category,
        profile: {
          name: produtora || 'MMTR-SE',
          social_name: null,
          instagram: null,
          phone_number: telefone,
        },
        media: imagens.flatMap((imagem, index) => {
          const url = getStrapiMedia(imagem.url);
          if (!url) return [];

          return [{
            media: { url, media_type: 'IMAGE' as const },
            mediaId: `strapi-media-${documentId}-${index}`,
            productId: options.id
          }];
        })
      };
    } catch (error) {
      console.error('Erro ao buscar produto do Strapi:', error);
      return null;
    }
  }

  // Buscar do Prisma (produto local)
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
    price: product.price ? Number(product.price) : null
  };
}
