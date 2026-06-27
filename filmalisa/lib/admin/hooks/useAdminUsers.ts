"use client";
import { useQuery } from "@tanstack/react-query";
import type { AdminUser } from "@/lib/admin/types/admin";
import { adminFetch } from "@/lib/admin/adminFetch";

const QUERY_KEY = ["admin-users"];

export function useAdminUsers() {
  return useQuery<AdminUser[]>({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const json = await adminFetch<{ data: AdminUser[] }>("/api/admin/users");
      return json.data;
    },
  });
}
