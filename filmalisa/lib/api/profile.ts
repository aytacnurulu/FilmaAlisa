import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";
import { Profile, UpdateProfilePayload } from "@/lib/types/profile";

const getProfile = () => {
  return apiFetch<Profile>("/api/profile");
};

const updateProfile = (body: UpdateProfilePayload) => {
  return apiFetch<Profile>("/api/profile", {
    method: "PUT",
    body: JSON.stringify(body),
  });
};

const useGetProfile = () => {
  return useQuery({ queryKey: ["profile"], queryFn: getProfile });
};

const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: UpdateProfilePayload) => updateProfile(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

export { getProfile, updateProfile, useGetProfile, useUpdateProfile };
