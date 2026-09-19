import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/lib/prisma";
import { RecipeDifficulty, MediaType } from "@prisma/client";
import { after } from "next/server";
import { enviarReceitaParaCms } from "@/lib/site-to-cms";

interface MediaItem {
  url: string;
  media_type: MediaType;
}

interface RecipeStepItem {
  step_number: number;
  instruction: string;
}

type params = { params: Promise<{ recipe_id: string }> };

export async function PUT(request: Request, { params }: params) {
  const { recipe_id } = await params;
  const body = await request.json();

  // Normalize empty strings to undefined
  const title = body.title?.trim() || undefined;
  const description = body.description?.trim() || undefined;
  const difficulty = body.difficulty?.trim() || undefined;
  const media: MediaItem[] = body.media || [];
  const steps: RecipeStepItem[] = body.steps || [];
  const replaceMedia: boolean = body.replace_media ?? false;
  const ingredients = body.ingredients;

  // Parse numeric fields (undefined if not provided)
  const preparationTime = body.preparation_time_in_minutes;
  const cookingTime = body.cooking_time_in_minutes;
  const servings = body.number_of_servings;

  // Verify recipe exists
  const recipe = await prisma.recipe.findUnique({
    where: { id: recipe_id },
  });

  if (!recipe) {
    return new Response(JSON.stringify({ error: "Recipe not found" }), {
      status: 404,
    });
  }

  // Validate difficulty if provided
  if (difficulty !== undefined) {
    if (
      difficulty !== RecipeDifficulty.EASY &&
      difficulty !== RecipeDifficulty.INTERMEDIARY &&
      difficulty !== RecipeDifficulty.HARD
    ) {
      return new Response(
        JSON.stringify({
          error: `Difficulty must be one of "${RecipeDifficulty.EASY}", "${RecipeDifficulty.INTERMEDIARY}", "${RecipeDifficulty.HARD}"`,
        }),
        { status: 400 }
      );
    }
  }

  // Validate numeric fields if provided
  if (
    preparationTime !== undefined &&
    (!Number.isInteger(preparationTime) || preparationTime < 0)
  ) {
    return new Response(
      JSON.stringify({
        error: "Preparation time must be a non-negative integer",
      }),
      { status: 400 }
    );
  }

  if (
    cookingTime !== undefined &&
    (!Number.isInteger(cookingTime) || cookingTime < 0)
  ) {
    return new Response(
      JSON.stringify({ error: "Cooking time must be a non-negative integer" }),
      { status: 400 }
    );
  }

  if (servings !== undefined && (!Number.isInteger(servings) || servings <= 0)) {
    return new Response(
      JSON.stringify({
        error: "Number of servings must be a positive integer",
      }),
      { status: 400 }
    );
  }

  // Validate ingredients if provided
  if (ingredients !== undefined) {
    if (!Array.isArray(ingredients)) {
      return new Response(
        JSON.stringify({ error: "Ingredients must be an array" }),
        { status: 400 }
      );
    }

    if (ingredients.length === 0) {
      return new Response(
        JSON.stringify({ error: "At least one ingredient is required" }),
        { status: 400 }
      );
    }

    for (let i = 0; i < ingredients.length; i++) {
      if (typeof ingredients[i] !== "string" || ingredients[i].trim() === "") {
        return new Response(
          JSON.stringify({
            error: `Ingredient at index ${i} must be a non-empty string`,
          }),
          { status: 400 }
        );
      }
    }
  }

  // Filter and validate media
  const validMedia = media.filter((item) => {
    if (!item.url || typeof item.url !== "string" || item.url.trim() === "") {
      return false;
    }
    return true;
  });

  for (let i = 0; i < validMedia.length; i++) {
    const item = validMedia[i];

    if (!item.media_type) {
      return new Response(
        JSON.stringify({
          error: `Media item at index ${i}: media_type is required`,
        }),
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

  // Validate steps if provided
  if (steps.length > 0) {
    const stepNumbers = new Set<number>();

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];

      if (!Number.isInteger(step.step_number) || step.step_number <= 0) {
        return new Response(
          JSON.stringify({
            error: `Step at index ${i}: step_number must be a positive integer`,
          }),
          { status: 400 }
        );
      }

      if (stepNumbers.has(step.step_number)) {
        return new Response(
          JSON.stringify({
            error: `Step at index ${i}: duplicate step_number ${step.step_number}`,
          }),
          { status: 400 }
        );
      }

      stepNumbers.add(step.step_number);

      if (
        !step.instruction ||
        typeof step.instruction !== "string" ||
        step.instruction.trim() === ""
      ) {
        return new Response(
          JSON.stringify({
            error: `Step at index ${i}: instruction must be a non-empty string`,
          }),
          { status: 400 }
        );
      }
    }
  }

  try {
    // Use transaction to ensure atomicity
    const result = await prisma.$transaction(async (tx) => {
      // Build update data object (only include provided fields)
      const updateData: {
        title?: string;
        description?: string;
        preparation_time_in_minutes?: number;
        cooking_time_in_minutes?: number;
        number_of_servings?: number;
        difficulty?: RecipeDifficulty;
        ingredients?: string;
      } = {};

      if (title !== undefined) {
        updateData.title = title;
      }

      if (description !== undefined) {
        updateData.description = description;
      }

      if (preparationTime !== undefined) {
        updateData.preparation_time_in_minutes = preparationTime;
      }

      if (cookingTime !== undefined) {
        updateData.cooking_time_in_minutes = cookingTime;
      }

      if (servings !== undefined) {
        updateData.number_of_servings = servings;
      }

      if (difficulty !== undefined) {
        updateData.difficulty = difficulty;
      }

      if (ingredients !== undefined) {
        updateData.ingredients = JSON.stringify(ingredients);
      }

      // Update recipe details if any fields provided
      if (Object.keys(updateData).length > 0) {
        await tx.recipe.update({
          where: { id: recipe_id },
          data: updateData,
        });
      }

      // Smart merge steps: update existing by step_number, add new ones
      if (steps.length > 0) {
        for (const stepItem of steps) {
          // Try to find existing step with this step_number
          const existingStep = await tx.recipeStep.findFirst({
            where: {
              recipe_id: recipe_id,
              step_number: stepItem.step_number,
            },
          });

          if (existingStep) {
            // Update existing step
            await tx.recipeStep.update({
              where: { id: existingStep.id },
              data: {
                instruction: stepItem.instruction,
              },
            });
          } else {
            // Create new step
            await tx.recipeStep.create({
              data: {
                step_number: stepItem.step_number,
                instruction: stepItem.instruction,
                recipe_id: recipe_id,
              },
            });
          }
        }
      }

      // Handle media updates if provided
      const createdMedia = [];
      if (validMedia.length > 0) {
        // If replace_media is true, delete all existing media links
        if (replaceMedia) {
          await tx.recipeMedia.deleteMany({
            where: { recipeId: recipe_id },
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

          // Link media to recipe
          await tx.recipeMedia.create({
            data: {
              recipeId: recipe_id,
              mediaId: newMedia.id,
            },
          });

          createdMedia.push(newMedia);
        }
      }

      // Fetch final recipe with all related data
      const recipeWithDetails = await tx.recipe.findUnique({
        where: { id: recipe_id },
        include: {
          media: {
            include: {
              media: true,
            },
          },
          steps: {
            select: {
              step_number: true,
              instruction: true,
            },
            orderBy: {
              step_number: "asc",
            },
          },
        },
      });

      return {
        recipe: recipeWithDetails,
        newMedia: createdMedia,
      };
    });

    after(() =>
      enviarReceitaParaCms(recipe_id).catch((error) =>
        console.error("[site->cms] receita:", error.message)
      )
    );

    return new Response(
      JSON.stringify({
        message: "Recipe successfully updated",
        data: result.recipe,
        added_media_count: result.newMedia.length,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Update transaction failed:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to update recipe. Transaction rolled back.",
      }),
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: params) {
  const { recipe_id } = await params;

  const recipe = await prisma.recipe.findUnique({
    where: { id: recipe_id },
  });

  if (!recipe) {
    return new Response(JSON.stringify({ error: "Recipe not found" }), {
      status: 404,
    });
  }

  await prisma.recipe.delete({ where: { id: recipe_id } });

  return new Response(
    JSON.stringify({ message: "Recipe deleted successfully" }),
    { status: 200 }
  );
}
