"use client";

import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale } = useI18n();

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-white p-0.5 text-xs font-semibold shadow-sm",
        className,
      )}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={cn(
          "rounded-full px-2.5 py-1 transition-colors",
          locale === "en"
            ? "bg-brand text-white"
            : "text-ink-muted hover:text-brand",
        )}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("sw")}
        className={cn(
          "rounded-full px-2.5 py-1 transition-colors",
          locale === "sw"
            ? "bg-brand text-white"
            : "text-ink-muted hover:text-brand",
        )}
        aria-pressed={locale === "sw"}
      >
        SW
      </button>
    </div>
  );
}
