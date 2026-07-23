"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users } from "lucide-react";
import Link from "next/link";
import { formatMinutes, formatRecipeDifficulty } from "@/lib/utils";
import { Recipe } from "@/types/recipe";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

interface FeaturedRecipesProps {
  featured_recipes: Recipe[];
  isLoading: boolean;
}

/**
 * Displays featured recipes in a 2-column grid with larger cards and hover effects.
 */
export function FeaturedRecipes({
  featured_recipes,
  isLoading,
}: FeaturedRecipesProps) {
  if (isLoading) {
    return (
      <Card className="overflow-hidden border-2 mb-8">
        <div className="relative h-64">
          <Skeleton className="w-full h-full" />
          <div className="absolute top-4 left-4">
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <div className="absolute top-4 right-4">
            <Skeleton className="h-8 w-16 rounded-full" />
          </div>
        </div>

        <CardContent className="p-6 space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-12" />
            </div>
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (featured_recipes.length === 0) return null;

  return (
    <section className="mb-16">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-foreground mb-4">
          Receitas em Destaque
        </h3>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Nossas receitas mais populares e bem avaliadas pela comunidade
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {featured_recipes.map((recipe) => (
          <Link key={recipe.id} href={`/nossas-receitas/${recipe.id}`}>
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-border hover:border-primary/20 overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={recipe.media[0]?.media.url || "/icone-receitas.webp"}
                  alt={recipe.title}
                  fill
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <CardContent className="p-6">
                <h4 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {recipe.title}
                </h4>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {recipe.description}
                </p>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>
                        {formatMinutes(recipe.cooking_time_in_minutes)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{recipe.number_of_servings} porções</span>
                    </div>
                  </div>
                  <Badge variant="outline">
                    {formatRecipeDifficulty(recipe.difficulty)}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
