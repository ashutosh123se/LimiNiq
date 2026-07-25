"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function StickyMobileCTA() {
  const [pastThreshold, setPastThreshold] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastThreshold(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let attempts = 0;

    const attach = () => {
      const footer = document.getElementById("site-footer");
      if (!footer) {
        attempts += 1;
        if (attempts < 20) setTimeout(attach, 250);
        return;
      }
      observer = new IntersectionObserver(
        ([entry]) => setNearFooter(entry.isIntersecting),
        { rootMargin: "0px 0px -10% 0px", threshold: 0 }
      );
      observer.observe(footer);
    };

    attach();
    return () => observer?.disconnect();
  }, []);

  const visible = pastThreshold && !nearFooter;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-border-subtle bg-bg-primary/95 p-3 backdrop-blur-xl md:hidden"
        >
          <Link
            href="/contact#audit"
            className="btn-primary flex w-full items-center justify-center gap-2 text-sm"
          >
            Get Free Audit
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
