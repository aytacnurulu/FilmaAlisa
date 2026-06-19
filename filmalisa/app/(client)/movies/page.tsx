"use client";

import Image from "next/image";
import { useMovies } from "@/lib/api/movies";
import { LoadingSpinner } from "@/shared/components/ui/LoadingSpinner";
import { ErrorMessage } from "@/shared/components/ui/ErrorMessage";

export default function MoviesPage() {
  const { data, isLoading, error } = useMovies();

  if (isLoading) return <LoadingSpinner size="lg" label="Loading movies…" className="min-h-[60vh]" />;
  if (error) return <ErrorMessage className="min-h-[60vh]" />;

  return (
    <div>
      {data?.map((movie) => (
        <div key={movie.id}>
          <Image
            src={movie.cover_url}
            alt={movie.title}
            width={300}
            height={450}
          />
          <h3>{movie.title}</h3>
          <p>IMDB: {movie.imdb}</p>
          <p>{movie.category.name}</p>
        </div>
      ))}
    </div>
  );
}
