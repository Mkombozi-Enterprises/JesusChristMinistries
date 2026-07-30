"use client";

import { useMemo, useState } from "react";
import { Play } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n/context";
import { SERMONS } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default function SermonsPage() {
  const { t, locale } = useI18n();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [speaker, setSpeaker] = useState("");
  const [series, setSeries] = useState("");

  const speakers = useMemo(
    () => [...new Set(SERMONS.map((s) => s.speaker))],
    [],
  );
  const seriesList = useMemo(
    () => [...new Set(SERMONS.map((s) => s.series).filter(Boolean))] as string[],
    [],
  );

  const filtered = SERMONS.filter((s) => {
    if (speaker && s.speaker !== speaker) return false;
    if (series && s.series !== series) return false;
    return true;
  }).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <>
      <PageHero title={t.sermons.title} subtitle={t.sermons.subtitle} />
      <Section>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-3">
            <select
              value={speaker}
              onChange={(e) => setSpeaker(e.target.value)}
              className="rounded-full border border-border bg-white px-4 py-2 text-sm"
            >
              <option value="">{t.sermons.filterSpeaker}</option>
              {speakers.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <select
              value={series}
              onChange={(e) => setSeries(e.target.value)}
              className="rounded-full border border-border bg-white px-4 py-2 text-sm"
            >
              <option value="">{t.sermons.filterSeries}</option>
              {seriesList.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <ButtonLink href="/sermons/live" variant="gold">
            {t.home.watchLive}
          </ButtonLink>
        </div>

        <h2 className="mb-4 font-display text-xl font-semibold text-ink">
          {t.sermons.archive}
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((sermon) => (
            <Card key={sermon.id} className="!p-0 overflow-hidden" hover>
              <div className="aspect-video-yt relative bg-brand-deep">
                {activeId === sermon.id ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${sermon.youtubeId}?autoplay=1`}
                    title={sermon.title}
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://img.youtube.com/vi/${sermon.youtubeId}/hqdefault.jpg`}
                      alt=""
                      className="h-full w-full object-cover opacity-80"
                      loading="lazy"
                    />
                    <button
                      type="button"
                      onClick={() => setActiveId(sermon.id)}
                      className="absolute inset-0 flex items-center justify-center"
                      aria-label={`Play ${sermon.title}`}
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-ink shadow-md">
                        <Play className="ml-0.5 h-5 w-5 fill-current" />
                      </span>
                    </button>
                  </>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-ink">{sermon.title}</h3>
                <p className="mt-1 text-sm text-ink-muted">
                  {sermon.speaker} · {formatDate(sermon.date, locale)}
                </p>
                {sermon.series && (
                  <p className="mt-2 text-xs font-medium text-brand">
                    {sermon.series}
                  </p>
                )}
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
