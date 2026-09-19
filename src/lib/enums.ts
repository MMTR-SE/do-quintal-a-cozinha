import type { Category, MediaType, RecipeDifficulty } from "@prisma/client";

/**
 * Valores dos enums do Prisma como constantes seguras para o cliente.
 *
 * O runtime do `@prisma/client` não existe no navegador (o enum vira
 * `undefined`). Estes módulos são importados por componentes client (ex.:
 * `lib/utils.ts`, `config/categories.ts`), então os valores ficam declarados
 * aqui como strings — os tipos continuam vindo do Prisma (import type, que é
 * apagado na compilação).
 */

export const CATEGORY = {
  AGRICOLA: "AGRICOLA",
  ARTESANATO: "ARTESANATO",
  PROCESSADO: "PROCESSADO",
} as const satisfies Record<string, Category>;

export const MEDIA_TYPE = {
  AUDIO: "AUDIO",
  IMAGE: "IMAGE",
  VIDEO: "VIDEO",
} as const satisfies Record<string, MediaType>;

export const RECIPE_DIFFICULTY = {
  EASY: "EASY",
  INTERMEDIARY: "INTERMEDIARY",
  HARD: "HARD",
} as const satisfies Record<string, RecipeDifficulty>;
