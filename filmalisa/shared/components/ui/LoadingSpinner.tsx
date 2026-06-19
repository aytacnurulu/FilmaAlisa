import { cn } from "@/shared/lib/cn";

type Props = {
  className?: string;
  size?: "sm" | "md" | "lg";
  label?: string;
};

const sizeMap = {
  sm: "w-5 h-5 border-2",
  md: "w-8 h-8 border-2",
  lg: "w-12 h-12 border-[3px]",
};

export function LoadingSpinner({ className, size = "md", label = "Loading…" }: Props) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn("flex flex-col items-center justify-center gap-3", className)}
    >
      <span
        className={cn(
          "rounded-full border-border border-t-accent animate-spin",
          sizeMap[size],
        )}
        style={{ animationDuration: "700ms" }}
      />
      <span className="text-sm text-text-muted">{label}</span>
    </div>
  );
}
