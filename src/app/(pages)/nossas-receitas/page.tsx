"use client";

import { useState } from "react";
import type { IFuseOptions } from "fuse.js";

import { PageHeader } from "@/components/page-header";
import { SearchBar } from "@/components/search-bar";
import { FeaturedRecipes } from "@/components/featured-recipes";
import { RecipeGrid } from "@/components/recipe-grid";
import { useGetAllRecipes } from "@/hooks/use-get-all-recipes";
import { useFuzzySearch } from "@/hooks/use-fuzzy-search";
import type { Recipe } from "@/types/recipe";

const RECIPE_FUSE_OPTIONS: IFuseOptions<Recipe> = {
  keys: [
    { name: "title", weight: 2 },
    "description",
  ],
};

/**
 * Recipe listing page with search bar, featured section, and full recipe grid.
 */
export default function RecipesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: recipes, isLoading } = useGetAllRecipes();

  const filtered = useFuzzySearch(recipes, searchQuery, RECIPE_FUSE_OPTIONS);

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Nossas Receitas"
        subtitle="Descubra receitas autênticas e deliciosas da culinária brasileira"
      />
      <main className="container mx-auto px-4 py-8">
        <SearchBar
          value={searchQuery}
          onSubmit={setSearchQuery}
          placeholder="Buscar receitas..."
        />
        {searchQuery ? (
          <RecipeGrid
            recipes={filtered}
            isLoading={isLoading}
            searchQuery={searchQuery}
            onClearSearch={handleClearSearch}
          />
        ) : (
          <>
            <FeaturedRecipes
              featured_recipes={filtered.slice(0, 2)}
              isLoading={isLoading}
            />
            <RecipeGrid recipes={filtered.slice(2)} isLoading={isLoading} />
          </>
        )}
      </main>
    </div>
  );
}
