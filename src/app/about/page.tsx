"use client";

import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { useI18n } from "@/lib/i18n/context";

const beliefs = [
  {
    en: "The Bible as the inspired Word of God",
    sw: "Biblia kama Neno la Mungu lililopuliziwa",
  },
  {
    en: "Salvation through faith in Jesus Christ alone",
    sw: "Wokovu kwa imani katika Yesu Kristo peke yake",
  },
  {
    en: "Baptism of the Holy Spirit with evidence of speaking in tongues",
    sw: "Ubatizo wa Roho Mtakatifu na ushahidi wa kuongea kwa lugha",
  },
  {
    en: "Divine healing and miracles for today",
    sw: "Uponyaji wa Kimungu na miujiza kwa leo",
  },
  {
    en: "The second coming of Christ",
    sw: "Kuja mara ya pili kwa Kristo",
  },
  {
    en: "Holiness and Spirit-filled living",
    sw: "Utakatifu na maisha yenye Roho",
  },
];

export default function AboutPage() {
  const { t, locale } = useI18n();

  return (
    <>
      <PageHero title={t.about.title} subtitle={t.about.subtitle} />
      <Section narrow>
        <div className="space-y-10">
          <div>
            <h2 className="font-display text-2xl font-semibold text-brand">
              {t.about.missionTitle}
            </h2>
            <p className="mt-3 leading-relaxed text-ink-muted">
              {t.about.missionBody}
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-brand">
              {t.about.visionTitle}
            </h2>
            <p className="mt-3 leading-relaxed text-ink-muted">
              {t.about.visionBody}
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-brand">
              {t.about.beliefsTitle}
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {beliefs.map((b) => (
                <li key={b.en}>
                  <Card className="!p-4 border-l-4 border-l-gold">
                    <p className="text-sm font-medium text-ink">
                      {locale === "sw" ? b.sw : b.en}
                    </p>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
