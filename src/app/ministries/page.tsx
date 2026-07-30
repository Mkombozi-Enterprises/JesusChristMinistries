"use client";

import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { useI18n } from "@/lib/i18n/context";

const ministries = [
  {
    id: "choir",
    name: { en: "National Choir", sw: "Kwaya ya Kitaifa" },
    description: {
      en: "Worship ministry leading praise across national gatherings and conventions.",
      sw: "Huduma ya ibada inayoongoza sifa katika mikutano na makongamano ya kitaifa.",
    },
    schedule: { en: "Rehearsals before major events", sw: "Mazoezi kabla ya matukio makubwa" },
  },
  {
    id: "youth",
    name: { en: "Youth Ministry", sw: "Huduma ya Vijana" },
    description: {
      en: "Discipling the next generation through teaching, fellowship, and evangelism.",
      sw: "Kuwa wanafunzi kizazi kijacho kupitia mafundisho, ushirika, na uinjilisti.",
    },
    schedule: { en: "Regional conventions & branch cells", sw: "Makongamano ya mkoa na seli za tawi" },
  },
  {
    id: "men",
    name: { en: "Men's Fellowship", sw: "Ushirika wa Wanaume" },
    description: {
      en: "Building godly men who lead families and serve the local church.",
      sw: "Kujenga wanaume watauwa wanaoongoza familia na kutumikia kanisa la mtaa.",
    },
  },
  {
    id: "women",
    name: { en: "Women's Fellowship", sw: "Ushirika wa Wanawake" },
    description: {
      en: "Prayer, mentorship, and outreach for women across all regions.",
      sw: "Maombi, ushauri, na uinjilisti kwa wanawake katika mikoa yote.",
    },
  },
  {
    id: "children",
    name: { en: "Children's Church", sw: "Kanisa la Watoto" },
    description: {
      en: "Age-appropriate teaching so every child knows Jesus.",
      sw: "Mafundisho yanayofaa umri ili kila mtoto amjue Yesu.",
    },
  },
  {
    id: "intercession",
    name: { en: "Intercessory Prayer", sw: "Maombi ya Uombezi" },
    description: {
      en: "Standing in the gap for the ministry, nations, and souls.",
      sw: "Kusimama katika pengo kwa ajili ya huduma, mataifa, na roho.",
    },
  },
];

export default function MinistriesPage() {
  const { t, locale } = useI18n();

  return (
    <>
      <PageHero title={t.ministries.title} subtitle={t.ministries.subtitle} />
      <Section>
        <p className="mb-6 text-xs font-semibold uppercase tracking-wider text-gold-deep">
          {t.ministries.national}
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ministries.map((m) => (
            <Card key={m.id} hover>
              <h2 className="font-display text-xl font-semibold text-ink">
                {m.name[locale]}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {m.description[locale]}
              </p>
              {m.schedule && (
                <p className="mt-4 text-xs font-medium text-brand">
                  {m.schedule[locale]}
                </p>
              )}
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
