"use server";

import { prisma } from "@/lib/prisma";
import { getCollection } from "@/lib/strapi";
import { getStrapiField, strapiEntityId, strapiMedia, mapStrapiRegion, strapiRichTextToString } from "@/lib/strapi-content";

interface Options { search?: string; tags?: string[]; profileId?: string; }

async function getStoriesFromStrapi() {
  try {
    const items = await getCollection("historias", { populate: "*" });
    return (items || []).map((item: any) => {
      const id = strapiEntityId(item);
      return {
        id: `strapi-${id}`,
        title: getStrapiField<string>(item, "titulo", "title") || "",
        name: getStrapiField<string>(item, "nome", "name") || "História sem nome",
        description: getStrapiField<string>(item, "descricao", "description") || "",
        slug: getStrapiField<string>(item, "slug") || id,
        content: strapiRichTextToString(getStrapiField(item, "conteudo", "content")),
        region: mapStrapiRegion(getStrapiField(item, "regiao", "region")),
        media: strapiMedia(getStrapiField(item, "imagem", "image"), id, "story"),
      };
    });
  } catch (error) {
    console.error("Erro ao buscar histórias do Strapi:", error);
    return [];
  }
}

export async function getAllStories(options?: Options) {
  const where: any = options?.search ? { name: { contains: options.search } } : {};
  const prismaStories = await prisma.story.findMany({
    select: {
      id: true, name: true, title: true, description: true, slug: true, content: true,
      region: true, media: { include: { media: { select: { url: true } } } },
    },
    where,
  });
  const strapiStories = await getStoriesFromStrapi();
  const allStories = [...prismaStories, ...strapiStories];
  if (!options?.search) return allStories;
  const search = options.search.toLowerCase();
  return allStories.filter((story) => story.name.toLowerCase().includes(search));
}
