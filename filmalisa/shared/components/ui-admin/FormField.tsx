"use client";

interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export const inputClass =
  "w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-[#f0f0f0] placeholder:text-[#555] focus:outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] transition-colors";

export const selectClass = inputClass;

export const textareaClass = inputClass + " resize-none";

export default function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="block text-xs font-medium text-[#9a9a9a] uppercase tracking-wide">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-[#dc2626]">{error}</p>}
    </div>
  );
}
