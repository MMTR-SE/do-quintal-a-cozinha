import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/lib/prisma";
import { Category, MediaType } from "@prisma/client";
import { after } from "next/server";
import { enviarProdutoParaCms, removerProdutoDoCms } from "@/lib/site-to-cms";

interface MediaItem {
  url: string;
  media_type: MediaType;
}

type params = { params: Promise<{ product_id: string }> };

export async function PUT(request: Request, { params }: params) {
  const { product_id } = await params;
  const body = await request.json();

  // Normalize empty strings to undefined (handles Typebot variables that aren't set)
  const productName = body.product_name?.trim() || undefined;
  const category = body.category?.trim() || undefined;
  const media: MediaItem[] = body.media || [];
  const replaceMedia: boolean = body.replace_media ?? false;

  let price: number | null | undefined = undefined;
  if (body.price !== undefined) {
    price = body.price !== null && body.price !== "" ? Number(body.price) : null;
  }

  // Verify product exists
  const product = await prisma.product.findUnique({
    where: { id: product_id },
  });

  if (!product) {
    return new Response(JSON.stringify({ error: "Product not found" }), {
      status: 404,
    });
  }

  // Validate category if provided
  if (category !== undefined) {
    if (
      category !== Category.AGRICOLA &&
      category !== Category.ARTESANATO &&
      category !== Category.PROCESSADO
    ) {
      return new Response(
        JSON.stringify({
          error: `Category must be one of "${Category.AGRICOLA}", "${Category.ARTESANATO}", "${Category.PROCESSADO}"`,
        }),
        { status: 400 }
      );
    }
  }

  // Validate price if provided
  if (price !== undefined && price !== null && (isNaN(price) || price < 0)) {
    return new Response(
      JSON.stringify({ error: "Price must be a positive number" }),
      { status: 400 }
    );
  }

  // Filter out media items with empty URLs and validate remaining items
  const validMedia = media.filter(item => {
    // Skip items with empty/missing URLs
    if (!item.url || typeof item.url !== 'string' || item.url.trim() === '') {
      return false;
    }
    return true;
  });

  // Validate media_type for remaining items
  for (let i = 0; i < validMedia.length; i++) {
    const item = validMedia[i];

    if (!item.media_type) {
      return new Response(
        JSON.stringify({ error: `Media item at index ${i}: media_type is required` }),
        { status: 400 }
      );
    }

    if (
      item.media_type !== MediaType.IMAGE &&
      item.media_type !== MediaType.AUDIO &&
      item.media_type !== MediaType.VIDEO
    ) {
      return new Response(
        JSON.stringify({
          error: `Media item at index ${i}: media_type must be one of "${MediaType.IMAGE}", "${MediaType.AUDIO}", "${MediaType.VIDEO}"`,
        }),
        { status: 400 }
      );
    }
  }

  try {
    // Use transaction to ensure atomicity
    const result = await prisma.$transaction(async (tx) => {
      // Build update data object (only include provided fields)
      const updateData: {
        product_name?: string;
        description?: string | null;
        price?: number | null;
        category?: Category;
      } = {};

      if (productName !== undefined) {
        updateData.product_name = productName;
      }

      if (body.description !== undefined) {
        updateData.description = body.description || null;
      }

      if (price !== undefined) {
        updateData.price = price;
      }

      if (category !== undefined) {
        updateData.category = category;
      }

      // Update product details if any fields provided
      if (Object.keys(updateData).length > 0) {
        await tx.product.update({
          where: { id: product_id },
          data: updateData,
        });
      }

      // Handle media updates if provided
      const createdMedia = [];
      if (validMedia.length > 0) {
        // If replace_media is true, delete all existing media links
        if (replaceMedia) {
          // Delete ProductMedia links (media files themselves are kept for potential reuse)
          await tx.productMedia.deleteMany({
            where: { productId: product_id },
          });
        }

        // Add new media
        for (const mediaItem of validMedia) {
          const newMedia = await tx.media.create({
            data: {
              id: uuidv4(),
              url: mediaItem.url,
              media_type: mediaItem.media_type,
            },
          });

          // Link media to product
          await tx.productMedia.create({
            data: {
              productId: product_id,
              mediaId: newMedia.id,
            },
          });

          createdMedia.push(newMedia);
        }
      }

      // Fetch final product with all media
      const productWithMedia = await tx.product.findUnique({
        where: { id: product_id },
        include: {
          media: {
            include: {
              media: true,
            },
          },
        },
      });

      return {
        product: productWithMedia,
        newMedia: createdMedia,
      };
    });

    after(() =>
      enviarProdutoParaCms(product_id).catch((error) =>
        console.error("[site->cms] produto:", error.message)
      )
    );

    return new Response(
      JSON.stringify({
        message: "Product successfully updated",
        data: result.product,
        added_media_count: result.newMedia.length,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Update transaction failed:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update product. Transaction rolled back." }),
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: params) {
  const { product_id } = await params;

  const product = await prisma.product.findUnique({
    where: { id: product_id },
  });

  if (!product) {
    return new Response(JSON.stringify({ error: "Product not found" }), {
      status: 404,
    });
  }

  await prisma.product.delete({ where: { id: product_id } });

  // Remove tambem o item espelhado no CMS
  after(() =>
    removerProdutoDoCms(product_id).catch((error) =>
      console.error("[site->cms] remover produto:", error.message)
    )
  );

  return new Response(
    JSON.stringify({ message: "Product deleted successfully" }),
    { status: 200 }
  );
}