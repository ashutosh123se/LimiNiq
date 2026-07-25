"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FAQ } from "@/data/faqs";

export function Accordion({ items }: { items: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.question} className="glass-card overflow-hidden">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="font-[family-name:var(--font-heading)] font-semibold text-text-primary">
                {item.question}
              </span>
              <ChevronDown
                className={cn("h-5 w-5 shrink-0 text-text-muted transition-transform", isOpen && "rotate-180")}
              />
            </button>
            {isOpen && (
              <div className="border-t border-border-subtle px-5 py-4 text-text-secondary leading-relaxed">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
