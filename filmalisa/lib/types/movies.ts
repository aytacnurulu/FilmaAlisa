// movies.ts

export type Actor = {
  id: number;
  name: string;
  surname: string;
  img_url: string;
  created_at: string;
};

// Minimal category — only what's embedded inside a movie object
type EmbeddedCategory = {
  id: number;
  name: string;
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
  category: EmbeddedCategory; 
  actors: Actor[];
};
