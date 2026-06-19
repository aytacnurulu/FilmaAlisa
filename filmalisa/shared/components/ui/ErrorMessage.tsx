import { FiAlertCircle } from "react-icons/fi";
import { cn } from "@/shared/lib/cn";

type Props = {
  message?: string;
  className?: string;
};

export function ErrorMessage({
  message = "Something went wrong. Please try again.",
  className,
}: Props) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-12 text-center",
        className,
      )}
    >
      <FiAlertCircle size={36} className="text-danger" />
      <p className="text-sm text-text-muted max-w-xs">{message}</p>
    </div>
  );
}
