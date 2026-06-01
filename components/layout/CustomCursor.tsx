'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [isTouch, setIsTouch] = useState(false)
  const [cursorState, setCursorState] = useState<'default' | 'link' | 'cta' | 'view' | 'text'>('default')
  
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)
  
  const ringX = useSpring(dotX, { stiffness: 500, damping: 35 })
  const ringY = useSpring(dotY, { stiffness: 500, damping: 35 })

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true)
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      dotX.set(e.clientX)
      dotY.set(e.clientY)
    }

    const updateCursorState = () => {
      const hoverables = document.querySelectorAll(
        "a, button, [data-cursor], input, textarea, select, label"
      )
      
      hoverables.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          const type = el.getAttribute("data-cursor")
          if (type === "view") setCursorState("view")
          else if (type === "cta") setCursorState("cta")
          else if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") setCursorState("text")
          else setCursorState("link")
        })
        el.addEventListener("mouseleave", () => {
          setCursorState("default")
        })
      })
    }

    updateCursorState()
    const observer = new MutationObserver(updateCursorState)
    observer.observe(document.body, { childList: true, subtree: true })

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      observer.disconnect()
    }
  }, [dotX, dotY])

  if (isTouch) return null

  // Styles based on state
  let ringSize = 40
  let ringBg = 'transparent'
  let ringBorder = '1px solid var(--accent-primary)'
  let dotOpacity = 1
  let innerText = ''

  if (cursorState === 'link') {
    ringSize = 60
    dotOpacity = 0
    ringBg = 'rgba(59,91,255,0.05)'
  } else if (cursorState === 'cta') {
    ringSize = 60
    dotOpacity = 0
    ringBg = 'linear-gradient(135deg, rgba(59,91,255,0.8), rgba(0,200,160,0.8))'
    ringBorder = 'none'
    innerText = 'CLICK'
  } else if (cursorState === 'view') {
    ringSize = 80
    dotOpacity = 0
    ringBg = 'transparent'
    ringBorder = '1px solid #00C8A0'
    innerText = 'VIEW'
  } else if (cursorState === 'text') {
    ringSize = 40
    dotOpacity = 0
    ringBorder = '1px solid var(--accent-primary)'
  }

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          backgroundColor: 'var(--accent-primary)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: dotOpacity,
          transition: 'opacity 0.2s'
        }}
      />
      <motion.div
        className="cursor-ring"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: ringSize,
          height: cursorState === 'text' ? 30 : ringSize,
          background: ringBg,
          border: ringBorder,
          borderRadius: cursorState === 'text' ? '4px' : '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: cursorState === 'view' ? '#00C8A0' : 'white',
          fontSize: '10px',
          fontWeight: 700,
          fontFamily: 'var(--font-sans)',
          letterSpacing: '1px',
          scaleX: cursorState === 'text' ? 0.1 : 1,
          transition: 'width 0.3s, height 0.3s, background 0.3s, scale 0.3s, border-radius 0.3s'
        }}
      >
        {innerText}
      </motion.div>
    </>
  )
}
