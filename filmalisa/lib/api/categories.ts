import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";
import { CategoryWithMovies } from "@/lib/types/category";

const getCategories = () => {
  return apiFetch<CategoryWithMovies[]>("/api/categories");
};

const useGetCategories = () => {
  return useQuery({ queryKey: ["categories"], queryFn: getCategories });
};

export { getCategories, useGetCategories };
