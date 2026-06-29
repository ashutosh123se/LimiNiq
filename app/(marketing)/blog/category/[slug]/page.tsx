import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BlogListing } from "@/components/sections/blog/BlogListing";
import { LeadCTASection } from "@/components/sections/home/LeadCTASection";
import { BLOG_CATEGORY_FILTERS } from "@/lib/data/blogCategories";
import { blogCategoryPath, isBlogCategorySlug } from "@/lib/blogRoutes";
import { buildPageMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BLOG_CATEGORY_FILTERS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isBlogCategorySlug(slug)) {
    return buildPageMetadata({
      title: "Insights & Strategy Blog",
      description: "LIMINIQ blog.",
      path: "/blog",
    });
  }

  const label = BLOG_CATEGORY_FILTERS.find((c) => c.slug === slug)?.label ?? slug;
  return buildPageMetadata({
    title: `${label} Articles`,
    description: `Read LIMINIQ insights on ${label.toLowerCase()} — custom software, SEO, and digital marketing strategy.`,
    path: blogCategoryPath(slug),
  });
}

export default async function BlogCategoryPage({ params }: Props) {
  const { slug } = await params;
  if (!isBlogCategorySlug(slug)) notFound();

  const label = BLOG_CATEGORY_FILTERS.find((c) => c.slug === slug)?.label ?? slug;

  return (
    <div style={{ paddingTop: "5rem", background: "var(--bg-primary)" }}>
      <section style={{ padding: "6rem 0 4rem", position: "relative" }}>
        <div className="section-container">
          <div style={{ marginBottom: "3rem" }}>
            <div className="pill-badge" style={{ marginBottom: "1.5rem", display: "inline-flex" }}>
              <span style={{ color: "var(--accent-primary)" }}>✦</span> {label}
            </div>
            <h1 className="text-hero" style={{ letterSpacing: "-0.04em" }}>
              {label} <span style={{ color: "var(--text-secondary)" }}>Insights</span>
            </h1>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.1rem",
                color: "var(--text-secondary)",
                marginTop: "1rem",
                maxWidth: 600,
              }}
            >
              Articles and polls focused on {label.toLowerCase()}.
            </p>
          </div>

          <Suspense fallback={<div style={{ color: "var(--text-secondary)" }}>Loading articles...</div>}>
            <BlogListing initialCategory={slug} />
          </Suspense>
        </div>
      </section>

      <div style={{ padding: "4rem 0" }} />
      <LeadCTASection />
    </div>
  );
}
