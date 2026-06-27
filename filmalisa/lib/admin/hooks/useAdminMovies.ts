"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  AdminMovie,
  CreateMoviePayload,
  UpdateMoviePayload,
} from "@/lib/admin/types/admin";
import { adminFetch } from "@/lib/admin/adminFetch";

const QUERY_KEY = ["admin-movies"];

export function useAdminMovies() {
  return useQuery<AdminMovie[]>({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const json = await adminFetch<{ data: AdminMovie[] }>("/api/admin/movies");
      return json.data;
    },
  });
}

export function useCreateMovie() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateMoviePayload) =>
      adminFetch("/api/admin/movies", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useUpdateMovie() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateMoviePayload }) =>
      adminFetch(`/api/admin/movies/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useDeleteMovie() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      adminFetch(`/api/admin/movies/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}
