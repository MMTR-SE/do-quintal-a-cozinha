"use client";

import { useState } from "react";
import Image from "next/image";
import { Story } from "@/types/story";

interface StoryDetails {
  story: Story;
  isLoading: boolean;
}

export default function StoryDetail({ story }: StoryDetails) {
  const [imgSrc, setImgSrc] = useState(story.media?.[0]?.media?.url || "/placeholder.png");

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">{story.title ?? story.name}</h1>
      <div className="h-[44rem] max-w-lg cover relative flex-shrink-0">
      	<Image
      	  src={imgSrc}
      	  alt={story.name}
      	  fill
      	  style={{ objectFit: "cover" }}
      	  onError={() => setImgSrc("/placeholder.png")}
      	  className="rounded-lg"
      	  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 30vw"
      	/>
      </div>
      <div className="story-detail-content"
      dangerouslySetInnerHTML={{ __html: story.content }}
      />
    </main>
  );
}
