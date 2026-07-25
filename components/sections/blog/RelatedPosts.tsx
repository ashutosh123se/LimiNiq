import { BlogCard } from "@/components/sections/blog/BlogCard";
import type { UnifiedPost } from "@/lib/blog/posts";

export function RelatedPosts({ posts }: { posts: UnifiedPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="related-posts section-container">
      <h2 className="related-posts-title">Related reading</h2>
      <div className="blog-grid">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      <style>{`
        .related-posts { padding: 1rem 0 5rem; }
        .related-posts-title {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 1.5rem;
        }
      `}</style>
    </section>
  );
}
