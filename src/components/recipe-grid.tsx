import { Card, CardContent } from "@/components/ui/card";
import { Search, ChefHat } from "lucide-react";
import { Recipe } from "@/types/recipe";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { RecipeCard } from "@/components/recipe-card";

interface RecipeGridProps {
  recipes: Recipe[];
  isLoading: boolean;
  searchQuery?: string;
  onClearSearch?: () => void;
}

/**
 * Displays recipes in a responsive grid with loading, empty, and search result states.
 */
export function RecipeGrid({
  recipes,
  isLoading,
  searchQuery,
  onClearSearch,
}: RecipeGridProps) {
  return (
    <section>
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-foreground mb-4">
          {!!searchQuery
            ? `Resultados para "${searchQuery}"`
            : "Todas as Receitas"}
        </h3>
        <p className="text-muted-foreground text-lg">
          {searchQuery
            ? `${recipes.length} receita${
                recipes.length !== 1 ? "s" : ""
              } encontrada${recipes.length !== 1 ? "s" : ""}`
            : "Explore nossa coleção completa de receitas"}
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="overflow-hidden h-full">
              <div className="relative h-48">
                <Skeleton className="w-full h-full" />
                <div className="absolute top-3 left-3">
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <div className="absolute top-3 right-3">
                  <Skeleton className="h-7 w-12 rounded-full" />
                </div>
              </div>

              <CardContent className="p-4 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : recipes.length === 0 ? (
        <div className="text-center py-16">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6" role="img" aria-label={searchQuery ? "Ícone de lupa representando busca" : "Ícone de chapéu de chef representando receitas"}>
            {searchQuery ? (
              <Search className="h-10 w-10 text-muted-foreground" aria-hidden="true" />
            ) : (
              <ChefHat className="h-10 w-10 text-muted-foreground" aria-hidden="true" />
            )}
          </div>

          {searchQuery ? (
            <>
              <h4 className="text-xl font-semibold text-foreground mb-2">
                Nenhuma receita encontrada
              </h4>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Não encontramos receitas para {`"${searchQuery}"`}. Tente buscar
                por outros ingredientes ou categorias.
              </p>
              {onClearSearch && (
                <Button onClick={onClearSearch} variant="outline">
                  Limpar busca
                </Button>
              )}
            </>
          ) : (
            <>
              <h4 className="text-xl font-semibold text-foreground mb-2">
                Nenhuma receita disponível
              </h4>
              <p className="text-muted-foreground">
                Não há receitas para mostrar no momento.
              </p>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </section>
  );
}
