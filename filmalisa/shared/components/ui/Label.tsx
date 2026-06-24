"use client";

import { type LabelHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export function Label({ className, children, ...props }: LabelProps) {
  return (
    <label
      className={cn("text-sm font-medium text-text", className)}
      {...props}
    >
      {children}
    </label>
  );
}
