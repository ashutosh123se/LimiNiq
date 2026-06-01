'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { MagneticButton } from '@/components/ui/MagneticButton'

const NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 50,
          padding: scrolled ? '1rem 0' : '1.5rem 0',
          transition: 'padding 0.4s ease',
          pointerEvents: 'none', // Allow clicking through the empty space
        }}
      >
        <div className="section-container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', width: '100%' }}>
            
            <Link 
              href="/" 
              data-cursor="link" 
              style={{ 
                textDecoration: 'none', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '0.5rem 1rem',
                borderRadius: '100px',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                pointerEvents: 'auto',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
              }}
            >
              <LogoMark />
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: '1.25rem',
                  letterSpacing: '-0.02em',
                  color: 'var(--text-primary)',
                }}
              >
                LIMI<span style={{ color: 'var(--accent-primary)' }}>NI</span>Q
              </span>
            </Link>

            <div 
              style={{ 
                display: 'none', 
                alignItems: 'center', 
                gap: '2rem',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '0.5rem 2rem',
                borderRadius: '100px',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                pointerEvents: 'auto',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
              }} 
              className="desktop-nav"
            >
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    data-cursor="link"
                    className={`nav-link animated-link`}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.95rem',
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      textDecoration: 'none',
                    }}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>

            <div 
              style={{ 
                display: 'none', 
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '0.35rem',
                borderRadius: '100px',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                pointerEvents: 'auto',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
              }} 
              className="desktop-cta"
            >
              <MagneticButton className="btn-primary" style={{ padding: '8px 24px', fontSize: '14px', borderRadius: '100px', margin: 0 }} onClick={() => router.push('/contact')}>
                Get Free Audit
              </MagneticButton>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="mobile-menu-btn"
              aria-label="Toggle menu"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '50%',
                cursor: 'pointer',
                width: 48,
                height: 48,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--text-primary)',
                pointerEvents: 'auto',
                zIndex: 100,
              }}
            >
              <motion.span animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} style={{ display: 'block', width: 20, height: 2, background: 'var(--text-primary)', borderRadius: 2 }} transition={{ duration: 0.2 }} />
              <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} style={{ display: 'block', width: 20, height: 2, background: 'var(--text-primary)', borderRadius: 2 }} transition={{ duration: 0.2 }} />
              <motion.span animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} style={{ display: 'block', width: 20, height: 2, background: 'var(--text-primary)', borderRadius: 2 }} transition={{ duration: 0.2 }} />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(4,5,8,0.97)',
              backdropFilter: 'blur(32px)',
              zIndex: 99,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.5rem',
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: 'easeOut' }}
              >
                <Link
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    color: pathname === link.href ? 'var(--accent-primary)' : 'var(--text-primary)',
                    textDecoration: 'none',
                    display: 'block',
                    textAlign: 'center',
                    padding: '0.5rem 2rem',
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: NAV_LINKS.length * 0.08 + 0.1 }} style={{ marginTop: '2rem' }}>
              <Link href="/contact" className="btn-primary" style={{ padding: '16px 32px', fontSize: '18px' }}>
                Get Free Audit
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav { display: flex !important; }
          .desktop-cta { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 899px) {
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}

function LogoMark() {
  return (
    <motion.div
      style={{
        width: 38,
        height: 38,
        background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-tertiary))',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxShadow: '0 4px 15px rgba(59,91,255,0.3)',
      }}
      whileHover={{ scale: 1.05, rotate: 5 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <text x="3" y="17" fontFamily="var(--font-heading)" fontWeight="800" fontSize="14" fill="white">LN</text>
      </svg>
    </motion.div>
  )
}
