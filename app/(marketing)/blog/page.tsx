import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { FeaturedPost } from "@/components/sections/blog/FeaturedPost";
import { BlogGrid } from "@/components/sections/blog/BlogGrid";
import { BlogNewsletter } from "@/components/sections/blog/BlogNewsletter";
import { LeadCTASection } from "@/components/sections/home/LeadCTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllUnifiedPosts, getTopics } from "@/lib/blog/posts";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "Insights & Strategy Blog",
    description:
      "Read the latest insights on custom software development, SaaS engineering, SEO strategies, and digital marketing from the LIMINIQ team.",
    path: "/blog",
  });
}

export default async function BlogPage() {
  const posts = await getAllUnifiedPosts();
  const [featured, ...rest] = posts;
  const topics = getTopics(posts);

  return (
    <div className="blog-index">
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }])} />

      <PageHero
        eyebrow="Insights"
        title={
          <>
            The Growth <span className="text-gradient">Playbook</span>
          </>
        }
        description="Software engineering, SEO, and marketing strategy — written by the team that ships the work."
      />

      <section className="section-container blog-index-section">
        {featured && <FeaturedPost post={featured} />}

        {rest.length > 0 ? (
          <BlogGrid posts={rest} topics={topics} />
        ) : (
          <p style={{ color: "var(--text-secondary)" }}>More articles coming soon.</p>
        )}
      </section>

      <BlogNewsletter />

      <LeadCTASection />

      <style>{`
        .blog-index {
          background: var(--bg-primary);
          overflow-x: clip;
        }
        .blog-index-section {
          padding-top: 0;
          padding-bottom: 2rem;
        }
      `}</style>
    </div>
  );
}
