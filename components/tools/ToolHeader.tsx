import type { ReactNode } from "react";

interface ToolHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description: string;
}

export function ToolHeader({ eyebrow, title, description }: ToolHeaderProps) {
  return (
    <div className="tool-header">
      <span className="pill-badge" style={{ marginBottom: "1rem", display: "inline-flex" }}>
        <span style={{ color: "var(--accent-primary)" }}>✦</span> {eyebrow}
      </span>
      <h1 className="tool-title">{title}</h1>
      <p className="tool-description">{description}</p>
    </div>
  );
}
