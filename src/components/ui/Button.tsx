import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "gold" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-white hover:bg-brand-deep shadow-sm shadow-brand/20",
  secondary:
    "bg-sky-soft text-brand hover:bg-sky/30 border border-sky/40",
  gold: "bg-gold text-ink hover:bg-gold-deep shadow-sm shadow-gold/30 font-semibold",
  ghost: "bg-transparent text-brand hover:bg-brand-muted",
  outline:
    "bg-transparent text-brand border-2 border-brand hover:bg-brand hover:text-white",
};

const sizes: Record<Size, string> = {
  sm: "px-3.5 py-1.5 text-sm rounded-full",
  md: "px-5 py-2.5 text-sm rounded-full",
  lg: "px-7 py-3.5 text-base rounded-full",
};

const base =
  "inline-flex items-center justify-center gap-2 font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none";

interface ButtonProps extends ComponentProps<"button"> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

interface ButtonLinkProps extends ComponentProps<typeof Link> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Link>
  );
}
