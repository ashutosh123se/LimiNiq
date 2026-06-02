"use client";

import { Monitor, LineChart } from "lucide-react";
import { motion } from "framer-motion";

interface PricingTabsProps {
  activeTab: "WEB_DEV" | "SEO_MARKETING";
  onChange: (tab: "WEB_DEV" | "SEO_MARKETING") => void;
}

export function PricingTabs({ activeTab, onChange }: PricingTabsProps) {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
      <div
        style={{
          background: "rgba(59, 91, 255, 0.06)",
          border: "1px solid rgba(59, 91, 255, 0.12)",
          borderRadius: 100,
          padding: 6,
          display: "inline-flex",
          gap: 4,
          position: "relative",
          maxWidth: "100%",
          overflow: "hidden"
        }}
      >
        <button
          onClick={() => onChange("WEB_DEV")}
          className="px-3 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-base"
          style={{
            position: "relative",
            background: "transparent",
            color: activeTab === "WEB_DEV" ? "#FFFFFF" : "#8A94B5",
            borderRadius: 100,
            border: "none",
            fontFamily: "var(--font-heading)",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            zIndex: 1,
            transition: "color 0.3s ease",
            whiteSpace: "nowrap"
          }}
        >
          {activeTab === "WEB_DEV" && (
            <motion.div
              layoutId="activeTabPill"
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(135deg, #3B5BFF, #7B61FF)",
                borderRadius: 100,
                boxShadow: "0 4px 20px rgba(59, 91, 255, 0.30)",
                zIndex: -1,
              }}
            />
          )}
          <Monitor size={18} /> Web Development
        </button>

        <button
          onClick={() => onChange("SEO_MARKETING")}
          className="px-3 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-base"
          style={{
            position: "relative",
            background: "transparent",
            color: activeTab === "SEO_MARKETING" ? "#FFFFFF" : "#8A94B5",
            borderRadius: 100,
            border: "none",
            fontFamily: "var(--font-heading)",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            zIndex: 1,
            transition: "color 0.3s ease",
            whiteSpace: "nowrap"
          }}
        >
          {activeTab === "SEO_MARKETING" && (
            <motion.div
              layoutId="activeTabPill"
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(135deg, #3B5BFF, #7B61FF)",
                borderRadius: 100,
                boxShadow: "0 4px 20px rgba(59, 91, 255, 0.30)",
                zIndex: -1,
              }}
            />
          )}
          <LineChart size={18} /> SEO & Marketing
        </button>
      </div>
    </div>
  );
}
