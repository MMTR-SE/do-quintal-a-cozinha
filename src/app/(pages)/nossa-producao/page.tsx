"use client";

import { useState } from "react";
import type { IFuseOptions } from "fuse.js";

import { useGetAllProducts } from "@/hooks/use-get-all-products";
import { useFuzzySearch } from "@/hooks/use-fuzzy-search";
import { ProductGrid } from "@/components/product-grid";
import { PageHeader } from "@/components/page-header";
import { SearchBar } from "@/components/search-bar";
import { CategoryFilter } from "@/components/category-filter";
import { PRODUCT_CATEGORIES } from "@/config/categories";
import type { Category } from "@prisma/client";
import type { Product } from "@/types/product";

const PRODUCT_FUSE_OPTIONS: IFuseOptions<Product> = {
  keys: [
    { name: "product_name", weight: 2 },
    "description",
    "profile.name",
    "profile.social_name",
  ],
};

export default function Page() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const { data, isLoading } = useGetAllProducts({
    categories: selectedCategories.length > 0 ? selectedCategories : undefined,
  });

  const filtered = useFuzzySearch(data, search, PRODUCT_FUSE_OPTIONS);

  return (
    <>
      <PageHeader
        title="Nossa Produção"
        subtitle="Conheça os produtos cultivados com amor e tradição"
      />
      <div className="container-wrapper">
        <div className="container flex flex-col gap-6 my-6">
          <SearchBar
            value={search}
            onSubmit={setSearch}
            placeholder="Buscar produtos..."
          />
          <CategoryFilter
            options={PRODUCT_CATEGORIES}
            value={selectedCategories}
            onChange={setSelectedCategories}
          />
          <ProductGrid products={filtered} isLoading={isLoading} />
        </div>
      </div>
    </>
  );
}
