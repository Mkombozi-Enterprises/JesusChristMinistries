"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { REGIONS } from "@/lib/mock-data";

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-brand text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-gold ring-2 ring-gold/40">
                JCM
              </span>
              <span className="font-display text-lg font-semibold">
                Jesus Christ Ministries
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/75">
              {t.footer.tagline}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              {t.footer.quickLinks}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              {(
                [
                  ["/about", t.nav.about],
                  ["/leadership", t.nav.leadership],
                  ["/sermons", t.nav.sermons],
                  ["/events", t.nav.events],
                  ["/give", t.nav.give],
                  ["/visit", t.nav.visit],
                  ["/membership", t.nav.membership],
                  ["/contact", t.nav.contact],
                ] as const
              ).map(([href, label]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="transition-colors hover:text-gold"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              {t.footer.regions}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              {REGIONS.map((r) => (
                <li key={r.id}>
                  <Link
                    href={`/regions/${r.id}`}
                    className="transition-colors hover:text-gold"
                  >
                    {r.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              {t.footer.legal}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li>
                <Link href="/privacy" className="hover:text-gold">
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gold">
                  {t.footer.terms}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/15 pt-6 text-xs text-white/60 sm:flex-row sm:items-center">
          <p>
            © {year} Jesus Christ Ministries. {t.footer.rights}
          </p>
          <p className="text-white/50">
            Bishop Edward Musamusi &amp; Edith Fedha Musamusi
          </p>
        </div>
      </div>
    </footer>
  );
}
