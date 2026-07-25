"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Phone, X } from "lucide-react";
import { NAV_LINKS, MEGA_MENU, WHATSAPP_URL } from "@/data/navigation";
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

export function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    onClose();
    setServicesOpen(false);
    // Only react to route changes, not to identity changes of onClose.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!open) setServicesOpen(false);
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
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden
          />
          <motion.aside
            key="mobile-nav-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-bg-secondary shadow-2xl shadow-black/50 lg:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-border-subtle px-5">
              <span className="font-[family-name:var(--font-heading)] text-lg font-extrabold tracking-tight text-text-primary">
                LIMINIQ
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle text-text-primary transition-colors hover:border-accent/40 hover:text-accent"
              >
                <X size={18} />
              </button>
            </div>

            <motion.nav
              variants={staggerFast}
              initial="hidden"
              animate="visible"
              className="flex-1 overflow-y-auto px-5 py-4"
            >
              {NAV_LINKS.map((link) => {
                const isMega = "mega" in link && link.mega;
                const isActive = pathname === link.href;

                if (isMega) {
                  return (
                    <motion.div
                      key={link.href}
                      variants={revealVariants}
                      className="border-b border-border-subtle/60"
                    >
                      <button
                        type="button"
                        onClick={() => setServicesOpen((v) => !v)}
                        aria-expanded={servicesOpen}
                        className="flex w-full items-center justify-between py-3.5 text-left"
                      >
                        <span
                          className={cn(
                            "text-lg font-semibold",
                            isActive ? "text-accent" : "text-text-primary"
                          )}
                        >
                          {link.label}
                        </span>
                        <ChevronDown
                          size={18}
                          className={cn(
                            "text-text-muted transition-transform duration-200",
                            servicesOpen && "rotate-180 text-accent"
                          )}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {servicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-5 pb-5 pl-1 pt-1">
                              {MEGA_MENU.columns.map((column) => (
                                <div key={column.title}>
                                  <p className="mb-2 font-[family-name:var(--font-mono)] text-[11px] font-semibold uppercase tracking-widest text-text-muted">
                                    {column.title}
                                  </p>
                                  <ul className="flex flex-col gap-2.5">
                                    {column.items.map((item) => (
                                      <li key={item.href}>
                                        <Link
                                          href={item.href}
                                          onClick={onClose}
                                          className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                                        >
                                          {item.label}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                              <Link
                                href={MEGA_MENU.footerCta.href}
                                onClick={onClose}
                                className="text-sm font-semibold text-accent"
                              >
                                {MEGA_MENU.footerCta.label} →
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    key={link.href}
                    variants={revealVariants}
                    className="border-b border-border-subtle/60"
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={cn(
                        "block py-3.5 text-lg font-semibold",
                        isActive ? "text-accent" : "text-text-primary"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>

            <div className="flex shrink-0 flex-col gap-3 border-t border-border-subtle px-5 py-5">
              <div className="flex items-center gap-3">
                <a
                  href={`tel:${SITE_CONTACT.phoneTel}`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border-subtle py-3 text-sm font-medium text-text-secondary transition-colors hover:border-accent/40 hover:text-text-primary"
                >
                  <Phone size={16} />
                  Call
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#25D366]/30 py-3 text-sm font-medium text-[#25D366] transition-colors hover:bg-[#25D366]/10"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
              <Link
                href="/contact#audit"
                onClick={onClose}
                className="btn-primary w-full justify-center"
              >
                Get Free Audit
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
