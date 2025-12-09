"use server";

import { prisma } from "@/lib/prisma";
import { getSingle } from "@/lib/strapi";
import { Category } from "@prisma/client";

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

      // Mapear categoria
      let category: Category = 'OUTROS';
      const categoriaValue = strapiProduct.categoria || strapiProduct.Categoria;
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

      // Extrair campos
      const nome = strapiProduct.Nome || strapiProduct.nome;
      const descricao = strapiProduct.descricao;
      const preco = strapiProduct.preco;
      const produtora = strapiProduct.Produtora || strapiProduct.produtora;
      const imagem = strapiProduct.Imagem || strapiProduct.imagem;

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
          mediaId: `strapi-media-${documentId}`,
          productId: options.id
        }] : []
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

  // Convert Decimal to number for client component serialization
  return {
    ...product,
    price: product.price ? Number(product.price) : null
  };
}
