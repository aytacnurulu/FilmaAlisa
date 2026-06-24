"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useSubmitContact } from "@/features/contact/hooks/useSubmitContact";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { Textarea } from "@/shared/components/ui/Textarea";
import { Label } from "@/shared/components/ui/Label";

const validationSchema = Yup.object({
  full_name: Yup.string().min(2, "Name must be at least 2 characters").required("Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  reason: Yup.string().min(10, "Message must be at least 10 characters").required("Message is required"),
});

export default function ContactForm() {
  const { mutate, isPending, isSuccess, isError, error } = useSubmitContact();

  const formik = useFormik({
    initialValues: { full_name: "", email: "", reason: "" },
    validationSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  if (isSuccess) {
    return (
      <div className="rounded-xl p-6 text-center" style={{ backgroundColor: "var(--color-surface-2)" }}>
        <p className="text-lg font-semibold mb-1" style={{ color: "var(--color-accent)" }}>
          Message sent!
        </p>
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          We&apos;ll get back to you as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="full_name">Name</Label>
        <Input
          id="full_name"
          name="full_name"
          type="text"
          placeholder="Your full name"
          value={formik.values.full_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.full_name ? formik.errors.full_name : undefined}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email ? formik.errors.email : undefined}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="reason">Message</Label>
        <Textarea
          id="reason"
          name="reason"
          placeholder="How can we help you?"
          value={formik.values.reason}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.reason ? formik.errors.reason : undefined}
        />
      </div>

      {isError && (
        <p className="text-sm text-danger">
          {error instanceof Error ? error.message : "Something went wrong. Please try again."}
        </p>
      )}

      <Button type="submit" fullWidth disabled={isPending}>
        {isPending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
