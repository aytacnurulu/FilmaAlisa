"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/ui/Button";
import { Badge } from "@/shared/components/ui/Badge";
import { Rating } from "@/shared/components/ui/Rating";
import { dur, easeOut } from "@/shared/motion";
import { Movie } from "@/lib/types/movies";

type Props = {
  movies: Movie[];
};

function imdbToStars(imdb: string): number {
  const raw = parseFloat(imdb);
  if (isNaN(raw)) return 0;
  return Math.round((raw / 2) * 2) / 2;
}

export default function HeroSlider({ movies }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduced = useReducedMotion();
  const router = useRouter();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % movies.length);
    }, 5000);
  }, [movies.length]);

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startInterval]);

  const go = useCallback(
    (dir: 1 | -1) => {
      setActiveIndex((i) => (i + dir + movies.length) % movies.length);
      startInterval();
    },
    [movies.length, startInterval],
  );

  const movie = movies[activeIndex];

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "70vh", minHeight: 480 }}
    >
      {/* Background image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${movie.id}`}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? {} : { opacity: 0 }}
          transition={{ duration: dur.slow, ease: easeOut }}
          className="absolute inset-0"
        >
          <Image
            src={movie.cover_url}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/70 via-transparent to-transparent pointer-events-none" />

      {/* Content — bottom left */}
      <AnimatePresence mode="wait">
        <motion.div
          key={movie.id}
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? {} : { opacity: 0, y: -12 }}
          transition={{ duration: dur.base, ease: easeOut }}
          className="absolute bottom-0 left-0 px-8 pb-12 max-w-lg flex flex-col gap-3"
        >
          {movie.category && <Badge>{movie.category.name}</Badge>}
          <Rating value={imdbToStars(movie.imdb)} readOnly />
          <h1 className="text-3xl font-display text-text font-semibold leading-tight">
            {movie.title}
          </h1>
          <p className="text-sm text-text-muted line-clamp-2">{movie.overview}</p>
          <div className="mt-2">
            <Button
              size="md"
              variant="primary"
              onClick={() => router.push(`/movies/${movie.id}`)}
            >
              Watch now
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Arrow buttons — right side */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
        <button
          onClick={() => go(-1)}
          aria-label="Previous slide"
          className="p-2 rounded-full bg-surface-2/70 border border-border text-text hover:bg-surface-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <FiChevronLeft size={24} />
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Next slide"
          className="p-2 rounded-full bg-surface-2/70 border border-border text-text hover:bg-surface-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <FiChevronRight size={24} />
        </button>
      </div>

      {/* Dot indicators — bottom center */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {movies.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setActiveIndex(i);
              startInterval();
            }}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              i === activeIndex ? "bg-accent" : "bg-surface-3"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
