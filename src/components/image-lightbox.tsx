"use client";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/counter.css";

interface ImageLightboxProps {
  images: Array<{ url: string; alt: string }>;
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageLightbox({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
}: ImageLightboxProps) {
  // Convert our image format to YARL's slide format
  const slides = images.map((image) => ({
    src: image.url,
    alt: image.alt,
  }));

  return (
    <Lightbox
      open={isOpen}
      close={onClose}
      slides={slides}
      index={initialIndex}
      plugins={[Zoom, Thumbnails, Counter]}
      zoom={{
        maxZoomPixelRatio: 3,
        scrollToZoom: true,
      }}
      thumbnails={{
        position: "bottom",
        width: 120,
        height: 80,
        border: 2,
        borderRadius: 4,
        padding: 4,
        gap: 16,
      }}
      counter={{
        container: { style: { top: "unset", bottom: 0 } },
      }}
      styles={{
        container: { backgroundColor: "rgba(0, 0, 0, 0.95)" },
      }}
      carousel={{ finite: true }}
      animation={{ fade: 300 }}
      controller={{ closeOnBackdropClick: true }}
    />
  );
}
