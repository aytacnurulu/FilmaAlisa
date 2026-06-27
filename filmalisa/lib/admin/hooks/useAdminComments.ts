"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AdminComment } from "@/lib/admin/types/admin";
import { adminFetch } from "@/lib/admin/adminFetch";

const QUERY_KEY = ["admin-comments"];

export function useAdminComments() {
  return useQuery<AdminComment[]>({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const json = await adminFetch<{ data: AdminComment[] }>("/api/admin/comments");
      return json.data;
    },
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ movieId, commentId }: { movieId: number; commentId: number }) =>
      adminFetch(`/api/admin/comments/${movieId}/${commentId}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}
