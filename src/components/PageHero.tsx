"use client";

import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  className,
}: PageHeroProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border-b border-border bg-gradient-to-br from-brand via-brand to-brand-deep text-white",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-sky/15 blur-2xl sm:h-56 sm:w-56"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-10 h-36 w-36 rounded-full bg-gold/10 blur-2xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 py-9 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        {eyebrow && (
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold sm:text-xs sm:tracking-[0.2em]">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-[1.65rem] font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80 sm:mt-4 sm:text-base sm:text-lg">
            {subtitle}
          </p>
        )}
        <div className="mt-5 h-1 w-12 rounded-full bg-gold sm:mt-6" />
      </div>
    </div>
  );
}
