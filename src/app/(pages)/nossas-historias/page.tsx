"use client";

import { StoryCard } from "@/components/story-card";
import { useGetAllStories } from "@/hooks/use-get-all-stories";

export default function StoriesPage() {
  const { data: stories, isLoading } = useGetAllStories();

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <header className="mb-14 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          Nossas Histórias
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Conheça a história das mulheres que constroem os seus territórios e o nosso movimento!
        </p>
      </header>
      <StoryCard stories={stories || []} isLoading={isLoading} />
    </main>
  );
}
