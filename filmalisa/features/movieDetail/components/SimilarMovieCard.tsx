"use client";

import { useFavorites, useToggleFavorite } from "@/lib/api/favorite";
import { MovieCard } from "@/shared/components/ui/MovieCard";
import type { Movie } from "@/lib/types/movies";

export function SimilarMovieCard({ movie }: { movie: Movie }) {
  const toggle = useToggleFavorite();
  const { data: favorites } = useFavorites();
  return (
    <MovieCard
      movie={movie}
      isFavorite={favorites?.some((f) => f.id === movie.id) ?? false}
      onFavoriteToggle={(id) => toggle.mutate(id)}
    />
  );
}
