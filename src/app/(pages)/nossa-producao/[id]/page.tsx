"use client";

import { ProductDetail } from "@/components/product-detail";
import { useGetProductById } from "@/hooks/use-get-product-by-id";
import { use } from "react";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function Page({ params }: Props) {
  const { id } = use(params);
  const { data, isLoading } = useGetProductById({ id });

  return <ProductDetail product={data} isLoading={isLoading} />;
}
