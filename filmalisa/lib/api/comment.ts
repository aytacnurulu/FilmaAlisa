import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "./client";
import { Comment } from "../types/comment";
// import { DELETE } from "@/app/api/movies/[id]/comment/[commentId]/route";

// getComments(id) → GET /api/movies/{id}/comments
// useComments(id) → React Query hook
// useAddComment(id) → useMutation POST
// useDeleteComment(id) → useMutation DELETE

export const getComments = async (id: number): Promise<Comment[]> => {
  return await apiFetch(`/api/movies/${id}/comments`);
};

export function useComments(id: number) {
  return useQuery({
    queryKey: ["comments", id],
    queryFn: () => getComments(id),
  });
}

export const addComment = async (
  id: number,
  comment: string,
): Promise<Comment> =>
  await apiFetch(`/api/movies/${id}/comments`, {
    method: "POST",
    body: JSON.stringify({ comment }),
  });

export function useAddComment(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (comment: string) => addComment(id, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
    },
  });
}

export const deleteComment = async (
  id: number,
  commentId: number,
): Promise<void> =>
  await apiFetch(`/api/movies/${id}/comment/${commentId}`, {
    method: "DELETE",
  });

export function useDeleteComment(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId: number) => deleteComment(id, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
    },
  });
}
