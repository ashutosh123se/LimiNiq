import { Metadata } from "next";
import { Suspense } from "react";
import { BlogListing } from "@/components/sections/blog/BlogListing";
import { LeadCTASection } from "@/components/sections/home/LeadCTASection";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "Insights & Strategy Blog",
    description:
      "Read the latest insights on custom software development, SaaS engineering, SEO strategies, and digital marketing from the LIMINIQ team.",
    path: "/blog",
  });
}

export default function BlogPage() {
  return (
    <div style={{ paddingTop: "5rem", background: "var(--bg-primary)" }}>
      <section style={{ padding: "6rem 0 4rem", position: "relative" }}>
        <div className="section-container">
          <div style={{ marginBottom: "3rem" }}>
            <div className="pill-badge" style={{ marginBottom: "1.5rem", display: "inline-flex" }}>
              <span style={{ color: "var(--accent-primary)" }}>✦</span> Insights
            </div>
            <h1 className="text-hero" style={{ letterSpacing: "-0.04em" }}>
              The Growth <span style={{ color: "var(--text-secondary)" }}>Playbook</span>
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
              Software engineering, SEO, and marketing strategy — filter by topic below.
            </p>
          </div>

          <Suspense fallback={<div style={{ color: "var(--text-secondary)" }}>Loading articles...</div>}>
            <BlogListing />
          </Suspense>
        </div>
      </section>

      <div style={{ padding: "4rem 0" }} />

      <LeadCTASection />

      <style>{`
        .hover-brighten:hover { background: rgba(255,255,255,0.08) !important; color: white !important; }
      `}</style>
    </div>
  );
}
