"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import { Input } from "@/shared/components/ui/Input";
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

  const selectedIds = currentCategory ? currentCategory.split(",") : [];

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

  // Union (OR) logic: selecting multiple categories shows movies that belong
  // to ANY of the selected categories, not all of them simultaneously.
  // The page component must filter with .some(), not .every().
  function handleCategoryChange(id: string, checked: boolean) {
    const next = checked
      ? [...selectedIds, id]
      : selectedIds.filter((s) => s !== id);
    updateParam("category", next.join(","));
  }

  const summaryLabel =
    selectedIds.length === 0
      ? "All"
      : `${selectedIds.length} selected`;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="flex items-center gap-3 mb-8">
      <details className="relative w-52">
          <summary className="bg-surface-2 border border-border rounded-md text-text text-sm h-9 px-3 flex items-center justify-between cursor-pointer list-none">
            <span>{summaryLabel}</span>
            <FiChevronDown size={14} className="text-text-muted" />
          </summary>
          <div className="absolute top-10 left-0 z-20 w-full bg-surface-2 border border-border rounded-md py-1 max-h-60 overflow-y-auto">
            {categories.map((cat) => {
              const id = String(cat.id);
              const checked = selectedIds.includes(id);
              return (
                <label
                  key={cat.id}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-text hover:bg-surface-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => handleCategoryChange(id, e.target.checked)}
                    className="accent-accent"
                  />
                  {cat.name}
                </label>
              );
            })}
          </div>
        </details>

      <select
        value={currentSort}
        onChange={(e) => updateParam("sort", e.target.value)}
        className="bg-surface-2 border border-border rounded-md text-text text-sm h-9 px-3 focus-visible:outline-none focus-visible:border-accent transition-colors cursor-pointer"
      >
        <option value="">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="imdb">IMDB High→Low</option>
      </select>

      <div className="ml-auto">
        <Input
          type="text"
          defaultValue={currentSearch}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search movies…"
          leftIcon={<FiSearch size={16} />}
          className="w-52"
        />
      </div>
    </div>
  );
}
