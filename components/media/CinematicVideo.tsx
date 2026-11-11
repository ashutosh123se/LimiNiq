"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type ReelProps = {
  src: string;
  poster: string;
  className?: string;
  overlayClassName?: string;
  /** Prefer lower opacity for background use */
  opacity?: number;
  /** True only if this is the primary above-the-fold hero video */
  priority?: boolean;
};

/**
 * High-performance background video component:
 * - On mobile (<768px): skips video loading entirely to conserve CPU, battery, and cellular bandwidth for LCP.
 * - On desktop: defers video load until after first paint and when scrolled into view.
 * - Uses preload="none" and responsive poster images to avoid oversized asset downloads.
 */
export function CinematicVideo({
  src,
  poster,
  className,
  overlayClassName,
  opacity = 1,
  priority = false,
}: ReelProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [canLoadVideo, setCanLoadVideo] = useState(false);

  useEffect(() => {
    // Only load background video on desktop/tablet devices with sufficient viewport width and no motion preference
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isDesktop || reducedMotion) {
      setFailed(true);
      return;
    }

    // Defer video initialization until after the first paint/hydration cycle
    const timer = setTimeout(() => {
      setCanLoadVideo(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!canLoadVideo) return;
    const video = ref.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!ref.current) return;
        if (entry.isIntersecting) {
          void ref.current.play().catch(() => setFailed(true));
        } else {
          ref.current.pause();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [canLoadVideo]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden>
      {!failed && canLoadVideo && (
        <video
          ref={ref}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: ready ? opacity : 0 }}
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          onCanPlay={() => setReady(true)}
          onError={() => setFailed(true)}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
      <Image
        src={poster}
        alt="LIMINIQ engineering video showreel"
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1920px) 100vw, 1920px"
        className={cn("object-cover transition-opacity duration-700", ready && !failed ? "opacity-0" : "")}
        style={{ opacity: ready && !failed ? 0 : opacity }}
      />
      <div className={cn("absolute inset-0", overlayClassName)} />
    </div>
  );
}
