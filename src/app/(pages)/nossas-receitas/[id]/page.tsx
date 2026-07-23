"use client";

import { RecipeDetail } from "@/components/recipe-detail";
import { useGetRecipeById } from "@/hooks/use-get-recipe-by-id";
import { use } from "react";

interface RecipePageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Recipe detail page showing full recipe with steps and ingredients.
 */
export default function RecipePage({ params }: RecipePageProps) {
  const { id } = use(params);

  const { data: recipe, isLoading } = useGetRecipeById({ id });

  return <RecipeDetail recipe={recipe} isLoading={isLoading} />;
}
