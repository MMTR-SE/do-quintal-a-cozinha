"use server";

import { prisma } from "@/lib/prisma";
import { getSingle } from "@/lib/strapi";
import { getStrapiField, strapiEntityId, strapiMedia, mapStrapiDifficulty } from "@/lib/strapi-content";

export async function getRecipeById({ id }: { id: string }) {
  if (id.startsWith("strapi-")) {
    try {
      const item: any = await getSingle("receitas", id.slice("strapi-".length), { populate: "*" });
      if (!item) return null;
      const documentId = strapiEntityId(item);
      const rawIngredients = getStrapiField<any>(item, "ingredientes", "ingredients") || [];
      const ingredients = typeof rawIngredients === "string" ? rawIngredients : JSON.stringify(rawIngredients);
      const rawSteps = getStrapiField<any[]>(item, "passos", "steps") || [];

      return {
        id,
        title: getStrapiField<string>(item, "titulo", "title") || "Receita sem título",
        description: getStrapiField<string>(item, "descricao", "description") || "",
        preparation_time_in_minutes: Number(getStrapiField(item, "tempo_preparo", "preparation_time_in_minutes") || 0),
        cooking_time_in_minutes: Number(getStrapiField(item, "tempo_cozimento", "cooking_time_in_minutes") || 0),
        number_of_servings: Number(getStrapiField(item, "porcoes", "number_of_servings") || 1),
        difficulty: mapStrapiDifficulty(getStrapiField<string>(item, "dificuldade", "difficulty")),
        created_at: new Date(item.createdAt || Date.now()),
        ingredients,
        steps: rawSteps.map((step: any, index) => ({
          step_number: Number(step.numero ?? step.step_number ?? index + 1),
          instruction: step.instrucao ?? step.instruction ?? "",
        })),
        media: strapiMedia(getStrapiField(item, "imagem", "image"), documentId, "recipe"),
      };
    } catch (error) {
      console.error("Erro ao buscar receita do Strapi:", error);
      return null;
    }
  }

  return prisma.recipe.findUnique({
    select: {
      id: true, title: true, description: true, preparation_time_in_minutes: true,
      number_of_servings: true, created_at: true, cooking_time_in_minutes: true,
      difficulty: true, ingredients: true,
      steps: { select: { step_number: true, instruction: true } },
      media: { include: { media: { select: { url: true } } } },
    },
    where: { id },
  });
}
