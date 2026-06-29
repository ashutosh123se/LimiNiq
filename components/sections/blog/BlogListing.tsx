"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Flame, BarChart3 } from "lucide-react";
import { BLOG_CATEGORY_FILTERS } from "@/lib/data/blogCategories";
import { TrendingTopicsBar } from "./TrendingTopicsBar";
import { BlogPollWidget } from "./BlogPollWidget";
import type { PollOption } from "@/lib/data/blogEngagement";

const FALLBACK_POSTS = [
  {
    id: "1",
    slug: "core-web-vitals-2025-guide",
    title: "Core Web Vitals 2025: The Complete Developer's Playbook",
    excerpt:
      "LCP, INP, CLS — everything changed in 2025. Here's how to hit green scores across all three, with real code examples.",
    category: "Web Dev",
    author: "Aryan Shah",
    readTime: "8 min",
    postType: "ARTICLE",
    trending: true,
    gradient: "linear-gradient(135deg, #3B5BFF, #7B61FF)",
  },
  {
    id: "2",
    slug: "seo-entity-building-strategy",
    title: "Entity SEO: Why Google's Knowledge Graph Is Your Biggest Ranking Lever",
    excerpt:
      "Most agencies still chase backlinks. The real game in 2025 is entity authority — here's the LIMINIQ framework.",
    category: "SEO",
    author: "Priya Nair",
    readTime: "12 min",
    postType: "ARTICLE",
    trending: false,
    gradient: "linear-gradient(135deg, #00C8A0, #3B5BFF)",
  },
  {
    id: "poll-1",
    slug: "biggest-growth-priority-2026",
    title: "What's your #1 growth priority in 2026?",
    excerpt: "Cast your vote — see what founders and marketers are prioritising this year.",
    category: "Insights",
    author: "LIMINIQ Team",
    postType: "POLL",
    trending: true,
    pollOptions: [
      { id: "opt-1", label: "Custom software / SaaS product", votes: 42 },
      { id: "opt-2", label: "SEO & organic traffic", votes: 38 },
      { id: "opt-3", label: "Paid ads & performance marketing", votes: 29 },
      { id: "opt-4", label: "Website redesign / conversion", votes: 24 },
    ],
    gradient: "linear-gradient(135deg, #7B61FF, #00C8A0)",
  },
];

interface BlogListingProps {
  initialCategory?: string | null;
}

