"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Heart, ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import { LanguageToggle } from "./LanguageToggle";
import { ButtonLink } from "@/components/ui/Button";

/** All public routes that exist in app/ — used for nav + validation */
export const NAV_PRIMARY = [
  { href: "/about", key: "about" as const },
  { href: "/leadership", key: "leadership" as const },
  { href: "/regions", key: "regions" as const },
  { href: "/sermons", key: "sermons" as const },
  { href: "/events", key: "events" as const },
  { href: "/ministries", key: "ministries" as const },
] as const;

export const NAV_SECONDARY = [
  { href: "/visit", key: "visit" as const },
  { href: "/give", key: "give" as const },
  { href: "/blog", key: "blog" as const },
  { href: "/membership", key: "membership" as const },
  { href: "/contact", key: "contact" as const },
] as const;

export function Header() {
  const { t } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  // Close mobile drawer on route change
  useEffect(() => {
    setOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  // Click-outside for "More" (avoids onBlur race that drops link clicks)
  useEffect(() => {
    if (!moreOpen) return;
    function onPointer(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMoreOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [moreOpen]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-white/95 backdrop-blur-md">
      {/* Slim scripture bar */}
      <div className="hidden border-b border-brand/10 bg-brand text-white sm:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-1.5 text-xs sm:px-6 lg:px-8">
          <p className="min-w-0 flex-1 truncate font-medium tracking-wide opacity-90">
            {t.home.heroTagline}
          </p>
          <LanguageToggle className="shrink-0 border-white/20 bg-white/10 [&_button]:text-white/80 [&_button[aria-pressed=true]]:bg-white [&_button[aria-pressed=true]]:text-brand" />
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5"
          aria-label="Jesus Christ Ministries — Home"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-bold text-gold shadow-sm ring-2 ring-gold/40">
            JCM
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className="block font-display text-base font-semibold leading-tight text-brand group-hover:text-brand-deep">
              Jesus Christ Ministries
            </span>
            <span className="block text-[11px] font-medium uppercase tracking-wider text-ink-muted">
              Pentecostal
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-0.5 xl:flex"
          aria-label="Main"
        >
          {NAV_PRIMARY.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "bg-brand-muted text-brand"
                  : "text-ink-muted hover:bg-off-white hover:text-brand",
              )}
            >
              {t.nav[link.key]}
            </Link>
          ))}

          <div className="relative" ref={moreRef}>
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              className={cn(
                "inline-flex items-center gap-0.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                NAV_SECONDARY.some((l) => isActive(l.href)) || moreOpen
                  ? "bg-brand-muted text-brand"
                  : "text-ink-muted hover:bg-off-white hover:text-brand",
              )}
              aria-expanded={moreOpen}
              aria-haspopup="menu"
            >
              {t.nav.more}
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform",
                  moreOpen && "rotate-180",
                )}
              />
            </button>
            {moreOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full z-50 mt-1 min-w-[12rem] rounded-xl border border-border bg-white py-1 shadow-lg"
              >
                {NAV_SECONDARY.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    role="menuitem"
                    className={cn(
                      "block px-4 py-2.5 text-sm transition-colors hover:bg-brand-muted hover:text-brand",
                      isActive(link.href) && "bg-brand-muted text-brand",
                    )}
                    onClick={() => setMoreOpen(false)}
                  >
                    {t.nav[link.key]}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <div className="sm:hidden">
            <LanguageToggle />
          </div>
          <ButtonLink
            href="/give"
            variant="gold"
            size="sm"
            className="hidden sm:inline-flex"
          >
            <Heart className="h-3.5 w-3.5" aria-hidden />
            {t.nav.give}
          </ButtonLink>
          <ButtonLink
            href="/visit"
            variant="primary"
            size="sm"
            className="hidden md:inline-flex"
          >
            {t.nav.visit}
          </ButtonLink>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-brand xl:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile / tablet drawer — all public links, no dead ends */}
      {open && (
        <div
          id="mobile-nav"
          className="border-t border-border bg-white xl:hidden"
        >
          <nav
            className="mx-auto flex max-w-6xl flex-col gap-0.5 px-4 py-3 sm:px-6"
            aria-label="Mobile"
          >
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-xl px-3 py-2.5 text-sm font-medium",
                pathname === "/"
                  ? "bg-brand-muted text-brand"
                  : "text-ink hover:bg-off-white",
              )}
            >
              {t.nav.home}
            </Link>
            {[...NAV_PRIMARY, ...NAV_SECONDARY].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-xl px-3 py-2.5 text-sm font-medium",
                  isActive(link.href)
                    ? "bg-brand-muted text-brand"
                    : "text-ink hover:bg-off-white",
                )}
              >
                {t.nav[link.key]}
              </Link>
            ))}
            <div className="mt-2 flex gap-2 border-t border-border pt-3">
              <ButtonLink
                href="/give"
                variant="gold"
                size="md"
                className="flex-1"
                onClick={() => setOpen(false)}
              >
                <Heart className="h-4 w-4" />
                {t.nav.give}
              </ButtonLink>
              <ButtonLink
                href="/visit"
                variant="primary"
                size="md"
                className="flex-1"
                onClick={() => setOpen(false)}
              >
                {t.nav.visit}
              </ButtonLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
