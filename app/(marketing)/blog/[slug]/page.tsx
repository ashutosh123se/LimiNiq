import type { Metadata } from "next";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { AuthorCard } from "@/components/sections/blog/AuthorCard";
import { TableOfContents } from "@/components/sections/blog/TableOfContents";
import { RelatedPosts } from "@/components/sections/blog/RelatedPosts";
import { LeadCTASection } from "@/components/sections/home/LeadCTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { prisma } from "@/lib/prisma";
import { extractHeadings, getAllMdxPosts, slugifyHeading } from "@/lib/blog/mdx";
import { getAllUnifiedPosts, getRelatedPosts, getUnifiedPostBySlug } from "@/lib/blog/posts";
import { gradientForTopic } from "@/lib/blog/theme";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schema";

type Params = Promise<{ slug: string }>;

function extractText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (node && typeof node === "object" && "props" in node) {
    return extractText((node as { props?: { children?: ReactNode } }).props?.children);
  }
  return "";
}

const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => {
    const id = slugifyHeading(extractText(props.children));
    return <h2 id={id} {...props} />;
  },
};

export function generateStaticParams() {
  return getAllMdxPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const resolved = await getUnifiedPostBySlug(slug);
  if (!resolved) return { title: "Post Not Found" };

  const { post } = resolved;
  return buildPageMetadata({
    title: post.metaTitle || post.title,
    description: post.metaDesc || post.excerpt,
    path: `/blog/${slug}`,
    ogImage: post.ogImage || post.image || "/api/og",
  });
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const resolved = await getUnifiedPostBySlug(slug);
  if (!resolved) return notFound();

  const { post, source, db, mdx } = resolved;

  if (source === "db" && db) {
    prisma.blogPost.update({ where: { id: db.id }, data: { views: { increment: 1 } } }).catch(() => {});
  }

  const rawContent = source === "mdx" && mdx ? mdx.content : db?.content ?? "";
  const headings = extractHeadings(rawContent);

  const allPosts = await getAllUnifiedPosts();
  const related = getRelatedPosts(allPosts, post, 3);

  const formattedDate = post.publishedAt.toLocaleDateString("en-IN", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="blog-post">
      <JsonLd
        data={articleSchema({
          title: post.title,
          slug: post.slug,
          description: post.excerpt,
          author: post.author,
          publishedAt: post.publishedAt,
          updatedAt: post.updatedAt,
          image: post.ogImage || post.image,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />

      <header
        className="blog-post-header"
        style={{
          background: post.image
            ? `linear-gradient(to bottom, rgba(5,6,10,0.75), var(--bg-primary)), url(${post.image}) center/cover`
            : `linear-gradient(to bottom, rgba(5,6,10,0.55), var(--bg-primary)), ${gradientForTopic(post.topic)}`,
        }}
      >
        <div className="section-container">
          <Link href="/blog" className="blog-post-back">
            <ArrowLeft size={16} /> Back to Blog
          </Link>

          <span className="pill-badge blog-post-topic">{post.topic}</span>

          <h1 className="blog-post-title">{post.title}</h1>
          <p className="blog-post-excerpt">{post.excerpt}</p>

          <div className="blog-post-meta">
            <span>
              <User size={15} /> {post.author}
            </span>
            <span>
              <Calendar size={15} /> {formattedDate}
            </span>
            <span>
              <Clock size={15} /> {post.readingTime}
            </span>
          </div>
        </div>
      </header>

      <div className="section-container blog-post-layout">
        <div className="blog-post-content">
          <div className="article-prose">
            {source === "mdx" && mdx ? (
              <MDXRemote source={mdx.content} components={mdxComponents} />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: (db?.content ?? "").replace(/\n/g, "<br/>") }} />
            )}
          </div>

          {post.tags.length > 0 && (
            <div className="blog-post-tags">
              {post.tags.map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
          )}
        </div>

        <aside className="blog-post-sidebar">
          <TableOfContents headings={headings} />
          <AuthorCard author={post.author} />
        </aside>
      </div>

      <RelatedPosts posts={related} />

      <LeadCTASection />

      <style>{`
        .blog-post { background: var(--bg-primary); overflow-x: clip; }

        .blog-post-header {
          padding: 9rem 0 3.5rem;
          border-bottom: 1px solid var(--border-subtle);
        }
        .blog-post-back {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-tertiary);
          text-decoration: none;
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 1.75rem;
          transition: color 0.2s ease;
        }
        .blog-post-back:hover { color: var(--text-primary); }
        .blog-post-topic {
          display: inline-flex;
          margin-bottom: 1.25rem;
        }
        .blog-post-title {
          font-family: var(--font-heading);
          font-size: clamp(2rem, 4.5vw, 3.25rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.15;
          color: var(--text-primary);
          max-width: 880px;
          margin: 0 0 1.25rem;
        }
        .blog-post-excerpt {
          font-size: 1.1rem;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 720px;
          margin: 0 0 1.75rem;
        }
        .blog-post-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 1.75rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        .blog-post-meta span {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .blog-post-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          padding: 3.5rem 0;
        }

        .article-prose {
          font-family: var(--font-sans);
          font-size: 1.08rem;
          line-height: 1.8;
          color: var(--text-secondary);
        }
        .article-prose h2 {
          font-family: var(--font-heading);
          font-size: clamp(1.4rem, 2.6vw, 1.85rem);
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.01em;
          margin: 2.75rem 0 1.25rem;
          scroll-margin-top: 6rem;
        }
        .article-prose h3 {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 2rem 0 1rem;
          scroll-margin-top: 6rem;
        }
        .article-prose p { margin: 0 0 1.5rem; }
        .article-prose ul, .article-prose ol {
          margin: 0 0 1.5rem;
          padding-left: 1.4rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .article-prose li { line-height: 1.75; }
        .article-prose strong { color: var(--text-primary); font-weight: 700; }
        .article-prose a { color: var(--accent); text-decoration: underline; text-underline-offset: 3px; }
        .article-prose blockquote {
          margin: 1.75rem 0;
          padding: 1rem 1.5rem;
          border-left: 3px solid var(--accent);
          background: rgba(255,255,255,0.03);
          border-radius: 0 12px 12px 0;
          color: var(--text-primary);
          font-style: italic;
        }
        .article-prose code {
          font-family: var(--font-mono);
          font-size: 0.88em;
          background: rgba(255,255,255,0.06);
          padding: 0.15em 0.4em;
          border-radius: 5px;
          color: var(--signal);
        }
        .article-prose pre {
          margin: 1.75rem 0;
          padding: 1.25rem 1.5rem;
          border-radius: 14px;
          background: #0b0d14;
          border: 1px solid var(--border-subtle);
          overflow-x: auto;
        }
        .article-prose pre code {
          background: none;
          padding: 0;
          color: var(--text-primary);
        }

        .blog-post-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 2.5rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border-subtle);
        }
        .blog-post-tags span {
          padding: 6px 14px;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border-subtle);
          border-radius: 100px;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .blog-post-sidebar {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        @media (min-width: 960px) {
          .blog-post-layout {
            grid-template-columns: 1fr 280px;
            align-items: start;
          }
        }
      `}</style>
    </article>
  );
}
