"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { useI18n } from "@/lib/i18n/context";
import { EVENTS, REGIONS } from "@/lib/mock-data";
import { formatDate, cn } from "@/lib/utils";
import type { EventScope } from "@/lib/types";

export default function EventsPage() {
  const { t, locale } = useI18n();
  const [filter, setFilter] = useState<EventScope | "all">("all");
  const [regionId, setRegionId] = useState("");

  const filtered = EVENTS.filter((e) => {
    if (filter !== "all" && e.scope !== filter) return false;
    if (regionId && e.regionId !== regionId && e.scope !== "global")
      return false;
    return true;
  }).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <>
      <PageHero title={t.events.title} subtitle={t.events.subtitle} />
      <Section>
        <div className="mb-8 flex flex-wrap gap-2">
          {(
            [
              ["all", t.events.filterAll],
              ["global", t.events.filterGlobal],
              ["region", t.events.scope.region],
              ["branch", t.events.scope.branch],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                filter === key
                  ? "bg-brand text-white"
                  : "bg-off-white text-ink-muted hover:bg-brand-muted hover:text-brand",
              )}
            >
              {label}
            </button>
          ))}
          <select
            value={regionId}
            onChange={(e) => setRegionId(e.target.value)}
            className="rounded-full border border-border bg-white px-4 py-1.5 text-sm"
          >
            <option value="">{t.common.selectRegion}</option>
            {REGIONS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((event) => {
            const region = event.regionId
              ? REGIONS.find((r) => r.id === event.regionId)
              : null;
            return (
              <Card key={event.id} hover>
                <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-deep">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(event.date, locale)}
                  {event.time ? ` · ${event.time}` : ""}
                </div>
                <h2 className="font-display text-xl font-semibold text-ink">
                  {event.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {event.description}
                </p>
                <p className="mt-4 text-xs font-medium text-brand">
                  {t.events.scope[event.scope]}
                  {region ? ` · ${region.name}` : ""}
                </p>
              </Card>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-sm text-ink-muted">
            {t.common.comingSoon}
          </p>
        )}
      </Section>
    </>
  );
}
