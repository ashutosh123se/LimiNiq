"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Circle } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";

type IconComponent = React.ComponentType<{ size?: number; className?: string }>;

export function getFlyoutIcon(name?: string): IconComponent {
  if (!name) return Circle;
  const icons = LucideIcons as unknown as Record<string, IconComponent>;
  return icons[name] ?? Circle;
}

export type FlyoutRowItem = {
  label: string;
  href: string;
  description?: string;
  icon?: string;
};

interface FlyoutShellProps {
  kicker: string;
  title: string;
  children: React.ReactNode;
  footer?: { label: string; href: string };
  chip?: string;
  onNavigate?: () => void;
  className?: string;
  /** Unique id so layoutId hover pills don't clash across menus */
  layoutId?: string;
}

/** Shared dark-glass chrome for every desktop sub-nav. */
export function FlyoutShell({
  kicker,
  title,
  children,
  footer,
  chip = "Since 2019",
  onNavigate,
  className,
}: FlyoutShellProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[1.25rem] border border-white/12 bg-[#0B1F3A]/95 text-white shadow-[0_28px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl",
        className
      )}
    >
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(96,165,250,0.7), rgba(59,130,246,0.45), transparent)",
        }}
        aria-hidden
      />

      <div className="flex items-start justify-between gap-4 px-5 pb-3 pt-4 sm:px-6">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-300/90">
            LIMINIQ · {kicker}
          </p>
          <p className="mt-1 font-[family-name:var(--font-heading)] text-base font-bold tracking-tight text-white sm:text-lg">
            {title}
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-white/55">
          {chip}
        </span>
      </div>

      <div className="px-2.5 pb-2.5 sm:px-3">{children}</div>

      {footer && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-black/20 px-5 py-3.5 sm:px-6">
          <Link
            href={footer.href}
            onClick={onNavigate}
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-sky-200 transition-colors hover:text-white"
          >
            {footer.label}
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
            Clear scope · owned code
          </span>
        </div>
      )}
    </div>
  );
}

interface FlyoutRowProps {
  item: FlyoutRowItem;
  index: number;
  onNavigate?: () => void;
  layoutId: string;
  active?: boolean;
  onHover?: () => void;
}

export function FlyoutRow({
  item,
  index,
  onNavigate,
  layoutId,
  active,
  onHover,
}: FlyoutRowProps) {
  const Icon = getFlyoutIcon(item.icon);

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      onMouseEnter={onHover}
      onFocus={onHover}
      className="group relative flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors"
    >
      {active && (
        <motion.span
          layoutId={layoutId}
          className="absolute inset-0 rounded-xl bg-white/[0.08] ring-1 ring-sky-300/25"
          transition={{ type: "spring", stiffness: 420, damping: 34 }}
        />
      )}
      <span className="relative z-[1] mt-0.5 font-mono text-[10px] font-semibold tabular-nums text-sky-300/70">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="relative z-[1] mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/12 bg-white/5 text-sky-200 transition-transform group-hover:scale-105 group-hover:border-sky-300/35 group-hover:bg-sky-400/10">
        <Icon size={15} />
      </span>
      <span className="relative z-[1] min-w-0 flex-1 pt-0.5">
        <span className="block text-sm font-semibold text-white group-hover:text-sky-100">
          {item.label}
        </span>
        {item.description && (
          <span className="mt-0.5 block text-xs leading-snug text-white/45">
            {item.description}
          </span>
        )}
      </span>
      <ArrowUpRight
        size={14}
        className="relative z-[1] mt-1 shrink-0 text-white/0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sky-200"
      />
    </Link>
  );
}
