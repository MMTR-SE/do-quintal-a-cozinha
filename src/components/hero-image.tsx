"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageLightbox } from "@/components/image-lightbox";

const HERO_IMAGE = {
  url: "/home-image.webp",
  alt: "Foto de mulheres do MMTR-SE com faixas e bandeiras pelos 30 anos e a Marcha Mundial",
};

export function HeroImage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setLightboxOpen(true)}
        className="h-150 w-full relative flex-shrink-0 cursor-zoom-in"
        aria-label="Ver imagem em tamanho completo"
      >
        <Image
          src={HERO_IMAGE.url}
          alt={HERO_IMAGE.alt}
          fill
          priority
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
        />
      </button>

      <ImageLightbox
        images={[HERO_IMAGE]}
        initialIndex={0}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
