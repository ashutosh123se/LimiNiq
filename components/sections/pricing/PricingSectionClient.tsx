"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { PricingTabs } from "./PricingTabs";
import { PricingCard } from "./PricingCard";
import { PricingCTA } from "./PricingCTA";
import { PricingFAQ } from "./PricingFAQ";
import { ShieldCheck, FileText, RefreshCw, BarChart2, PhoneCall, Target } from "lucide-react";

export interface PlanData {
  id: string;
  type: "WEB_DEV" | "SEO_MARKETING";
  name: string;
  price: string;
  priceSuffix: string;
  tagline: string;
  features: any;
  ctaText: string;
  badge: string | null;
  delivery: string | null;
  elevated: boolean;
}

interface PricingSectionClientProps {
  plans: PlanData[];
  showFAQ?: boolean;
}

export function PricingSectionClient({ plans, showFAQ = false }: PricingSectionClientProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeTab, setActiveTab] = useState<"WEB_DEV" | "SEO_MARKETING">("WEB_DEV");

  const currentPlans = plans.filter((p) => p.type === activeTab);

  const ReassuranceRow = () => {
    if (activeTab === "WEB_DEV") {
      return (
        <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap", marginTop: "3rem", color: "var(--text-tertiary)", fontFamily: "var(--font-mono)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><ShieldCheck size={16} /> Secure payments</div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><FileText size={16} /> Contract provided</div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><RefreshCw size={16} /> Revision guarantee</div>
        </div>
      );
    }
    return (
      <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap", marginTop: "3rem", color: "var(--text-tertiary)", fontFamily: "var(--font-mono)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><BarChart2 size={16} /> Monthly reports</div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><PhoneCall size={16} /> Strategy call included</div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><Target size={16} /> ROI-focused approach</div>
      </div>
    );
  };

  return (
    <section ref={ref} className="section-padding" style={{ background: "var(--bg-primary)", position: "relative", overflow: "hidden" }}>
      <div className="section-container" style={{ position: "relative" }}>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <div className="pill-badge shimmer" style={{ marginBottom: "1rem", display: "inline-flex" }}>
            <span style={{ color: "var(--accent-primary)" }}>✦</span> INVESTMENT
          </div>
          <h2 className="text-section" style={{ color: "var(--text-primary)", marginBottom: "1rem" }}>
            Transparent Pricing, <span style={{ color: "var(--text-secondary)" }}>Real Results</span>
          </h2>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--text-secondary)", fontSize: "1.1rem", maxWidth: 500, margin: "0 auto 2.5rem", lineHeight: 1.6 }}>
            One-time projects or ongoing growth — pick the engagement that fits your goals.
          </p>

          <PricingTabs activeTab={activeTab} onChange={setActiveTab} />
          
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-tertiary)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
            {activeTab === "WEB_DEV" 
              ? "One-time investment · No hidden fees · Includes source code & deployment"
              : "Monthly retainer · Cancel anytime · Results tracked & reported monthly"}
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div style={{ position: "relative", minHeight: 700 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.23, 1, 0.32, 1], staggerChildren: 0.07 } }}
              exit={{ opacity: 0, y: -16, transition: { duration: 0.2 } }}
              style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem", alignItems: "center" }}
            >
              {currentPlans.map((plan, i) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  style={{ height: plan.elevated ? "105%" : "100%", zIndex: plan.elevated ? 10 : 1 }}
                >
                  <PricingCard
                    name={plan.name}
                    price={plan.price}
                    priceSuffix={plan.priceSuffix}
                    tagline={plan.tagline}
                    features={plan.features as any}
                    ctaText={plan.ctaText}
                    badge={plan.badge}
                    delivery={plan.delivery}
                    elevated={plan.elevated}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <ReassuranceRow />
        
        <PricingCTA />
        
        {showFAQ && <PricingFAQ />}
      </div>
    </section>
  );
}
