"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, Phone, Sparkles } from "lucide-react";
import { NAV_LINKS, WHATSAPP_URL, type NavLink } from "@/data/navigation";
import { SITE_CONTACT } from "@/lib/site";
import { cn } from "@/lib/utils";
import { MegaMenu } from "./MegaMenu";
import { NavDropdown } from "./NavDropdown";
import { MobileNav } from "./MobileNav";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function hasSubnav(link: NavLink) {
  return Boolean(link.mega || link.dropdown);
}

function isLinkActive(pathname: string | null, href: string) {
  return pathname === href || (href !== "/" && Boolean(pathname?.startsWith(`${href}/`)));
}

type ShellTone = "dark" | "light";

function NavItem({
  link,
  menuKey,
  openKey,
  toggleMenu,
  pathname,
  tone,
}: {
  link: NavLink;
  menuKey: string;
  openKey: string | null;
  toggleMenu: (key: string) => void;
  pathname: string | null;
  tone: ShellTone;
}) {
  const isOpen = openKey === menuKey;
  const isActive = isLinkActive(pathname, link.href);
  const sub = hasSubnav(link);
  const dark = tone === "dark";

  const linkClass = cn(
    "relative z-[1] flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors duration-200",
    isActive || isOpen
      ? dark
        ? "text-white"
        : "text-blue-600"
      : dark
        ? "text-white/75 hover:text-white"
        : "text-slate-600 hover:text-slate-900"
  );

  if (!sub) {
    return (
      <Link href={link.href} className={linkClass}>
        {(isActive || isOpen) && (
          <motion.span
            layoutId="nav-pill"
            className={cn(
              "absolute inset-0 -z-10 rounded-full",
              dark ? "bg-white/15 ring-1 ring-white/20" : "bg-blue-50 ring-1 ring-blue-500/20"
            )}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
          />
        )}
        {link.label}
      </Link>
    );
  }

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-haspopup="true"
      onClick={() => toggleMenu(menuKey)}
      className={linkClass}
    >
      {(isActive || isOpen) && (
        <motion.span
          layoutId="nav-pill"
          className={cn(
            "absolute inset-0 -z-10 rounded-full",
            dark ? "bg-white/15 ring-1 ring-white/20" : "bg-blue-50 ring-1 ring-blue-500/20"
          )}
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
        />
      )}
      {link.label}
      <ChevronDown
        size={12}
        className={cn("transition-transform duration-200", isOpen && "rotate-180")}
      />
    </button>
  );
}

