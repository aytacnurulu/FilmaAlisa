"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AdminContact } from "@/lib/admin/types/admin";

const QUERY_KEY = ["admin-contacts"];

export function useAdminContacts() {
  return useQuery<AdminContact[]>({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const res = await fetch("/api/admin/contacts");
      if (!res.ok) throw new Error("Failed to fetch contacts");
      const json = await res.json();
      return json.data;
    },
  });
}

export function useDeleteContact() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete contact");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}
