import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { LeadCTASection } from "@/components/sections/home/LeadCTASection";
import { BlogPollWidget } from "@/components/sections/blog/BlogPollWidget";
import { TrendingTopicsBar } from "@/components/sections/blog/TrendingTopicsBar";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Eye, Flame } from "lucide-react";
import type { PollOption } from "@/lib/data/blogEngagement";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const post = await prisma.blogPost.findUnique({ where: { slug } });
    if (!post) return { title: "Post Not Found" };
    return {
      title: post.metaTitle || post.title,
      description: post.metaDesc || post.excerpt,
      openGraph: { images: [post.ogImage || post.coverImage || ""] },
    };
  } catch {
    return { title: "Blog Post" };
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post;

  try {
    post = await prisma.blogPost.findUnique({ where: { slug } });
    if (post) {
      await prisma.blogPost.update({ where: { id: post.id }, data: { views: { increment: 1 } } });
    }
  } catch {
    post = null;
  }

  if (!post) return notFound();

  const isPoll = post.postType === "POLL";
  const pollOptions = (post.pollOptions as PollOption[] | null) ?? [];

  return (
    <article style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <header
        style={{
          padding: isPoll ? "8rem 0 3rem" : "10rem 0 6rem",
          background: post.coverImage
            ? `linear-gradient(to bottom, rgba(10,15,44,0.7), var(--bg-primary)), url(${post.coverImage}) center/cover`
            : "var(--bg-secondary)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div className="section-container">
          <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--text-tertiary)", textDecoration: "none", fontFamily: "var(--font-heading)", fontWeight: 600, marginBottom: "2rem" }} className="hover-brighten">
            <ArrowLeft size={16} /> Back to Lab
          </Link>

          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
            <span className="pill-badge" style={{ background: "rgba(59,91,255,0.1)", color: "var(--accent-blue)", borderColor: "rgba(59,91,255,0.2)" }}>
              {isPoll ? "Community Poll" : post.category}
            </span>
            {post.trending && (
              <span className="pill-badge" style={{ background: "rgba(239,68,68,0.12)", color: "#fca5a5", borderColor: "rgba(239,68,68,0.25)", display: "inline-flex", alignItems: "center", gap: 4 }}>
                <Flame size={12} /> Trending
              </span>
            )}
          </div>

          <h1 className="text-hero" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.03em", marginBottom: "1.5rem", maxWidth: 900 }}>
            {post.title}
          </h1>

          {!isPoll && (
            <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", maxWidth: 720, lineHeight: 1.7, marginBottom: "1.5rem" }}>
              {post.excerpt}
            </p>
          )}

          <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", alignItems: "center", fontSize: "0.95rem", color: "var(--text-secondary)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><User size={16} /> {post.author}</div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><Calendar size={16} /> {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" }) : "Draft"}</div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><Eye size={16} /> {post.views + 1} views</div>
          </div>
        </div>
      </header>

      <div className="section-container" style={{ padding: "3rem 0 4rem" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <TrendingTopicsBar compact />

          {isPoll ? (
            <BlogPollWidget
              postId={post.id}
              slug={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              options={pollOptions}
              pollEndsAt={post.pollEndsAt?.toISOString()}
            />
          ) : (
            <>
              <div
                className="prose-content"
                style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", lineHeight: 1.8, color: "var(--text-secondary)" }}
                dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br/>") }}
              />
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "2.5rem", paddingTop: "2rem", borderTop: "1px solid var(--border-subtle)" }}>
                {post.tags.map((tag) => (
                  <span key={tag} style={{ padding: "6px 14px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 100, fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    #{tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <LeadCTASection />

      <style>{`
        .prose-content h2 { font-family: var(--font-heading); font-size: 2rem; color: white; margin-top: 3rem; margin-bottom: 1.5rem; font-weight: 700; }
        .prose-content h3 { font-family: var(--font-heading); font-size: 1.5rem; color: white; margin-top: 2rem; margin-bottom: 1rem; font-weight: 600; }
        .prose-content p { margin-bottom: 1.5rem; }
        .prose-content a { color: var(--accent-blue); text-decoration: underline; text-underline-offset: 4px; }
      `}</style>
    </article>
  );
}
