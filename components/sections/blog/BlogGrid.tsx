"use client";

import { useMemo, useState } from "react";
import { BlogCard } from "@/components/sections/blog/BlogCard";
import type { UnifiedPost } from "@/lib/blog/posts";
import { cn } from "@/lib/utils";

interface BlogGridProps {
  posts: UnifiedPost[];
  topics: string[];
}

export function BlogGrid({ posts, topics }: BlogGridProps) {
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const filtered = useMemo(
    () => (activeTopic ? posts.filter((post) => post.topic === activeTopic) : posts),
    [posts, activeTopic]
  );

  return (
    <div>
      <div className="blog-chip-row" role="tablist" aria-label="Filter posts by topic">
        <button
          type="button"
          onClick={() => setActiveTopic(null)}
          className={cn("blog-chip", !activeTopic && "is-active")}
          aria-pressed={!activeTopic}
        >
          All Topics
        </button>
        {topics.map((topic) => (
          <button
            key={topic}
            type="button"
            onClick={() => setActiveTopic(topic)}
            className={cn("blog-chip", activeTopic === topic && "is-active")}
            aria-pressed={activeTopic === topic}
          >
            {topic}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem 2rem", color: "var(--text-secondary)" }}>
          No articles in this topic yet. Check back soon.
        </div>
      ) : (
        <div className="blog-grid">
          {filtered.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
