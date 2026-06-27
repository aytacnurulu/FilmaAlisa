"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AdminContact } from "@/lib/admin/types/admin";
import { adminFetch } from "@/lib/admin/adminFetch";

const QUERY_KEY = ["admin-contacts"];

export function useAdminContacts() {
  return useQuery<AdminContact[]>({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const json = await adminFetch<{ data: AdminContact[] }>("/api/admin/contacts");
      return json.data;
    },
  });
}

export function useDeleteContact() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      adminFetch(`/api/admin/contacts/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}
