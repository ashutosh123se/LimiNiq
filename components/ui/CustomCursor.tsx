"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export function CustomCursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40 });
  const sy = useSpring(y, { stiffness: 500, damping: 40 });
  const rx = useSpring(x, { stiffness: 150, damping: 25 });
  const ry = useSpring(y, { stiffness: 150, damping: 25 });

  useEffect(() => {
    if (reduced || window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest("a,button,[data-cursor]"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [reduced, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[9999] hidden md:block"
        style={{
          left: sx,
          top: sy,
          width: 8,
          height: 8,
          marginLeft: -4,
          marginTop: -4,
          borderRadius: "50%",
          background: "var(--accent)",
        }}
      />
      <motion.div
        className="pointer-events-none fixed z-[9998] hidden md:block"
        style={{
          left: rx,
          top: ry,
          width: hover ? 48 : 32,
          height: hover ? 48 : 32,
          marginLeft: hover ? -24 : -16,
          marginTop: hover ? -24 : -16,
          borderRadius: "50%",
          border: `1px solid ${hover ? "var(--accent)" : "rgba(255,255,255,0.35)"}`,
        }}
      />
    </>
  );
}
