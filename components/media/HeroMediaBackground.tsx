"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { NetworkVideoCanvas } from "@/components/media/NetworkVideoCanvas";

/**
 * Hero media layer:
 * 1) If /videos/hero.mp4 exists, play muted/looped (Digital Heroes pattern)
 * 2) Else cinematic canvas network loop + AI poster
 *
 * Drop AI clips here: public/videos/hero.mp4 (+ optional hero.webm)
 */
export function HeroMediaBackground() {
  const [hasVideo, setHasVideo] = useState(false);
  const [useCanvas, setUseCanvas] = useState(true);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setUseCanvas(false);
      return;
    }

    void fetch("/videos/hero.mp4", { method: "HEAD" })
      .then((r) => {
        if (r.ok) {
          setHasVideo(true);
          setUseCanvas(false);
        } else if (coarse) {
          setUseCanvas(false);
        }
      })
      .catch(() => {
        if (coarse) setUseCanvas(false);
      });
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <Image
        src="/images/hero/poster.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-55"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/30 via-bg-primary/55 to-bg-primary" />

      {hasVideo && (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-45"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero/poster.png"
        >
          <source src="/videos/hero.webm" type="video/webm" />
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      )}

      {useCanvas && !hasVideo && (
        <NetworkVideoCanvas className="absolute inset-0 h-full w-full opacity-80" />
      )}

      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 70% 55% at 50% 35%, black, transparent)",
        }}
      />
    </div>
  );
}
