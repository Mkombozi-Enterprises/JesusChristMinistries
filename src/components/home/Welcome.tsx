"use client";

import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n/context";

export function Welcome() {
  const { t } = useI18n();

  return (
    <Section tone="brand">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          Welcome
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
          {t.home.welcomeTitle}
        </h2>
        <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-gold" />
        <p className="mt-6 text-base leading-relaxed text-white/85 sm:text-lg">
          {t.home.welcomeBody}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/visit" variant="gold" size="lg">
            {t.home.ctaVisit}
          </ButtonLink>
          <ButtonLink
            href="/membership"
            variant="outline"
            size="lg"
            className="border-white/40 text-white hover:bg-white hover:text-brand"
          >
            {t.nav.membership}
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
