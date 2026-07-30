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
};

/**
 * Muted autoplaying loop — pauses when off-screen to protect desktop performance.
 */
export function CinematicVideo({
  src,
  poster,
  className,
  overlayClassName,
  opacity = 1,
}: ReelProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setFailed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!ref.current) return;
        if (entry.isIntersecting) {
          void ref.current.play().catch(() => setFailed(true));
        } else {
          ref.current.pause();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden>
      {!failed && (
        <video
          ref={ref}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: ready ? opacity : 0 }}
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          onCanPlay={() => setReady(true)}
          onError={() => setFailed(true)}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
      <Image
        src={poster}
        alt=""
        fill
        priority
        sizes="100vw"
        className={cn("object-cover transition-opacity duration-700", ready && !failed ? "opacity-0" : "")}
        style={{ opacity: ready && !failed ? 0 : opacity }}
      />
      <div className={cn("absolute inset-0", overlayClassName)} />
    </div>
  );
}
