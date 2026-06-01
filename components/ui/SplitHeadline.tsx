'use client'

import { useEffect, useRef } from 'react'
import SplitType from 'split-type'
import { gsap } from '@/lib/gsap-config'

export function SplitHeadline({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  const textRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    const split = new SplitType(textRef.current, { types: 'words' })

    let ctx = gsap.context(() => {
      gsap.set(split.words, { opacity: 0, y: 60, rotateX: -15 })

      gsap.to(split.words, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 85%'
        }
      })
    });

    return () => {
      split.revert()
      ctx.revert()
    }
  }, [])

  return (
    <h1 ref={textRef} className={`hero-h1 ${className}`} style={{ perspective: '400px' }}>
      {children}
    </h1>
  )
}
