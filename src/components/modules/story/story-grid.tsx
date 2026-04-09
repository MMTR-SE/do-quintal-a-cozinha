"use client";

import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Search } from "lucide-react";
import { Story } from "@/types/story";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { StoryCard } from "@/components/story-card";

interface StoryGridProps {
  stories: Story[];
  isLoading: boolean;
  searchQuery?: string;
  onClearSearch?: () => void;
}

export function StoryGrid({
  stories,
  isLoading,
  searchQuery,
  onClearSearch,
}: StoryGridProps) {
  return (
    <section aria-label="Lista de histórias">
      {!!searchQuery && !isLoading && (
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            {`Resultados para "${searchQuery}"`}
          </h3>
          <p className="text-muted-foreground text-lg">
            {`${stories.length} história${
              stories.length !== 1 ? "s" : ""
            } encontrada${stories.length !== 1 ? "s" : ""}`}
          </p>
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="overflow-hidden h-full">
              <div className="relative aspect-[3/4]">
                <Skeleton className="w-full h-full" />
              </div>

              <CardContent className="p-4 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
                <Skeleton className="h-4 w-1/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : stories.length === 0 ? (
        <div className="text-center py-16">
          <div
            className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6"
            role="img"
            aria-label={
              searchQuery
                ? "Ícone de lupa representando busca"
                : "Ícone de livro representando histórias"
            }
          >
            {searchQuery ? (
              <Search
                className="h-10 w-10 text-muted-foreground"
                aria-hidden="true"
              />
            ) : (
              <BookOpen
                className="h-10 w-10 text-muted-foreground"
                aria-hidden="true"
              />
            )}
          </div>

          {searchQuery ? (
            <>
              <h4 className="text-xl font-semibold text-foreground mb-2">
                Nenhuma história encontrada
              </h4>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Não encontramos histórias para {`"${searchQuery}"`}. Tente
                buscar por outro título ou palavra-chave.
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
                Nenhuma história disponível
              </h4>
              <p className="text-muted-foreground">
                Não há histórias para mostrar no momento.
              </p>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      )}
    </section>
  );
}
