import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "white" | "soft" | "brand" | "sky";
  narrow?: boolean;
}

const tones = {
  white: "bg-white",
  soft: "bg-off-white",
  brand: "bg-brand text-white",
  sky: "bg-sky-soft",
};

export function Section({
  children,
  className,
  id,
  tone = "white",
  narrow = false,
}: SectionProps) {
  return (
    <section id={id} className={cn("py-14 sm:py-20", tones[tone], className)}>
      <div
        className={cn(
          "mx-auto px-4 sm:px-6 lg:px-8",
          narrow ? "max-w-3xl" : "max-w-6xl",
        )}
      >
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-10 sm:mb-12",
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-2 text-xs font-semibold uppercase tracking-[0.2em]",
            light ? "text-gold" : "text-gold-deep",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-3xl font-semibold tracking-tight sm:text-4xl",
          light ? "text-white" : "text-ink",
          align === "center" ? "gold-underline" : "gold-underline gold-underline-left",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mx-auto mt-6 max-w-2xl text-base leading-relaxed sm:text-lg",
            light ? "text-white/85" : "text-ink-muted",
            align === "left" && "mx-0",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
