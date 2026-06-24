"use client";

import ContactForm from "@/features/contact/components/ContactForm";

export default function ContactPage() {
  return (
    <main className="min-h-screen px-4 py-16 flex items-start justify-center">
      <div className="w-full max-w-lg">
        <div className="mb-8">
          <h1
            className="text-3xl font-display font-bold mb-2"
            style={{ color: "var(--color-text)" }}
          >
            Contact us
          </h1>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            Have a question or feedback? Fill out the form below and we&apos;ll get back to you.
          </p>
        </div>
        <ContactForm />
      </div>
    </main>
  );
}
