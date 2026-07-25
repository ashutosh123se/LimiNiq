import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import type { UnifiedPost } from "@/lib/blog/posts";
import { gradientForTopic } from "@/lib/blog/theme";

export function FeaturedPost({ post }: { post: UnifiedPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="featured-post glass-card-premium">
      <div
        className="featured-post-media"
        style={{ background: post.image ? `url(${post.image}) center/cover` : gradientForTopic(post.topic) }}
      />
      <div className="featured-post-body">
        <span className="pill-badge featured-post-badge">
          <span style={{ color: "var(--signal)" }}>✦</span> Featured
        </span>
        <h2 className="featured-post-title">{post.title}</h2>
        <p className="featured-post-excerpt">{post.excerpt}</p>
        <div className="featured-post-meta">
          <span>
            <User size={14} /> {post.author}
          </span>
          <span>
            <Calendar size={14} />{" "}
            {post.publishedAt.toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })}
          </span>
          <span>{post.readingTime}</span>
        </div>
        <span className="featured-post-cta">
          Read article <ArrowRight size={16} />
        </span>
      </div>

      <style>{`
        .featured-post {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          border-radius: 26px;
          overflow: hidden;
          text-decoration: none;
          margin-bottom: 3.5rem;
          transition: border-color 0.25s ease, transform 0.25s ease;
        }
        .featured-post:hover {
          border-color: var(--border-hover);
          transform: translateY(-3px);
        }
        .featured-post-media {
          min-height: 280px;
          background-size: cover;
          background-position: center;
        }
        .featured-post-body {
          padding: clamp(1.75rem, 3vw, 2.75rem);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 1rem;
        }
        .featured-post-badge {
          display: inline-flex;
          width: fit-content;
        }
        .featured-post-title {
          font-family: var(--font-heading);
          font-size: clamp(1.5rem, 3vw, 2.1rem);
          font-weight: 800;
          line-height: 1.25;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin: 0;
        }
        .featured-post-excerpt {
          font-size: 1rem;
          line-height: 1.7;
          color: var(--text-secondary);
          margin: 0;
        }
        .featured-post-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 1.25rem;
          font-size: 0.85rem;
          color: var(--text-tertiary);
        }
        .featured-post-meta span {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }
        .featured-post-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-heading);
          font-weight: 700;
          color: var(--accent);
          margin-top: 0.25rem;
        }
        @media (max-width: 820px) {
          .featured-post {
            grid-template-columns: 1fr;
          }
          .featured-post-media {
            min-height: 200px;
          }
        }
      `}</style>
    </Link>
  );
}
