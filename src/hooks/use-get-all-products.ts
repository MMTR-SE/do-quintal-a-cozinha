/**
 * Fetches products with React Query caching.
 * 5 minute stale time reduces database load (products change less frequently than recipes).
 */

import { getAllProducts } from "@/app/actions/get-all-products"
import type { Category } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"

interface Options {
  search?: string
  categories?: Category[]
  price?: string[]
}

export const useGetAllProducts = (options?: Options) => {
  return useQuery({
    queryKey: ["products", options],
    queryFn: () => getAllProducts(options),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}
