"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { MovieCard } from "@/shared/components/ui/MovieCard";
import { useFavorites, useToggleFavorite } from "@/lib/api/favorite";
import { CategoryWithMovies } from "@/lib/types/category";

type Props = {
  category: CategoryWithMovies;
};

export default function CategoryRow({ category }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const toggle = useToggleFavorite();
  const { data: favorites } = useFavorites();
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const router = useRouter();

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 0);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    updateArrows();
  }, [updateArrows]);

  const scroll = useCallback((dir: 1 | -1) => {
    scrollRef.current?.scrollBy({ left: dir * 400, behavior: "smooth" });
  }, []);

  return (
    <section className="flex flex-col gap-3">
      {/* Section header */}
      <div className="flex items-center justify-between px-8">
        <h2 className="text-xl font-display text-text">{category.name}</h2>
        <Link
          href={`/categories/${category.id}`}
          className="text-sm text-text-muted hover:text-text transition-colors"
        >
          See all →
        </Link>
      </div>

      {/* Scrollable row */}
      <div className="relative group">
        {!atStart && (
          <button
            onClick={() => scroll(-1)}
            aria-label="Scroll left"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-surface-2/80 border border-border text-text hover:bg-surface-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <FiChevronLeft size={20} />
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={updateArrows}
          className="flex gap-3 overflow-x-auto px-8 pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          {category.movies.map((movie) => (
            <div key={movie.id} className="flex-shrink-0 w-40">
              <MovieCard
                movie={movie}
                isFavorite={favorites?.some((f) => f.id === movie.id) ?? false}
                onClick={() => router.push(`/movies/${movie.id}`)}
                onFavoriteToggle={(id) => toggle.mutate(id)}
              />
            </div>
          ))}
        </div>

        {!atEnd && (
          <button
            onClick={() => scroll(1)}
            aria-label="Scroll right"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-surface-2/80 border border-border text-text hover:bg-surface-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <FiChevronRight size={20} />
          </button>
        )}
      </div>
    </section>
  );
}
