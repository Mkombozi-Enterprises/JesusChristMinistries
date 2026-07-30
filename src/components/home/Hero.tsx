"use client";

import { ButtonLink } from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n/context";
import { Heart, Play, MapPin } from "lucide-react";

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden bg-brand text-white">
      {/* Soft geometric accents */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
      >
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-sky/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-gold/15 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(126,184,212,0.12),transparent_55%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <p className="mb-3 inline-flex max-w-full items-start gap-2 rounded-full border border-gold/40 bg-white/5 px-3 py-1.5 text-[10px] font-semibold uppercase leading-snug tracking-[0.12em] text-gold sm:mb-4 sm:items-center sm:text-xs sm:tracking-[0.2em]">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold sm:mt-0" />
            <span className="min-w-0 normal-case tracking-normal sm:uppercase sm:tracking-[0.2em]">
              {t.home.heroTagline}
            </span>
          </p>
          <h1 className="font-display text-[2rem] font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {t.home.heroTitle}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:mt-5 sm:text-lg">
            {t.home.heroSubtitle}
          </p>
          <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3">
            <ButtonLink
              href="/visit"
              variant="gold"
              size="lg"
              className="w-full sm:w-auto"
            >
              <MapPin className="h-4 w-4" />
              {t.home.ctaVisit}
            </ButtonLink>
            <ButtonLink
              href="/sermons"
              variant="outline"
              size="lg"
              className="w-full border-white/40 text-white hover:bg-white hover:text-brand sm:w-auto"
            >
              <Play className="h-4 w-4" />
              {t.home.ctaSermons}
            </ButtonLink>
            <ButtonLink
              href="/give"
              variant="ghost"
              size="lg"
              className="w-full text-gold hover:bg-white/10 hover:text-gold sm:w-auto"
            >
              <Heart className="h-4 w-4" />
              {t.home.ctaGive}
            </ButtonLink>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-10 grid grid-cols-3 gap-2 border-t border-white/15 pt-6 sm:mt-14 sm:max-w-lg sm:gap-4 sm:pt-8">
          {[
            { value: "7", label: t.nav.regions },
            { value: "20+", label: "Branches" },
            { value: "1", label: "Spirit" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-xl font-semibold text-gold sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-0.5 text-[10px] uppercase tracking-wider text-white/65 sm:text-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
