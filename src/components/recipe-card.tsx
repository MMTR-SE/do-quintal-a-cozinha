import { GridCard } from "@/components/grid-card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users } from "lucide-react";
import { Recipe } from "@/types/recipe";
import { formatMinutes, formatRecipeDifficulty } from "@/lib/utils";

interface RecipeCardProps {
  recipe: Recipe;
}

/**
 * Recipe card component for displaying recipe information in grid layouts.
 *
 * Uses GridCard base component and adds recipe-specific metadata:
 * - Title with hover color change
 * - Description (line-clamped to 2 lines)
 * - Cooking time with clock icon
 * - Number of servings with users icon
 * - Difficulty badge
 *
 * Links to individual recipe detail page at /nossas-receitas/[id]
 *
 * @param recipe - Recipe object with all recipe data
 */
export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <GridCard
      href={`/nossas-receitas/${recipe.id}`}
      imageUrl={recipe.media[0]?.media.url || "/icone-receitas.webp"}
      imageAlt={recipe.title}
      imageHeight="fixed"
    >
      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
        {recipe.title}
      </h3>
      <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-2 flex-1">
        {recipe.description}
      </p>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{formatMinutes(recipe.cooking_time_in_minutes)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{recipe.number_of_servings}</span>
          </div>
        </div>
        <Badge variant="outline" className="text-xs">
          {formatRecipeDifficulty(recipe.difficulty)}
        </Badge>
      </div>
    </GridCard>
  );
}
