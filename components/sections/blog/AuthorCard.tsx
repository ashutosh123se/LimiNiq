import { getAuthorInfo } from "@/lib/data/blogAuthors";

export function AuthorCard({ author }: { author: string }) {
  const info = getAuthorInfo(author);

  return (
    <div className="author-card glass-card">
      <div className="author-card-avatar" aria-hidden>
        {info.initials}
      </div>
      <div className="author-card-heading">
        <p className="author-card-name">{info.name}</p>
        <p className="author-card-role">{info.role}</p>
      </div>
      <p className="author-card-bio">{info.bio}</p>

      <style>{`
        .author-card {
          padding: 1.5rem;
          border-radius: 18px;
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
          gap: 0.15rem 0.9rem;
        }
        .author-card-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--gradient-signature);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.9rem;
          flex-shrink: 0;
        }
        .author-card-heading {
          display: flex;
          flex-direction: column;
        }
        .author-card-name {
          font-family: var(--font-heading);
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
          font-size: 0.95rem;
        }
        .author-card-role {
          font-size: 0.75rem;
          color: var(--text-tertiary);
          margin: 0;
        }
        .author-card-bio {
          flex-basis: 100%;
          font-size: 0.85rem;
          line-height: 1.6;
          color: var(--text-secondary);
          margin: 0.65rem 0 0;
        }
      `}</style>
    </div>
  );
}
