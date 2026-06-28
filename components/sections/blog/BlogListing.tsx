"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { BLOG_CATEGORY_FILTERS } from "@/lib/data/blogCategories";

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
    gradient: "linear-gradient(135deg, #00C8A0, #3B5BFF)",
  },
  {
    id: "3",
    slug: "meta-ads-roas-scaling",
    title: "How We Scaled a Meta Campaign from 1.2x to 4.8x ROAS in 60 Days",
    excerpt:
      "A behind-the-scenes breakdown of our creative testing framework, audience architecture, and bid strategy.",
    category: "Digital Marketing",
    author: "Rohan Mehta",
    readTime: "10 min",
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

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("published", "true");
    params.set("limit", "12");
    if (activeCategory) params.set("category", activeCategory);

    fetch(`/api/blog?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.posts && data.posts.length > 0) {
          setPosts(
            data.posts.map((p: any) => ({
              ...p,
              readTime: `${Math.max(3, Math.ceil((p.content?.length || 2000) / 1000))} min`,
            }))
          );
        } else if (activeCategory) {
          setPosts([]);
        } else {
          setPosts(FALLBACK_POSTS);
        }
      })
      .catch(() => setPosts(activeCategory ? [] : FALLBACK_POSTS));
  }, [activeCategory]);

  const setCategory = (slug: string | null) => {
    if (slug) {
      router.push(`/blog?category=${slug}`, { scroll: false });
    } else {
      router.push("/blog", { scroll: false });
    }
  };

  return (
    <>
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
            transition: "all 0.2s",
          }}
          className="hover-brighten"
        >
          All
        </button>
        {BLOG_CATEGORY_FILTERS.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setCategory(cat.slug)}
            style={{
              background:
                activeCategory === cat.slug ? "rgba(109, 40, 217, 0.1)" : "rgba(255,255,255,0.03)",
              border:
                activeCategory === cat.slug
                  ? "1px solid rgba(109, 40, 217, 0.3)"
                  : "1px solid var(--border-subtle)",
              color: activeCategory === cat.slug ? "var(--text-primary)" : "var(--text-secondary)",
              padding: "8px 20px",
              borderRadius: 30,
              fontFamily: "var(--font-heading)",
              fontSize: "0.9rem",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            className="hover-brighten"
          >
            {cat.label}
          </button>
        ))}
      </div>

      {posts.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "4rem 2rem",
            color: "var(--text-secondary)",
            fontFamily: "var(--font-body)",
          }}
        >
          No articles in this category yet. Check back soon or browse all posts.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
              <div className="glass-card neon-border-hover" style={{ overflow: "hidden", height: "100%" }}>
                <div
                  style={{
                    height: 160,
                    background: post.coverImage
                      ? `url(${post.coverImage}) center/cover`
                      : post.gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
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
          ))}
        </div>
      )}
    </>
  );
}
