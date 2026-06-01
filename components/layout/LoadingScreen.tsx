'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [phase, setPhase] = useState<'loading' | 'glitch' | 'split'>('loading')

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('liminiq-loaded')
    if (hasLoaded) {
      setIsVisible(false)
      return
    }

    const glitchTimer = setTimeout(() => setPhase('glitch'), 1500)
    const splitTimer = setTimeout(() => setPhase('split'), 1900)
    const exitTimer = setTimeout(() => {
      setIsVisible(false)
      sessionStorage.setItem('liminiq-loaded', '1')
    }, 2800)

    return () => {
      clearTimeout(glitchTimer)
      clearTimeout(splitTimer)
      clearTimeout(exitTimer)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 99999, pointerEvents: 'none', display: 'flex', flexDirection: 'column' }}>
      {/* Top half curtain */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: phase === 'split' ? '-100%' : 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50vh',
          background: '#040508',
          zIndex: 1,
        }}
      />
      {/* Bottom half curtain */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: phase === 'split' ? '100%' : 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50vh',
          background: '#040508',
          zIndex: 1,
        }}
      />

      {/* Content wrapper */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === 'split' ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
        }}
      >
        <div style={{ position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '4rem',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              position: 'relative'
            }}
          >
            <span style={{ position: 'relative', zIndex: 2 }}>LIMINIQ</span>
            
            {/* Glitch layers */}
            {phase === 'glitch' && (
              <>
                <span style={{ position: 'absolute', left: '-4px', top: '2px', color: '#00C8A0', mixBlendMode: 'screen', zIndex: 1 }}>LIMINIQ</span>
                <span style={{ position: 'absolute', left: '4px', top: '-2px', color: '#3B5BFF', mixBlendMode: 'screen', zIndex: 1 }}>LIMINIQ</span>
              </>
            )}
          </motion.div>
        </div>

        {/* Loading Bar */}
        <div style={{ width: '200px', height: '2px', background: 'rgba(255,255,255,0.06)', marginTop: '2rem', borderRadius: '2px', overflow: 'hidden' }}>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: phase === 'loading' ? 0.8 : 1 }}
            transition={{ duration: phase === 'loading' ? 1.5 : 0.2, ease: 'easeInOut' }}
            style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, #3B5BFF, #00C8A0)', transformOrigin: 'left' }}
          />
        </div>
      </motion.div>
    </div>
  )
}
