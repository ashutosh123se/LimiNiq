export interface CaseStudyData {
  name: string;
  company: string;
  role: string;
  quote: string;
  highlight?: string;
}

interface CaseStudyCardProps {
  caseStudy: CaseStudyData;
  accent?: string;
}

export function CaseStudyCard({ caseStudy, accent = "var(--accent-primary)" }: CaseStudyCardProps) {
  return (
    <div
      className="glass-card"
      style={{
        padding: "2rem",
        borderRadius: 20,
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        height: "100%",
        border: `1px solid color-mix(in srgb, ${accent} 22%, rgba(255,255,255,0.08))`,
        background: `linear-gradient(160deg, color-mix(in srgb, ${accent} 8%, rgba(255,255,255,0.02)), rgba(255,255,255,0.02))`,
      }}
    >
      {caseStudy.highlight && (
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            fontWeight: 700,
            color: accent,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          {caseStudy.highlight}
        </div>
      )}
      <p
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "1.15rem",
          color: "var(--text-primary)",
          lineHeight: 1.6,
          flex: 1,
          margin: 0,
        }}
      >
        &ldquo;{caseStudy.quote}&rdquo;
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${accent}, color-mix(in srgb, ${accent} 55%, #7B61FF))`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              color: "white",
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: "1.2rem",
            }}
          >
            {caseStudy.name.charAt(0)}
          </span>
        </div>
        <div>
          <div
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.05rem",
              fontWeight: 700,
              color: "var(--text-primary)",
            }}
          >
            {caseStudy.name}
          </div>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.9rem",
              color: "var(--text-tertiary)",
            }}
          >
            {caseStudy.role}, {caseStudy.company}
          </div>
        </div>
      </div>
    </div>
  );
}
