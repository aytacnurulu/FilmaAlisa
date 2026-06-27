"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AdminComment } from "@/lib/admin/types/admin";

const QUERY_KEY = ["admin-comments"];

export function useAdminComments() {
  return useQuery<AdminComment[]>({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const res = await fetch("/api/admin/comments");
      if (!res.ok) throw new Error("Failed to fetch comments");
      const json = await res.json();
      return json.data;
    },
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      movieId,
      commentId,
    }: {
      movieId: number;
      commentId: number;
    }) => {
      const res = await fetch(`/api/admin/comments/${movieId}/${commentId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete comment");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}
