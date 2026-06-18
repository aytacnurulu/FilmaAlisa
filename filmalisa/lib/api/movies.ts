// lib/api/movies.ts
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "./client";
import { Movie } from "../types/movies";

export const getMovies = () => apiFetch<Movie[]>("/api/movies");

export function useMovies() {
  return useQuery({ queryKey: ["movies"], queryFn: getMovies });
}

export const getMovie = (id: number): Promise<Movie> =>
  apiFetch(`/api/movies/${id}`);

export function useMovie(id: number) {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovie(id),
  });
}
