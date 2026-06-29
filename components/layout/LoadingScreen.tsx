'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function shouldSkipIntro(): boolean {
  if (typeof window === 'undefined') return true
  return (
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(false)
  const [phase, setPhase] = useState<'loading' | 'glitch' | 'split'>('loading')

  useEffect(() => {
    if (shouldSkipIntro() || sessionStorage.getItem('liminiq-loaded')) return

    setIsVisible(true)
    const glitchTimer = setTimeout(() => setPhase('glitch'), 700)
    const splitTimer = setTimeout(() => setPhase('split'), 950)
    const exitTimer = setTimeout(() => {
      setIsVisible(false)
      sessionStorage.setItem('liminiq-loaded', '1')
    }, 1400)

    return () => {
      clearTimeout(glitchTimer)
      clearTimeout(splitTimer)
      clearTimeout(exitTimer)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="loading-screen">
      <motion.div
        className="loading-screen-curtain loading-screen-curtain--top"
        initial={{ y: 0 }}
        animate={{ y: phase === 'split' ? '-100%' : 0 }}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="loading-screen-curtain loading-screen-curtain--bottom"
        initial={{ y: 0 }}
        animate={{ y: phase === 'split' ? '100%' : 0 }}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
      />

      <motion.div
        className="loading-screen-content"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === 'split' ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="loading-screen-title-wrap">
          <motion.div
            className="loading-screen-title"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="loading-screen-title-text">LIMINIQ</span>
            {phase === 'glitch' && (
              <>
                <span className="loading-screen-glitch loading-screen-glitch--a">LIMINIQ</span>
                <span className="loading-screen-glitch loading-screen-glitch--b">LIMINIQ</span>
              </>
            )}
          </motion.div>
        </div>

        <div className="loading-screen-bar">
          <motion.div
            className="loading-screen-bar-fill"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: phase === 'loading' ? 0.8 : 1 }}
            transition={{ duration: phase === 'loading' ? 0.9 : 0.2, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>

      <style>{`
        .loading-screen {
          position: fixed;
          inset: 0;
          z-index: 99999;
          pointer-events: none;
          display: flex;
          flex-direction: column;
        }
        .loading-screen-curtain {
          position: absolute;
          left: 0;
          right: 0;
          height: 50vh;
          background: #040508;
          z-index: 1;
        }
        .loading-screen-curtain--top { top: 0; }
        .loading-screen-curtain--bottom { bottom: 0; }
        .loading-screen-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }
        .loading-screen-title-wrap { position: relative; }
        .loading-screen-title {
          font-family: var(--font-heading);
          font-size: 4rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          position: relative;
        }
        .loading-screen-title-text { position: relative; z-index: 2; }
        .loading-screen-glitch {
          position: absolute;
          left: 0;
          top: 0;
          z-index: 1;
          mix-blend-mode: screen;
        }
        .loading-screen-glitch--a { left: -4px; top: 2px; color: #00C8A0; }
        .loading-screen-glitch--b { left: 4px; top: -2px; color: #3B5BFF; }
        .loading-screen-bar {
          width: 200px;
          height: 2px;
          background: rgba(255,255,255,0.06);
          margin-top: 2rem;
          border-radius: 2px;
          overflow: hidden;
        }
        .loading-screen-bar-fill {
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, #3B5BFF, #00C8A0);
          transform-origin: left;
        }
      `}</style>
    </div>
  )
}
