import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface InternalLinkItem {
  href: string;
  title: string;
  description: string;
}

interface InternalLinkCalloutProps {
  heading?: string;
  links: InternalLinkItem[];
}

export function InternalLinkCallout({
  heading = "Related Services",
  links,
}: InternalLinkCalloutProps) {
  return (
    <div
      className="glass-card"
      style={{
        padding: "2.5rem",
        borderRadius: 24,
        border: "1px solid rgba(59,91,255,0.15)",
        background: "rgba(59,91,255,0.03)",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "1.5rem",
          fontWeight: 800,
          color: "var(--text-primary)",
          marginBottom: "1.5rem",
        }}
      >
        {heading}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              padding: "1.25rem 1.5rem",
              borderRadius: 16,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              textDecoration: "none",
              transition: "border-color 0.2s ease",
            }}
            className="group"
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: "0.35rem",
                }}
              >
                {link.title}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.95rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.5,
                }}
              >
                {link.description}
              </div>
            </div>
            <ArrowRight
              size={20}
              style={{ color: "var(--accent-primary)", flexShrink: 0 }}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
