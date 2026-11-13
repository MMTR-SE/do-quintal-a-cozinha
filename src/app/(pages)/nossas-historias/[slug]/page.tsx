"use client";

import StoryDetail from "@/components/story-detail";
import { useGetStoryBySlug } from "@/hooks/use-get-story-by-slug";
import { use } from "react";

interface StoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Story detail page fetched by slug route parameter.
 */
export default function StoryPage({ params }: StoryPageProps) {
  const { slug } = use(params);
  const { data: story, isLoading } = useGetStoryBySlug({ slug });
 
  return <StoryDetail story={story} isLoading={isLoading} />;
}
