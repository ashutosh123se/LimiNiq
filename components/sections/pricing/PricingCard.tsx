import Link from "next/link";
import { FeatureRow } from "./FeatureRow";
import { ArrowRight, Clock } from "lucide-react";

interface PricingCardProps {
  name: string;
  price: string;
  priceSuffix: string;
  tagline: string;
  features: { text: string; included: boolean }[];
  ctaText: string;
  badge: string | null;
  delivery: string | null;
  elevated: boolean;
}

export function PricingCard({
  name,
  price,
  priceSuffix,
  tagline,
  features,
  ctaText,
  badge,
  delivery,
  elevated,
}: PricingCardProps) {
  return (
    <div
      className={elevated ? "glass-card elevated-card" : "glass-card"}
      style={{
        padding: "2.5rem",
        borderRadius: 24,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        border: elevated ? "1.5px solid transparent" : "1px solid rgba(255,255,255,0.08)",
        background: elevated
          ? "linear-gradient(var(--bg-surface), var(--bg-surface)) padding-box, linear-gradient(135deg, #3B5BFF, #7B61FF) border-box"
          : "rgba(255,255,255,0.02)",
        boxShadow: elevated ? "0 20px 60px rgba(59, 91, 255, 0.18)" : "none",
        transform: elevated ? "translateY(-8px) scale(1.02)" : "none",
      }}
    >
      {badge && (
        <div
          style={{
            position: "absolute",
            top: -14,
            left: "50%",
            transform: "translateX(-50%)",
            background: "linear-gradient(135deg, #3B5BFF, #7B61FF)",
            color: "white",
            padding: "4px 16px",
            borderRadius: 100,
            fontFamily: "var(--font-heading)",
            fontSize: "0.75rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            boxShadow: "0 4px 12px rgba(59, 91, 255, 0.3)",
            whiteSpace: "nowrap",
          }}
        >
          ✦ {badge}
        </div>
      )}

      {/* Plan Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h3
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.85rem",
            fontWeight: 600,
            color: elevated ? "#7B61FF" : "var(--accent-primary)",
            letterSpacing: "0.1em",
            marginBottom: "1rem",
          }}
        >
          {name}
        </h3>
        
        <div style={{ marginBottom: "0.5rem" }}>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 3vw, 2.5rem)",
              fontWeight: 800,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            {price}
          </span>
        </div>
        
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "var(--text-tertiary)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: "1rem",
          }}
        >
          {priceSuffix}
        </div>
        
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1rem",
            color: "var(--text-secondary)",
            lineHeight: 1.5,
          }}
        >
          {tagline}
        </p>
      </div>

      {/* Features List */}
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: "0 0 2rem 0",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          flex: 1,
        }}
      >
        {features.map((f, i) => (
          <FeatureRow key={i} text={f.text} included={f.included} />
        ))}
      </ul>

      {/* Footer Info */}
      <div style={{ marginTop: "auto" }}>
        <Link
          href="/contact"
          className={elevated ? "btn-primary" : "btn-secondary"}
          style={{
            width: "100%",
            justifyContent: "center",
            padding: "16px",
            fontSize: "1rem",
            background: elevated ? "linear-gradient(135deg, #3B5BFF, #7B61FF)" : undefined,
            color: elevated ? "white" : undefined,
            border: elevated ? "none" : undefined,
            boxShadow: elevated ? "0 8px 24px rgba(59, 91, 255, 0.4)" : undefined,
          }}
        >
          {ctaText} {elevated ? <ArrowRight size={18} /> : null}
        </Link>
        
        {delivery && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              marginTop: "1rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--text-tertiary)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            <Clock size={14} /> {delivery}
          </div>
        )}
      </div>

      <style>{`
        .elevated-card {
          z-index: 10;
        }
        @media (max-width: 900px) {
          .elevated-card {
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}
