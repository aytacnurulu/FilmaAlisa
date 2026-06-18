import { type ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5",
        "rounded-sm text-xs font-medium uppercase tracking-wide",
        "bg-badge/15 text-badge",
        className
      )}
    >
      {children}
    </span>
  );
}
