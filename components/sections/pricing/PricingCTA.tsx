import Link from "next/link";
import { HelpCircle, Star, ArrowRight } from "lucide-react";

export function PricingCTA() {
  return (
    <div style={{ padding: "6rem 0 2rem", display: "flex", justifyContent: "center" }}>
        <div
          className="glass-card px-6 py-8 sm:p-12"
          style={{
            maxWidth: 700,
            width: "100%",
            borderRadius: 24,
            textAlign: "center",
            background: "linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
            border: "1px solid rgba(59, 91, 255, 0.15)",
            boxShadow: "0 30px 60px rgba(0,0,0,0.2)",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* Subtle background glow */}
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "100%", height: "100%", background: "radial-gradient(circle at center, rgba(59,91,255,0.08) 0%, transparent 60%)", pointerEvents: "none" }} />
          
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(59,91,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#7B61FF" }}>
                <HelpCircle size={28} />
              </div>
            </div>
            
            <h3 className="text-3xl sm:text-4xl" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1rem", lineHeight: 1.2 }}>
              Not sure what you need?
            </h3>
            
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "2.5rem", maxWidth: 500, margin: "0 auto 2.5rem" }}>
              Get a FREE consultation — we'll assess your current digital presence and recommend exactly what will move the needle for your business.
            </p>
            
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem", marginBottom: "2rem" }}>
              <Link href="/contact" className="btn-primary" style={{ padding: "14px 28px", background: "linear-gradient(135deg, #3B5BFF, #7B61FF)", border: "none" }}>
                Book Free Consultation <ArrowRight size={16} />
              </Link>
              <Link href="/portfolio" className="btn-secondary" style={{ padding: "14px 28px" }}>
                View Case Studies
              </Link>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "#EAB308" }}>
                <Star size={14} fill="currentColor" />
                <span style={{ color: "var(--text-secondary)" }}>4.9/5 from 150+ clients</span>
              </div>
              <span>·</span>
              <span>Response within 24 hours</span>
            </div>
          </div>
        </div>
    </div>
  );
}
