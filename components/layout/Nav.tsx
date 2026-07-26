"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Phone } from "lucide-react";
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

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-16 lg:h-20",
        "border-b transition-all duration-300",
        scrolled
          ? "border-border-subtle bg-white/90 shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl"
          : "border-transparent bg-white/70 backdrop-blur-md"
      )}
    >
      {/* subtle top glow line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-70"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(29,78,216,0.45), rgba(59,130,246,0.35), transparent)",
        }}
        aria-hidden
      />

      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between gap-4 px-5 lg:px-10">
        <Link
          href="/"
          className="group relative font-[family-name:var(--font-heading)] text-xl font-extrabold tracking-tight text-text-primary lg:text-2xl"
        >
          <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
            LIMINIQ · Est 2019
          </span>
          LIMINIQ
          <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const key = link.href;
            const isOpen = openKey === key;
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname?.startsWith(`${link.href}/`));
            const sub = hasSubnav(link);

            if (!sub) {
              return (
                <Link
                  key={key}
                  href={link.href}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors",
                    isActive ? "text-accent" : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  {link.label}
                </Link>
              );
            }

            return (
              <div
                key={key}
                className="relative"
                onMouseEnter={() => openMenu(key)}
                onMouseLeave={scheduleClose}
                onFocus={() => openMenu(key)}
              >
                <Link
                  href={link.href}
                  onClick={() => setOpenKey(null)}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  className={cn(
                    "flex items-center gap-1 rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors",
                    isActive || isOpen
                      ? "text-accent"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  {link.label}
                  <ChevronDown
                    size={13}
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
                        "absolute top-full pt-3",
                        link.mega ? "left-1/2 -translate-x-1/2" : "left-0"
                      )}
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
          })}
        </nav>

        {/* Compact nav for lg–xl when full nav is hidden */}
        <nav className="hidden items-center gap-0.5 lg:flex xl:hidden" aria-label="Primary compact">
          {NAV_LINKS.filter((l) => ["Services", "Work", "Tools", "Pricing"].includes(l.label)).map(
            (link) => {
              const key = `compact-${link.href}`;
              const isOpen = openKey === key;
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname?.startsWith(`${link.href}/`));
              return (
                <div
                  key={key}
                  className="relative"
                  onMouseEnter={() => openMenu(key)}
                  onMouseLeave={scheduleClose}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-1 rounded-full px-3 py-2 text-[13px] font-medium",
                      isActive || isOpen ? "text-accent" : "text-text-secondary"
                    )}
                  >
                    {link.label}
                    {hasSubnav(link) && (
                      <ChevronDown size={12} className={cn(isOpen && "rotate-180")} />
                    )}
                  </Link>
                  <AnimatePresence>
                    {isOpen && hasSubnav(link) && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute left-0 top-full z-50 pt-3"
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
          )}
        </nav>

        <div className="flex items-center gap-2 lg:gap-3">
          <a
            href={`tel:${SITE_CONTACT.phoneTel}`}
            className="hidden items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary lg:flex"
          >
            <Phone size={15} />
            <span className="hidden xl:inline">{SITE_CONTACT.phone}</span>
          </a>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-border-subtle text-text-secondary transition-all hover:border-[#25D366]/50 hover:text-[#25D366] hover:shadow-[0_0_20px_rgba(37,211,102,0.25)] lg:flex"
          >
            <WhatsAppIcon className="h-4 w-4" />
          </a>

          <Link
            href="/contact#audit"
            className="btn-primary hidden !px-5 !py-2.5 text-sm lg:inline-flex"
          >
            Get Free Audit
          </Link>

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle text-text-primary transition-colors hover:border-accent/40 hover:text-accent xl:hidden"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
