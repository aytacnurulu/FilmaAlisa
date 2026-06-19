import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { proxyToFilmalisa } from "@/lib/api/proxy";
import type { Movie } from "@/lib/types/movies";
import type { Comment } from "@/lib/types/comment";
import CommentSection from "@/features/movieDetail/components/CommentSection";
import SimilarMovies from "@/features/movieDetail/components/SimilarMovies";
import MetaItem from "@/features/movieDetail/components/MetaItem";
import { FaStar } from "react-icons/fa";
import { FiClock, FiCalendar, FiFilm } from "react-icons/fi";

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [movieRes, commentsRes, allMoviesRes] = await Promise.all([
    proxyToFilmalisa(`/movies/${id}`, "GET"),
    proxyToFilmalisa(`/movies/${id}/comments`, "GET"),
    proxyToFilmalisa("/movies", "GET"),
  ]);

  if (!movieRes.ok) {
    notFound();
  }

  const movieData = await movieRes.json();
  const commentsData = await commentsRes.json();
  const allMoviesData = await allMoviesRes.json();

  const movie: Movie = movieData.data;
  const comments: Comment[] = commentsData.data ?? [];
  const allMovies: Movie[] = allMoviesData.data ?? [];

  const similarMovies = allMovies
    .filter((m) => m.category?.id === movie.category?.id && m.id !== movie.id)
    .slice(0, 6);

  return (
    <main className="min-h-screen" style={{ backgroundColor: "var(--color-bg)" }}>
      {/* ── Hero Backdrop ── */}
      <div className="relative h-[65vh] min-h-[400px] overflow-hidden">
        <Image
          src={movie.cover_url}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover scale-110 blur-sm brightness-50"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, var(--color-bg) 0%, rgba(11,11,13,0.75) 45%, rgba(11,11,13,0.2) 100%)",
          }}
        />
        <div className="absolute bottom-8 left-6 md:left-12">
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            Movies
            <span className="mx-2" style={{ color: "var(--color-accent)" }}>
              /
            </span>
            <span style={{ color: "var(--color-text)" }}>{movie.title}</span>
          </p>
        </div>
      </div>

      {/* ── Main Detail ── */}
      <section className="px-6 md:px-12 -mt-44 relative z-10 pb-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 lg:gap-14">
          {/* Poster */}
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <Image
              src={movie.cover_url}
              alt={movie.title}
              width={256}
              height={384}
              className="w-52 md:w-64 rounded-2xl object-cover aspect-[2/3]"
              style={{ boxShadow: "var(--shadow-pop)" }}
            />
          </div>

          {/* Info */}
          <div className="flex-1 pt-0 md:pt-24">
            <h1
              className="text-2xl md:text-4xl font-display font-bold mb-3 leading-tight"
              style={{ color: "var(--color-text)" }}
            >
              {movie.title}
            </h1>

            <p
              className="text-sm leading-relaxed mb-5 line-clamp-3"
              style={{ color: "var(--color-text-muted)" }}
            >
              {movie.overview}
            </p>

            {/* IMDb badge */}
            <div className="flex items-center gap-2 mb-6">
              <FaStar size={15} style={{ color: "var(--color-star)" }} />
              <span className="font-bold" style={{ color: "var(--color-star)" }}>
                {movie.imdb}
              </span>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-semibold"
                style={{
                  background: "rgba(245,197,66,0.12)",
                  color: "var(--color-star)",
                }}
              >
                IMDb
              </span>
            </div>

            {/* Metadata grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <MetaItem
                icon={<FiFilm size={13} />}
                label="Genre"
                value={movie.category?.name ?? "—"}
              />
              <MetaItem
                icon={<FiClock size={13} />}
                label="Runtime"
                value={`${movie.run_time_min} min`}
              />
              <MetaItem
                icon={<FiCalendar size={13} />}
                label="Released"
                value={movie.created_at.slice(0, 10)}
              />
              <MetaItem label="Type" value="Movie" />
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              {movie.watch_url && (
                <Link
                  href={movie.watch_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
                  style={{
                    backgroundColor: "var(--color-accent)",
                    color: "var(--color-text-on-accent)",
                  }}
                >
                  Watch Now
                </Link>
              )}
              {movie.fragman && (
                <Link
                  href={movie.fragman}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full text-sm font-semibold transition-colors hover:bg-surface"
                  style={{
                    border: "1.5px solid var(--color-border-strong)",
                    color: "var(--color-text)",
                  }}
                >
                  Trailer
                </Link>
              )}
            </div>

            {/* Top Cast */}
            {movie.actors?.length > 0 && (
              <div>
                <h2
                  className="text-xs uppercase tracking-widest mb-4 font-semibold"
                  style={{ color: "var(--color-text-faint)" }}
                >
                  Top Cast
                </h2>
                <div className="flex gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {movie.actors.map((actor) => (
                    <div
                      key={actor.id}
                      className="flex-shrink-0 text-center w-20"
                    >
                      {actor.img_url ? (
                        <Image
                          src={actor.img_url}
                          alt={`${actor.name} ${actor.surname}`}
                          width={56}
                          height={56}
                          className="w-14 h-14 rounded-full object-cover mx-auto mb-2"
                          style={{ border: "2px solid var(--color-border-strong)" }}
                        />
                      ) : (
                        <div
                          className="w-14 h-14 rounded-full mx-auto mb-2 flex items-center justify-center font-bold text-lg"
                          style={{
                            backgroundColor: "var(--color-surface-2)",
                            color: "var(--color-text-muted)",
                          }}
                        >
                          {actor.name[0]}
                        </div>
                      )}
                      <p
                        className="text-xs font-medium leading-tight"
                        style={{ color: "var(--color-text)" }}
                      >
                        {actor.name} {actor.surname}
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "var(--color-text-faint)" }}
                      >
                        Actor
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div
        className="max-w-6xl mx-auto px-6 md:px-12"
        style={{ borderTop: "1px solid var(--color-border)" }}
      />

      <CommentSection movieId={id} initialComments={comments} />

      <SimilarMovies movies={similarMovies} />
    </main>
  );
}
