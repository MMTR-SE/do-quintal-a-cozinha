"use client";

import { useEffect, useState } from "react";
import { ImageLightbox } from "@/components/image-lightbox";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Story } from "@/types/story";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { notFound } from "next/navigation";
import Image from "next/image";

interface StoryDetailProps {
  story: Story | null | undefined;
  isLoading: boolean;
}

/**
 * Full story view with image, title, description, and HTML content.
 */
export default function StoryDetail({ story, isLoading }: StoryDetailProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;
    setCurrentIndex(carouselApi.selectedScrollSnap());
    const onSelect = () => setCurrentIndex(carouselApi.selectedScrollSnap());
    carouselApi.on("select", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-muted/30 border-b">
          <div className="container mx-auto px-4 py-4">
            <Skeleton className="h-6 w-32" />
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-2/3" />
            </div>
            <Skeleton className="h-5 w-32" />
          </div>

          <Skeleton className="h-[28rem] w-full rounded-lg" />

          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-5/6" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!story) return notFound();

  const images = story.media.map((m) => ({
    url: m.media.url,
    alt: story.name,
  }));

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/nossas-historias"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para histórias
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">
              {story.title ?? story.name}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              {story.description}
            </p>
          </div>

          {images.length > 0 && (
            <Carousel
              setApi={setCarouselApi}
              opts={{ loop: false }}
              className="relative w-full"
            >
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <button
                      onClick={() => setLightboxOpen(true)}
                      className="relative h-[28rem] w-full rounded-lg overflow-hidden cursor-zoom-in group bg-muted"
                      aria-label={`Ver imagem ${index + 1} em tamanho completo`}
                    >
                      <Image
                        src={image.url}
                        alt=""
                        aria-hidden
                        fill
                        className="object-cover scale-110 blur-2xl opacity-50"
                        sizes="(max-width: 768px) 100vw, 768px"
                      />
                      <Image
                        src={image.url}
                        alt={image.alt}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 768px"
                      />
                    </button>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {images.length > 1 && (
                <>
                  <div className="pointer-events-none absolute top-3 right-3 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white">
                    {currentIndex + 1} / {images.length}
                  </div>
                  <button
                    type="button"
                    onClick={() => carouselApi?.scrollPrev()}
                    disabled={!carouselApi?.canScrollPrev()}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/60 disabled:opacity-30 disabled:cursor-not-allowed p-2 text-white transition-colors"
                    aria-label="Imagem anterior"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => carouselApi?.scrollNext()}
                    disabled={!carouselApi?.canScrollNext()}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/60 disabled:opacity-30 disabled:cursor-not-allowed p-2 text-white transition-colors"
                    aria-label="Próxima imagem"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </Carousel>
          )}

          <div
            className="story-detail-content"
            dangerouslySetInnerHTML={{ __html: story.content }}
          />
        </div>
      </div>

      {images.length > 0 && (
        <ImageLightbox
          images={images}
          initialIndex={currentIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
