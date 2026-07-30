"use client";

/**
 * Org chart — desktop wireframe preserved; mobile adapts without breaking hierarchy:
 *
 *                 [ Founder ]
 *            [ Assistant Bishop ]
 *   [ Sec Gen ] [ Min Coord ] [ Treasurer ]
 *   ────┬────────┬────────┬────────┬────
 *     Regional Overseers (responsive grid)
 *
 * Expand a region → branch pastors.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, Church, Crown, MapPinned, X } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import {
  ALL_LEADERS,
  BRANCHES,
  getAssistantBishop,
  getBishop,
  getBranchesByRegion,
  getNationalCabinet,
  getPastorsByRegion,
  REGIONS,
} from "@/lib/mock-data";
import type { Leader, Region } from "@/lib/types";
import { cn } from "@/lib/utils";

function titleLabel(
  leader: Leader,
  t: ReturnType<typeof useI18n>["t"],
): string {
  if (leader.roleLabel === "Founder") return t.leadership.founder;
  if (leader.roleLabel) return leader.roleLabel;

  if (leader.band === "regional_overseer") return t.leadership.overseer;
  if (leader.band === "assistant_bishop") return t.leadership.assistantBishop;
  if (leader.band === "branch_pastor") return t.leadership.pastor;

  const title = leader.title as string;
  if (title === "Bishop") return t.leadership.bishop;
  if (title === "Assistant Bishop") return t.leadership.assistantBishop;
  if (title === "Secretary General") return t.leadership.secretaryGeneral;
  if (title === "Ministry Coordinator") return t.leadership.ministryCoordinator;
  if (title === "Treasurer" && leader.band === "national_cabinet")
    return t.leadership.treasurer;
  return leader.title;
}

function headlineName(leader: Leader): string {
  return leader.displayName ?? leader.name;
}

function initials(name: string) {
  return (
    name
      .split(" ")
      .filter((p) => p && !p.startsWith("["))
      .slice(0, 2)
      .map((p) => p[0])
      .join("")
      .toUpperCase() || "·"
  );
}

function SingleAvatar({
  src,
  name,
  size = "md",
}: {
  src?: string;
  name: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "h-10 w-10 text-xs sm:h-12 sm:w-12",
    md: "h-14 w-14 text-sm sm:h-16 sm:w-16",
    lg: "h-20 w-20 text-lg sm:h-24 sm:w-24",
  };
  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-muted font-display font-semibold text-brand",
        sizes[size],
      )}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          className="h-full w-full object-cover object-top"
          loading="lazy"
        />
      ) : (
        initials(name)
      )}
    </div>
  );
}

/**
 * ~70% of card width, fixed height, object-cover — no stretch on any viewport.
 */
