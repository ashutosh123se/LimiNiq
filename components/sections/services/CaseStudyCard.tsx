export interface CaseStudyData {
  name: string;
  company: string;
  role: string;
  quote: string;
  highlight?: string;
}

interface CaseStudyCardProps {
  caseStudy: CaseStudyData;
}

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <div
      className="glass-card"
      style={{
        padding: "2.5rem",
        borderRadius: 20,
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        height: "100%",
        border: "1px solid rgba(59,91,255,0.1)",
      }}
    >
      {caseStudy.highlight && (
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "var(--accent-primary)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
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
            background: "linear-gradient(135deg, var(--accent-primary), var(--accent-tertiary))",
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
