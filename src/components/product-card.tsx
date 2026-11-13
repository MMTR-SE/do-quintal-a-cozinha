"use client";

import { GridCard } from "@/components/grid-card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";
import { useMobile } from "@/hooks/use-mobile";

interface ProductCardProps {
  product: Product;
}

/**
 * Product card component for displaying product information in grid layouts.
 *
 * Uses GridCard base component and adds product-specific metadata:
 * - Product name with hover color change
 * - Description (line-clamped to 2 lines)
 * - Producer name (artisan)
 * - Price
 * - WhatsApp CTA button (responsive sizing)
 *
 * Links to individual product detail page at /nossa-producao/[slug]
 * (slug = nome da produtora + nome do produto).
 * WhatsApp button opens direct contact with producer in new tab.
 *
 * @param product - Product object with all product data
 */
export function ProductCard({ product }: ProductCardProps) {
  const isMobile = useMobile();

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(`/api/whatsapp?product=${product.id}`, "_blank");
  };

  return (
    <GridCard
      href={`/nossa-producao/${product.slug}`}
      imageUrl={product.media.at(0)?.media.url || "/icone-produtos.webp"}
      imageAlt={product.product_name}
      imageHeight="square"
    >
      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
        {product.product_name}
      </h3>
      <p className="text-muted-foreground text-sm mb-2 leading-relaxed line-clamp-2 flex-1">
        {product.description}
      </p>
      <div className="text-sm text-muted-foreground mb-4">
        Artesã: {product.profile.name}
      </div>

      <div className="flex justify-between items-center pt-2 border-t">
        <div className="font-semibold text-foreground">
          {formatPrice(product.price)}
        </div>
        <Button
          size={isMobile ? "sm" : "default"}
          className="rounded-full bg-green-600 hover:bg-green-700"
          onClick={handleWhatsAppClick}
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          {isMobile ? "" : "WhatsApp"}
        </Button>
      </div>
    </GridCard>
  );
}
