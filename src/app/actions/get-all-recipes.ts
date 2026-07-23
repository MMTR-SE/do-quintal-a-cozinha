"use server";

import { prisma } from "@/lib/prisma";
import { getCollection } from "@/lib/strapi";
import { getStrapiField, strapiEntityId, strapiMedia, mapStrapiDifficulty } from "@/lib/strapi-content";

interface Options { search?: string; tags?: string[]; profileId?: string; }

async function getRecipesFromStrapi() {
  try {
    const items = await getCollection("receitas", { populate: "*" });
    return (items || []).map((item: any) => {
      const id = strapiEntityId(item);
      return {
        id: `strapi-${id}`,
        title: getStrapiField<string>(item, "titulo", "title") || "Receita sem título",
        description: getStrapiField<string>(item, "descricao", "description") || "",
        preparation_time_in_minutes: Number(getStrapiField(item, "tempo_preparo", "preparation_time_in_minutes") || 0),
        cooking_time_in_minutes: Number(getStrapiField(item, "tempo_cozimento", "cooking_time_in_minutes") || 0),
        number_of_servings: Number(getStrapiField(item, "porcoes", "number_of_servings") || 1),
        difficulty: mapStrapiDifficulty(getStrapiField<string>(item, "dificuldade", "difficulty")),
        created_at: new Date(item.createdAt || Date.now()),
        media: strapiMedia(getStrapiField(item, "imagem", "image"), id, "recipe"),
      };
    });
  } catch (error) {
    console.error("Erro ao buscar receitas do Strapi:", error);
    return [];
  }
}

export async function getAllRecipes(options?: Options) {
  const where: any = options?.search ? { title: { contains: options.search } } : {};
  const prismaRecipes = await prisma.recipe.findMany({
    select: {
      id: true, title: true, description: true, preparation_time_in_minutes: true,
      number_of_servings: true, created_at: true, cooking_time_in_minutes: true,
      difficulty: true, media: { include: { media: { select: { url: true } } } },
    },
    where,
  });
  const strapiRecipes = await getRecipesFromStrapi();
  const allRecipes = [...prismaRecipes, ...strapiRecipes];

  if (!options?.search) return allRecipes;
  const search = options.search.toLowerCase();
  return allRecipes.filter((recipe) => recipe.title.toLowerCase().includes(search));
}
