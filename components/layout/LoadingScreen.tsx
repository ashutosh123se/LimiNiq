"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [phase, setPhase] = useState<"reveal" | "glitch" | "exit" | "done">("reveal");

  const letters = ["L", "I", "M", "I", "N", "I", "Q"];

  useEffect(() => {
    // Only show on first visit per session
    const hasLoaded = sessionStorage.getItem("liminiq-loaded");
    if (hasLoaded) return;

    setIsVisible(true);

    // Letter reveal → glitch → exit
    const glitchTimer = setTimeout(() => setPhase("glitch"), 1400);
    const exitTimer = setTimeout(() => setPhase("exit"), 2000);
    const doneTimer = setTimeout(() => {
      setIsVisible(false);
      setPhase("done");
      sessionStorage.setItem("liminiq-loaded", "1");
    }, 2800);

    return () => {
      clearTimeout(glitchTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "exit" ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ zIndex: 99999 }}
        >
          {/* Glow orb background */}
          <div
            className=""
            style={{ width: 400, height: 400, top: "20%", left: "30%", opacity: 0.2 }}
          />

          {/* Logo letters */}
          <div
            className="flex items-center gap-1"
            style={{
              animation: phase === "glitch" ? "glitch 0.4s steps(1) 3" : "none",
            }}
          >
            {letters.map((letter, i) => {
              const isIQ = i >= 5;
              return (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2.5rem, 6vw, 4rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    color: isIQ ? "transparent" : "var(--text-primary)",
                    background: isIQ ? "var(--gradient-hero)" : "none",
                    WebkitBackgroundClip: isIQ ? "text" : "unset",
                    backgroundClip: isIQ ? "text" : "unset",
                    WebkitTextFillColor: isIQ ? "transparent" : "unset",
                  }}
                >
                  {letter}
                </motion.span>
              );
            })}
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "0.85rem",
              color: "var(--text-tertiary)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Next-Gen Digital Solutions
          </motion.p>

          {/* Progress bar */}
          <motion.div
            className="loading-progress"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="loading-progress-bar" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
