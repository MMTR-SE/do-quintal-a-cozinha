import { RecipeDifficulty } from "@prisma/client";

/**
 * Recipe type definitions for listing and detail views.
 */

export interface RecipeStep {
  step_number: number;
  instruction: string;
}

export type RecipeMedia = ({
  media: {
    url: string;
  };
} & {
  recipeId: string;
  mediaId: string;
})

export interface Recipe {
  id: string;
  title: string;
  description: string;
  cooking_time_in_minutes: number;
  number_of_servings: number;
  created_at: Date;
  media: RecipeMedia[];
  difficulty: RecipeDifficulty;
}

export interface RecipeWithDetail {
  id: string;
  title: string;
  description: string;
  cooking_time_in_minutes: number;
  preparation_time_in_minutes: number;
  number_of_servings: number;
  created_at: Date;
  media: RecipeMedia[];
  difficulty: RecipeDifficulty;
  steps: RecipeStep[];
  ingredients: any; // eslint-disable-line
}

