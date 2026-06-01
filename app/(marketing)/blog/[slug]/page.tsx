import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { LeadCTASection } from "@/components/sections/home/LeadCTASection";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Eye, Share2 } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const post = await prisma.blogPost.findUnique({ where: { slug } });
    if (!post) return { title: "Post Not Found" };
    return {
      title: post.metaTitle || `${post.title} | LIMINIQ`,
      description: post.metaDesc || post.excerpt,
      openGraph: {
        images: [post.ogImage || post.coverImage || ""],
      },
    };
  } catch (err) {
    return { title: "Blog Post" };
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post;

  try {
    post = await prisma.blogPost.findUnique({ where: { slug } });
    if (post) {
      // Increment views
      await prisma.blogPost.update({ where: { id: post.id }, data: { views: { increment: 1 } } });
    }
  } catch (err) {
    // DB disconnected fallback
    post = null;
  }

  if (!post) {
    return notFound();
  }

  return (
    <article style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      
      {/* Hero Header */}
      <header style={{ 
        padding: "10rem 0 6rem", 
        background: post.coverImage ? `linear-gradient(to bottom, rgba(10,15,44,0.7), var(--bg-primary)), url(${post.coverImage}) center/cover` : "var(--bg-secondary)",
        borderBottom: "1px solid var(--border-subtle)",
        position: "relative"
      }}>
        <div className="section-container" style={{ position: "relative", zIndex: 10 }}>
          <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--text-tertiary)", textDecoration: "none", fontFamily: "var(--font-heading)", fontWeight: 600, marginBottom: "2rem" }} className="hover-brighten">
            <ArrowLeft size={16} /> Back to Blog
          </Link>
          
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
            <span className="pill-badge" style={{ background: "rgba(59,91,255,0.1)", color: "var(--accent-blue)", borderColor: "rgba(59,91,255,0.2)" }}>
              {post.category}
            </span>
          </div>

          <h1 className="text-hero" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.03em", marginBottom: "2rem", maxWidth: 900 }}>
            {post.title}
          </h1>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", alignItems: "center", fontFamily: "var(--font-body)", color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><User size={16} className="text-accent-primary" /> {post.author}</div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><Calendar size={16} className="text-accent-primary" /> {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" }) : "Draft"}</div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><Eye size={16} className="text-accent-primary" /> {post.views + 1} views</div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="section-container" style={{ padding: "4rem 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4rem", maxWidth: 800, margin: "0 auto" }}>
          
          {/* Markdown/HTML Content rendering */}
          <div 
            className="prose-content"
            style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", lineHeight: 1.8, color: "var(--text-secondary)" }}
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }}
          />
          
          {/* Tags & Share */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem", padding: "2rem 0", borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)", marginTop: "2rem" }}>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {post.tags.map(tag => (
                <span key={tag} style={{ padding: "6px 14px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 100, fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                  #{tag}
                </span>
              ))}
            </div>
            
            <button className="btn-secondary btn-sm" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Share2 size={16} /> Share Article
            </button>
          </div>

        </div>
      </div>

      <LeadCTASection />

      <style>{`
        .prose-content h2 { fontFamily: var(--font-heading); fontSize: 2rem; color: white; marginTop: 3rem; marginBottom: 1.5rem; fontWeight: 700; }
        .prose-content h3 { fontFamily: var(--font-heading); fontSize: 1.5rem; color: white; marginTop: 2rem; marginBottom: 1rem; fontWeight: 600; }
        .prose-content p { marginBottom: 1.5rem; }
        .prose-content a { color: var(--accent-blue); textDecoration: underline; textUnderlineOffset: 4px; }
        .prose-content ul, .prose-content ol { paddingLeft: 1.5rem; marginBottom: 1.5rem; }
        .prose-content li { marginBottom: 0.5rem; }
        .prose-content blockquote { borderLeft: 4px solid var(--accent-primary); paddingLeft: 1.5rem; color: rgba(255,255,255,0.8); fontStyle: italic; background: rgba(255,255,255,0.02); padding: 1.5rem; borderRadius: 0 12px 12px 0; }
        .prose-content img { maxWidth: 100%; height: auto; borderRadius: 16px; margin: 2rem 0; }
      `}</style>
    </article>
  );
}
