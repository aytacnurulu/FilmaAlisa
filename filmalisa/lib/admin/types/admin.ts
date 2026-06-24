export interface ApiResponse<T> {
  message: string;
  data: T;
  result: boolean;
}

export interface AdminCategory {
  id: number;
  name: string;
  created_at: string;
}

export interface AdminActor {
  id: number;
  name: string;
  surname: string;
  img_url: string | null;
  created_at: string;
}

export interface AdminMovie {
  id: number;
  title: string;
  cover_url: string;
  overview: string;
  fragman: string;
  watch_url: string;
  adult: boolean;
  run_time_min: number;
  imdb: string;
  category: AdminCategory;
  actors: AdminActor[];
  created_at: string;
}

export interface AdminUser {
  id: number;
  full_name: string;
  email: string;
  img_url: string | null;
  created_at: string;
}

export interface AdminComment {
  id: number;
  user: Pick<AdminUser, "id" | "full_name">;
  movie: Pick<AdminMovie, "id" | "title">;
  comment: string;
  created_at: string;
}

export interface AdminContact {
  id: number;
  full_name: string;
  email: string;
  reason: string;
  created_at: string;
}

export interface DashboardStats {
  movies: number;
  categories: number;
  actors: number;
  users: number;
  comments: number;
  contacts: number;
  favorites: number;
}

export interface CreateCategoryPayload {
  name: string;
}

export interface CreateActorPayload {
  name: string;
  surname: string;
  img_url: string;
}

export interface CreateMoviePayload {
  title: string;
  cover_url: string;
  fragman: string;
  watch_url: string;
  adult: boolean;
  run_time_min: number;
  imdb: string;
  category: number;
  actors: number[];
  overview: string;
}

export type UpdateCategoryPayload = CreateCategoryPayload;

export type UpdateActorPayload = CreateActorPayload;

export type UpdateMoviePayload = CreateMoviePayload;
