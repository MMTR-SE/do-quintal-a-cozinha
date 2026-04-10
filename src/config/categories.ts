import { Category } from "@prisma/client";

export interface CategoryOption {
  value: Category;
  label: string;
}

export const PRODUCT_CATEGORIES: CategoryOption[] = [
  { value: Category.AGRICOLA, label: "Agrícola" },
  { value: Category.ARTESANATO, label: "Artesanato" },
  { value: Category.PROCESSADO, label: "Processado" },
];
