import { RecipeDifficulty } from "@prisma/client"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { intervalToDuration } from "date-fns";

/**
 * Merges conditional Tailwind classes with conflict resolution.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converts RecipeDifficulty enum to Portuguese display text.
 */
export function formatRecipeDifficulty(difficulty: RecipeDifficulty) {
  if (difficulty === RecipeDifficulty.EASY)
    return "Fácil";
  else if (difficulty === RecipeDifficulty.INTERMEDIARY)
    return "Intermediário";
  else
    return "Difícil";
}

/**
 * Formats minutes to "2h 30min" format.
 */
export function formatMinutes(mins: number) {
  const duration = intervalToDuration({ start: 0, end: mins * 60 * 1000 });
  const { hours = 0, minutes = 0 } = duration;

  if (hours === 0) return `${minutes}min`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}min`;
}

/**
 * Formats price to Brazilian Real currency format.
 * Returns "Consulte a produtora" if null (supports gradual price adoption).
 */
export function formatPrice(price: number | null): string {
  if (price === null || price === undefined) {
    return "Consulte a produtora";
  }

  const numericPrice = typeof price === "number" ? price : Number(price);

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numericPrice);
}

