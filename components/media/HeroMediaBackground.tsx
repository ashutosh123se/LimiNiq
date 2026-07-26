"use client";

import Image from "next/image";

/**
 * Static hero atmosphere — no perpetual canvas rAF (was O(n²) link drawing every frame).
 * Optional MP4 still supported if dropped in /public/videos/hero.mp4.
 */
export function HeroMediaBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <Image
        src="/images/hero/poster.png"
        alt=""
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 80vw"
        quality={60}
        className="object-cover object-center opacity-[0.18]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white" />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 15% 20%, rgba(29,78,216,0.10), transparent 60%), radial-gradient(ellipse 45% 35% at 85% 15%, rgba(59,130,246,0.08), transparent 55%)",
        }}
      />
    </div>
  );
}
