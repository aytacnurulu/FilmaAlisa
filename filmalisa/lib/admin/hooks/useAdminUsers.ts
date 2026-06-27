"use client";
import { useQuery } from "@tanstack/react-query";
import type { AdminUser } from "@/lib/admin/types/admin";

const QUERY_KEY = ["admin-users"];

export function useAdminUsers() {
  return useQuery<AdminUser[]>({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const res = await fetch("/api/admin/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const json = await res.json();
      return json.data;
    },
  });
}
