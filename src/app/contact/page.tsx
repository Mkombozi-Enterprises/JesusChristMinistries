"use client";

import { FormEvent, useState } from "react";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n/context";

export default function ContactPage() {
  const { t } = useI18n();
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDone(true);
  }

  return (
    <>
      <PageHero title={t.contact.title} subtitle={t.contact.subtitle} />
      <Section narrow>
        {done ? (
          <Card className="border-l-4 border-l-gold text-center">
            <p className="font-display text-xl font-semibold text-brand">
              {t.contact.success}
            </p>
          </Card>
        ) : (
          <Card>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">
                  {t.common.name} *
                </label>
                <input
                  name="name"
                  required
                  className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">
                  {t.common.email} *
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">
                  {t.common.phone}
                </label>
                <input
                  name="phone"
                  type="tel"
                  className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">
                  {t.common.message} *
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
              <Button type="submit" variant="primary" size="lg" className="w-full">
                {t.common.submit}
              </Button>
            </form>
          </Card>
        )}
      </Section>
    </>
  );
}
