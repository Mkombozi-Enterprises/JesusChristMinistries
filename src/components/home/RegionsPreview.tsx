"use client";

import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n/context";
import { getBranchesByRegion, REGIONS } from "@/lib/mock-data";

export function RegionsPreview() {
  const { t } = useI18n();

  return (
    <Section tone="white">
      <SectionHeader
        title={t.home.regionsTitle}
        subtitle={t.home.regionsSubtitle}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {REGIONS.map((region) => {
          const count = getBranchesByRegion(region.id).length;
          return (
            <Link key={region.id} href={`/regions/${region.id}`}>
              <Card
                hover
                className="group h-full border-l-4 border-l-brand !rounded-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-muted font-display text-lg font-semibold text-brand transition-colors group-hover:bg-brand group-hover:text-gold">
                  {region.name.charAt(0)}
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-ink">
                  {region.name}
                </h3>
                <p className="mt-1 text-sm text-ink-muted">
                  {count} {t.leadership.branches}
                </p>
                <p className="mt-3 text-xs font-medium text-brand">
                  {t.regions.viewRegion} →
                </p>
              </Card>
            </Link>
          );
        })}
      </div>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <ButtonLink href="/regions" variant="primary">
          {t.common.viewAll}
        </ButtonLink>
        <ButtonLink href="/leadership" variant="outline">
          {t.home.leadershipCta}
        </ButtonLink>
      </div>
    </Section>
  );
}
