import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "./client";
import { Movie } from "../types/movies";

const getFavorites = () => {
  return apiFetch<Movie[]>("/api/movies/favorites");
};
const useGetFavorites = () => {
  return useQuery({ queryKey: ["favorites"], queryFn: getFavorites });
};
const addFavorite = async (id: string) => {
  return apiFetch<void>(`/api/movie/${id}/favorite`, { method: "POST" });
};

const useAddFavorite = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return addFavorite(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};

export { useAddFavorite, useGetFavorites };
