"use client";

import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { useI18n } from "@/lib/i18n/context";

export default function PrivacyPage() {
  const { t } = useI18n();
  return (
    <>
      <PageHero title={t.legal.privacyTitle} />
      <Section narrow>
        <p className="leading-relaxed text-ink-muted">{t.legal.placeholder}</p>
      </Section>
    </>
  );
}
