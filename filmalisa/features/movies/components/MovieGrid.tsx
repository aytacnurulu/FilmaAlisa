"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { MovieCard } from "@/shared/components/ui/MovieCard";
import { Movie } from "@/lib/types/movies";

type Props = {
  movies: Movie[];
};

export default function MovieGrid({ movies }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const search = searchParams.get("search") ?? "";
  const categoryParam = searchParams.get("category") ?? "";
  const sort = searchParams.get("sort") ?? "";

  let filtered = movies;

  if (search) {
    const lower = search.toLowerCase();
    filtered = filtered.filter(
      (m) =>
        m.title.toLowerCase().includes(lower) ||
        m.overview.toLowerCase().includes(lower),
    );
  }

  if (categoryParam) {
    const catId = Number(categoryParam);
    filtered = filtered.filter((m) => m.category?.id === catId);
  }

  if (sort === "oldest") {
    filtered = [...filtered].sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    );
  } else if (sort === "imdb") {
    filtered = [...filtered].sort(
      (a, b) => parseFloat(b.imdb) - parseFloat(a.imdb),
    );
  } else {
    filtered = [...filtered].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <p className="text-text-muted text-lg">No movies found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {filtered.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={() => router.push(`/movies/${movie.id}`)}
        />
      ))}
    </div>
  );
}
