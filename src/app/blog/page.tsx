"use client";

import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { useI18n } from "@/lib/i18n/context";
import { formatDate } from "@/lib/utils";

/** Placeholder posts until Firestore blogPosts is wired */
const POSTS = [
  {
    slug: "welcome-to-jcm",
    title: {
      en: "Welcome to Jesus Christ Ministries",
      sw: "Karibu Jesus Christ Ministries",
    },
    excerpt: {
      en: "An introduction to our family of faith across seven regions of Kenya.",
      sw: "Utangulizi wa familia yetu ya imani katika mikoa saba ya Kenya.",
    },
    authorName: "Bishop Edward Musamusi",
    publishDate: "2026-07-01",
    category: "news" as const,
  },
  {
    slug: "walking-in-the-spirit",
    title: {
      en: "Walking in the Spirit Daily",
      sw: "Kutembea katika Roho Kila Siku",
    },
    excerpt: {
      en: "A short devotional on yielding to the Holy Spirit in everyday life.",
      sw: "Devosheni fupi kuhusu kujisalimisha kwa Roho Mtakatifu katika maisha ya kila siku.",
    },
    authorName: "Jesus Christ Ministries",
    publishDate: "2026-07-10",
    category: "devotional" as const,
  },
];

export default function BlogPage() {
  const { t, locale } = useI18n();

  return (
    <>
      <PageHero title={t.blog.title} subtitle={t.blog.subtitle} />
      <Section>
        <div className="grid gap-5 sm:grid-cols-2">
          {POSTS.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card hover className="h-full">
                <p className="text-xs font-semibold uppercase tracking-wider text-gold-deep">
                  {t.blog.categories[post.category]} ·{" "}
                  {formatDate(post.publishDate, locale)}
                </p>
                <h2 className="mt-2 font-display text-xl font-semibold text-ink">
                  {post.title[locale]}
                </h2>
                <p className="mt-2 text-sm text-ink-muted">
                  {post.excerpt[locale]}
                </p>
                <p className="mt-4 text-xs text-brand">{post.authorName}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
