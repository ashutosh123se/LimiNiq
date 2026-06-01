"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NOTIFICATIONS = [
  { city: "Mumbai", action: "requested an SEO audit" },
  { city: "Bangalore", action: "just started a web dev project" },
  { city: "Delhi", action: "requested a free growth audit" },
  { city: "Hyderabad", action: "signed up for Digital Marketing" },
  { city: "Pune", action: "asked about Full-Stack plans" },
  { city: "Chennai", action: "requested an SEO consultation" },
  { city: "Ahmedabad", action: "just launched a new project" },
  { city: "Kolkata", action: "requested a pricing quote" },
  { city: "Jaipur", action: "started an e-commerce project" },
  { city: "Surat", action: "signed up for PPC management" },
];

export function SocialProofToast() {
  const [current, setCurrent] = useState<(typeof NOTIFICATIONS)[0] | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let idx = 0;

    const show = () => {
      idx = (idx + 1) % NOTIFICATIONS.length;
      setCurrent(NOTIFICATIONS[idx]);
      setVisible(true);

      const hideTimer = setTimeout(() => setVisible(false), 4000);
      const nextDelay = 45000 + Math.random() * 45000; // 45–90s
      const nextTimer = setTimeout(show, nextDelay + 4200);

      return () => {
        clearTimeout(hideTimer);
        clearTimeout(nextTimer);
      };
    };

    const initialDelay = 12000 + Math.random() * 8000;
    const initialTimer = setTimeout(show, initialDelay);

    return () => clearTimeout(initialTimer);
  }, []);

  return (
    <AnimatePresence>
      {visible && current && (
        <motion.div
          initial={{ opacity: 0, x: -60, y: 0 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          style={{
            position: "fixed",
            bottom: "7rem",
            left: "1.5rem",
            zIndex: 200,
            maxWidth: "280px",
          }}
          className="glass-card"
        >
          <div style={{ padding: "0.75rem 1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "var(--accent-teal)",
                flexShrink: 0,
                boxShadow: "0 0 8px rgba(0,200,160,0.6)",
              }}
            />
            <p
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "0.82rem",
                color: "var(--text-secondary)",
                lineHeight: 1.4,
                margin: 0,
              }}
            >
              <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                Someone from {current.city}
              </span>{" "}
              {current.action}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
