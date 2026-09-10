import { Category, MediaType } from "@prisma/client";

/**
 * Profile information for a product producer
 */
export interface Profile {
  name: string;
  social_name: string | null;
  instagram: string | null;
  phone_number?: string | null;
}

/**
 * Media attached to a product with relationship metadata
 */
export type ProductMedia = {
  media: {
    url: string;
    media_type: MediaType;
  };
} & {
  mediaId: string;
  productId: string;
};

/**
 * Basic product information for display in grids and lists
 */
export interface Product {
  id: string;
  /** Slug publico da URL: nome da produtora + nome do produto. */
  slug: string;
  product_name: string;
  description: string | null;
  price: number | null;
  category: Category;
  profile: Profile;
  media: ProductMedia[];
}

/**
 * Detailed product information for individual product pages
 */
export interface ProductWithDetail extends Product {
  profile_id?: string;
}
