"use client";

import { useParams } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n/context";
import { formatDate } from "@/lib/utils";

const POSTS: Record<
  string,
  {
    title: { en: string; sw: string };
    body: { en: string; sw: string };
    authorName: string;
    publishDate: string;
  }
> = {
  "welcome-to-jcm": {
    title: {
      en: "Welcome to Jesus Christ Ministries",
      sw: "Karibu Jesus Christ Ministries",
    },
    body: {
      en: "Jesus Christ Ministries is a Spirit-filled Pentecostal family spanning seven regions and more than twenty branches across Kenya. Under the leadership of Bishop Edward Musamusi and Edith Fedha Musamusi, we exist to proclaim the Gospel, make disciples, and plant strong local churches.\n\nWhether you are visiting for the first time or joining as a member, you are welcome here.",
      sw: "Jesus Christ Ministries ni familia ya Kipentekoste yenye Roho Mtakatifu inayofikia mikoa saba na matawi zaidi ya ishirini nchini Kenya. Chini ya uongozi wa Askofu Edward Musamusi na Edith Fedha Musamusi, tuko hapa kutangaza Injili, kuwafanya wanafunzi, na kupanda makanisa thabiti ya mitaa.\n\nIwe unatembelea kwa mara ya kwanza au unajiunga kama mwanachama, karibu sana.",
    },
    authorName: "Bishop Edward Musamusi",
    publishDate: "2026-07-01",
  },
  "walking-in-the-spirit": {
    title: {
      en: "Walking in the Spirit Daily",
      sw: "Kutembea katika Roho Kila Siku",
    },
    body: {
      en: "Galatians 5:16 says, \"Walk by the Spirit, and you will not gratify the desires of the flesh.\" Walking in the Spirit is not a one-time event — it is a daily surrender. Begin your day in prayer, stay sensitive to the Holy Spirit's leading, and let the Word of God renew your mind.\n\nMay the Lord fill you afresh today.",
      sw: "Wagalatia 5:16 inasema, \"Enendeni katika Roho, wala hamtaitimiza tamaa ya mwili.\" Kutembea katika Roho si tukio la mara moja — ni kujisalimisha kila siku. Anza siku yako kwa maombi, kaa unayetambua uongozi wa Roho Mtakatifu, na uache Neno la Mungu libadilishe akili yako.\n\nBwana akujaze upya leo.",
    },
    authorName: "Jesus Christ Ministries",
    publishDate: "2026-07-10",
  },
};

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, locale } = useI18n();
  const post = POSTS[slug];

  if (!post) {
    return (
      <Section>
        <p className="text-ink-muted">Post not found.</p>
        <ButtonLink href="/blog" variant="primary" className="mt-4">
          {t.common.back}
        </ButtonLink>
      </Section>
    );
  }

  return (
    <>
      <PageHero
        title={post.title[locale]}
        subtitle={`${post.authorName} · ${formatDate(post.publishDate, locale)}`}
      />
      <Section narrow>
        <article className="prose prose-lg max-w-none">
          {post.body[locale].split("\n\n").map((para, i) => (
            <p key={i} className="mb-4 leading-relaxed text-ink-muted">
              {para}
            </p>
          ))}
        </article>
        <ButtonLink href="/blog" variant="secondary" className="mt-8">
          ← {t.common.back}
        </ButtonLink>
      </Section>
    </>
  );
}
