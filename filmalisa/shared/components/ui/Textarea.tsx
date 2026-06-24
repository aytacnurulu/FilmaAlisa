"use client";

import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, className, ...props }, ref) => (
    <div className="w-full">
      <textarea
        ref={ref}
        className={cn(
          "w-full bg-surface-2 border border-border rounded-md",
          "text-text placeholder:text-text-faint text-base",
          "px-4 py-3 min-h-[120px] resize-y",
          "transition-colors",
          "focus-visible:outline-none focus-visible:border-accent",
          "focus-visible:[box-shadow:0_0_0_3px_var(--color-accent-soft)]",
          error && "border-danger focus-visible:border-danger",
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-danger">{error}</p>}
    </div>
  )
);

Textarea.displayName = "Textarea";
