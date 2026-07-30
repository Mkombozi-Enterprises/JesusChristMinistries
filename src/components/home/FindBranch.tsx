"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, MapPin, ChevronRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { useI18n } from "@/lib/i18n/context";
import { BRANCHES, REGIONS } from "@/lib/mock-data";

export function FindBranch() {
  const { t } = useI18n();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return BRANCHES.slice(0, 4);
    return BRANCHES.filter((b) => {
      const region = REGIONS.find((r) => r.id === b.regionId);
      return (
        b.name.toLowerCase().includes(q) ||
        b.address.toLowerCase().includes(q) ||
        region?.name.toLowerCase().includes(q) ||
        b.pastorName.toLowerCase().includes(q)
      );
    }).slice(0, 8);
  }, [query]);

  return (
    <Section tone="sky" id="find-branch">
      <SectionHeader
        eyebrow="Branches"
        title={t.home.findBranch}
        subtitle={t.home.findBranchHint}
      />

      <div className="mx-auto max-w-xl">
        <label className="relative block">
          <span className="sr-only">{t.common.search}</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.home.findBranchHint}
            className="w-full rounded-2xl border border-border bg-white py-3.5 pl-12 pr-4 text-sm text-ink shadow-sm placeholder:text-ink-muted/70 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
      </div>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {results.map((branch) => {
          const region = REGIONS.find((r) => r.id === branch.regionId);
          return (
            <li key={branch.id}>
              <Link href={`/branches/${branch.id}`}>
                <Card hover className="flex items-start gap-3 !p-4">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-muted text-brand">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-ink">
                      {branch.name}
                    </span>
                    <span className="mt-0.5 block text-sm text-ink-muted">
                      {region?.name}
                      {branch.isMainCampus ? " · Main Campus" : ""}
                    </span>
                  </span>
                  <ChevronRight className="mt-2 h-4 w-4 shrink-0 text-brand/50" />
                </Card>
              </Link>
            </li>
          );
        })}
      </ul>

      {results.length === 0 && (
        <p className="mt-6 text-center text-sm text-ink-muted">
          No branches match “{query}”. Try a region name.
        </p>
      )}

      <div className="mt-8 text-center">
        <Link
          href="/regions"
          className="text-sm font-semibold text-brand hover:text-brand-deep"
        >
          {t.common.viewAll} →
        </Link>
      </div>
    </Section>
  );
}
