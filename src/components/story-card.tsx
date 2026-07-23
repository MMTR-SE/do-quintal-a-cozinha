// components/story-card.tsx
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image";
import { Story } from "@/types/story";
import { Tag } from "./tag";


interface StoryCardProps {
  stories: Story[];
  isLoading: boolean;
  searchQuery?: string;
  onClearSearch?: () => void;
}

export function StoryCard({ stories, isLoading, searchQuery }: StoryCardProps) {
  return (
    <section>
      <Tag title="Nossas História" caption="Conheça a história de mulheres do movimento!" />
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          {!!searchQuery
            ? `Resultados para "${searchQuery}"`
            : ""}
        </h2>
        <p className="text-muted-foreground text-lg">
          {searchQuery
            ? `${stories.length} história${stories.length !== 1 ? "s" : ""} encontrada${stories.length !== 1 ? "s" : ""}`
            : ""}
        </p>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <Card key={story.id} className="overflow-hidden h-full">
              <div className="relative h-48">
                {story.media.length > 0 && (
                  <Image
                    src={story.media[0].media.url}
                    alt={story.name}
                    layout="fill"
                    objectFit="cover"
                  />
                )}
              </div>

              <CardContent className="p-4 space-y-3">
                <h3 className="text-xl font-semibold">{story.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {story.description}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <Link href={`/nossas-historias/${story.slug}`}>
                    <span className="text-primary font-medium hover:underline">
                      Leia mais
                    </span>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  )
}
