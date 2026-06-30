"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Code2, TrendingUp, BarChart3 } from "lucide-react";
import { ClientErrorBoundary } from "@/components/ui/ClientErrorBoundary";

const HeroCanvas = dynamic(
  () => import("@/components/three/HeroCanvas").then((m) => m.HeroCanvas),
  { ssr: false }
);

const PILLARS = [
  { icon: Code2, label: "Software", color: "#7B61FF" },
  { icon: BarChart3, label: "Marketing", color: "#0EA5E9" },
  { icon: TrendingUp, label: "SEO", color: "#00C8A0" },
];

export function HeroBlueprint() {
  const reducedMotion = useReducedMotion();
  const [lite, setLite] = useState(true);

  useEffect(() => {
    setLite(reducedMotion || window.matchMedia("(pointer: coarse)").matches);
  }, [reducedMotion]);

  return (
    <>
      {!lite && (
        <div className="hero-canvas-wrap">
          <ClientErrorBoundary>
            <HeroCanvas />
          </ClientErrorBoundary>
        </div>
      )}

      <div className="hero-blueprint">
        <div className="hero-blueprint-grid" />
        <div className="hero-blueprint-ring hero-blueprint-ring--outer" />
        <div className="hero-blueprint-ring hero-blueprint-ring--inner" />

        {PILLARS.map((pillar, i) => {
          const angle = (i * 120 - 90) * (Math.PI / 180);
          const radius = 46;
          return (
            <motion.div
              key={pillar.label}
              className="hero-orbit-node"
              style={{
                left: `${50 + radius * Math.cos(angle)}%`,
                top: `${50 + radius * Math.sin(angle)}%`,
                borderColor: `${pillar.color}55`,
                boxShadow: `0 0 20px ${pillar.color}25`,
              }}
              initial={lite ? false : { opacity: 0, scale: 0.8 }}
              animate={lite ? undefined : { opacity: 1, scale: 1 }}
              transition={lite ? undefined : { delay: 0.6 + i * 0.12, duration: 0.5 }}
            >
              <span className="hero-orbit-icon" style={{ color: pillar.color }}>
                <pillar.icon size={18} strokeWidth={1.5} />
              </span>
              <span>{pillar.label}</span>
            </motion.div>
          );
        })}

        <div className="hero-blueprint-core glass-card-premium">
          <div className="hero-core-label">Delivery Stack</div>
          <div className="hero-core-flow">
            <span>Build</span>
            <span className="hero-core-arrow">→</span>
            <span>Launch</span>
            <span className="hero-core-arrow">→</span>
            <span>Scale</span>
          </div>
          <div className="hero-core-code">
            <span className="hero-code-line">
              <i>const</i> product = <b>engineer()</b>;
            </span>
            <span className="hero-code-line">
              <i>await</i> product.<b>scale</b>(growth);
            </span>
          </div>
        </div>

        <motion.div
          className="hero-float-stat hero-float-stat--top"
          initial={lite ? false : { opacity: 0, y: 16 }}
          animate={lite ? undefined : { opacity: 1, y: 0 }}
          transition={lite ? undefined : { delay: 1, duration: 0.6 }}
        >
          <span className="hero-float-value">150+</span>
          <span className="hero-float-label">Projects</span>
        </motion.div>

        <motion.div
          className="hero-float-stat hero-float-stat--bottom"
          initial={lite ? false : { opacity: 0, y: 16 }}
          animate={lite ? undefined : { opacity: 1, y: 0 }}
          transition={lite ? undefined : { delay: 1.15, duration: 0.6 }}
        >
          <span className="hero-float-value">4.9★</span>
          <span className="hero-float-label">Rated</span>
        </motion.div>
      </div>
    </>
  );
}
