import { getProductBySlug } from "@/app/actions/get-product-by-slug"
import { useQuery } from "@tanstack/react-query"

interface Options {
  slug: string
}

export const useGetProductBySlug = (options: Options) => {
  return useQuery({
    queryKey: ["products", "slug", options.slug],
    queryFn: () => getProductBySlug(options),
  })
}
