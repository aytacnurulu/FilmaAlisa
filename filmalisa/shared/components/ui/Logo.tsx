import { cn } from "@/shared/lib/cn";

type LogoSize = "sm" | "md" | "lg";

type LogoProps = {
  size?: LogoSize;
  withWordmark?: boolean;
  className?: string;
};

const triangleSizes: Record<LogoSize, string> = {
  sm: "w-7 h-7",
  md: "w-9 h-9",
  lg: "w-12 h-12",
};

const textSizes: Record<LogoSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export function Logo({ size = "md", withWordmark = false, className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div
        className={cn("brand-gradient flex-shrink-0", triangleSizes[size])}
        style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}
        role="img"
        aria-label="Filmalisa logo"
      />
      {withWordmark && (
        <span
          className={cn(
            "brand-text font-display font-semibold tracking-tight",
            textSizes[size]
          )}
        >
          filmalisa
        </span>
      )}
    </div>
  );
}