export function BlogListing({ initialCategory = null }: BlogListingProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") ?? initialCategory;
  const [posts, setPosts] = useState<any[]>(FALLBACK_POSTS);
  const [filterType, setFilterType] = useState<"all" | "articles" | "polls">("all");

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("published", "true");
    params.set("limit", "12");
    if (activeCategory) params.set("category", activeCategory);
    if (filterType === "articles") params.set("postType", "ARTICLE");
    if (filterType === "polls") params.set("postType", "POLL");

    fetch(`/api/blog?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.posts && data.posts.length > 0) {
          setPosts(
            data.posts.map((p: any) => ({
              ...p,
              readTime: `${Math.max(3, Math.ceil((p.content?.length || 2000) / 1000))} min`,
              gradient: p.category?.toLowerCase().includes("seo")
                ? "linear-gradient(135deg, #00C8A0, #3B5BFF)"
                : p.category?.toLowerCase().includes("marketing")
                ? "linear-gradient(135deg, #7B61FF, #00C8A0)"
                : "linear-gradient(135deg, #3B5BFF, #7B61FF)",
            }))
          );
        } else if (activeCategory || filterType !== "all") {
          setPosts([]);
        } else {
          setPosts(FALLBACK_POSTS);
        }
      })
      .catch(() => setPosts(activeCategory || filterType !== "all" ? [] : FALLBACK_POSTS));
  }, [activeCategory, filterType]);

  const setCategory = (slug: string | null) => {
    if (slug) router.push(`/blog?category=${slug}`, { scroll: false });
    else router.push("/blog", { scroll: false });
  };

  return (
    <>
      <TrendingTopicsBar />

      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
        {(["all", "articles", "polls"] as const).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setFilterType(type)}
            style={{
              background: filterType === type ? "rgba(123, 97, 255, 0.15)" : "rgba(255,255,255,0.03)",
              border: filterType === type ? "1px solid rgba(123, 97, 255, 0.35)" : "1px solid var(--border-subtle)",
              color: filterType === type ? "var(--text-primary)" : "var(--text-secondary)",
              padding: "8px 16px",
              borderRadius: 30,
              fontFamily: "var(--font-heading)",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
            className="hover-brighten"
          >
            {type === "polls" && <BarChart3 size={14} />}
            {type === "all" ? "All" : type === "articles" ? "Articles" : "Polls"}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "3rem" }}>
        <button
          onClick={() => setCategory(null)}
          style={{
            background: !activeCategory ? "rgba(109, 40, 217, 0.1)" : "rgba(255,255,255,0.03)",
            border: !activeCategory ? "1px solid rgba(109, 40, 217, 0.3)" : "1px solid var(--border-subtle)",
            color: !activeCategory ? "var(--text-primary)" : "var(--text-secondary)",
            padding: "8px 20px",
            borderRadius: 30,
            fontFamily: "var(--font-heading)",
            fontSize: "0.9rem",
            fontWeight: 500,
            cursor: "pointer",
          }}
          className="hover-brighten"
        >
          All Topics
        </button>
        {BLOG_CATEGORY_FILTERS.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setCategory(cat.slug)}
            style={{
              background: activeCategory === cat.slug ? "rgba(109, 40, 217, 0.1)" : "rgba(255,255,255,0.03)",
              border: activeCategory === cat.slug ? "1px solid rgba(109, 40, 217, 0.3)" : "1px solid var(--border-subtle)",
              color: activeCategory === cat.slug ? "var(--text-primary)" : "var(--text-secondary)",
              padding: "8px 20px",
              borderRadius: 30,
              fontFamily: "var(--font-heading)",
              fontSize: "0.9rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
            className="hover-brighten"
          >
            {cat.label}
          </button>
        ))}
      </div>

      {posts.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem 2rem", color: "var(--text-secondary)" }}>
          No content in this filter yet. Check back soon or browse all posts.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {posts.map((post) =>
            post.postType === "POLL" ? (
              <BlogPollWidget
                key={post.id}
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
              <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                <div className="glass-card neon-border-hover" style={{ overflow: "hidden", height: "100%" }}>
                  <div
                    style={{
                      height: 160,
                      background: post.coverImage ? `url(${post.coverImage}) center/cover` : post.gradient,
                      position: "relative",
                    }}
                  >
                    <span
                      className="pill-badge"
                      style={{
                        position: "absolute",
                        top: "0.75rem",
                        left: "0.75rem",
                        background: "rgba(255,255,255,0.2)",
                        color: "white",
                      }}
                    >
                      {post.category}
                    </span>
                    {post.trending && (
                      <span
                        style={{
                          position: "absolute",
                          top: "0.75rem",
                          right: "0.75rem",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          padding: "4px 10px",
                          borderRadius: 100,
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          background: "rgba(239, 68, 68, 0.2)",
                          color: "#fca5a5",
                          border: "1px solid rgba(239, 68, 68, 0.3)",
                        }}
                      >
                        <Flame size={12} /> Trending
                      </span>
                    )}
                  </div>
                  <div style={{ padding: "1.5rem" }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        lineHeight: 1.4,
                        marginBottom: "0.75rem",
                      }}
                    >
                      {post.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.9rem",
                        color: "var(--text-secondary)",
                        lineHeight: 1.6,
                        marginBottom: "1rem",
                      }}
                    >
                      {post.excerpt}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "0.8rem",
                        color: "var(--text-tertiary)",
                      }}
                    >
                      <span>{post.author}</span>
                      <span>{post.readTime || "5 min"} read</span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          )}
        </div>
      )}
    </>
  );
}
