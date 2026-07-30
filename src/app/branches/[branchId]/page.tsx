"use client";

import { useParams } from "next/navigation";
import { Clock, MapPin, Phone, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n/context";
import { getBranchById, getRegionById } from "@/lib/mock-data";

export default function BranchDetailPage() {
  const { branchId } = useParams<{ branchId: string }>();
  const { t } = useI18n();
  const branch = getBranchById(branchId);
  const region = branch ? getRegionById(branch.regionId) : null;

  if (!branch) {
    return (
      <Section>
        <p className="text-ink-muted">Branch not found.</p>
        <ButtonLink href="/regions" variant="primary" className="mt-4">
          {t.common.back}
        </ButtonLink>
      </Section>
    );
  }

  return (
    <>
      <PageHero
        eyebrow={region?.name}
        title={branch.name}
        subtitle={branch.isMainCampus ? "Main Campus" : undefined}
      />
      <Section>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-ink">
                <Clock className="h-5 w-5 text-brand" />
                {t.branch.serviceTimes}
              </h2>
              <ul className="mt-4 divide-y divide-border">
                {branch.serviceTimes.map((s, i) => (
                  <li
                    key={`${s.day}-${s.time}-${i}`}
                    className="flex justify-between py-3 text-sm"
                  >
                    <span className="font-medium text-ink">
                      {s.day}
                      {s.label ? ` · ${s.label}` : ""}
                    </span>
                    <span className="text-ink-muted">{s.time}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-ink">
                <MapPin className="h-5 w-5 text-brand" />
                {t.branch.location}
              </h2>
              <p className="mt-3 text-ink-muted">{branch.address}</p>
              {branch.mapEmbedURL && (
                <div className="mt-4 aspect-video overflow-hidden rounded-xl bg-sky-soft">
                  <iframe
                    src={branch.mapEmbedURL}
                    title={branch.name}
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              )}
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-muted font-display text-2xl font-semibold text-brand">
                {branch.pastorName
                  .split(" ")
                  .filter((p) => !p.startsWith("["))
                  .slice(0, 2)
                  .map((p) => p[0])
                  .join("") || "P"}
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-gold-deep">
                {t.branch.pastor}
              </p>
              <p className="mt-1 font-display text-xl font-semibold text-ink">
                {branch.pastorName}
              </p>
            </Card>

            <Card>
              <h3 className="font-semibold text-ink">{t.branch.contact}</h3>
              <div className="mt-3 space-y-2 text-sm">
                {branch.phone && (
                  <a
                    href={`tel:${branch.phone}`}
                    className="flex items-center gap-2 text-ink-muted hover:text-brand"
                  >
                    <Phone className="h-4 w-4" />
                    {branch.phone}
                  </a>
                )}
                {branch.whatsapp && (
                  <a
                    href={`https://wa.me/${branch.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-ink-muted hover:text-brand"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                )}
              </div>
              <ButtonLink
                href={`/visit?branch=${branch.id}`}
                variant="gold"
                className="mt-5 w-full"
              >
                {t.branch.planVisit}
              </ButtonLink>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
