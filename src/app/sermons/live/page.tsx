"use client";

import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n/context";
import { SERMONS } from "@/lib/mock-data";

export default function LivePage() {
  const { t } = useI18n();
  const live = SERMONS.find((s) => s.isLive);

  return (
    <>
      <PageHero title={t.sermons.liveNow} subtitle={t.sermons.subtitle} />
      <Section narrow>
        {live ? (
          <div className="overflow-hidden rounded-2xl border border-border shadow-lg">
            <div className="aspect-video-yt">
              <iframe
                src={`https://www.youtube.com/embed/${live.youtubeId}?autoplay=1`}
                title={live.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        ) : (
          <Card className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-deep">
              {t.sermons.offline}
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-ink">
              {t.home.livestreamBanner}
            </h2>
            <p className="mt-3 text-sm text-ink-muted">
              Check back during service times, or browse the sermon archive.
            </p>
            <ButtonLink href="/sermons" variant="primary" className="mt-6">
              {t.sermons.archive}
            </ButtonLink>
          </Card>
        )}
      </Section>
    </>
  );
}
