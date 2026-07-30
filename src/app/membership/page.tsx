"use client";

import { FormEvent, useState } from "react";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n/context";
import { BRANCHES, REGIONS } from "@/lib/mock-data";

export default function MembershipPage() {
  const { t } = useI18n();
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Later: write to Firestore /membershipApplications with status: pending
    setDone(true);
  }

  return (
    <>
      <PageHero title={t.membership.title} subtitle={t.membership.subtitle} />
      <Section narrow>
        {done ? (
          <Card className="border-l-4 border-l-gold text-center">
            <p className="font-display text-xl font-semibold text-brand">
              {t.membership.success}
            </p>
          </Card>
        ) : (
          <Card>
            <form onSubmit={onSubmit} className="space-y-4">
              <Field label={t.common.name} name="name" required />
              <Field label={t.common.phone} name="phone" type="tel" required />
              <Field label={t.common.email} name="email" type="email" />
              <Field label={t.membership.dob} name="dob" type="date" />
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">
                  {t.common.branch} *
                </label>
                <select
                  name="branchId"
                  required
                  className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                >
                  <option value="">{t.common.selectBranch}</option>
                  {REGIONS.map((r) => (
                    <optgroup key={r.id} label={r.name}>
                      {BRANCHES.filter((b) => b.regionId === r.id).map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">
                  {t.membership.previousChurch}
                </label>
                <input
                  name="previousChurch"
                  type="text"
                  placeholder={t.membership.previousChurchHint}
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

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required ? " *" : ""}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
      />
    </div>
  );
}
