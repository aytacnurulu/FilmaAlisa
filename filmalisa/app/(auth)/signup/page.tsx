"use client";

import { Formik, Form, Field, type FieldProps } from "formik";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { signupSchema, type SignupFormValues } from "@/lib/validation";
import { revealContainer, revealItem } from "@/shared/motion";
import { Logo } from "@/shared/components/ui/Logo";
import { Input } from "@/shared/components/ui/Input";
import { PasswordInput } from "@/shared/components/ui/PasswordInput";
import { Button } from "@/shared/components/ui/Button";

const initialValues: SignupFormValues = {
  full_name: "",
  email: "",
  password: "",
};

export default function SignupPage() {
  const router = useRouter();
  const reduced = useReducedMotion();

  async function handleSubmit(
    values: SignupFormValues,
    { setStatus }: { setStatus: (msg: string) => void },
  ) {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      const { error } = await res.json();
      setStatus(error ?? "Signup failed");
      return;
    }

    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4 py-10">
      <Formik
        initialValues={initialValues}
        validationSchema={signupSchema}
        onSubmit={handleSubmit}
      >
        {({ status, isSubmitting }) => (
          <Form className="w-full max-w-sm">
            <motion.div
              variants={revealContainer}
              initial={reduced ? "show" : "hidden"}
              animate="show"
              className="bg-surface rounded-xl p-8 flex flex-col gap-5 shadow-card"
            >
              {/* Logo + wordmark + subtitle */}
              <motion.div
                variants={revealItem}
                className="flex flex-col items-center gap-2 pb-2"
              >
                <Logo size="lg" withWordmark />
                <p className="text-sm text-text-muted">Create your account</p>
              </motion.div>

              {/* Server-side error */}
              {status && (
                <motion.p
                  key="signup-error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-danger text-center -mt-1"
                >
                  {status}
                </motion.p>
              )}

              {/* Full name */}
              <motion.div variants={revealItem}>
                <Field name="full_name">
                  {({ field, meta }: FieldProps) => (
                    <Input
                      {...field}
                      type="text"
                      placeholder="Full name"
                      autoComplete="name"
                      leftIcon={<FiUser size={16} />}
                      error={
                        meta.touched && meta.error ? meta.error : undefined
                      }
                    />
                  )}
                </Field>
              </motion.div>

              {/* Email */}
              <motion.div variants={revealItem}>
                <Field name="email">
                  {({ field, meta }: FieldProps) => (
                    <Input
                      {...field}
                      type="email"
                      placeholder="Email address"
                      autoComplete="email"
                      leftIcon={<FiMail size={16} />}
                      error={
                        meta.touched && meta.error ? meta.error : undefined
                      }
                    />
                  )}
                </Field>
              </motion.div>

              {/* Password */}
              <motion.div variants={revealItem}>
                <Field name="password">
                  {({ field, meta }: FieldProps) => (
                    <PasswordInput
                      {...field}
                      placeholder="Password"
                      autoComplete="new-password"
                      leftIcon={<FiLock size={16} />}
                      error={
                        meta.touched && meta.error ? meta.error : undefined
                      }
                    />
                  )}
                </Field>
              </motion.div>

              {/* Cross-link (per spec: before button) */}
              <motion.p
                variants={revealItem}
                className="text-sm text-center text-text-muted -mb-1"
              >
                Do you have an account?{" "}
                <Link
                  href="/login"
                  className="text-accent hover:underline focus-visible:underline"
                >
                  Login here
                </Link>
              </motion.p>

              {/* Submit */}
              <motion.div variants={revealItem}>
                <Button type="submit" fullWidth disabled={isSubmitting}>
                  {isSubmitting ? "Signing up…" : "Register"}
                </Button>
              </motion.div>
            </motion.div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
