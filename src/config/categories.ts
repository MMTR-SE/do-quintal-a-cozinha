import type { Category } from "@prisma/client";
import { CATEGORY } from "@/lib/enums";

export interface CategoryOption {
  value: Category;
  label: string;
}

export const PRODUCT_CATEGORIES: CategoryOption[] = [
  { value: CATEGORY.AGRICOLA, label: "Agrícola" },
  { value: CATEGORY.ARTESANATO, label: "Artesanato" },
  { value: CATEGORY.PROCESSADO, label: "Processado" },
];
