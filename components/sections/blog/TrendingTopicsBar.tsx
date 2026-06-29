"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { FALLBACK_TRENDING_TOPICS, type TrendingTopicItem } from "@/lib/data/blogEngagement";
import { blogTopicPath } from "@/lib/blogRoutes";

interface TrendingTopicsBarProps {
  compact?: boolean;
}

export function TrendingTopicsBar({ compact = false }: TrendingTopicsBarProps) {
  const [topics, setTopics] = useState<TrendingTopicItem[]>(FALLBACK_TRENDING_TOPICS);

  useEffect(() => {
    fetch("/api/trending-topics")
      .then((r) => r.json())
      .then((d) => {
        if (d.topics?.length) setTopics(d.topics);
      })
      .catch(() => {});
  }, []);

  return (
    <div className={`trending-bar ${compact ? "trending-bar--compact" : ""}`}>
      <div className="trending-bar-head">
        <TrendingUp size={16} />
        <span>Trending now</span>
      </div>
      <div className="trending-bar-track">
        {topics.map((topic) => (
          <Link
            key={topic.id}
            href={topic.href || blogTopicPath(topic.slug)}
            className="trending-chip"
            style={{ "--chip-color": topic.color } as React.CSSProperties}
          >
            {topic.emoji && <span className="trending-chip-emoji">{topic.emoji}</span>}
            {topic.label}
          </Link>
        ))}
      </div>

      <style>{`
        .trending-bar {
          margin-bottom: 2rem;
          padding: 1.25rem 1.35rem;
          border-radius: 20px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .trending-bar--compact {
          margin-bottom: 1.5rem;
          padding: 1rem 1.15rem;
        }

        .trending-bar-head {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--accent-primary);
          margin-bottom: 0.85rem;
        }

        .trending-bar-track {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .trending-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.45rem 0.85rem;
          border-radius: 100px;
          font-family: var(--font-heading);
          font-size: 0.78rem;
          font-weight: 600;
          text-decoration: none;
          color: var(--text-primary);
          background: color-mix(in srgb, var(--chip-color) 12%, rgba(255,255,255,0.03));
          border: 1px solid color-mix(in srgb, var(--chip-color) 30%, rgba(255,255,255,0.08));
          transition: all 0.25s ease;
        }

        .trending-chip:hover {
          transform: translateY(-2px);
          border-color: color-mix(in srgb, var(--chip-color) 50%, transparent);
          background: color-mix(in srgb, var(--chip-color) 20%, rgba(255,255,255,0.04));
        }

        .trending-chip-emoji {
          font-size: 0.9rem;
          line-height: 1;
        }
      `}</style>
    </div>
  );
}
