"use client";

import { PageHero } from "@/components/PageHero";
import { OrgTree } from "@/components/leadership/OrgTree";
import {
  NationalDepartmentsSection,
  PastorsWelfareSection,
} from "@/components/leadership/NationalSections";
import { useI18n } from "@/lib/i18n/context";

export default function LeadershipPage() {
  const { t } = useI18n();

  return (
    <>
      <PageHero title={t.leadership.title} subtitle={t.leadership.subtitle} />

      {/* Full-width org chart — extra bottom padding for mobile scroll comfort */}
      <section className="overflow-x-clip bg-off-white py-8 sm:py-14">
        <div className="w-full min-w-0 px-2.5 sm:px-5 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <OrgTree />
        </div>
      </section>

      <NationalDepartmentsSection />
      <PastorsWelfareSection />
    </>
  );
}
