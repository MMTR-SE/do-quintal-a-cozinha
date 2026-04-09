"use client";

export const dynamic = "force-static";
import { useState } from "react";
import type { IFuseOptions } from "fuse.js";

import { useGetAllStories } from "@/hooks/use-get-all-stories";
import { useFuzzySearch } from "@/hooks/use-fuzzy-search";
import { StoryGrid } from "@/components/story-grid";
import { SearchBar } from "@/components/search-bar";
import type { Story } from "@/types/story";

const STORY_FUSE_OPTIONS: IFuseOptions<Story> = {
  keys: ["name"],
};

export default function StoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: stories, isLoading } = useGetAllStories();

  const filtered = useFuzzySearch(stories, searchQuery, STORY_FUSE_OPTIONS);

  const handleClearSearch = () => setSearchQuery("");

  return (
    <main
      className="max-w-6xl mx-auto px-6 py-16"
      aria-labelledby="site-title"
    >
      <header className="mb-10 text-center">
        <h1
          id="site-title"
          className="text-4xl font-bold text-gray-900 mb-4 leading-tight"
        >
          Nossas Histórias
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Conheça a história das mulheres que constroem os seus territórios e o nosso movimento!
        </p>
      </header>

      <section
        aria-label="Lista de histórias"
        className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
      >
        {people.map((person) => (
          <article
            key={person.name}
            className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden flex flex-col focus-within:ring-4 focus-within:ring-blue-300"
          >
            {/* Imagem */}
            <div className="relative h-64 w-full">
              <Image
                src={person.image}
                alt={`Foto de ${person.name}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>

      <div className="mb-8">
        <SearchBar
          value={searchQuery}
          onSubmit={setSearchQuery}
          placeholder="Buscar histórias..."
        />
      </div>

      <StoryGrid
        stories={filtered}
        isLoading={isLoading}
        searchQuery={searchQuery}
        onClearSearch={handleClearSearch}
      />
    </main>
  );
}
