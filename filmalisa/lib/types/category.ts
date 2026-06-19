import { Movie } from "./movies";
// category
// Simple category — used inside movie objects and admin CRUD
export type Category = {
  id: number;
  name: string;
  created_at: string;
};

// Full category with movies — used for GET /categories (home page, recommendations)
export type CategoryWithMovies = {
  id: number;
  name: string;
  created_at: string;
  movies: Movie[];  
};