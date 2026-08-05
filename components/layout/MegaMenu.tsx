"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Circle, ShieldCheck, Sparkles, Zap } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { MEGA_MENU } from "@/data/navigation";
import { TEAM } from "@/data/team";
import { SITE_CONTACT } from "@/lib/site";
import { cn } from "@/lib/utils";

type IconComponent = React.ComponentType<{ size?: number; className?: string }>;

function getIcon(name: string): IconComponent {
  const icons = LucideIcons as unknown as Record<string, IconComponent>;
  return icons[name] ?? Circle;
}

const TRUST = [
  { icon: Zap, label: "Sprint-ready" },
  { icon: ShieldCheck, label: "You own the code" },
  { icon: Sparkles, label: "Build + acquire" },
];

interface MegaMenuProps {
  onNavigate?: () => void;
  className?: string;
}

export function MegaMenu({ onNavigate, className }: MegaMenuProps) {
  const [activeCol, setActiveCol] = useState(0);
  const active = MEGA_MENU.columns[activeCol] ?? MEGA_MENU.columns[0];
  const ActiveIcon = getIcon(active.items[0]?.icon ?? "Code2");

  return (
    <div
      className={cn(
        "w-[min(1080px,calc(100vw-1.5rem))] overflow-hidden rounded-[1.35rem] border border-slate-200/90 bg-white shadow-[0_32px_90px_rgba(15,23,42,0.18)]",
        className
      )}
    >
      <div className="grid lg:grid-cols-[1.35fr_0.85fr]">
        {/* Categories */}
        <div className="p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-3 px-1">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
                Services
              </p>
              <p className="mt-1 font-[family-name:var(--font-heading)] text-lg font-bold text-slate-900">
                Ten disciplines. One team.
              </p>
            </div>
            <Link
              href="/services"
              onClick={onNavigate}
              className="hidden items-center gap-1 text-sm font-semibold text-accent sm:inline-flex"
            >
              View all <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {MEGA_MENU.columns.map((column, colIdx) => (
              <div
                key={column.title}
                onMouseEnter={() => setActiveCol(colIdx)}
                className={cn(
                  "rounded-2xl border p-3.5 transition-all duration-300",
                  activeCol === colIdx
                    ? "border-accent/30 bg-gradient-to-br from-[#EFF6FF] to-white shadow-[0_10px_30px_rgba(29,78,216,0.08)]"
                    : "border-slate-100 bg-slate-50/50 hover:border-slate-200 hover:bg-white"
                )}
              >
                <div className="mb-2.5 flex items-center gap-2">
                  <span
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-lg text-[11px] font-bold",
                      activeCol === colIdx
                        ? "bg-accent text-white"
                        : "bg-white text-accent ring-1 ring-slate-200"
                    )}
                  >
                    0{colIdx + 1}
                  </span>
                  <h4 className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                    {column.title}
                  </h4>
                </div>
                <ul className="flex flex-col gap-0.5">
                  {column.items.map((item) => {
                    const Icon = getIcon(item.icon);
                    return (
                      <li key={`${item.href}-${item.label}`}>
                        <Link
                          href={item.href}
                          onClick={onNavigate}
                          className="group flex items-center gap-2 rounded-xl px-1.5 py-1.5 text-[13px] text-slate-600 transition-colors hover:bg-white hover:text-slate-900"
                        >
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-slate-200/80 bg-white text-accent transition-transform group-hover:scale-105">
                            <Icon size={13} />
                          </span>
                          <span className="min-w-0 leading-snug font-medium">{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Showcase panel */}
        <div className="relative overflow-hidden bg-[#0B1F3A] p-5 text-white sm:p-6">
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 80% 0%, rgba(59,130,246,0.35), transparent 55%)",
            }}
            aria-hidden
          />
          <div className="relative">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-300">
              Spotlight · {active.title}
            </p>

            <div className="relative mt-4 overflow-hidden rounded-xl border border-white/10 bg-black/20">
              <div className="relative aspect-[16/10]">
                <Image
                  src="/images/portfolio/ecommerce_dashboard.png"
                  alt=""
                  fill
                  sizes="400px"
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-sky-200 backdrop-blur">
                  <ActiveIcon size={15} />
                </span>
                <span className="text-sm font-semibold">{active.items[0]?.label}</span>
              </div>
            </div>

            <div className="mt-4 grid gap-2">
              {TRUST.map((t) => (
                <div
                  key={t.label}
                  className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white/85"
                >
                  <t.icon size={14} className="text-sky-300" />
                  {t.label}
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
              <div className="flex -space-x-2">
                {TEAM.slice(0, 3).map((m) => (
                  <Image
                    key={m.name}
                    src={m.photoSrc}
                    alt={m.name}
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full border-2 border-[#0B1F3A] object-cover"
                  />
                ))}
              </div>
              <a
                href={`mailto:${SITE_CONTACT.email}`}
                className="truncate text-xs text-sky-200/90 hover:text-white"
              >
                {SITE_CONTACT.email}
              </a>
            </div>

            <Link
              href={MEGA_MENU.promo.href}
              onClick={onNavigate}
              className="mt-4 flex w-full items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#0B1F3A] transition hover:bg-sky-50"
            >
              <span>
                <span className="block font-[family-name:var(--font-heading)]">
                  {MEGA_MENU.promo.stat}
                </span>
                <span className="text-xs font-medium text-slate-500">{MEGA_MENU.promo.cta}</span>
              </span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
