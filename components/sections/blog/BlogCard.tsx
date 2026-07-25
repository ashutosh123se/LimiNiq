import Link from "next/link";
import type { UnifiedPost } from "@/lib/blog/posts";
import { gradientForTopic } from "@/lib/blog/theme";

export function BlogCard({ post }: { post: UnifiedPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="blog-card glass-card">
      <div
        className="blog-card-media"
        style={{ background: post.image ? `url(${post.image}) center/cover` : gradientForTopic(post.topic) }}
      >
        <span className="pill-badge blog-card-topic">{post.topic}</span>
      </div>
      <div className="blog-card-body">
        <h3 className="blog-card-title">{post.title}</h3>
        <p className="blog-card-excerpt">{post.excerpt}</p>
        <div className="blog-card-meta">
          <span>{post.author}</span>
          <span>{post.readingTime}</span>
        </div>
      </div>
    </Link>
  );
}
