"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Flame } from "lucide-react";
import { TrendingTopicsBar } from "../blog/TrendingTopicsBar";
import { BlogPollWidget } from "../blog/BlogPollWidget";
import type { PollOption } from "@/lib/data/blogEngagement";

interface PreviewPost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  category?: string;
  readTime?: string;
  author?: string;
  postType?: string;
  trending?: boolean;
  coverImage?: string | null;
  gradient?: string;
  pollOptions?: PollOption[];
  pollEndsAt?: string | null;
  content?: string;
}

const FALLBACK_POSTS: PreviewPost[] = [
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

function ArticlePreviewCard({ post }: { post: PreviewPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="blog-preview-card glass-card neon-border-hover">
      <div
        className="blog-preview-cover"
        style={{
          background: post.coverImage
            ? `url(${post.coverImage}) center/cover`
            : post.gradient,
        }}
      >
        <span className="blog-preview-category">{post.category}</span>
        {post.trending && (
          <span className="blog-preview-hot">
            <Flame size={11} /> Hot
          </span>
        )}
      </div>
      <div className="blog-preview-body">
        <h3 className="blog-preview-title">{post.title}</h3>
        <p className="blog-preview-excerpt">{post.excerpt}</p>
        <div className="blog-preview-meta">
          <span>{post.author}</span>
          <span>{post.readTime} read</span>
        </div>
      </div>
    </Link>
  );
}

export function BlogPreviewSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [posts, setPosts] = useState<PreviewPost[]>(FALLBACK_POSTS);

  useEffect(() => {
    Promise.all([
      fetch("/api/blog?limit=3&published=true").then((r) => r.json()),
      fetch("/api/blog?limit=1&published=true&postType=POLL").then((r) => r.json()),
    ])
      .then(([articlesData, pollsData]) => {
        const articles = (articlesData.posts || []).filter((p: PreviewPost) => p.postType !== "POLL");
        const poll = pollsData.posts?.[0];
        let combined: PreviewPost[] = articles.slice(0, 2);

        if (poll) {
          combined = [articles[0], poll, articles[1]].filter(Boolean).slice(0, 3);
        } else if (articles.length >= 3) {
          combined = articles.slice(0, 3);
        }

        if (combined.length) {
          setPosts(
            combined.map((p: PreviewPost) => {
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
    <section ref={ref} className="blog-preview-section section-padding">
      <div className="section-container blog-preview-inner">
        <div className="blog-preview-header">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}>
            <div className="pill-badge shimmer blog-preview-badge">
              <span style={{ color: "var(--accent-blue)" }}>✦</span> Insights & Engagement
            </div>
            <h2 className="section-h2 blog-preview-heading">
              From the LIMINIQ <span className="text-gradient">Lab</span>
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}>
            <Link href="/blog" className="btn-secondary btn-sm">View All →</Link>
          </motion.div>
        </div>

        <TrendingTopicsBar compact />

        <div className="blog-preview-grid">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              className="blog-preview-cell"
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
                  embedded
                />
              ) : (
                <ArticlePreviewCard post={post} />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .blog-preview-section {
          background: var(--bg-secondary);
          position: relative;
          overflow: hidden;
        }

        .blog-preview-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .blog-preview-badge {
          margin-bottom: 1rem;
          display: inline-flex;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
        }

        .blog-preview-heading {
          margin: 0;
        }

        .blog-preview-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.25rem;
          align-items: stretch;
        }

        .blog-preview-cell {
          display: flex;
          min-height: 0;
          height: 100%;
        }

        .blog-preview-cell > * {
          width: 100%;
        }

        .blog-preview-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow: hidden;
          border-radius: 20px;
          text-decoration: none;
        }

        .blog-preview-cover {
          height: 140px;
          flex-shrink: 0;
          position: relative;
          background-size: cover;
          background-position: center;
        }

        .blog-preview-category {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          padding: 4px 10px;
          border-radius: 100px;
          font-family: var(--font-mono);
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          background: rgba(0, 0, 0, 0.45);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(6px);
        }

        .blog-preview-hot {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 3px 8px;
          border-radius: 100px;
          font-size: 0.65rem;
          font-weight: 700;
          background: rgba(239, 68, 68, 0.2);
          color: #fca5a5;
        }

        .blog-preview-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 1.25rem;
          min-height: 0;
        }

        .blog-preview-title {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.35;
          margin: 0 0 0.75rem;
          min-height: calc(1.35em * 2);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .blog-preview-excerpt {
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
          min-height: calc(1.6em * 2);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .blog-preview-meta {
          display: flex;
          justify-content: space-between;
          gap: 0.75rem;
          margin-top: auto;
          padding-top: 1rem;
          font-size: 0.82rem;
          color: var(--text-secondary);
        }

        @media (max-width: 960px) {
          .blog-preview-grid {
            grid-template-columns: 1fr;
            max-width: 420px;
            margin: 0 auto;
          }
        }

        @media (min-width: 961px) and (max-width: 1100px) {
          .blog-preview-grid {
            gap: 1rem;
          }

          .blog-preview-body {
            padding: 1rem;
          }
        }
      `}</style>
    </section>
  );
}
