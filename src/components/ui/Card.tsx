import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
}

const pads = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  children,
  className,
  hover = false,
  padding = "md",
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-white shadow-sm",
        pads[padding],
        hover && "card-lift",
        className,
      )}
    >
      {children}
    </div>
  );
}
