"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  AdminActor,
  CreateActorPayload,
  UpdateActorPayload,
} from "@/lib/admin/types/admin";
import { adminFetch } from "@/lib/admin/adminFetch";

const QUERY_KEY = ["admin-actors"];

export function useAdminActors() {
  return useQuery<AdminActor[]>({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const json = await adminFetch<{ data: AdminActor[] }>("/api/admin/actors");
      return json.data;
    },
  });
}

export function useCreateActor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateActorPayload) =>
      adminFetch("/api/admin/actors", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useUpdateActor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateActorPayload }) =>
      adminFetch(`/api/admin/actors/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useDeleteActor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      adminFetch(`/api/admin/actors/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}
