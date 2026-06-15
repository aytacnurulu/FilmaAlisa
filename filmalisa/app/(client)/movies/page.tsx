"use client";

import Image from "next/image";
import { useMovies } from "@/lib/api/movies";

export default function MoviesPage() {
  const { data, isLoading, error } = useMovies();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error occurred</p>;

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
