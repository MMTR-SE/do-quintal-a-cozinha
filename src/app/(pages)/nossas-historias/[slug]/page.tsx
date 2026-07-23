"use client";

import { useGetStoryBySlug } from "@/hooks/use-get-story-by-slug";
import StoryDetail from "@/components/nossas-historias/story-detail-client";
import { use } from "react";
import { notFound } from 'next/navigation';

interface StoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = 'force-static';

export default function StoryPage({ params }: StoryPageProps) {
  const { slug } = use(params);
  const { data: story, isLoading } = useGetStoryBySlug({ slug });
  
  if (!story) {
    if (isLoading) return <p>Carregando...</p>;
    return notFound();
  }

  return <StoryDetail story={story} isLoading={isLoading} />;
}
