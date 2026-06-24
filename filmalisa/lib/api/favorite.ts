import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "./client";
import { Movie } from "../types/movies";

const getFavorites = () => apiFetch<Movie[]>("/api/movies/favorites");

const addFavorite = (id: string) =>
  apiFetch<void>(`/api/movies/${id}/favorite`, { method: "POST" });

const useFavorites = () =>
  useQuery({ queryKey: ["favorites"], queryFn: getFavorites });

const useToggleFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => addFavorite(String(id)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["favorites"] }),
  });
};

const useAddFavorite = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => addFavorite(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["favorites"] }),
  });
};

export { useFavorites, useToggleFavorite, useAddFavorite };
