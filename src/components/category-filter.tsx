"use client";

import { Button } from "@/components/ui/button";
import type { CategoryOption } from "@/config/categories";

interface CategoryFilterProps {
  options: CategoryOption[];
  value: string[];
  onChange: (value: string[]) => void;
}

export function CategoryFilter({ options, value, onChange }: CategoryFilterProps) {
  const toggle = (optionValue: string) => {
    onChange(
      value.includes(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue]
    );
  };

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {options.map((option) => (
        <Button
          key={option.value}
          variant={value.includes(option.value) ? "default" : "outline"}
          className="rounded-full"
          onClick={() => toggle(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
