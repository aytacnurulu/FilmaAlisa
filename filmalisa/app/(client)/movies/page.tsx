import { Suspense } from "react";
import { proxyToFilmalisa } from "@/lib/api/proxy";
import { Movie } from "@/lib/types/movies";
import { CategoryWithMovies } from "@/lib/types/category";
import MovieGrid from "@/features/movies/components/MovieGrid";
import MovieFilters from "@/features/movies/components/MovieFilters";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string; sort?: string }>;
}) {
  const params = await searchParams;

  const [moviesRes, catsRes] = await Promise.all([
    proxyToFilmalisa("/movies", "GET"),
    proxyToFilmalisa("/categories", "GET"),
  ]);

  const moviesData = await moviesRes.json();
  const catsData = await catsRes.json();

  const movies: Movie[] = moviesData.data;
  const categories: CategoryWithMovies[] = catsData.data;

  let filtered = [...movies];

  if (params.search) {
    const q = params.search.toLowerCase();
    filtered = filtered.filter((m) => m.title.toLowerCase().includes(q));
  }

  if (params.category) {
    const ids = params.category.split(",");
    filtered = filtered.filter((m) => ids.includes(String(m.category?.id)));
  }

  if (params.sort === "oldest") {
    filtered.sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    );
  } else if (params.sort === "imdb") {
    filtered.sort((a, b) => parseFloat(b.imdb) - parseFloat(a.imdb));
  } else {
    filtered.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  }

  return (
    <main className="px-6 py-8">
      <Suspense>
        <MovieFilters categories={categories} />
      </Suspense>
      <Suspense>
        <MovieGrid movies={filtered} />
      </Suspense>
    </main>
  );
}
