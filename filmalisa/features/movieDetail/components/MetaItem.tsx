import type { ReactNode } from "react";

interface Props {
  icon?: ReactNode;
  label: string;
  value: string;
}

export default function MetaItem({ icon, label, value }: Props) {
  return (
    <div>
      <p
        className="text-xs uppercase tracking-wider mb-1"
        style={{ color: "var(--color-text-faint)" }}
      >
        {label}
      </p>
      <div className="flex items-center gap-1.5">
        {icon && (
          <span style={{ color: "var(--color-accent)" }}>{icon}</span>
        )}
        <span
          className="text-sm font-medium"
          style={{ color: "var(--color-text)" }}
        >
          {value}
        </span>
      </div>
    </div>
  );
}
