"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Flame } from "lucide-react";
import { TrendingTopicsBar } from "../blog/TrendingTopicsBar";
import { BlogPollWidget } from "../blog/BlogPollWidget";
import type { PollOption } from "@/lib/data/blogEngagement";

const FALLBACK_POSTS = [
  {
    id: "1",
    slug: "core-web-vitals-2025-guide",
    title: "Core Web Vitals 2025: The Complete Developer's Playbook",
    excerpt: "LCP, INP, CLS — everything changed in 2025. Here's how to hit green scores across all three.",
    category: "Web Dev",
    readTime: "8 min",
    author: "Aryan Shah",
    postType: "ARTICLE",
    trending: true,
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    gradient: "linear-gradient(135deg, #3B5BFF, #7B61FF)",
  },
  {
    id: "poll-1",
    slug: "biggest-growth-priority-2026",
    title: "What's your #1 growth priority in 2026?",
    excerpt: "Cast your vote — see what founders and marketers are prioritising.",
    category: "Insights",
    author: "LIMINIQ Team",
    postType: "POLL",
    pollOptions: [
      { id: "opt-1", label: "Custom software / SaaS", votes: 42 },
      { id: "opt-2", label: "SEO & organic traffic", votes: 38 },
      { id: "opt-3", label: "Paid ads & marketing", votes: 29 },
    ],
    gradient: "linear-gradient(135deg, #7B61FF, #00C8A0)",
  },
  {
    id: "2",
    slug: "seo-entity-building-strategy",
    title: "Entity SEO: Why Google's Knowledge Graph Is Your Biggest Ranking Lever",
    excerpt: "The real game in 2025 is entity authority — here's the LIMINIQ framework.",
    category: "SEO",
    readTime: "12 min",
    author: "Priya Nair",
    postType: "ARTICLE",
    trending: false,
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    gradient: "linear-gradient(135deg, #00C8A0, #3B5BFF)",
  },
];

export function BlogPreviewSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [posts, setPosts] = useState<any[]>(FALLBACK_POSTS);

  useEffect(() => {
    Promise.all([
      fetch("/api/blog?limit=3&published=true").then((r) => r.json()),
      fetch("/api/blog?limit=1&published=true&postType=POLL").then((r) => r.json()),
    ])
      .then(([articlesData, pollsData]) => {
        const articles = (articlesData.posts || []).filter((p: any) => p.postType !== "POLL");
        const poll = pollsData.posts?.[0];
        let combined = articles.slice(0, 2);

        if (poll) {
          combined = [articles[0], poll, articles[1]].filter(Boolean).slice(0, 3);
        } else if (articles.length >= 3) {
          combined = articles.slice(0, 3);
        }

        if (combined.length) {
          setPosts(
            combined.map((p: any) => {
              const isSEO = p.category?.toLowerCase().includes("seo");
              const isMarketing = p.category?.toLowerCase().includes("marketing");
              let fallbackImage =
                "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800";
              if (isSEO)
                fallbackImage =
                  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800";
              else if (isMarketing)
                fallbackImage =
                  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800";

              return {
                ...p,
                readTime: `${Math.max(3, Math.ceil((p.content?.length || 2000) / 1000))} min`,
                coverImage: p.coverImage || fallbackImage,
                gradient: isSEO
                  ? "linear-gradient(135deg, #00C8A0, #3B5BFF)"
                  : isMarketing
                  ? "linear-gradient(135deg, #7B61FF, #00C8A0)"
                  : "linear-gradient(135deg, #3B5BFF, #7B61FF)",
              };
            })
          );
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section ref={ref} className="section-padding" style={{ background: "var(--bg-secondary)", position: "relative", overflow: "hidden" }}>
      <div className="section-container" style={{ position: "relative" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}>
            <div className="pill-badge shimmer" style={{ marginBottom: "1rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>
              <span style={{ color: "var(--accent-blue)" }}>✦</span> Insights & Engagement
            </div>
            <h2 className="text-section" style={{ color: "var(--text-primary)" }}>
              From the LIMINIQ <span className="text-gradient">Lab</span>
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}>
            <Link href="/blog" className="btn-secondary btn-sm">View All →</Link>
          </motion.div>
        </div>

        <TrendingTopicsBar compact />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12 }}
            >
              {post.postType === "POLL" ? (
                <BlogPollWidget
                  postId={post.id}
                  slug={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  options={(post.pollOptions as PollOption[]) || []}
                  pollEndsAt={post.pollEndsAt}
                  compact
                  showLink
                />
              ) : (
                <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
                  <div className="glass-card neon-border-hover" style={{ overflow: "hidden", height: "100%" }}>
                    <div style={{ height: 140, background: post.coverImage ? `url(${post.coverImage}) center/cover` : post.gradient, position: "relative" }}>
                      <span className="pill-badge" style={{ position: "absolute", top: "0.75rem", left: "0.75rem", background: "rgba(255,255,255,0.2)", color: "white" }}>
                        {post.category}
                      </span>
                      {post.trending && (
                        <span style={{ position: "absolute", top: "0.75rem", right: "0.75rem", display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 100, fontSize: "0.65rem", fontWeight: 700, background: "rgba(239,68,68,0.2)", color: "#fca5a5" }}>
                          <Flame size={11} /> Hot
                        </span>
                      )}
                    </div>
                    <div style={{ padding: "1.25rem" }}>
                      <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.4, margin: "0 0 0.75rem" }}>
                        {post.title}
                      </h3>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {post.excerpt}
                      </p>
                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem", fontSize: "0.78rem", color: "var(--text-tertiary)" }}>
                        <span>{post.author}</span>
                        <span>{post.readTime} read</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
