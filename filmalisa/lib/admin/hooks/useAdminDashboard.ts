"use client";
import { useQuery } from "@tanstack/react-query";
import type { DashboardStats } from "@/lib/admin/types/admin";
import { adminFetch } from "@/lib/admin/adminFetch";

const QUERY_KEY = ["admin-dashboard"];

export function useAdminDashboard() {
  return useQuery<DashboardStats>({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const json = await adminFetch<{ data: DashboardStats }>("/api/admin/dashboard");
      return json.data;
    },
  });
}
