"use client";

import { useEffect } from "react";
import { useFormik } from "formik";
import { useGetProfile, useUpdateProfile } from "@/lib/api/profile";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { PasswordInput } from "@/shared/components/ui/PasswordInput";
import { LoadingSpinner } from "@/shared/components/ui/LoadingSpinner";
import { ErrorMessage } from "@/shared/components/ui/ErrorMessage";
import { cn } from "@/shared/lib/cn";
import { FiLink2, FiUser, FiMail } from "react-icons/fi";

export default function ProfilePage() {
  const { data: profile, isLoading } = useGetProfile();
  const { mutate, isPending, isError, error } = useUpdateProfile();

  const formik = useFormik({
    initialValues: {
      img_url: "",
      full_name: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      mutate(values);
    },
  });

  useEffect(() => {
    if (profile) {
      formik.setValues({
        img_url: profile.img_url ?? "",
        full_name: profile.full_name,
        email: profile.email,
        password: "",
      });
    }
  }, [profile]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center py-24">
        <LoadingSpinner />
      </div>
    );
  }

  const firstInitial = profile?.full_name?.charAt(0).toUpperCase() ?? "?";
  const hasAvatar = Boolean(profile?.img_url);

  return (
    <div className="min-h-full px-4 py-10">
      <p className="mb-6 text-sm text-text-muted">Account</p>

      <div className="mx-auto w-full max-w-md rounded-2xl bg-surface-1 border border-border p-8">

        {/* Avatar with gradient ring */}
        <div className="mb-8 flex justify-center">
          <div className="p-[3px] rounded-full bg-gradient-to-b from-violet-500 to-cyan-400">
            {hasAvatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile!.img_url!}
                alt={profile!.full_name}
                className="w-32 h-32 rounded-full object-cover"
              />
            ) : (
              <div
                className={cn(
                  "w-32 h-32 rounded-full bg-surface-2",
                  "flex items-center justify-center",
                  "text-4xl font-semibold text-accent"
                )}
              >
                {firstInitial}
              </div>
            )}
          </div>
        </div>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <Input
            placeholder="profile image url"
            leftIcon={<FiLink2 size={16} />}
            name="img_url"
            value={formik.values.img_url}
            onChange={formik.handleChange}
          />
          <Input
            placeholder="full name"
            leftIcon={<FiUser size={16} />}
            name="full_name"
            value={formik.values.full_name}
            onChange={formik.handleChange}
          />
          <Input
            placeholder="email"
            type="email"
            leftIcon={<FiMail size={16} />}
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <PasswordInput
            placeholder="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={isPending}
          >
            {isPending ? <LoadingSpinner size="sm" label="" /> : "Save"}
          </Button>

          {isError && (
            <ErrorMessage
              message={
                error instanceof Error
                  ? error.message
                  : "Failed to update profile. Please try again."
              }
            />
          )}
        </form>
      </div>
    </div>
  );
}
