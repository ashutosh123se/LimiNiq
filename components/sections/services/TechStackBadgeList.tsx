interface TechStackBadgeListProps {
  items: string[];
  title?: string;
}

export function TechStackBadgeList({
  items,
  title = "Technology Stack",
}: TechStackBadgeListProps) {
  return (
    <div>
      <h2
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "2rem",
          fontWeight: 800,
          color: "var(--text-primary)",
          marginBottom: "2rem",
          textAlign: "center",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        {items.map((item) => (
          <div
            key={item}
            className="glass-card"
            style={{
              padding: "0.85rem 1.5rem",
              borderRadius: 12,
              fontFamily: "var(--font-mono)",
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "var(--text-primary)",
              border: "1px solid rgba(59,91,255,0.15)",
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
