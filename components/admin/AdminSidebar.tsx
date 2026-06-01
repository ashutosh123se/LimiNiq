"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: "⬛", exact: true },
  { label: "Leads", href: "/admin/leads", icon: "👤" },
  { label: "Analytics", href: "/admin/analytics", icon: "📊" },
  { label: "Pricing", href: "/admin/pricing", icon: "💰" },
  { label: "Blog", href: "/admin/blog", icon: "📝" },
  { label: "Portfolio", href: "/admin/portfolio", icon: "🎨" },
  { label: "Testimonials", href: "/admin/testimonials", icon: "⭐" },
  { label: "Newsletter", href: "/admin/newsletter", icon: "📧" },
  { label: "Settings", href: "/admin/settings", icon: "⚙️" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (item: typeof NAV_ITEMS[0]) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 240 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      style={{
        background: "var(--bg-dark)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "sticky",
        top: 0,
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div style={{ padding: "1.25rem 1rem", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem", color: "white", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}
            >
              LIMI<span style={{ color: "var(--text-primary)" }}>NIQ</span>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", padding: 4, flexShrink: 0 }}
          aria-label="Toggle sidebar"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {collapsed ? <><polyline points="9 18 15 12 9 6"/></> : <><polyline points="15 18 9 12 15 6"/></>}
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "0.75rem 0.5rem", display: "flex", flexDirection: "column", gap: "0.25rem", overflowY: "auto" }}>
        {NAV_ITEMS.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.65rem 0.75rem",
                borderRadius: 10,
                textDecoration: "none",
                background: active ? "rgba(59,91,255,0.18)" : "transparent",
                border: active ? "1px solid rgba(59,91,255,0.25)" : "1px solid transparent",
                color: active ? "white" : "rgba(255,255,255,0.5)",
                transition: "all 0.15s ease",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
                }
              }}
            >
              <span style={{ fontSize: "1rem", flexShrink: 0, width: 20, textAlign: "center" }}>{item.icon}</span>
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ fontFamily: "var(--font-heading)", fontSize: "0.88rem", fontWeight: 600 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {active && <div style={{ width: 3, height: 16, background: "var(--accent-blue)", borderRadius: 2, marginLeft: "auto", flexShrink: 0 }} />}
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      <div style={{ padding: "0.75rem 0.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          title={collapsed ? "Sign Out" : undefined}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            width: "100%",
            padding: "0.65rem 0.75rem",
            borderRadius: 10,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "rgba(255,255,255,0.4)",
            transition: "all 0.15s ease",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.1)";
            (e.currentTarget as HTMLElement).style.color = "#f87171";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)";
          }}
        >
          <span style={{ fontSize: "1rem", flexShrink: 0, width: 20, textAlign: "center" }}>🚪</span>
          <AnimatePresence>
            {!collapsed && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ fontFamily: "var(--font-heading)", fontSize: "0.88rem", fontWeight: 600 }}>
                Sign Out
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
}
