"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { NetworkVideoCanvas } from "@/components/media/NetworkVideoCanvas";

/** Light hero media: soft poster + optional MP4 + blue network canvas */
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
        className="object-cover opacity-25 mix-blend-multiply"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/85 to-white" />

      {hasVideo && (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-multiply"
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
        <NetworkVideoCanvas className="absolute inset-0 h-full w-full opacity-50" />
      )}
    </div>
  );
}
