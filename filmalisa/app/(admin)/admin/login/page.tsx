"use client";

import { Formik, Form, Field, type FieldProps } from "formik";
import { useRouter } from "next/navigation";
import { FiMail, FiLock } from "react-icons/fi";
import { loginSchema, type LoginFormValues } from "@/lib/validation";
import { Input } from "@/shared/components/ui/Input";
import { PasswordInput } from "@/shared/components/ui/PasswordInput";
import { Button } from "@/shared/components/ui/Button";
import { Logo } from "@/shared/components/ui/Logo";

const initialValues: LoginFormValues = { email: "", password: "" };

export default function AdminLoginPage() {
  const router = useRouter();

  async function handleSubmit(
    values: LoginFormValues,
    { setStatus }: { setStatus: (msg: string) => void },
  ) {
    const res = await fetch("/api/auth/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      const { error } = await res.json();
      setStatus(error ?? "Login failed");
      return;
    }

    router.push("/admin/dashboard");
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4 py-10">
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ status, isSubmitting }) => (
          <Form className="w-full max-w-sm">
            <div className="bg-surface rounded-xl p-8 flex flex-col gap-5 shadow-card">
              <div className="flex flex-col items-center gap-3 pb-2">
                <Logo size="lg" withWordmark />
                <p className="text-sm text-text-muted">Admin panel</p>
              </div>

              {status && (
                <p className="text-sm text-danger text-center -mt-1">
                  {status}
                </p>
              )}

              <Field name="email">
                {({ field, meta }: FieldProps) => (
                  <Input
                    {...field}
                    type="email"
                    placeholder="Admin email"
                    autoComplete="email"
                    leftIcon={<FiMail size={16} />}
                    error={meta.touched && meta.error ? meta.error : undefined}
                  />
                )}
              </Field>

              <Field name="password">
                {({ field, meta }: FieldProps) => (
                  <PasswordInput
                    {...field}
                    placeholder="Password"
                    autoComplete="current-password"
                    leftIcon={<FiLock size={16} />}
                    error={meta.touched && meta.error ? meta.error : undefined}
                  />
                )}
              </Field>

              <div className="pt-1">
                <Button type="submit" fullWidth disabled={isSubmitting}>
                  {isSubmitting ? "Signing in…" : "Sign in"}
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
