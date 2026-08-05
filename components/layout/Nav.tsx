"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, Phone } from "lucide-react";
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
  openMenu,
  scheduleClose,
  setOpenKey,
  pathname,
  tone,
  compact,
}: {
  link: NavLink;
  menuKey: string;
  openKey: string | null;
  openMenu: (key: string) => void;
  scheduleClose: () => void;
  setOpenKey: (key: string | null) => void;
  pathname: string | null;
  tone: ShellTone;
  compact?: boolean;
}) {
  const isOpen = openKey === menuKey;
  const isActive = isLinkActive(pathname, link.href);
  const sub = hasSubnav(link);
  const dark = tone === "dark";

  const linkClass = cn(
    "relative z-[1] flex items-center gap-1 rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-200",
    compact && "px-3",
    isActive || isOpen
      ? dark
        ? "text-white"
        : "text-accent"
      : dark
        ? "text-white/65 hover:text-white"
        : "text-text-secondary hover:text-text-primary"
  );

  if (!sub) {
    return (
      <Link href={link.href} className={linkClass}>
        {(isActive || isOpen) && (
          <motion.span
            layoutId={compact ? "nav-pill-compact" : "nav-pill"}
            className={cn(
              "absolute inset-0 -z-10 rounded-full",
              dark ? "bg-white/12 ring-1 ring-white/15" : "bg-accent/10 ring-1 ring-accent/15"
            )}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
          />
        )}
        {link.label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => openMenu(menuKey)}
      onMouseLeave={scheduleClose}
      onFocus={() => openMenu(menuKey)}
    >
      <Link
        href={link.href}
        onClick={() => setOpenKey(null)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={linkClass}
      >
        {(isActive || isOpen) && (
          <motion.span
            layoutId={compact ? "nav-pill-compact" : "nav-pill"}
            className={cn(
              "absolute inset-0 -z-10 rounded-full",
              dark ? "bg-white/12 ring-1 ring-white/15" : "bg-accent/10 ring-1 ring-accent/15"
            )}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
          />
        )}
        {link.label}
        <ChevronDown
          size={compact ? 12 : 13}
          className={cn("transition-transform duration-200", isOpen && "rotate-180")}
        />
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "fixed left-1/2 z-50 -translate-x-1/2 pt-3",
              "top-[4.75rem] sm:top-[5.25rem] lg:top-[5.75rem]",
              link.mega
                ? "w-[min(820px,calc(100vw-1.5rem))]"
                : "w-[min(400px,calc(100vw-1.5rem))]"
            )}
            onMouseEnter={() => openMenu(menuKey)}
            onMouseLeave={scheduleClose}
          >
            {link.mega ? (
              <MegaMenu onNavigate={() => setOpenKey(null)} />
            ) : link.dropdown ? (
              <NavDropdown
                title={link.dropdown.title}
                items={[...link.dropdown.items]}
                footer={link.dropdown.footer}
                onNavigate={() => setOpenKey(null)}
              />
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Nav() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const overHero = pathname === "/" && !scrolled;
  const tone: ShellTone = overHero ? "dark" : "light";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpenKey(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const openMenu = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenKey(key);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenKey(null), 180);
  };

  const shell = (extra?: string) =>
    cn(
      "relative flex items-center rounded-2xl border backdrop-blur-2xl transition-all duration-500",
      overHero
        ? "border-white/12 bg-[#0B1F3A]/60 shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
        : scrolled
          ? "border-border-subtle bg-white/90 shadow-[0_14px_40px_rgba(15,23,42,0.1)]"
          : "border-border-subtle/80 bg-white/80 shadow-[0_8px_28px_rgba(15,23,42,0.06)]",
      extra
    );

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <motion.div
        initial={reduced ? false : { y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto mx-auto flex max-w-[1440px] items-center justify-between gap-2 px-3 pt-3 sm:gap-3 lg:gap-4 lg:px-6 lg:pt-4"
      >
        {/* Logo island */}
        <div className={shell("h-[3.6rem] shrink-0 px-2 sm:h-16 sm:px-2.5 lg:h-[4.25rem] lg:px-3")}>
          <Link
            href="/"
            className="group flex items-center"
            aria-label="LIMINIQ home"
          >
            <Image
              src={overHero ? "/images/logo-stack.png" : "/images/logo-stack-dark.png"}
              alt="LIMINIQ"
              width={480}
              height={480}
              priority
              className="h-[3.1rem] w-[3.1rem] object-contain transition-transform duration-300 group-hover:scale-105 sm:h-14 sm:w-14"
            />
          </Link>
        </div>

        {/* Links island */}
        <nav
          className={shell(
            "hidden h-[3.6rem] min-w-0 flex-1 items-center justify-center gap-0.5 px-2 sm:h-16 lg:flex lg:h-[4.25rem] lg:px-3 xl:max-w-3xl"
          )}
          aria-label="Primary"
        >
          <div className="hidden w-full items-center justify-center gap-0.5 xl:flex">
            {NAV_LINKS.map((link) => (
              <NavItem
                key={link.href}
                link={link}
                menuKey={link.href}
                openKey={openKey}
                openMenu={openMenu}
                scheduleClose={scheduleClose}
                setOpenKey={setOpenKey}
                pathname={pathname}
                tone={tone}
              />
            ))}
          </div>
          <div className="flex w-full items-center justify-center gap-0.5 xl:hidden">
            {NAV_LINKS.filter((l) =>
              ["Services", "Work", "Tools", "Pricing"].includes(l.label)
            ).map((link) => (
              <NavItem
                key={`compact-${link.href}`}
                link={link}
                menuKey={`compact-${link.href}`}
                openKey={openKey}
                openMenu={openMenu}
                scheduleClose={scheduleClose}
                setOpenKey={setOpenKey}
                pathname={pathname}
                tone={tone}
                compact
              />
            ))}
          </div>
        </nav>

        {/* Actions island */}
        <div className={shell("h-[3.6rem] shrink-0 gap-1.5 px-2 sm:h-16 lg:h-[4.25rem] lg:gap-2 lg:px-3")}>
          <a
            href={`tel:${SITE_CONTACT.phoneTel}`}
            className={cn(
              "hidden items-center gap-2 rounded-full px-2.5 py-1.5 text-sm font-medium transition-colors lg:flex",
              overHero
                ? "text-white/70 hover:bg-white/10 hover:text-white"
                : "text-text-secondary hover:bg-accent/5 hover:text-text-primary"
            )}
          >
            <Phone size={15} />
            <span className="hidden xl:inline">{SITE_CONTACT.phone}</span>
          </a>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className={cn(
              "hidden h-9 w-9 items-center justify-center rounded-full border transition-all lg:flex",
              overHero
                ? "border-white/15 text-white/75 hover:border-[#25D366]/60 hover:bg-[#25D366]/15 hover:text-[#25D366]"
                : "border-border-subtle text-text-secondary hover:border-[#25D366]/50 hover:text-[#25D366]"
            )}
          >
            <WhatsAppIcon className="h-4 w-4" />
          </a>

          <Link
            href="/contact"
            className={cn(
              "group relative hidden overflow-hidden rounded-full px-4 py-2 text-sm font-semibold transition-transform hover:scale-[1.03] active:scale-[0.98] lg:inline-flex",
              overHero
                ? "bg-white text-[#0B1F3A] hover:bg-blue-50"
                : "bg-accent text-white shadow-[0_10px_28px_rgba(29,78,216,0.35)] hover:bg-accent-hover"
            )}
          >
            {!overHero && !reduced && (
              <motion.span
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                animate={{ x: ["-120%", "120%"] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 2.5 }}
              />
            )}
            <span className="relative flex items-center gap-1.5">
              Book a Call
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </Link>

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border transition-colors xl:hidden",
              overHero
                ? "border-white/20 text-white hover:bg-white/10"
                : "border-border-subtle text-text-primary hover:border-accent/40 hover:text-accent"
            )}
          >
            <Menu size={20} />
          </button>
        </div>
      </motion.div>

      {/* Outside pointer-events-none header shell so the drawer is clickable */}
      <div className="pointer-events-auto">
        <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
      </div>
    </header>
  );
}
