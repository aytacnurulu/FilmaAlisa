"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { CategoryWithMovies } from "@/lib/types/category";

type Props = {
  categories: CategoryWithMovies[];
};

export default function MovieFilters({ categories }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentSearch = searchParams.get("search") ?? "";
  const currentCategory = searchParams.get("category") ?? "";
  const currentSort = searchParams.get("sort") ?? "";

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`?${params.toString()}`);
  }

  function handleSearch(value: string) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      updateParam("search", value);
    }, 300);
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 mb-8">
      <Input
        type="text"
        defaultValue={currentSearch}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search movies…"
        leftIcon={<FiSearch size={16} />}
      />

      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={currentCategory === "" ? "primary" : "ghost"}
          onClick={() => updateParam("category", "")}
          type="button"
        >
          All
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat.id}
            size="sm"
            variant={currentCategory === String(cat.id) ? "primary" : "ghost"}
            onClick={() => updateParam("category", String(cat.id))}
            type="button"
          >
            {cat.name}
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <label className="text-sm text-text-muted whitespace-nowrap">Sort by</label>
        <select
          value={currentSort}
          onChange={(e) => updateParam("sort", e.target.value)}
          className="bg-surface-2 border border-border rounded-md text-text text-sm h-9 px-3 focus-visible:outline-none focus-visible:border-accent transition-colors cursor-pointer"
        >
          <option value="">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="imdb">IMDB High→Low</option>
        </select>
      </div>
    </div>
  );
}
