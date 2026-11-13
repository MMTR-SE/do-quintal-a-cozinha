"use client";

import { useState, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImageLightbox } from "@/components/image-lightbox";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice } from "@/lib/utils";
import { ProductWithDetail } from "@/types/product";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

interface ProductDetailProps {
  product: ProductWithDetail | null | undefined;
  isLoading: boolean;
}

function formatCategory(category: string): string {
  return category.charAt(0) + category.slice(1).toLowerCase();
}

/**
 * Full product view with image gallery, producer info, and WhatsApp contact.
 */
export function ProductDetail({ product, isLoading }: ProductDetailProps) {
  const [selectedMedia, setSelectedMedia] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handleNextMedia = useCallback(() => {
    setSelectedMedia((prev) => prev + 1);
  }, []);

  const handlePrevMedia = useCallback(() => {
    setSelectedMedia((prev) => prev - 1);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-muted/30 border-b">
          <div className="container mx-auto px-4 py-4">
            <Skeleton className="h-6 w-32" />
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="aspect-video w-full rounded-lg" />
              <div className="flex gap-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="w-20 h-20 rounded" />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-24 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-px w-full" />
              <div className="flex items-center gap-4">
                <Skeleton className="w-16 h-16 rounded-full" />
                <Skeleton className="h-5 w-32" />
              </div>
              <Skeleton className="h-10 w-full rounded-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return notFound();

  const images = product.media
    .filter((m) => m.media.media_type === "IMAGE")
    .map((m) => ({
      url: m.media.url || "/icone-produtos.webp",
      alt: product.product_name,
    }));

  const currentImage = images[selectedMedia] || {
    url: "/icone-produtos.webp",
    alt: product.product_name,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/nossa-producao"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para produção
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => setLightboxOpen(true)}
              className="relative aspect-video w-full rounded-lg overflow-hidden cursor-zoom-in group"
              aria-label="Ver imagem em tamanho completo"
            >
              <Image
                src={currentImage.url}
                alt={currentImage.alt}
                fill
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </button>

            {images.length > 0 && (
              <div className="flex items-center gap-3">
                {images.length > 1 && (
                  <button
                    onClick={handlePrevMedia}
                    disabled={selectedMedia === 0}
                    className="p-1 rounded-full border hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label="Imagem anterior"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                )}

                <div className="flex gap-3 overflow-x-auto">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedMedia(index)}
                      className={`relative w-20 h-20 rounded overflow-hidden flex-shrink-0 border-2 transition-colors ${
                        selectedMedia === index
                          ? "border-primary"
                          : "border-transparent hover:border-muted-foreground/30"
                      }`}
                      aria-label={`Ver imagem ${index + 1}`}
                    >
                      <Image
                        src={image.url}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>

                {images.length > 1 && (
                  <button
                    onClick={handleNextMedia}
                    disabled={selectedMedia >= images.length - 1}
                    className="p-1 rounded-full border hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label="Próxima imagem"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-foreground text-balance">
              {product.product_name}
            </h1>

            <Badge variant="outline" className="border-primary text-primary">
              {formatCategory(product.category)}
            </Badge>

            {product.description && (
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            )}

            <p className="text-2xl font-bold text-foreground">
              {formatPrice(product.price)}
            </p>

            <Separator />

            <div className="space-y-2">
              <p className="font-semibold text-sm text-muted-foreground">
                Feito por
              </p>
              <div className="flex items-center gap-4">
                <Image
                  src="/profile-placeholder.webp"
                  alt={`Foto de perfil de ${product.profile.name}`}
                  width={56}
                  height={56}
                  className="object-cover rounded-full"
                />
                <p className="font-semibold text-foreground">
                  {product.profile.name}
                </p>
              </div>
            </div>

            <Button
              className="w-full rounded-full bg-green-600 hover:bg-green-700"
              onClick={() => {
                window.open(
                  `/api/whatsapp?product=${product.id}`,
                  "_blank"
                );
              }}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Contatar via WhatsApp
            </Button>
          </div>
        </div>
      </div>

      {images.length > 0 && (
        <ImageLightbox
          images={images}
          initialIndex={selectedMedia}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
