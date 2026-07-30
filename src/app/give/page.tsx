"use client";

import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { useI18n } from "@/lib/i18n/context";

export default function GivePage() {
  const { t } = useI18n();

  return (
    <>
      <PageHero title={t.give.title} subtitle={t.give.subtitle} />
      <Section narrow>
        <Card className="border-l-4 border-l-gold">
          <h2 className="font-display text-2xl font-semibold text-brand">
            {t.give.whyTitle}
          </h2>
          <p className="mt-3 leading-relaxed text-ink-muted">{t.give.whyBody}</p>
          <blockquote className="mt-6 border-l-2 border-gold pl-4 text-sm italic text-ink">
            {t.give.scripture}
          </blockquote>
        </Card>

        <Card className="mt-6 bg-sky-soft/50 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-gold-deep">
            {t.common.comingSoon}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            {t.give.detailsSoon}
          </p>
        </Card>
      </Section>
    </>
  );
}
