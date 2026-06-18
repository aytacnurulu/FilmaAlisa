// lib/types/movies.ts

export type Category = {
  id: number;
  name: string;
};
// lib/types/actor.ts
export type Actor = {
  id: number;
  name: string;
  surname: string;
  img_url: string;
  created_at: string;
};

export type Movie = {
  id: number;
  title: string;
  cover_url: string;
  fragman: string;
  watch_url: string;
  adult: boolean;
  run_time_min: number;
  imdb: string;
  overview: string;
  created_at: string;
  category: Category;
  actors: Actor[];
};
