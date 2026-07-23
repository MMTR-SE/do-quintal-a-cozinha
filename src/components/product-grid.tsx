"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";
import { Product } from "@/types/product";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCard } from "@/components/product-card";

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
}

/**
 * Displays products in a responsive grid with loading and empty states.
 */
export function ProductGrid({ products, isLoading }: ProductGridProps) {
  return (
    <section>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="overflow-hidden h-full">
              <div className="relative aspect-square">
                <Skeleton className="w-full h-full" />
              </div>

              <CardContent className="p-4 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
                <Skeleton className="h-4 w-1/2" />

                <div className="flex items-center justify-between pt-2">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-9 w-28 rounded-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Nenhum produto disponível
          </h3>
          <p className="text-muted-foreground">
            Não há produtos para mostrar no momento.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