function CouplePortrait({
  leader,
  size = "node",
}: {
  leader: Leader;
  size?: "hero" | "apex" | "node";
}) {
  // Single portrait: tall container, face anchored to top
  const singleFrames = {
    hero: "w-[72%] max-w-[16rem] aspect-[3/4]",
    apex: "w-[72%] max-w-[14rem] aspect-[3/4]",
    node: "w-[80%] max-w-none aspect-[3/4]",
  };

  // Couple side-by-side: the container is landscape (3:2) so each
  // grid-cols-2 cell is effectively portrait (3:4) — no distortion.
  const coupleFrames = {
    hero: "w-[90%] max-w-[20rem] aspect-[3/2]",
    apex: "w-[90%] max-w-[18rem] aspect-[3/2]",
    node: "w-[92%] max-w-none aspect-[3/2]",
  };

  if (leader.photoURL && !leader.spousePhotoURL) {
    return (
      <div
        className={cn(
          "mx-auto overflow-hidden rounded-xl border-2 border-gold/50 bg-brand-muted shadow-sm",
          singleFrames[size],
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={leader.photoURL}
          alt={headlineName(leader)}
          className="h-full w-full object-cover object-center"
          loading="lazy"
        />
      </div>
    );
  }

  if (leader.photoURL && leader.spousePhotoURL) {
    return (
      <div
        className={cn(
          "mx-auto grid grid-cols-2 gap-0.5 overflow-hidden rounded-xl border-2 border-gold/40 bg-brand-muted p-0.5 shadow-sm sm:gap-1 sm:p-1",
          coupleFrames[size],
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={leader.photoURL}
          alt={leader.name}
          className="h-full w-full rounded-lg object-cover object-center"
          loading="lazy"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={leader.spousePhotoURL}
          alt={leader.spouseName ?? "Spouse"}
          className="h-full w-full rounded-lg object-cover object-center"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <SingleAvatar
      src={leader.photoURL}
      name={leader.name}
      size={size === "hero" ? "lg" : "md"}
    />
  );
}

function BioModal({
  leader,
  onClose,
}: {
  leader: Leader;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const region = leader.regionId
    ? REGIONS.find((r) => r.id === leader.regionId)
    : null;
  const branch = leader.branchId
    ? BRANCHES.find((b) => b.id === leader.branchId)
    : null;

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
      aria-labelledby="bio-title"
      onClick={onClose}
    >
      <div
        className="max-h-[min(92dvh,40rem)] w-full max-w-md overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex justify-end bg-brand/95 px-3 pt-3 sm:absolute sm:right-2 sm:top-2 sm:bg-transparent sm:p-0">
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white sm:bg-black/20"
            aria-label={t.leadership.close}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="bg-brand px-5 pb-8 pt-2 text-center text-white sm:px-6 sm:pt-8">
          <div className="flex justify-center">
            <CouplePortrait
              leader={leader}
              size={leader.band === "bishop" ? "hero" : "apex"}
            />
          </div>
          <h3
            id="bio-title"
            className="mt-4 px-1 font-display text-lg font-semibold leading-snug sm:text-2xl"
          >
            {headlineName(leader)}
          </h3>
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-gold sm:text-xs">
            {titleLabel(leader, t)}
            {region ? ` · ${region.name}` : ""}
            {branch ? ` · ${branch.name}` : ""}
          </p>
        </div>
        <div className="px-5 py-5 pb-8 sm:px-6">
          <p className="text-sm leading-relaxed text-ink-muted">{leader.bio}</p>
          {region && leader.band === "regional_overseer" && (
            <Link
              href={`/regions/${region.id}`}
              className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-brand hover:underline"
              onClick={onClose}
            >
              {region.name} →
            </Link>
          )}
          {branch && (
            <Link
              href={`/branches/${branch.id}`}
              className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-brand hover:underline"
              onClick={onClose}
            >
              {branch.name} →
            </Link>
          )}
          <button
            type="button"
            onClick={onClose}
            className="mt-6 min-h-11 w-full rounded-full border border-border py-2.5 text-sm font-semibold text-brand hover:bg-brand-muted"
          >
            {t.leadership.close}
          </button>
        </div>
      </div>
    </div>
  );
}

function OrgBox({
  leader,
  onClick,
  emphasis = "default",
  className,
  photoSize = "node",
}: {
  leader: Leader;
  onClick: () => void;
  emphasis?: "gold" | "default" | "soft";
  className?: string;
  photoSize?: "hero" | "apex" | "node";
}) {
  const { t } = useI18n();
  const hasPhoto = Boolean(leader.photoURL);

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full touch-manipulation rounded-xl border bg-white p-3 text-center shadow-sm transition-all active:scale-[0.99] hover:shadow-md sm:p-3.5",
        emphasis === "gold" &&
          "border-2 border-gold/50 bg-gradient-to-b from-white to-gold-soft/30",
        emphasis === "default" && "border-border hover:border-brand/40",
        emphasis === "soft" &&
          "border-brand/20 bg-brand-muted/20 hover:border-brand/40",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-2">
        {hasPhoto ? (
          <CouplePortrait leader={leader} size={photoSize} />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-muted text-brand sm:h-16 sm:w-16">
            <Crown className="h-5 w-5 opacity-60" />
          </div>
        )}
        <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-gold-deep sm:text-[10px]">
          {titleLabel(leader, t)}
        </p>
        <p className="line-clamp-3 px-0.5 font-display text-[13px] font-semibold leading-snug text-ink sm:text-[15px]">
          {headlineName(leader)}
        </p>
      </div>
    </button>
  );
}

function Trunk({ tall = false }: { tall?: boolean }) {
  return (
    <div
      className={cn(
        "mx-auto w-px shrink-0 bg-gradient-to-b from-border to-brand/25",
        tall ? "h-5 sm:h-8" : "h-3.5 sm:h-5",
      )}
      aria-hidden
    />
  );
}

function OverseerNode({
  region,
  expanded,
  onToggle,
  onSelectLeader,
}: {
  region: Region;
  expanded: boolean;
  onToggle: () => void;
  onSelectLeader: (l: Leader) => void;
}) {
  const { t } = useI18n();
  const overseer = ALL_LEADERS.find(
    (l) => l.band === "regional_overseer" && l.regionId === region.id,
  );
  const pastors = getPastorsByRegion(region.id);
  const branchCount = getBranchesByRegion(region.id).length;
  const hasPhoto = Boolean(overseer?.photoURL);

  return (
    <div className="flex w-full min-w-0 flex-col items-center">
      <div
        className="h-4 w-px shrink-0 bg-border sm:h-6 md:h-7"
        aria-hidden
      />

      <div
        className={cn(
          "w-full overflow-hidden rounded-xl border bg-white shadow-sm transition-all",
          expanded
            ? "border-brand ring-2 ring-brand/15"
            : "border-border hover:border-brand/40",
        )}
      >
        <button
          type="button"
          onClick={onToggle}
          className="w-full touch-manipulation p-2.5 text-center active:bg-off-white/80 sm:p-3"
        >
          <div className="flex flex-col items-center gap-1.5">
            {overseer && hasPhoto ? (
              <CouplePortrait leader={overseer} size="node" />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sky-soft text-sky-deep sm:h-16 sm:w-16">
                <MapPinned className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
            )}
            <p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-gold-deep sm:text-[10px]">
              {overseer ? titleLabel(overseer, t) : t.leadership.overseer}
            </p>
            <p className="w-full truncate font-display text-sm font-semibold text-ink">
              {region.name}
            </p>
            <p className="line-clamp-2 w-full px-0.5 text-[10px] leading-snug text-ink-muted sm:text-[11px]">
              {overseer ? headlineName(overseer) : "—"}
            </p>
            <p className="text-[10px] font-medium text-brand">
              {branchCount} {t.leadership.branches}
            </p>
            <span className="inline-flex min-h-8 items-center gap-0.5 text-[10px] font-semibold text-brand">
              {expanded ? t.leadership.collapse : t.leadership.expand}
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform",
                  expanded && "rotate-180",
                )}
              />
            </span>
          </div>
        </button>

        {expanded && (
          <div className="border-t border-border bg-off-white/80 px-2 py-2 sm:px-2.5">
            {overseer && (
              <button
                type="button"
                onClick={() => onSelectLeader(overseer)}
                className="mb-1.5 min-h-10 w-full rounded-lg border border-brand/15 bg-brand-muted/50 px-2 py-2 text-[11px] font-semibold text-brand hover:bg-brand-muted"
              >
                {t.leadership.viewBio}
              </button>
            )}
            <ul className="space-y-1.5">
              {pastors.map((pastor) => {
                const branch = BRANCHES.find((b) => b.id === pastor.branchId);
                return (
                  <li key={pastor.id}>
                    <button
                      type="button"
                      onClick={() => onSelectLeader(pastor)}
                      className="flex min-h-11 w-full items-center gap-2 rounded-lg border border-border bg-white px-2 py-1.5 text-left hover:border-brand"
                    >
                      <SingleAvatar
                        src={pastor.photoURL}
                        name={pastor.name}
                        size="sm"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[11px] font-semibold text-ink">
                          {pastor.name}
                        </span>
                        <span className="block truncate text-[10px] text-ink-muted">
                          {branch?.name ?? t.leadership.pastor}
                        </span>
                      </span>
                      <Church className="h-3 w-3 shrink-0 text-brand/40" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export function OrgTree() {
  const { t } = useI18n();
  const bishop = getBishop();
  const assistantBishop = getAssistantBishop();
  const cabinet = getNationalCabinet();
  const [selected, setSelected] = useState<Leader | null>(null);
  const [expandedRegion, setExpandedRegion] = useState<string | null>("kilifi");

  const upperRow = REGIONS.slice(0, 4);
  const lowerRow = REGIONS.slice(4, 7);

  return (
    <div className="w-full min-w-0 overflow-x-hidden">
      {/* Soft backdrop — reads well on phone without fighting the tree */}
      <div className="relative mx-auto w-full max-w-[90rem]">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-brand-muted/40 via-transparent to-transparent sm:h-64"
          aria-hidden
        />

        {/* ── Founder ── */}
        <div className="mx-auto flex w-full max-w-[20rem] flex-col items-center px-1 sm:max-w-md">
          <OrgBox
            leader={bishop}
            onClick={() => setSelected(bishop)}
            emphasis="gold"
            photoSize="hero"
          />
          <Trunk tall />
        </div>

        {/* ── Assistant Bishop ── */}
        <div className="mx-auto flex w-full max-w-[18rem] flex-col items-center px-1 sm:max-w-sm">
          <OrgBox
            leader={assistantBishop}
            onClick={() => setSelected(assistantBishop)}
            emphasis="soft"
            photoSize="apex"
          />
          <Trunk />
        </div>

        {/* ── National cabinet ──
            Mobile: stacked for readability
            sm+: 3-column wireframe row
        */}
        <div className="relative mx-auto w-full max-w-3xl">
          {/* Desktop bar under trunk into 3 stems */}
          <div
            className="pointer-events-none absolute left-[16%] right-[16%] top-0 hidden h-px bg-border sm:block"
            aria-hidden
          />
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3 md:gap-4">
            {cabinet.map((officer) => (
              <div key={officer.id} className="flex min-w-0 flex-col items-center">
                <div
                  className="hidden h-4 w-px bg-border sm:block"
                  aria-hidden
                />
                {/* Mobile: small connector from previous level */}
                <div
                  className="h-3 w-px bg-border sm:hidden"
                  aria-hidden
                />
                <OrgBox
                  leader={officer}
                  onClick={() => setSelected(officer)}
                  photoSize="node"
                  className="h-full"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto h-5 w-px bg-border sm:h-8" aria-hidden />

        {/* ── Regional Overseers ── */}
        <p className="mb-2 px-2 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-muted sm:mb-1">
          {t.leadership.regionalOverseers}
        </p>

        <div className="relative w-full">
          {/* Horizontal spine — tablet/desktop only */}
          <div
            className="pointer-events-none absolute left-[4%] right-[4%] top-0 z-0 hidden h-px bg-border md:left-[3%] md:right-[3%] md:block"
            aria-hidden
          />

          {/*
            Mobile: 2-col grid (all 7) — hierarchy still under national trunk
            md+: classic 4 + 3 wireframe
          */}
          <div className="relative z-[1] grid grid-cols-2 gap-x-2 gap-y-1 sm:gap-x-3 md:hidden">
            {REGIONS.map((region) => (
              <OverseerNode
                key={region.id}
                region={region}
                expanded={expandedRegion === region.id}
                onToggle={() =>
                  setExpandedRegion((cur) =>
                    cur === region.id ? null : region.id,
                  )
                }
                onSelectLeader={setSelected}
              />
            ))}
          </div>

          {/* Desktop / tablet large: 4 + 3 layout */}
          <div className="relative z-[1] hidden md:block">
            <div className="grid grid-cols-4 gap-x-3 lg:gap-x-5">
              {upperRow.map((region) => (
                <OverseerNode
                  key={region.id}
                  region={region}
                  expanded={expandedRegion === region.id}
                  onToggle={() =>
                    setExpandedRegion((cur) =>
                      cur === region.id ? null : region.id,
                    )
                  }
                  onSelectLeader={setSelected}
                />
              ))}
            </div>
            <div className="mx-auto mt-0 grid max-w-[78%] grid-cols-3 gap-x-3 lg:max-w-[70%] lg:gap-x-5">
              {lowerRow.map((region) => (
                <div
                  key={region.id}
                  className="relative flex flex-col items-center"
                >
                  <div
                    className="absolute bottom-full left-1/2 h-8 w-px -translate-x-1/2 bg-border lg:h-9"
                    aria-hidden
                  />
                  <OverseerNode
                    region={region}
                    expanded={expandedRegion === region.id}
                    onToggle={() =>
                      setExpandedRegion((cur) =>
                        cur === region.id ? null : region.id,
                      )
                    }
                    onSelectLeader={setSelected}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selected && (
        <BioModal leader={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
