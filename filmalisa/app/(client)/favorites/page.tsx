"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useFavorites, useAddFavorite } from "@/lib/api/favorite";

import { MovieCard } from "@/shared/components/ui/MovieCard";
import { LoadingSpinner } from "@/shared/components/ui/LoadingSpinner";
import { revealUp } from "@/shared/motion";
import { Movie } from "@/lib/types/movies";

function FavoriteMovieCard({ movie }: { movie: Movie }) {
  const router = useRouter();
  const toggle = useAddFavorite(String(movie.id));
  const { data: favorites } = useFavorites();

  return (
    <MovieCard
      movie={movie}
      isFavorite={favorites?.some((f) => f.id === movie.id) ?? false}
      onFavoriteToggle={() => toggle.mutate()}
      onClick={() => router.push(`/movies/${movie.id}`)}
    />
  );
}

export default function FavoritesPage() {
  const { data: movies, isLoading, isError } = useFavorites();

  return (
    <div className="px-4 md:px-8 py-8 min-h-screen">
      <h1 className="text-2xl font-display font-semibold text-text mb-6">
        My Favorites
      </h1>

      {isLoading && (
        <div className="flex items-center justify-center py-24">
          <LoadingSpinner size="lg" label="Loading favorites…" />
        </div>
      )}

      {isError && !isLoading && (
        <div className="flex flex-col items-center justify-center py-24 gap-2">
          <p className="text-text-muted text-base">Something went wrong.</p>
          <p className="text-muted text-sm">Please try refreshing the page.</p>
        </div>
      )}

      {!isLoading && !isError && movies?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-2">
          <p className="text-text-muted text-base">No favorites yet.</p>
          <p className="text-muted text-sm">
            Browse movies and add some to your list.
          </p>
        </div>
      )}

      {!isLoading && !isError && movies && movies.length > 0 && (
        <motion.div
          variants={revealUp}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        >
          {movies.map((movie) => (
            <FavoriteMovieCard key={movie.id} movie={movie} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
