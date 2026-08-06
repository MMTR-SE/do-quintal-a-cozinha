/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { prisma } from "@/lib/prisma";
import { getCollection } from "@/lib/strapi";
import { getStrapiField, strapiEntityId, strapiMedia, mapStrapiRegion, strapiRichTextToString } from "@/lib/strapi-content";

export async function getStoryBySlug({ slug }: { slug: string }) {
  try {
    const items = await getCollection("historias", {
      "filters[slug][$eq]": slug,
      populate: "*",
    });
    const item: any = items?.[0];
    if (item) {
      const id = strapiEntityId(item);
      return {
        id: `strapi-${id}`,
        title: getStrapiField<string>(item, "titulo", "title") || "",
        name: getStrapiField<string>(item, "nome", "name") || "História sem nome",
        description: getStrapiField<string>(item, "descricao", "description") || "",
        slug: getStrapiField<string>(item, "slug") || slug,
        content: strapiRichTextToString(getStrapiField(item, "conteudo", "content")),
        region: mapStrapiRegion(getStrapiField(item, "regiao", "region")),
        media: strapiMedia(getStrapiField(item, "imagem", "image"), id, "story"),
      };
    }
  } catch (error) {
    console.error("Erro ao buscar história do Strapi:", error);
  }

  return prisma.story.findUnique({
    select: {
      id: true, name: true, title: true, description: true, slug: true, content: true,
      region: true, media: { include: { media: { select: { url: true } } } },
    },
    where: { slug },
  });
}
