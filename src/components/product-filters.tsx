"use client";

import { useCallback, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * Filter sidebar for products with category and price range controls.
 * Updates URL params on apply, preserving existing search query.
 */

const categories = [
  { id: "AGRICOLA", label: "Agricola" },
  { id: "ARTESANATO", label: "Artesanato" },
  { id: "PROCESSADO", label: "Processado" },
];

const priceRanges = [
  { id: "under-50", label: "Até R$ 50" },
  { id: "50-100", label: "R$ 50 - R$ 100" },
  { id: "100-200", label: "R$ 100 - R$ 200" },
  { id: "over-200", label: "Acima de R$ 200" },
];

export function ProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams();
    const search = searchParams.get("search");
    if (search) {
      params.set("search", search);
    }
    selectedCategories.forEach((c) => params.append("categories", c));
    selectedPriceRanges.forEach((p) => params.append("price", p));
    router.push(pathname + "?" + params.toString());
  }, [searchParams, selectedCategories, selectedPriceRanges, pathname, router]);

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
    const params = new URLSearchParams();
    const search = searchParams.get("search");
    if (search) {
      params.set("search", search);
    }
    router.push(pathname + "?" + params.toString());
  };

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const togglePriceRange = (id: string) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const hasFilters = selectedCategories.length > 0 || selectedPriceRanges.length > 0;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Filtros</h3>
        <Separator className="mb-4" />
      </div>

      <Accordion
        type="multiple"
        defaultValue={["regions", "categories", "price"]}
      >
        <AccordionItem value="categories">
          <AccordionTrigger>Categoria</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => toggleCategory(category.id)}
                  />
                  <Label
                    htmlFor={`category-${category.id}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {category.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Preço</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {priceRanges.map((range) => (
                <div key={range.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`price-${range.id}`}
                    checked={selectedPriceRanges.includes(range.id)}
                    onCheckedChange={() => togglePriceRange(range.id)}
                  />
                  <Label
                    htmlFor={`price-${range.id}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {range.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex flex-col gap-2 pt-4">
        <Button onClick={applyFilters}>
          Filtrar
        </Button>
        {hasFilters && (
          <Button variant="outline" onClick={clearFilters}>
            Limpar filtros
          </Button>
        )}
      </div>
    </div>
  );
}
