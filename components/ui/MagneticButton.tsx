'use client'

import { useRef, ReactNode, ComponentProps } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface MagneticButtonProps extends ComponentProps<typeof motion.button> {
  children: ReactNode;
  className?: string;
  magneticStyle?: React.CSSProperties;
}

export function MagneticButton({ children, className = '', magneticStyle, ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springConfig = { stiffness: 350, damping: 25 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const textX = useTransform(springX, (val) => val * 0.5)
  const textY = useTransform(springY, (val) => val * 0.5)

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.35)
    y.set((e.clientY - centerY) * 0.35)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY, ...magneticStyle }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      {...props}
    >
      <motion.span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', x: textX, y: textY, width: '100%', height: '100%' }}>
        {children}
      </motion.span>
    </motion.button>
  )
}
