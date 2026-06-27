"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  AdminMovie,
  CreateMoviePayload,
  UpdateMoviePayload,
} from "@/lib/admin/types/admin";

const QUERY_KEY = ["admin-movies"];

export function useAdminMovies() {
  return useQuery<AdminMovie[]>({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const res = await fetch("/api/admin/movies");
      if (!res.ok) throw new Error("Failed to fetch movies");
      const json = await res.json();
      return json.data;
    },
  });
}

export function useCreateMovie() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateMoviePayload) => {
      const res = await fetch("/api/admin/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to create movie");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useUpdateMovie() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdateMoviePayload;
    }) => {
      const res = await fetch(`/api/admin/movies/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to update movie");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useDeleteMovie() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/admin/movies/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete movie");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}
