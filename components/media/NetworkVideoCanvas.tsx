"use client";

import { useEffect, useRef } from "react";

/**
 * Cinematic looping network field — Digital Heroes–style motion without an MP4.
 * Feels like an abstract AI showreel: nodes, links, soft blooms, drift.
 */
export function NetworkVideoCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const nodeCount = coarse ? 48 : 78;

    let w = 0;
    let h = 0;
    let raf = 0;
    let t = 0;

    type Node = { x: number; y: number; vx: number; vy: number; r: number; hue: number };
    let nodes: Node[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      w = parent?.clientWidth ?? window.innerWidth;
      h = parent?.clientHeight ?? window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (nodes.length === 0) {
        nodes = Array.from({ length: nodeCount }, () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: 1.2 + Math.random() * 2.2,
          hue: Math.random() > 0.55 ? 258 : 188, // violet / cyan
        }));
      }
    };

    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);

      // vignette atmosphere
      const g = ctx.createRadialGradient(w * 0.5, h * 0.35, 0, w * 0.5, h * 0.4, Math.max(w, h) * 0.75);
      g.addColorStop(0, "rgba(108,92,231,0.12)");
      g.addColorStop(0.45, "rgba(34,211,238,0.05)");
      g.addColorStop(1, "rgba(5,6,10,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      if (!reduced) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        }
      }

      const linkDist = coarse ? 110 : 140;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < linkDist) {
            const alpha = (1 - d / linkDist) * 0.35;
            ctx.strokeStyle = `rgba(160, 150, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const pulse = reduced ? 1 : 0.7 + Math.sin(t * 2 + n.x * 0.01) * 0.3;
        ctx.beginPath();
        ctx.fillStyle = `hsla(${n.hue}, 85%, 65%, ${0.55 * pulse})`;
        ctx.arc(n.x, n.y, n.r * pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = `hsla(${n.hue}, 90%, 70%, 0.12)`;
        ctx.arc(n.x, n.y, n.r * 4 * pulse, 0, Math.PI * 2);
        ctx.fill();
      }

      // sweeping light band like a video loop
      if (!reduced) {
        const sweepX = ((t * 40) % (w + 200)) - 100;
        const band = ctx.createLinearGradient(sweepX, 0, sweepX + 180, 0);
        band.addColorStop(0, "rgba(34,211,238,0)");
        band.addColorStop(0.5, "rgba(34,211,238,0.06)");
        band.addColorStop(1, "rgba(108,92,231,0)");
        ctx.fillStyle = band;
        ctx.fillRect(0, 0, w, h);
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden />;
}
