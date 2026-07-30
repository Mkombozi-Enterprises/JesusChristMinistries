"use client";

import { useEffect, useState } from "react";
import { Users, HeartHandshake, X } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import {
  getNationalDepartments,
  getPastorsWelfare,
} from "@/lib/mock-data";
import type { Leader } from "@/lib/types";

function PersonCard({
  leader,
  onClick,
}: {
  leader: Leader;
  onClick: () => void;
}) {
  const initials =
    leader.name
      .split(" ")
      .filter((p) => p && !p.startsWith("["))
      .slice(0, 2)
      .map((p) => p[0])
      .join("")
      .toUpperCase() || "·";

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full touch-manipulation flex-col items-center rounded-2xl border border-border bg-white p-4 text-center shadow-sm transition-all active:scale-[0.99] hover:border-brand/40 hover:shadow-md sm:p-5"
    >
      <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center overflow-hidden rounded-full bg-brand-muted font-display text-lg font-semibold text-brand ring-2 ring-gold/30 sm:h-20 sm:w-20">
        {leader.photoURL ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={leader.photoURL}
            alt=""
            className="h-full w-full object-cover object-top"
            loading="lazy"
          />
        ) : (
          initials
        )}
      </div>
      <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-deep">
        {leader.title}
      </p>
      <p className="mt-1 line-clamp-2 font-display text-[15px] font-semibold leading-snug text-ink sm:text-base">
        {leader.name}
      </p>
      <p className="mt-2 line-clamp-2 text-xs text-ink-muted">{leader.bio}</p>
    </button>
  );
}

function SimpleModal({
  leader,
  onClose,
  closeLabel,
}: {
  leader: Leader;
  onClose: () => void;
  closeLabel: string;
}) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/50 p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="max-h-[min(90dvh,32rem)] w-full max-w-md overflow-y-auto rounded-t-2xl bg-white p-5 shadow-2xl sm:rounded-2xl sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-deep">
              {leader.title}
            </p>
            <h3 className="mt-1 font-display text-xl font-semibold text-ink">
              {leader.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-off-white text-ink-muted"
            aria-label={closeLabel}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">{leader.bio}</p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 min-h-11 w-full rounded-full border border-border py-2.5 text-sm font-semibold text-brand hover:bg-brand-muted"
        >
          {closeLabel}
        </button>
      </div>
    </div>
  );
}

export function NationalDepartmentsSection() {
  const { t } = useI18n();
  const leaders = getNationalDepartments();
  const [selected, setSelected] = useState<Leader | null>(null);

  return (
    <section className="border-t border-border bg-white py-10 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col items-center text-center sm:mb-8">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-muted text-brand">
            <Users className="h-5 w-5" />
          </span>
          <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
            {t.leadership.nationalDepartmentsTitle}
          </h2>
          <p className="mt-2 max-w-xl text-sm text-ink-muted sm:text-base">
            {t.leadership.nationalDepartmentsSubtitle}
          </p>
          <div className="mt-4 h-1 w-12 rounded-full bg-gold" />
        </div>
        {/* Mobile: 1 col · sm: 3 cols */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {leaders.map((leader) => (
            <PersonCard
              key={leader.id}
              leader={leader}
              onClick={() => setSelected(leader)}
            />
          ))}
        </div>
      </div>
      {selected && (
        <SimpleModal
          leader={selected}
          onClose={() => setSelected(null)}
          closeLabel={t.leadership.close}
        />
      )}
    </section>
  );
}

export function PastorsWelfareSection() {
  const { t } = useI18n();
  const officers = getPastorsWelfare();
  const [selected, setSelected] = useState<Leader | null>(null);

  return (
    <section className="border-t border-border bg-gradient-to-b from-sky-soft/50 to-off-white py-10 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col items-center text-center sm:mb-8">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-soft text-gold-deep">
            <HeartHandshake className="h-5 w-5" />
          </span>
          <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
            {t.leadership.pastorsWelfareTitle}
          </h2>
          <p className="mt-2 max-w-xl text-sm text-ink-muted sm:text-base">
            {t.leadership.pastorsWelfareSubtitle}
          </p>
          <div className="mt-4 h-1 w-12 rounded-full bg-gold" />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {officers.map((leader) => (
            <PersonCard
              key={leader.id}
              leader={leader}
              onClick={() => setSelected(leader)}
            />
          ))}
        </div>
      </div>
      {selected && (
        <SimpleModal
          leader={selected}
          onClose={() => setSelected(null)}
          closeLabel={t.leadership.close}
        />
      )}
    </section>
  );
}
