'use client'

/**
 * Native scroll only — Lenis + GSAP ScrollTrigger was a major desktop lag source
 * (extra rAF loop on every wheel event). Keep this provider as a no-op shell so
 * existing imports stay valid.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
