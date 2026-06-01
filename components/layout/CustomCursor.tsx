"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let animFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top = `${mouseY}px`;
        dotRef.current.style.opacity = "1";
      }
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
        ringRef.current.style.opacity = "1";
      }

      animFrameId = requestAnimationFrame(animateRing);
    };

    animFrameId = requestAnimationFrame(animateRing);

    const handleMouseEnterHoverable = () => {
      ringRef.current?.classList.add("hover");
    };
    const handleMouseLeaveHoverable = () => {
      ringRef.current?.classList.remove("hover");
    };
    const handleMouseDown = () => ringRef.current?.classList.add("clicking");
    const handleMouseUp = () => ringRef.current?.classList.remove("clicking");

    const attachHoverListeners = () => {
      const hoverables = document.querySelectorAll(
        "a, button, [data-cursor-hover], input, textarea, select, label"
      );
      hoverables.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnterHoverable);
        el.addEventListener("mouseleave", handleMouseLeaveHoverable);
      });
    };

    attachHoverListeners();

    // Re-attach when DOM changes
    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    const handleMouseLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };
    const handleMouseEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animFrameId);
      observer.disconnect();
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />
    </>
  );
}
