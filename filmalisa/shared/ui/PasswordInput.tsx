"use client";

import { forwardRef, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Input } from "./Input";

type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  leftIcon?: ReactNode;
  error?: string;
};

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ leftIcon, error, ...props }, ref) => {
    const [visible, setVisible] = useState(false);

    return (
      <Input
        ref={ref}
        type={visible ? "text" : "password"}
        leftIcon={leftIcon}
        error={error}
        rightIcon={
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="text-text-faint hover:text-text transition-colors cursor-pointer focus-visible:outline-none focus-visible:text-accent"
            aria-label={visible ? "Hide password" : "Show password"}
          >
            {visible ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        }
        {...props}
      />
    );
  }
);

PasswordInput.displayName = "PasswordInput";
