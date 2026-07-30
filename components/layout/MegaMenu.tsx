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
      className={`w-[min(920px,94vw)] overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.16)] ${className ?? ""}`}
    >
      <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
        {MEGA_MENU.columns.map((column, colIdx) => (
          <div
            key={column.title}
            className={`min-w-0 border-b border-slate-100 p-5 last:border-b-0 sm:border-b-0 lg:border-r lg:border-slate-100 lg:last:border-r-0 ${
              colIdx === 0 ? "bg-gradient-to-b from-[#EFF6FF] to-white" : "bg-white"
            }`}
          >
            <h4 className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
              {column.title}
            </h4>
            <ul className="flex flex-col gap-0.5">
              {column.items.map((item) => {
                const Icon = getIcon(item.icon);
                return (
                  <li key={`${item.href}-${item.label}`}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      className="group -mx-1.5 flex items-center gap-2.5 rounded-xl px-1.5 py-2 text-sm text-slate-600 transition-all hover:bg-[#EFF6FF] hover:text-slate-900"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-accent shadow-sm transition-transform group-hover:scale-105 group-hover:border-accent/35">
                        <Icon size={14} />
                      </span>
                      <span className="leading-snug font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 bg-slate-50/90 px-6 py-4">
        <Link
          href={MEGA_MENU.footerCta.href}
          onClick={onNavigate}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 transition-colors hover:text-accent"
        >
          {MEGA_MENU.footerCta.label}
          <ArrowUpRight size={15} />
        </Link>

        <Link
          href={MEGA_MENU.promo.href}
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-xl border border-accent/20 bg-white px-4 py-2.5 shadow-sm transition-colors hover:border-accent/40 hover:bg-[#EFF6FF]"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-white">
            <Sparkles size={15} />
          </span>
          <span className="text-sm leading-tight">
            <span className="block font-[family-name:var(--font-heading)] font-bold text-slate-900">
              {MEGA_MENU.promo.stat}
            </span>
            <span className="text-xs text-slate-500">{MEGA_MENU.promo.cta}</span>
          </span>
        </Link>
      </div>
    </div>
  );
}
