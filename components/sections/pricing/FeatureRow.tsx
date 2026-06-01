import { Check, X } from "lucide-react";

interface FeatureRowProps {
  text: string;
  included: boolean;
}

export function FeatureRow({ text, included }: FeatureRowProps) {
  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        opacity: included ? 1 : 0.5,
        color: included ? "var(--text-secondary)" : "#B0B8D4",
        fontFamily: "var(--font-body)",
        fontSize: "0.95rem",
      }}
    >
      {included ? (
        <div style={{ color: "var(--accent-teal)" }}>
          <Check size={18} strokeWidth={3} />
        </div>
      ) : (
        <div style={{ color: "#B0B8D4" }}>
          <X size={18} strokeWidth={2.5} />
        </div>
      )}
      <span style={{ textDecoration: included ? "none" : "line-through" }}>
        {text}
      </span>
    </li>
  );
}
