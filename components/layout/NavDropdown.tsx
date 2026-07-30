"use client";

import Link from "next/link";
import { ArrowUpRight, Circle } from "lucide-react";
import * as LucideIcons from "lucide-react";
import type { NavDropdownItem } from "@/data/navigation";

type IconComponent = React.ComponentType<{ size?: number; className?: string }>;

function getIcon(name?: string): IconComponent {
  if (!name) return Circle;
  const icons = LucideIcons as unknown as Record<string, IconComponent>;
  return icons[name] ?? Circle;
}

interface NavDropdownProps {
  title?: string;
  items: NavDropdownItem[];
  footer?: { label: string; href: string };
  onNavigate?: () => void;
}

/** Compact flyout used by Work / Industries / Tools / About / Blog / Pricing. */
export function NavDropdown({ title, items, footer, onNavigate }: NavDropdownProps) {
  return (
    <div className="w-[360px] max-w-[92vw] overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.14)]">
      {title && (
        <div className="bg-gradient-to-r from-[#EFF6FF] to-white px-5 py-3.5">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
            {title}
          </p>
        </div>
      )}
      <ul className="flex max-h-[min(70vh,420px)] flex-col gap-0.5 overflow-y-auto p-2.5">
        {items.map((item) => {
          const Icon = getIcon(item.icon);
          return (
            <li key={`${item.href}-${item.label}`}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-[#EFF6FF]"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-accent shadow-sm transition-transform group-hover:scale-105 group-hover:border-accent/30">
                  <Icon size={16} />
                </span>
                <span className="min-w-0 pt-0.5">
                  <span className="block text-sm font-semibold text-slate-900 group-hover:text-accent">
                    {item.label}
                  </span>
                  {item.description && (
                    <span className="mt-0.5 block text-xs leading-snug text-slate-500">
                      {item.description}
                    </span>
                  )}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      {footer && (
        <div className="border-t border-slate-100 bg-slate-50/80 px-5 py-3">
          <Link
            href={footer.href}
            onClick={onNavigate}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-opacity hover:opacity-80"
          >
            {footer.label}
            <ArrowUpRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
}
