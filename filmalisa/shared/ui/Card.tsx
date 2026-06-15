import { type ElementType, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type CardPadding = "sm" | "md" | "lg";

type CardOwnProps<T extends ElementType> = {
  as?: T;
  padding?: CardPadding;
  hover?: boolean;
  className?: string;
  children?: ReactNode;
};

type CardProps<T extends ElementType = "div"> = CardOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof CardOwnProps<T>>;

const paddingMap: Record<CardPadding, string> = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card<T extends ElementType = "div">({
  as,
  padding = "md",
  hover = false,
  className,
  children,
  ...props
}: CardProps<T>) {
  const Tag = (as ?? "div") as ElementType;

  return (
    <Tag
      className={cn(
        "bg-surface rounded-lg",
        paddingMap[padding],
        hover && "transition-colors cursor-pointer hover:bg-surface-2",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
