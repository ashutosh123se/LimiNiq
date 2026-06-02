'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { SERVICES } from '@/lib/data/services'
import { ChevronDown } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
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
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false)
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(false)
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
          zIndex: 100,
          padding: scrolled ? '1rem 0' : '1.5rem 0',
          transition: 'padding 0.4s ease',
          pointerEvents: 'none', // Allow clicking through the empty space
        }}
      >
        <div className="section-container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', width: '100%' }}>
            
            <motion.div
              whileHover={{ scale: 1.05, filter: "drop-shadow(0 0 8px rgba(255,255,255,0.3))" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link 
                href="/" 
                data-cursor="link" 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  pointerEvents: 'auto',
                }}
              >
                <div className="logo-container" style={{ position: 'relative', height: '160px', width: '160px', marginTop: '-40px', marginBottom: '-40px' }}>
                  <Image 
                    src="/images/logo-v2.png" 
                    alt="LimiNiq Logo" 
                    fill 
                    style={{ objectFit: 'contain', objectPosition: 'left center', filter: 'brightness(0) invert(1)' }} 
                    priority 
                  />
                </div>
              </Link>
            </motion.div>

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
                const isServices = link.label === 'Services'

                return (
                  <div
                    key={link.href}
                    onMouseEnter={() => isServices && setServicesMenuOpen(true)}
                    onMouseLeave={() => isServices && setServicesMenuOpen(false)}
                    style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
                  >
                    <Link
                      href={link.href}
                      data-cursor="link"
                      className={`nav-link animated-link`}
                      onClick={(e) => {
                        if (isServices) e.preventDefault();
                      }}
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.95rem',
                        fontWeight: isActive ? 600 : 500,
                        color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}
                    >
                      {link.label}
                      {isServices && <ChevronDown size={14} style={{ 
                        transform: servicesMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                      }} />}
                    </Link>

                    {/* Mega Menu Dropdown */}
                    <AnimatePresence>
                      {isServices && servicesMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          style={{
                            position: 'absolute',
                            top: '100%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            paddingTop: '1.5rem',
                            zIndex: 100
                          }}
                        >
                          <div
                            style={{
                              width: '950px',
                              background: 'rgba(12, 12, 12, 0.98)',
                              backdropFilter: 'blur(20px)',
                              border: '1px solid rgba(255,255,255,0.08)',
                              borderRadius: '24px',
                              padding: '2.5rem',
                              display: 'flex',
                              gap: '3rem',
                              boxShadow: '0 24px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.02) inset',
                              overflow: 'hidden'
                            }}
                          >
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-primary)', marginBottom: '1.5rem', fontWeight: 600 }}>
                                Our Expertise
                              </div>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem 1.5rem' }}>
                                {SERVICES.map(service => (
                                  <Link
                                    key={service.id}
                                    href={`/services/${service.slug}`}
                                    className="group"
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '1.25rem',
                                      padding: '0.85rem 1rem',
                                      borderRadius: '16px',
                                      textDecoration: 'none',
                                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    }}
                                    onMouseEnter={(e) => { 
                                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; 
                                      e.currentTarget.style.transform = 'translateX(4px)';
                                    }}
                                    onMouseLeave={(e) => { 
                                      e.currentTarget.style.background = 'transparent'; 
                                      e.currentTarget.style.transform = 'translateX(0)';
                                    }}
                                  >
                                    <div style={{ 
                                      width: 44, height: 44, 
                                      borderRadius: '12px', 
                                      background: `linear-gradient(135deg, ${service.color}20, ${service.color}05)`,
                                      color: service.color,
                                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                                      border: `1px solid ${service.color}30`,
                                      boxShadow: `0 4px 12px ${service.color}15`,
                                      flexShrink: 0
                                    }}>
                                      {React.cloneElement(service.icon as React.ReactElement<any>, { size: 20 })}
                                    </div>
                                    <div>
                                      <div style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 600, marginBottom: '2px', whiteSpace: 'nowrap' }}>
                                        {service.shortTitle}
                                      </div>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>

                            {/* Right Side Visual Block */}
                            <div style={{ 
                              width: '320px', 
                              background: 'linear-gradient(145deg, rgba(59,91,255,0.08), rgba(0,0,0,0.4))',
                              borderRadius: '20px',
                              padding: '2.5rem',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              position: 'relative',
                              overflow: 'hidden',
                              border: '1px solid rgba(59,91,255,0.15)',
                              boxShadow: 'inset 0 0 20px rgba(59,91,255,0.05)'
                            }}>
                              <div style={{ position: 'relative', zIndex: 2 }}>
                                <h4 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.75rem', fontFamily: 'var(--font-heading)' }}>Ready to Scale?</h4>
                                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                                  Partner with LimiNiq to transform your digital presence and accelerate growth.
                                </p>
                                <button 
                                  onClick={() => router.push('/contact')} 
                                  style={{ 
                                    padding: '12px 24px', 
                                    fontSize: '0.95rem', 
                                    width: '100%',
                                    background: 'linear-gradient(90deg, #3B5BFF, #6B3BFF)',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    boxShadow: '0 8px 24px rgba(59,91,255,0.25)',
                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                                  }}
                                  onMouseEnter={(e) => { 
                                    e.currentTarget.style.transform = 'translateY(-2px)'; 
                                    e.currentTarget.style.boxShadow = '0 12px 28px rgba(59,91,255,0.35)';
                                  }}
                                  onMouseLeave={(e) => { 
                                    e.currentTarget.style.transform = 'translateY(0)'; 
                                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(59,91,255,0.25)';
                                  }}
                                >
                                  Book a Consultation
                                </button>
                              </div>
                              <div style={{
                                position: 'absolute',
                                right: '-30px',
                                bottom: '-30px',
                                width: '200px',
                                height: '200px',
                                background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)',
                                opacity: 0.15,
                                filter: 'blur(40px)'
                              }} />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
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
              justifyContent: 'flex-start',
              padding: '6rem 1rem 3rem',
              overflowY: 'auto',
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
                {link.label === 'Services' ? (
                  <div style={{ textAlign: 'center' }}>
                    <Link
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault()
                        setMobileServicesExpanded(!mobileServicesExpanded)
                      }}
                      className="mobile-nav-link"
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(1.75rem, 6vw, 2.5rem)',
                        fontWeight: 800,
                        letterSpacing: '-0.02em',
                        color: pathname === link.href ? 'var(--accent-primary)' : 'var(--text-primary)',
                        textDecoration: 'none',
                        display: 'block',
                        padding: '0.5rem 1rem',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        {link.label}
                        <ChevronDown size={32} style={{ transform: mobileServicesExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }} />
                      </div>
                    </Link>
                    <AnimatePresence>
                      {mobileServicesExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div className="mobile-services-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem', marginTop: '1.5rem', padding: '0 1rem', textAlign: 'left' }}>
                            {SERVICES.map(service => (
                              <Link 
                                key={service.id} 
                                href={`/services/${service.slug}`}
                                onClick={() => setMenuOpen(false)}
                                style={{ 
                                  color: 'rgba(255,255,255,0.85)', 
                                  fontSize: '1.05rem', 
                                  textDecoration: 'none', 
                                  padding: '0.5rem',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.75rem'
                                }}
                              >
                                <span style={{ color: service.color }}>{React.cloneElement(service.icon as React.ReactElement<any>, { size: 16 })}</span>
                                {service.shortTitle}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="mobile-nav-link"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1.75rem, 6vw, 2.5rem)',
                      fontWeight: 800,
                      letterSpacing: '-0.02em',
                      color: pathname === link.href ? 'var(--accent-primary)' : 'var(--text-primary)',
                      textDecoration: 'none',
                      display: 'block',
                      textAlign: 'center',
                      padding: '0.5rem 1rem',
                    }}
                  >
                    {link.label}
                  </Link>
                )}
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
          .logo-container { height: 120px !important; width: 120px !important; margin-top: -30px !important; margin-bottom: -30px !important; }
          .mobile-nav-link { font-size: clamp(2rem, 8vw, 3rem) !important; padding: 0.25rem 1rem !important; }
          .mobile-services-grid { grid-template-columns: 1fr 1fr !important; gap: 0.5rem !important; }
        }
        @media (max-width: 450px) {
          .mobile-services-grid { grid-template-columns: 1fr !important; }
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
