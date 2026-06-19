import Link from "next/link";
import type { Movie } from "@/lib/types/movies";
import { MovieCard } from "@/shared/components/ui/MovieCard";
import { FiChevronRight } from "react-icons/fi";

interface Props {
  movies: Movie[];
}

export default function SimilarMovies({ movies }: Props) {
  if (movies.length === 0) return null;

  return (
    <section className="px-6 md:px-12 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-1.5 mb-6">
          <h2
            className="text-xl font-display font-semibold"
            style={{ color: "var(--color-text)" }}
          >
            Similar Movies
          </h2>
          <FiChevronRight
            size={18}
            style={{ color: "var(--color-text-muted)" }}
          />
        </div>

        <div
          className="flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {movies.map((movie) => (
            <Link
              key={movie.id}
              href={`/movies/${movie.id}`}
              className="flex-shrink-0 w-40 block"
            >
              <MovieCard movie={movie} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
