"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  AdminCategory,
  CreateCategoryPayload,
  UpdateCategoryPayload,
} from "@/lib/admin/types/admin";
import { adminFetch } from "@/lib/admin/adminFetch";

const QUERY_KEY = ["admin-categories"];

export function useAdminCategories() {
  return useQuery<AdminCategory[]>({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const json = await adminFetch<{ data: AdminCategory[] }>("/api/admin/categories");
      return json.data;
    },
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateCategoryPayload) =>
      adminFetch("/api/admin/categories", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateCategoryPayload }) =>
      adminFetch(`/api/admin/categories/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      adminFetch(`/api/admin/categories/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}
