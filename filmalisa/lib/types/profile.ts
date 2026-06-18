export type Profile = {
  id: number;
  full_name: string;
  email: string;
  img_url: string | null;
  created_at: string;
};

export type UpdateProfilePayload = {
  full_name: string;
  email: string;
  img_url: string | null;
  password: string;
};
