"use client";

import Link from "next/link";
import { Calendar } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { useI18n } from "@/lib/i18n/context";
import { getUpcomingEvents, REGIONS } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export function UpcomingEvents() {
  const { t, locale } = useI18n();
  const events = getUpcomingEvents(3);

  return (
    <Section tone="soft">
      <SectionHeader
        eyebrow="Gather"
        title={t.home.upcomingEvents}
        subtitle={t.events.subtitle}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => {
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
              <h3 className="font-display text-lg font-semibold text-ink">
                {event.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-muted">
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
      <div className="mt-8 text-center">
        <Link
          href="/events"
          className="text-sm font-semibold text-brand hover:text-brand-deep"
        >
          {t.common.viewAll} →
        </Link>
      </div>
    </Section>
  );
}
