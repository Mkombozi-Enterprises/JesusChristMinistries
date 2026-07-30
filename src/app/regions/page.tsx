"use client";

import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { useI18n } from "@/lib/i18n/context";
import { getBranchesByRegion, REGIONS } from "@/lib/mock-data";

export default function RegionsPage() {
  const { t } = useI18n();

  return (
    <>
      <PageHero title={t.regions.title} subtitle={t.regions.subtitle} />
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REGIONS.map((region) => {
            const count = getBranchesByRegion(region.id).length;
            return (
              <Link key={region.id} href={`/regions/${region.id}`}>
                <Card hover className="h-full">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-xl font-display font-semibold text-gold">
                    {region.name.charAt(0)}
                  </div>
                  <h2 className="mt-4 font-display text-2xl font-semibold text-ink">
                    {region.name}
                  </h2>
                  <p className="mt-2 text-sm text-ink-muted line-clamp-2">
                    {region.description}
                  </p>
                  <p className="mt-4 text-sm font-semibold text-brand">
                    {count} {t.leadership.branches} · {t.regions.viewRegion} →
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>
      </Section>
    </>
  );
}
