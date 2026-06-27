"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  AdminActor,
  CreateActorPayload,
  UpdateActorPayload,
} from "@/lib/admin/types/admin";

const QUERY_KEY = ["admin-actors"];

export function useAdminActors() {
  return useQuery<AdminActor[]>({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const res = await fetch("/api/admin/actors");
      if (!res.ok) throw new Error("Failed to fetch actors");
      const json = await res.json();
      return json.data;
    },
  });
}

export function useCreateActor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateActorPayload) => {
      const res = await fetch("/api/admin/actors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to create actor");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useUpdateActor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdateActorPayload;
    }) => {
      const res = await fetch(`/api/admin/actors/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to update actor");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useDeleteActor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/admin/actors/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete actor");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}
