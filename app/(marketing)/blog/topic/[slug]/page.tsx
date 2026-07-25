import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { BlogCard } from "@/components/sections/blog/BlogCard";
import { BlogNewsletter } from "@/components/sections/blog/BlogNewsletter";
import { LeadCTASection } from "@/components/sections/home/LeadCTASection";
import { getAllUnifiedPosts, getTopics, type UnifiedPost } from "@/lib/blog/posts";
import { slugifyHeading } from "@/lib/blog/mdx";
import { buildPageMetadata } from "@/lib/seo/metadata";

type Params = Promise<{ slug: string }>;

interface ResolvedTopic {
  topic: string;
  posts: UnifiedPost[];
}

async function resolveTopic(slug: string): Promise<ResolvedTopic | null> {
  const posts = await getAllUnifiedPosts();
  const topic = getTopics(posts).find((t) => slugifyHeading(t) === slug);
  if (!topic) return null;
  return { topic, posts: posts.filter((post) => post.topic === topic) };
}

export async function generateStaticParams() {
  const posts = await getAllUnifiedPosts();
  return getTopics(posts).map((topic) => ({ slug: slugifyHeading(topic) }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const resolved = await resolveTopic(slug);
  if (!resolved) {
    return buildPageMetadata({
      title: "Insights & Strategy Blog",
      description: "LIMINIQ blog.",
      path: "/blog",
    });
  }

  return buildPageMetadata({
    title: `${resolved.topic} — Blog`,
    description: `Articles on ${resolved.topic} from the LIMINIQ engineering, SEO, and marketing team.`,
    path: `/blog/topic/${slug}`,
  });
}

export default async function BlogTopicPage({ params }: { params: Params }) {
  const { slug } = await params;
  const resolved = await resolveTopic(slug);
  if (!resolved) notFound();

  const { topic, posts } = resolved;

  return (
    <div className="blog-index">
      <PageHero
        eyebrow="Topic"
        title={<>{topic}</>}
        description={`${posts.length} article${posts.length === 1 ? "" : "s"} on ${topic.toLowerCase()}.`}
      />

      <section className="section-container blog-index-section">
        {posts.length === 0 ? (
          <p style={{ color: "var(--text-secondary)" }}>No articles in this topic yet. Check back soon.</p>
        ) : (
          <div className="blog-grid">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>

      <BlogNewsletter />
      <LeadCTASection />

      <style>{`
        .blog-index { background: var(--bg-primary); overflow-x: clip; }
        .blog-index-section { padding-top: 0; padding-bottom: 2rem; }
      `}</style>
    </div>
  );
}
