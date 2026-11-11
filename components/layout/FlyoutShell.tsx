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
  tag?: string;
};

interface FlyoutShellProps {
  kicker: string;
  title: string;
  children: React.ReactNode;
  footer?: { label: string; href: string };
  chip?: string;
  onNavigate?: () => void;
  className?: string;
}

/** Shared high-end dark obsidian glass shell for desktop navigation dropdowns */
export function FlyoutShell({
  kicker,
  title,
  children,
  footer,
  chip = "150+ Shipped",
  onNavigate,
  className,
}: FlyoutShellProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-white/15 bg-[#060D1E]/95 text-white shadow-[0_25px_70px_rgba(0,0,0,0.6)] backdrop-blur-2xl",
        className
      )}
    >
      {/* Top glowing ambient accent hairline */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(56,189,248,0.8), rgba(99,102,241,0.6), transparent)",
        }}
        aria-hidden
      />

      {/* Header Bar */}
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3.5 sm:px-6">
        <div>
          <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.18em] text-sky-300">
            LIMINIQ · {kicker}
          </p>
          <p className="font-[family-name:var(--font-heading)] text-sm font-bold tracking-tight text-white sm:text-base">
            {title}
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-sky-400/25 bg-sky-500/10 px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-sky-200">
          {chip}
        </span>
      </div>

      {/* Body Content */}
      <div className="p-3 sm:p-4">{children}</div>

      {/* Footer Bar */}
      {footer && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-black/30 px-5 py-3 sm:px-6">
          <Link
            href={footer.href}
            onClick={onNavigate}
            className="group inline-flex items-center gap-1.5 text-xs font-bold text-sky-300 transition-colors hover:text-white"
          >
            {footer.label}
            <ArrowUpRight
              size={13}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
            Fixed Milestones • Owned Code
          </span>
        </div>
      )}
    </div>
  );
}

interface FlyoutRowProps {
  item: FlyoutRowItem;
  onNavigate?: () => void;
  layoutId?: string;
  active?: boolean;
  onHover?: () => void;
}

export function FlyoutRow({
  item,
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
      className="group relative flex items-start gap-3 rounded-xl p-2.5 transition-all duration-200 hover:bg-white/[0.06]"
    >
      {active && layoutId && (
        <motion.span
          layoutId={layoutId}
          className="absolute inset-0 rounded-xl bg-white/[0.08] ring-1 ring-sky-300/30"
          transition={{ type: "spring", stiffness: 440, damping: 32 }}
        />
      )}

      {/* Micro Icon Box */}
      <span className="relative z-[1] mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/12 bg-white/[0.05] text-sky-300 transition-all duration-200 group-hover:scale-105 group-hover:border-sky-400/40 group-hover:bg-sky-500/15 group-hover:text-white">
        <Icon size={15} />
      </span>

      {/* Text Info */}
      <span className="relative z-[1] min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="block text-[13px] font-bold text-white group-hover:text-sky-200 transition-colors">
            {item.label}
          </span>
          {item.tag && (
            <span className="rounded bg-sky-500/20 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-sky-300">
              {item.tag}
            </span>
          )}
        </span>
        {item.description && (
          <span className="mt-0.5 block text-[11.5px] leading-snug text-slate-300/70 group-hover:text-slate-200 transition-colors">
            {item.description}
          </span>
        )}
      </span>

      {/* Arrow Indicator */}
      <ArrowUpRight
        size={13}
        className="relative z-[1] mt-1 shrink-0 text-white/0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sky-300"
      />
    </Link>
  );
}
