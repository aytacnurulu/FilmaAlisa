"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { cn } from "@/shared/lib/cn";
import { cardHover } from "@/shared/motion";
import { Badge } from "./Badge";
import { Rating } from "./Rating";

type Movie = {
  id: number;
  title: string;
  cover_url: string;
  imdb: string;
  category?: { id: number; name: string };
};

type MovieCardProps = {
  movie: Movie;
  onClick?: () => void;
  className?: string;
  isFavorite?: boolean;
  onFavoriteToggle?: (id: number) => void;
};

function imdbToStars(imdb: string): number {
  const raw = parseFloat(imdb);
  if (isNaN(raw)) return 0;
  // Convert 0–10 IMDB scale to 0–5 stars (half-star precision)
  return Math.round((raw / 10) * 5 * 2) / 2;
}

export function MovieCard({
  movie,
  onClick,
  className,
  isFavorite,
  onFavoriteToggle,
}: MovieCardProps) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      {...(reduced ? {} : cardHover)}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => (e.key === "Enter" || e.key === " ") && onClick()
          : undefined
      }
      className={cn(
        "relative rounded-lg overflow-hidden",
        "shadow-card hover:shadow-pop transition-shadow",
        onClick ? "cursor-pointer" : "cursor-default",
        className
      )}
    >
      {/* poster — fills card, 2:3 aspect ratio */}
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        <img
          src={movie.cover_url}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        {/* bottom-to-top gradient overlay for readability */}
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-bg via-bg/60 to-transparent pointer-events-none" />
      </div>

      {/* favorite toggle — always visible, top-right corner */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onFavoriteToggle?.(movie.id);
        }}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        className={cn(
          "absolute top-2 right-2 z-10 p-1.5 rounded-full",
          "bg-bg/60 backdrop-blur-sm",
          "hover:scale-110 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        )}
      >
        {isFavorite ? (
          <FaHeart size={18} style={{ color: "var(--color-accent)" }} />
        ) : (
          <FiHeart size={18} style={{ color: "white" }} />
        )}
      </button>

      {/* info overlaid at the bottom of the card */}
      <div className="absolute inset-x-0 bottom-0 p-3 flex flex-col gap-1.5">
        {movie.category && <Badge>{movie.category.name}</Badge>}
        <Rating value={imdbToStars(movie.imdb)} readOnly />
        <h3 className="text-lg font-medium text-text line-clamp-2 leading-snug">
          {movie.title}
        </h3>
      </div>
    </motion.article>
  );
}
