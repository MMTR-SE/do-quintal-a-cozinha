"use client";

import { ProductDetail } from "@/components/product-detail";
import { useGetProductBySlug } from "@/hooks/use-get-product-by-slug";
import { use } from "react";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Product detail page with image gallery, producer info, and WhatsApp contact.
 */
export default function Page({ params }: Props) {
  const { slug } = use(params);
  const { data, isLoading } = useGetProductBySlug({ slug });

  return <ProductDetail product={data} isLoading={isLoading} />;
}
