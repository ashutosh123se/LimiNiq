"use client";

import Link from "next/link";
import { ArrowUpRight, Circle, Sparkles } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { MEGA_MENU } from "@/data/navigation";

type IconComponent = React.ComponentType<{ size?: number; className?: string }>;

function getIcon(name: string): IconComponent {
  const icons = LucideIcons as unknown as Record<string, IconComponent>;
  return icons[name] ?? Circle;
}

interface MegaMenuProps {
  onNavigate?: () => void;
  className?: string;
}

export function MegaMenu({ onNavigate, className }: MegaMenuProps) {
  return (
    <div
      className={`w-[860px] max-w-[92vw] overflow-hidden rounded-2xl border border-border-subtle bg-bg-secondary/98 shadow-2xl shadow-black/60 backdrop-blur-xl ${className ?? ""}`}
    >
      <div className="grid grid-cols-4 gap-6 p-8">
        {MEGA_MENU.columns.map((column) => (
          <div key={column.title} className="min-w-0">
            <h4 className="mb-4 font-[family-name:var(--font-mono)] text-[11px] font-semibold uppercase tracking-widest text-text-muted">
              {column.title}
            </h4>
            <ul className="flex flex-col gap-1">
              {column.items.map((item) => {
                const Icon = getIcon(item.icon);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      className="group -mx-2 flex items-start gap-2.5 rounded-lg px-2 py-2 text-sm text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary"
                    >
                      <Icon
                        size={16}
                        className="mt-0.5 shrink-0 text-accent transition-transform group-hover:scale-110"
                      />
                      <span className="leading-snug">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border-subtle bg-bg-primary/40 px-8 py-5">
        <Link
          href={MEGA_MENU.footerCta.href}
          onClick={onNavigate}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-text-primary transition-colors hover:text-accent"
        >
          {MEGA_MENU.footerCta.label}
          <ArrowUpRight size={15} />
        </Link>

        <Link
          href={MEGA_MENU.promo.href}
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-xl border border-accent/25 bg-accent/10 px-4 py-2.5 transition-colors hover:border-accent/40 hover:bg-accent/15"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
            <Sparkles size={16} />
          </span>
          <span className="text-sm leading-tight">
            <span className="block font-[family-name:var(--font-heading)] font-bold text-text-primary">
              {MEGA_MENU.promo.stat}
            </span>
            <span className="text-xs text-text-muted">{MEGA_MENU.promo.cta}</span>
          </span>
        </Link>
      </div>
    </div>
  );
}
