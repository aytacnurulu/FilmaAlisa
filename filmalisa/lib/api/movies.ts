import { useQuery } from "@tanstack/react-query";

export type Category = {
  id: number;
  name: string;
};

export type Movie = {
  id: number;
  title: string;
  cover_url: string;
  fragman: string;
  watch_url: string;
  adult: boolean;
  run_time_min: number;
  imdb: string;
  overview: string;
  created_at: string;
  category: Category;
};

export async function getMovies(): Promise<Movie[]> {
  const res = await fetch("/api/movies");
  if (!res.ok) throw new Error("Failed to fetch movies");
  const body = await res.json();
  return body.data;
}

export function useMovies() {
  return useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });
}
