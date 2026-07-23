import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

interface GridCardProps {
  href: string;
  imageUrl: string;
  imageAlt: string;
  imageHeight?: "fixed" | "square" | "portrait";
  children: ReactNode;
}

/**
 * Reusable base card component for grid layouts with consistent hover effects.
 *
 * Provides:
 * - Card container with shadow/translate/border hover effects
 * - Image section with zoom on hover
 * - Link wrapper for navigation
 * - Consistent 300ms transitions
 *
 * Used by RecipeCard and ProductCard components.
 *
 * @param href - Link destination (e.g., "/nossas-receitas/123")
 * @param imageUrl - Image source URL
 * @param imageAlt - Image alt text for accessibility
 * @param imageHeight - Image height style: "fixed" (h-48), "square" (aspect-square), or "portrait" (aspect-[3/4])
 * @param children - Card content (metadata, description, etc.)
 */
export function GridCard({
  href,
  imageUrl,
  imageAlt,
  imageHeight = "fixed",
  children,
}: GridCardProps) {
  return (
    <Link href={href}>
      <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border hover:border-primary/30 overflow-hidden h-full">
        <div
          className={`relative overflow-hidden ${
            imageHeight === "fixed"
              ? "h-48"
              : imageHeight === "square"
              ? "aspect-square"
              : "aspect-[3/4]"
          }`}
        >
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
        </div>

        <CardContent className="p-4 flex-1 flex flex-col">
          {children}
        </CardContent>
      </Card>
    </Link>
  );
}
