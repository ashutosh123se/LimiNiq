import type { HeadingItem } from "@/lib/blog/mdx";

export function TableOfContents({ headings }: { headings: HeadingItem[] }) {
  if (headings.length === 0) return null;

  return (
    <nav className="toc glass-card" aria-label="Table of contents">
      <span className="toc-label">On this page</span>
      <ul>
        {headings.map((heading) => (
          <li key={heading.slug}>
            <a href={`#${heading.slug}`}>{heading.text}</a>
          </li>
        ))}
      </ul>

      <style>{`
        .toc {
          padding: 1.25rem 1.4rem;
          border-radius: 16px;
          position: sticky;
          top: 6.5rem;
        }
        .toc-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 0.9rem;
        }
        .toc ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .toc a {
          font-size: 0.85rem;
          line-height: 1.4;
          color: var(--text-secondary);
          text-decoration: none;
          display: block;
        }
        .toc a:hover {
          color: var(--text-primary);
        }
      `}</style>
    </nav>
  );
}
