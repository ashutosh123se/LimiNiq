import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BlogListing } from "@/components/sections/blog/BlogListing";
import { LeadCTASection } from "@/components/sections/home/LeadCTASection";
import { FALLBACK_TRENDING_TOPICS } from "@/lib/data/blogEngagement";
import { blogTopicPath, getTopicBySlug, isBlogTopicSlug, topicToCategory } from "@/lib/blogRoutes";
import { buildPageMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return FALLBACK_TRENDING_TOPICS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) {
    return buildPageMetadata({
      title: "Insights & Strategy Blog",
      description: "LIMINIQ blog.",
      path: "/blog",
    });
  }

  return buildPageMetadata({
    title: `${topic.label} — Blog`,
    description: topic.description ?? `Trending topic: ${topic.label}. Read related insights from LIMINIQ.`,
    path: blogTopicPath(slug),
  });
}

export default async function BlogTopicPage({ params }: Props) {
  const { slug } = await params;
  if (!isBlogTopicSlug(slug)) notFound();

  const topic = getTopicBySlug(slug)!;
  const category = topicToCategory(slug);

  return (
    <div style={{ paddingTop: "5rem", background: "var(--bg-primary)" }}>
      <section style={{ padding: "6rem 0 4rem", position: "relative" }}>
        <div className="section-container">
          <div style={{ marginBottom: "3rem" }}>
            <div className="pill-badge" style={{ marginBottom: "1.5rem", display: "inline-flex" }}>
              <span style={{ color: "var(--accent-primary)" }}>{topic.emoji ?? "✦"}</span> Trending
            </div>
            <h1 className="text-hero" style={{ letterSpacing: "-0.04em" }}>
              {topic.label}
            </h1>
            {topic.description && (
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1.1rem",
                  color: "var(--text-secondary)",
                  marginTop: "1rem",
                  maxWidth: 600,
                }}
              >
                {topic.description}
              </p>
            )}
          </div>

          <Suspense fallback={<div style={{ color: "var(--text-secondary)" }}>Loading articles...</div>}>
            <BlogListing initialCategory={category} />
          </Suspense>
        </div>
      </section>

      <div style={{ padding: "4rem 0" }} />
      <LeadCTASection />
    </div>
  );
}
