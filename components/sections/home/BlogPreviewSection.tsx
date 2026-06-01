"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const FALLBACK_POSTS = [
  {
    id: "1",
    slug: "core-web-vitals-2025-guide",
    title: "Core Web Vitals 2025: The Complete Developer's Playbook",
    excerpt: "LCP, INP, CLS — everything changed in 2025. Here's how to hit green scores across all three, with real code examples.",
    category: "Web Dev",
    readTime: "8 min",
    author: "Aryan Shah",
    createdAt: new Date("2026-05-28").toISOString(),
    gradient: "linear-gradient(135deg, #3B5BFF, #7B61FF)",
  },
  {
    id: "2",
    slug: "seo-entity-building-strategy",
    title: "Entity SEO: Why Google's Knowledge Graph Is Your Biggest Ranking Lever",
    excerpt: "Most agencies still chase backlinks. The real game in 2025 is entity authority — here's the LIMINIQ framework.",
    category: "SEO",
    readTime: "12 min",
    author: "Priya Nair",
    createdAt: new Date("2026-05-22").toISOString(),
    gradient: "linear-gradient(135deg, #00C8A0, #3B5BFF)",
  },
  {
    id: "3",
    slug: "meta-ads-roas-scaling",
    title: "How We Scaled a Meta Campaign from 1.2x to 4.8x ROAS in 60 Days",
    excerpt: "A behind-the-scenes breakdown of our creative testing framework, audience architecture, and bid strategy.",
    category: "Digital Marketing",
    readTime: "10 min",
    author: "Rohan Mehta",
    createdAt: new Date("2026-05-15").toISOString(),
    gradient: "linear-gradient(135deg, #7B61FF, #00C8A0)",
  },
];

export function BlogPreviewSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [posts, setPosts] = useState<any[]>(FALLBACK_POSTS);

  useEffect(() => {
    fetch("/api/blog?limit=3&published=true")
      .then(res => res.json())
      .then(data => {
        if (data.posts && data.posts.length > 0) {
          // Add gradients dynamically based on category
          const enhancedPosts = data.posts.map((p: any) => ({
            ...p,
            readTime: `${Math.max(3, Math.ceil((p.content?.length || 2000) / 1000))} min`,
            gradient: p.category.toLowerCase().includes("seo") 
              ? "linear-gradient(135deg, #00C8A0, #3B5BFF)"
              : p.category.toLowerCase().includes("marketing")
              ? "linear-gradient(135deg, #7B61FF, #00C8A0)"
              : "linear-gradient(135deg, #3B5BFF, #7B61FF)"
          }));
          setPosts(enhancedPosts);
        }
      })
      .catch(() => console.error("Failed to load live blog posts, using fallback"));
  }, []);

  return (
    <section ref={ref} className="section-padding" style={{ background: "var(--bg-secondary)", position: "relative", overflow: "hidden" }}>

      <div className="section-container" style={{ position: "relative" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "3rem" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}>
            <div className="pill-badge shimmer" style={{ marginBottom: "1rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>
              <span style={{ color: "var(--accent-blue)" }}>✦</span> Insights
            </div>
            <h2 className="text-section" style={{ color: "var(--text-primary)" }}>
              From the LIMINIQ <span style={{ color: "var(--text-primary)" }}>Lab</span>
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}>
            <Link href="/blog" className="btn-secondary btn-sm">View All Articles →</Link>
          </motion.div>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12 }}
            >
              <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
                <div className="glass-card neon-border-hover" style={{ overflow: "hidden", height: "100%" }}>
                  {/* Cover */}
                  <div style={{ height: 140, background: post.coverImage ? `url(${post.coverImage}) center/cover` : post.gradient, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                    {!post.coverImage && (
                      <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2rem", color: "rgba(255,255,255,0.12)" }}>
                        {post.category}
                      </span>
                    )}
                    <span
                      className={`pill-badge pill-badge-${post.category.toLowerCase().includes("seo") ? "teal" : post.category.toLowerCase().includes("marketing") ? "violet" : "blue"}`}
                      style={{ position: "absolute", top: "0.75rem", left: "0.75rem", background: "rgba(255,255,255,0.2)", color: "white", borderColor: "rgba(255,255,255,0.3)" }}
                    >
                      {post.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1 }}>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.4, margin: 0 }}>
                      {post.title}
                    </h3>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "auto", paddingTop: "0.5rem", borderTop: "1px solid rgba(59,91,255,0.06)" }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--gradient-hero)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ color: "white", fontSize: "0.7rem", fontWeight: 700 }}>{post.author.charAt(0)}</span>
                      </div>
                      <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.78rem", color: "var(--text-secondary)" }}>{post.author}</span>
                      <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.75rem", color: "var(--text-tertiary)", marginLeft: "auto" }}>{post.readTime} read</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
