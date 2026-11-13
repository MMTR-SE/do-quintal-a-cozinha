"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, FormEvent } from "react";

interface SearchBarProps {
  value: string;
  onSubmit: (query: string) => void;
  placeholder?: string;
}

/**
 * Reusable search bar with icon and submit button.
 */
export function SearchBar({
  value,
  onSubmit,
  placeholder = "Buscar...",
}: SearchBarProps) {
  const [inputValue, setInputValue] = useState(value);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(inputValue);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-12" role="search">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" aria-hidden="true" />
        <Input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="pl-12 pr-24 py-6 text-lg rounded-full border-2 border-border focus:border-primary transition-colors"
          aria-label={placeholder}
        />
        <Button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full px-6"
          size="sm"
        >
          Buscar
        </Button>
      </div>
    </form>
  );
}
