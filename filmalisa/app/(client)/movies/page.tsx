import { Suspense } from "react";
import { proxyToFilmalisa } from "@/lib/api/proxy";
import { Movie } from "@/lib/types/movies";
import { CategoryWithMovies } from "@/lib/types/category";
import MovieGrid from "@/features/movies/components/MovieGrid";
import MovieFilters from "@/features/movies/components/MovieFilters";

export default async function MoviesPage() {
  const [moviesRes, catsRes] = await Promise.all([
    proxyToFilmalisa("/movies", "GET"),
    proxyToFilmalisa("/categories", "GET"),
  ]);

  const moviesData = await moviesRes.json();
  const catsData = await catsRes.json();

  const movies: Movie[] = moviesData.data;
  const categories: CategoryWithMovies[] = catsData.data;

  return (
    <main className="px-6 py-8">
      <Suspense>
        <MovieFilters categories={categories} />
      </Suspense>
      <Suspense>
        <MovieGrid movies={movies} />
      </Suspense>
    </main>
  );
}
