"use client";
import { useQuery } from "@tanstack/react-query";
import type { DashboardStats } from "@/lib/admin/types/admin";

const QUERY_KEY = ["admin-dashboard"];

export function useAdminDashboard() {
  return useQuery<DashboardStats>({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const res = await fetch("/api/admin/dashboard");
      if (!res.ok) throw new Error("Failed to fetch dashboard stats");
      const json = await res.json();
      return json.data;
    },
  });
}