export function Nav() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const overHero = pathname === "/" && !scrolled;
  const tone: ShellTone = overHero ? "dark" : "light";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      setOpenKey(null);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpenKey(null);
    setMobileOpen(false);
  }, [pathname]);

  // Click-outside + Escape close
  useEffect(() => {
    if (!openKey) return;

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (navRef.current?.contains(target)) return;
      setOpenKey(null);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenKey(null);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openKey]);

  const toggleMenu = (key: string) => {
    setOpenKey((prev) => (prev === key ? null : key));
  };

  const openLink = NAV_LINKS.find((l) => l.href === openKey) ?? null;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <motion.div
        initial={reduced ? false : { y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-7xl px-4 pt-3 sm:px-6 sm:pt-4"
      >
        <div
          className={cn(
            "pointer-events-auto flex items-center justify-between gap-3 rounded-2xl px-3.5 py-2 sm:px-5 sm:py-2.5 transition-all duration-300 backdrop-blur-2xl border",
            overHero
              ? "bg-[#060B18]/80 border-white/15 border-t-white/25 text-white shadow-[0_16px_48px_rgba(0,0,0,0.55)]"
              : "bg-white/92 border-slate-200/90 text-slate-900 shadow-[0_8px_30px_rgba(15,23,42,0.08)]"
          )}
        >
          {/* Brand Lockup */}
          <Link href="/" className="group flex items-center gap-2.5 shrink-0" aria-label="LIMINIQ Home">
            <div className={cn(
              "relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center overflow-hidden rounded-xl border transition-transform duration-300 group-hover:scale-105",
              overHero ? "border-white/15 bg-white/10" : "border-slate-200 bg-slate-50"
            )}>
              <Image
                src={overHero ? "/images/logo-stack.png" : "/images/logo-stack-dark.png"}
                alt="LIMINIQ Logo"
                fill
                priority
                className="object-contain p-1.5"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg sm:text-xl font-extrabold tracking-tight leading-none text-current">
                LIMINIQ
              </span>
              <span className={cn(
                "font-mono text-[9px] font-bold tracking-widest uppercase leading-none mt-1 flex items-center gap-1",
                overHero ? "text-blue-300" : "text-blue-600"
              )}>
                AI &amp; SOFTWARE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            ref={navRef}
            className="relative hidden items-center justify-center gap-1 lg:flex"
            aria-label="Primary Navigation"
          >
            {NAV_LINKS.map((link) => (
              <NavItem
                key={link.href}
                link={link}
                menuKey={link.href}
                openKey={openKey}
                toggleMenu={toggleMenu}
                pathname={pathname}
                tone={tone}
              />
            ))}

            {/* Dropdown / Mega Menu Container */}
            <AnimatePresence>
              {openLink && (
                <motion.div
                  key={openLink.href}
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    "absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4",
                    openLink.mega
                      ? "w-[min(840px,calc(100vw-2rem))]"
                      : "w-[min(420px,calc(100vw-2rem))]"
                  )}
                >
                  {openLink.mega ? (
                    <MegaMenu onNavigate={() => setOpenKey(null)} />
                  ) : openLink.dropdown ? (
                    <NavDropdown
                      title={openLink.dropdown.title}
                      items={[...openLink.dropdown.items]}
                      footer={openLink.dropdown.footer}
                      onNavigate={() => setOpenKey(null)}
                    />
                  ) : null}
                </motion.div>
              )}
            </AnimatePresence>
          </nav>

          {/* Right Action Group */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Global Timezone Indicator */}
            <div
              className={cn(
                "hidden xl:inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold border",
                overHero
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                  : "border-emerald-200 bg-emerald-50 text-emerald-700"
              )}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              US / UK / Gulf Overlap
            </div>

            {/* Direct Phone */}
            <a
              href={`tel:${SITE_CONTACT.phoneTel}`}
              className={cn(
                "hidden 2xl:flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-colors",
                overHero
                  ? "text-white/75 hover:bg-white/10 hover:text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <Phone size={13} />
              <span>{SITE_CONTACT.phone}</span>
            </a>

            {/* WhatsApp Quick Chat */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with our engineering team on WhatsApp"
              className={cn(
                "hidden sm:flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-200",
                overHero
                  ? "border-white/15 text-white/80 hover:border-emerald-400/60 hover:bg-emerald-500/15 hover:text-emerald-400"
                  : "border-slate-200 text-slate-600 hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50"
              )}
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>

            {/* Primary Action Button */}
            <Link
              href="/contact"
              className={cn(
                "group inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all duration-200 shadow-2xs",
                overHero
                  ? "bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 text-white shadow-[0_4px_20px_rgba(56,189,248,0.4)] hover:shadow-[0_4px_26px_rgba(56,189,248,0.65)] hover:scale-[1.02]"
                  : "bg-blue-600 text-white hover:bg-blue-700 shadow-[0_4px_16px_rgba(37,99,235,0.3)]"
              )}
            >
              <span>Book a Call</span>
              <ArrowUpRight
                size={14}
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              aria-label="Open mobile navigation menu"
              onClick={() => setMobileOpen(true)}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-xl border transition-colors lg:hidden",
                overHero
                  ? "border-white/20 text-white hover:bg-white/10"
                  : "border-slate-200 text-slate-800 hover:border-blue-500 hover:text-blue-600"
              )}
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Drawer */}
      <div className="pointer-events-auto">
        <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
      </div>
    </header>
  );
}
