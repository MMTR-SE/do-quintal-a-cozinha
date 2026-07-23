"use client";

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { ImageLightbox } from "@/components/image-lightbox";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

const galleryImages = [
  {
    url: "/mmtr-sobre-1.webp",
    alt: "Mulheres do MMTR-SE reunidas em atividade de organização e formação política",
  },
  {
    url: "/mmtr-sobre-2.webp",
    alt: "Evento do MMTR com participantes em mobilização e debate",
  },
  {
    url: "/mmtr-sobre-3.webp",
    alt: "Mulheres do MMTR-SE em espaço de participação política em Sergipe",
  },
  {
    url: "/mmtr-sobre-4.webp",
    alt: "Trabalhadoras rurais mobilizadas pelo MMTR-SE pelo feminismo rural",
  },
];

export default function Sobre() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  };

  return (
    <>
      <PageHeader
        title="Sobre Nós"
        subtitle="Movimento de Mulheres Trabalhadoras Rurais de Sergipe"
      />
      <main className="container-wrapper">
        <div className="container flex flex-col gap-6 py-8">
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">
                Um pouco da história...
              </h2>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Somos um movimento auto organizado de mulheres que constroem o feminismo
                  rural em Sergipe a partir das suas diversas identidades e territórios.
                </p>

                <p>
                  O nascimento do MMTR-SE está intimamente ligado à luta pela terra no
                  estado de Sergipe. Com o fim da ditadura militar, intensificou-se a
                  discussão sobre os direitos das pessoas. Foi um período efervescente de
                  lutas sociais, especialmente da luta pela terra.
                </p>

                <p>
                  No estado de Sergipe, a Comissão Pastoral da Terra (CPT) desempenhou um
                  papel importante na mobilização e formação da população rural.
                </p>

                <p>
                  Podemos dizer, então, que o MMTR-SE teve início, em especial, com a
                  participação das mulheres acampadas e assentadas. Logo em seguida, o
                  movimento foi se expandindo para outras mulheres da agricultura
                  familiar.
                </p>

                <p>
                  Em 1990, organizou-se o primeiro ato comemorativo do Dia Internacional
                  da Mulher — 8 de março — com a presença da companheira Marlene, do Rio
                  Grande do Norte, que veio representando o MMTR-NE. Assim teve início a
                  organização do movimento no estado.
                </p>

                <p className="font-semibold text-purple-600">
                  Desde então, as mulheres do MMTR-SE vêm ocupando diversos espaços de
                  participação política.
                </p>
              </div>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-bold text-purple-600 mb-6">
                Galeria de Fotos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {galleryImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => openLightbox(index)}
                    className="relative aspect-[4/3] overflow-hidden rounded-lg cursor-zoom-in group"
                    aria-label={`Ver imagem ${index + 1} em tamanho completo`}
                  >
                    {!loadedImages.has(index) && (
                      <Skeleton className="absolute inset-0 w-full h-full" />
                    )}
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      onLoad={() => handleImageLoad(index)}
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <ImageLightbox
        images={galleryImages}
        initialIndex={selectedImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
