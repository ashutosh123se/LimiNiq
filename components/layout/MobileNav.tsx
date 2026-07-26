"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Phone, X } from "lucide-react";
import { NAV_LINKS, MEGA_MENU, WHATSAPP_URL, type NavLink } from "@/data/navigation";
import { SITE_CONTACT } from "@/lib/site";
import { cn } from "@/lib/utils";
import { revealVariants, staggerFast } from "@/lib/motion";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

function SubAccordion({
  link,
  open,
  onToggle,
  onClose,
}: {
  link: NavLink;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  return (
    <div className="border-b border-border-subtle/60">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 text-left text-[1.35rem] font-semibold text-text-primary"
        aria-expanded={open}
      >
        {link.label}
        <ChevronDown className={cn("h-5 w-5 text-text-muted transition-transform", open && "rotate-180")} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="space-y-1 pb-4 pl-1">
              {link.mega &&
                MEGA_MENU.columns.map((col) => (
                  <div key={col.title} className="mb-3">
                    <p className="mb-1.5 font-mono text-[10px] uppercase tracking-widest text-text-muted">
                      {col.title}
                    </p>
                    {col.items.map((item) => (
                      <Link
                        key={`${item.href}-${item.label}`}
                        href={item.href}
                        onClick={onClose}
                        className="block rounded-lg px-2 py-2 text-sm text-text-secondary hover:bg-white/5 hover:text-accent"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}
              {link.dropdown?.items.map((item) => (
                <Link
                  key={`${item.href}-${item.label}`}
                  href={item.href}
                  onClick={onClose}
                  className="block rounded-lg px-2 py-2.5 text-sm text-text-secondary hover:bg-white/5 hover:text-accent"
                >
                  <span className="font-medium text-text-primary">{item.label}</span>
                  {item.description && (
                    <span className="mt-0.5 block text-xs text-text-muted">{item.description}</span>
                  )}
                </Link>
              ))}
              {(link.dropdown?.footer || link.mega) && (
                <Link
                  href={link.dropdown?.footer?.href ?? "/services"}
                  onClick={onClose}
                  className="mt-2 inline-flex px-2 text-sm font-semibold text-accent"
                >
                  {link.dropdown?.footer?.label ?? "All services →"}
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  useEffect(() => {
    onClose();
    setOpenAccordion(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!open) setOpenAccordion(null);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="mobile-nav-backdrop"
            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden
          />
          <motion.aside
            key="mobile-nav-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-bg-secondary shadow-2xl xl:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-border-subtle px-5">
              <span className="font-[family-name:var(--font-heading)] text-lg font-extrabold text-text-primary">
                LIMINIQ
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle"
              >
                <X size={18} />
              </button>
            </div>

            <motion.nav
              variants={staggerFast}
              initial="hidden"
              animate="visible"
              className="flex-1 overflow-y-auto px-5 py-2"
            >
              {NAV_LINKS.map((link) => {
                const hasSub = Boolean(link.mega || link.dropdown);
                if (hasSub) {
                  return (
                    <motion.div key={link.href} variants={revealVariants}>
                      <SubAccordion
                        link={link}
                        open={openAccordion === link.href}
                        onToggle={() =>
                          setOpenAccordion(openAccordion === link.href ? null : link.href)
                        }
                        onClose={onClose}
                      />
                    </motion.div>
                  );
                }
                return (
                  <motion.div key={link.href} variants={revealVariants}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={cn(
                        "block border-b border-border-subtle/60 py-4 text-[1.35rem] font-semibold",
                        pathname === link.href ? "text-accent" : "text-text-primary"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>

            <div className="shrink-0 space-y-3 border-t border-border-subtle p-5">
              <a
                href={`tel:${SITE_CONTACT.phoneTel}`}
                className="flex items-center gap-3 rounded-xl border border-border-subtle px-4 py-3 text-sm text-text-secondary"
              >
                <Phone size={16} /> {SITE_CONTACT.phone}
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-[#25D366]/30 bg-[#25D366]/10 px-4 py-3 text-sm text-[#25D366]"
              >
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp us
              </a>
              <Link href="/contact#audit" onClick={onClose} className="btn-primary w-full justify-center">
                Get Free Audit
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
