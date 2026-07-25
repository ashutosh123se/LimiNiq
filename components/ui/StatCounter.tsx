"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useMotionValue, useReducedMotion } from "framer-motion";

export function StatCounter({
  value,
  suffix = "",
  prefix = "",
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    if (reduced) {
      motionValue.set(value);
      if (ref.current) ref.current.textContent = `${prefix}${value.toLocaleString("en-IN")}${suffix}`;
      return;
    }
    const controls = animate(motionValue, value, {
      duration: Math.min(2, 0.8 + value / 100),
      onUpdate: (v) => {
        if (ref.current) {
          ref.current.textContent = `${prefix}${Math.round(v).toLocaleString("en-IN")}${suffix}`;
        }
      },
    });
    return () => controls.stop();
  }, [isInView, value, prefix, suffix, motionValue, reduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}
