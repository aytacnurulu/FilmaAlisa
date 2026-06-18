import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";
import { Category } from "@/lib/types/category";

const getCategories = () => {
  return apiFetch<Category[]>("/api/categories");
};

const useGetCategories = () => {
  return useQuery({ queryKey: ["categories"], queryFn: getCategories });
};

export { getCategories, useGetCategories };
