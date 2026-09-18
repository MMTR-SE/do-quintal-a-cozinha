"use server";

import { prisma } from "@/lib/prisma";

/**
 * Busca uma receita pelo id no banco Postgres (conteudo migrado do CMS).
 */
export async function getRecipeById({ id }: { id: string }) {
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
