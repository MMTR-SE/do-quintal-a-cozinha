import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/lib/prisma";
import { after, type NextRequest } from "next/server";
import { RecipeDifficulty, MediaType } from "@prisma/client";
import { enviarReceitaParaCms } from "@/lib/site-to-cms";

interface MediaItem {
  url: string;
  media_type: MediaType;
}

interface RecipeStepItem {
  step_number: number;
  instruction: string;
}

export async function POST(request: Request) {
  const body = await request.json();

  // Normalize empty strings to undefined
  const title = body.title?.trim() || undefined;
  const description = body.description?.trim() || undefined;
  const phoneNumber = body.phone_number?.trim() || undefined;
  const difficulty = body.difficulty?.trim() || undefined;
  const media: MediaItem[] = body.media || [];
  const steps: RecipeStepItem[] = body.steps || [];
  const ingredients = body.ingredients;

  // Parse numeric fields
  const preparationTime = body.preparation_time_in_minutes;
  const cookingTime = body.cooking_time_in_minutes;
  const servings = body.number_of_servings;

  // Validate required fields
  if (!title) {
    return new Response(JSON.stringify({ error: "Title is required" }), {
      status: 400,
    });
  }

  if (!description) {
    return new Response(JSON.stringify({ error: "Description is required" }), {
      status: 400,
    });
  }

  if (!phoneNumber) {
    return new Response(JSON.stringify({ error: "Phone number is required" }), {
      status: 400,
    });
  }

  if (!difficulty) {
    return new Response(JSON.stringify({ error: "Difficulty is required" }), {
      status: 400,
    });
  }

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

  // Validate numeric fields
  if (
    preparationTime === undefined ||
    preparationTime === null ||
    !Number.isInteger(preparationTime) ||
    preparationTime < 0
  ) {
    return new Response(
      JSON.stringify({
        error: "Preparation time must be a non-negative integer",
      }),
      { status: 400 }
    );
  }

  if (
    cookingTime === undefined ||
    cookingTime === null ||
    !Number.isInteger(cookingTime) ||
    cookingTime < 0
  ) {
    return new Response(
      JSON.stringify({ error: "Cooking time must be a non-negative integer" }),
      { status: 400 }
    );
  }

  if (
    servings === undefined ||
    servings === null ||
    !Number.isInteger(servings) ||
    servings <= 0
  ) {
    return new Response(
      JSON.stringify({
        error: "Number of servings must be a positive integer",
      }),
      { status: 400 }
    );
  }

  // Validate ingredients
  if (!ingredients) {
    return new Response(JSON.stringify({ error: "Ingredients are required" }), {
      status: 400,
    });
  }

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

  // Validate all ingredients are strings
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

  // Verify profile exists
  const profile = await prisma.profile.findUnique({
    where: {
      phone_number: phoneNumber,
    },
  });

  if (!profile) {
    return new Response(JSON.stringify({ error: "Profile not found" }), {
      status: 404,
    });
  }

  try {
    // Use transaction to ensure atomicity
    const result = await prisma.$transaction(async (tx) => {
      // Create recipe
      const newRecipe = await tx.recipe.create({
        data: {
          id: uuidv4(),
          title,
          description,
          preparation_time_in_minutes: preparationTime,
          cooking_time_in_minutes: cookingTime,
          number_of_servings: servings,
          difficulty,
          ingredients: JSON.stringify(ingredients),
          profile_id: profile.id,
        },
      });

      // Create recipe steps if provided
      for (const stepItem of steps) {
        await tx.recipeStep.create({
          data: {
            step_number: stepItem.step_number,
            instruction: stepItem.instruction,
            recipe_id: newRecipe.id,
          },
        });
      }

      // Create media entries if provided
      const createdMedia = [];
      for (const mediaItem of validMedia) {
        const newMedia = await tx.media.create({
          data: {
            id: uuidv4(),
            url: mediaItem.url,
            media_type: mediaItem.media_type,
          },
        });

        // Link media to recipe via junction table
        await tx.recipeMedia.create({
          data: {
            recipeId: newRecipe.id,
            mediaId: newMedia.id,
          },
        });

        createdMedia.push(newMedia);
      }

      return {
        recipe: newRecipe,
        media: createdMedia,
      };
    });

    after(() =>
      enviarReceitaParaCms(result.recipe.id).catch((error) =>
        console.error("[site->cms] receita:", error.message)
      )
    );

    return new Response(
      JSON.stringify({
        message: "Recipe created successfully",
        data: {
          ...result.recipe,
          media: result.media,
        },
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Transaction failed:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to create recipe. Transaction rolled back.",
      }),
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const phone_number = searchParams.get("phone_number");
  const recipe_id = searchParams.get("recipe_id");

  if (!phone_number && !recipe_id) {
    return new Response(
      JSON.stringify({
        error:
          "Enter at least one of the attributes between phone_number and recipe_id in search params.",
      }),
      { status: 400 }
    );
  }

  if (phone_number) {
    const recipes = await prisma.recipe.findMany({
      where: { profile: { phone_number } },
      select: {
        id: true,
        title: true,
        description: true,
        preparation_time_in_minutes: true,
        cooking_time_in_minutes: true,
        number_of_servings: true,
        difficulty: true,
        created_at: true,
        updated_at: true,
        profile_id: true,
        ingredients: true,
        media: true,
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

    return new Response(JSON.stringify({ data: recipes }), { status: 200 });
  }

  const recipe = await prisma.recipe.findUnique({
    select: {
      id: true,
      title: true,
      description: true,
      preparation_time_in_minutes: true,
      cooking_time_in_minutes: true,
      number_of_servings: true,
      difficulty: true,
      created_at: true,
      updated_at: true,
      profile_id: true,
      ingredients: true,
      media: true,
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
    where: { id: recipe_id as string },
  });

  return new Response(JSON.stringify({ data: recipe }), { status: 200 });
}
