/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { prisma } from "@/lib/prisma";

interface Options { search?: string; tags?: string[]; profileId?: string; }

/**
 * Lista as receitas do banco do site (Prisma/SQLite).
 */
export async function getAllRecipes(options?: Options) {
  const where: any = options?.search
    ? { title: { contains: options.search } }
    : {};

  return prisma.recipe.findMany({
    select: {
      id: true, title: true, description: true, preparation_time_in_minutes: true,
      number_of_servings: true, created_at: true, cooking_time_in_minutes: true,
      difficulty: true, media: { include: { media: { select: { url: true } } } },
    },
    where,
  });
}
