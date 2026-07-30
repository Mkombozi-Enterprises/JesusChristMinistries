"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { MapPin, User } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n/context";
import {
  getBranchesByRegion,
  getRegionById,
  ALL_LEADERS,
} from "@/lib/mock-data";

export default function RegionDetailPage() {
  const { regionId } = useParams<{ regionId: string }>();
  const { t } = useI18n();
  const region = getRegionById(regionId);
  const branches = getBranchesByRegion(regionId);
  const overseer = ALL_LEADERS.find(
    (l) => l.band === "regional_overseer" && l.regionId === regionId,
  );

  if (!region) {
    return (
      <Section>
        <p className="text-ink-muted">Region not found.</p>
        <ButtonLink href="/regions" variant="primary" className="mt-4">
          {t.common.back}
        </ButtonLink>
      </Section>
    );
  }

  return (
    <>
      <PageHero title={region.name} subtitle={region.description} />
      <Section>
        {overseer && (
          <Card className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center">
            {overseer.photoURL && overseer.spousePhotoURL ? (
              <div className="grid w-full max-w-[14rem] shrink-0 grid-cols-2 gap-1 overflow-hidden rounded-2xl border-2 border-gold/40 bg-brand-muted p-1 sm:w-40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={overseer.photoURL}
                  alt={overseer.name}
                  className="aspect-square w-full rounded-xl object-cover object-top"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={overseer.spousePhotoURL}
                  alt={overseer.spouseName ?? "Spouse"}
                  className="aspect-square w-full rounded-xl object-cover object-top"
                />
              </div>
            ) : overseer.photoURL ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={overseer.photoURL}
                alt={overseer.name}
                className="h-20 w-20 shrink-0 rounded-full object-cover object-top ring-2 ring-gold/40"
              />
            ) : (
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-muted text-brand">
                <User className="h-7 w-7" />
              </div>
            )}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gold-deep">
                {overseer.title === "Assistant Bishop"
                  ? t.leadership.assistantBishop
                  : t.regions.overseer}
              </p>
              <p className="font-display text-xl font-semibold text-ink">
                {overseer.name}
                {overseer.spouseName
                  ? ` ${t.leadership.andSpouse} ${overseer.spouseName}`
                  : ""}
              </p>
              <p className="mt-1 text-sm text-ink-muted">{overseer.bio}</p>
              <Link
                href="/leadership"
                className="mt-3 inline-block text-sm font-semibold text-brand hover:underline"
              >
                {t.home.leadershipCta} →
              </Link>
            </div>
          </Card>
        )}

        <h2 className="font-display text-2xl font-semibold text-ink">
          {t.regions.branchesInRegion}
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {branches.map((branch) => (
            <li key={branch.id}>
              <Link href={`/branches/${branch.id}`}>
                <Card hover className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-brand" />
                  <div>
                    <p className="font-semibold text-ink">{branch.name}</p>
                    <p className="text-sm text-ink-muted">{branch.address}</p>
                    <p className="mt-1 text-sm text-brand">{branch.pastorName}</p>
                  </div>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
