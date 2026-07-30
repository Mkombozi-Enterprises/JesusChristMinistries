"use client";

import Link from "next/link";
import { Play } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n/context";
import { getLatestSermon } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export function LatestSermon() {
  const { t, locale } = useI18n();
  const sermon = getLatestSermon();

  return (
    <Section tone="white">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <SectionHeader
            align="left"
            eyebrow="Word"
            title={t.home.latestSermon}
            className="mb-6"
          />
          <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            {sermon.title}
          </h3>
          <p className="mt-3 text-sm text-ink-muted">
            {sermon.speaker} · {formatDate(sermon.date, locale)}
            {sermon.series ? ` · ${sermon.series}` : ""}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href={`/sermons`} variant="primary">
              <Play className="h-4 w-4" />
              {t.home.ctaSermons}
            </ButtonLink>
            <ButtonLink href="/sermons/live" variant="secondary">
              {t.home.watchLive}
            </ButtonLink>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-brand shadow-lg shadow-brand/15">
          <div className="aspect-video-yt relative bg-brand-deep">
            {/* Lazy YouTube — thumbnail only until user engages on sermons page */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://img.youtube.com/vi/${sermon.youtubeId}/hqdefault.jpg`}
              alt=""
              className="h-full w-full object-cover opacity-70"
              loading="lazy"
            />
            <Link
              href="/sermons"
              className="absolute inset-0 flex items-center justify-center"
              aria-label={sermon.title}
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold text-ink shadow-lg transition-transform hover:scale-105">
                <Play className="ml-1 h-7 w-7 fill-current" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
