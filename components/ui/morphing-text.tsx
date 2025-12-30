'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface MorphingTextProps {
  text: string
  className?: string
  delay?: number
  onGlitch?: boolean
}

export function MorphingText({ text, className, delay = 0, onGlitch = false }: MorphingTextProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (onGlitch && isHovered) {
      const interval = setInterval(() => {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 150)
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [onGlitch, isHovered])

  const chars = text.split('')

  return (
    <span
      ref={containerRef}
      className={cn('inline-block', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {chars.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={{
            opacity: 1,
            y: glitchActive ? (Math.random() - 0.5) * 5 : 0,
            rotateX: 0,
            x: glitchActive ? (Math.random() - 0.5) * 10 : 0,
          }}
          transition={{
            opacity: { duration: 0.3, delay: delay + index * 0.03 },
            y: { duration: glitchActive ? 0.1 : 0.5, delay: delay + index * 0.03, ease: [0.22, 1, 0.36, 1] },
            rotateX: { duration: 0.6, delay: delay + index * 0.03, ease: [0.22, 1, 0.36, 1] },
            x: { duration: 0.1 },
          }}
          whileHover={
            prefersReducedMotion
              ? {}
              : {
                  scale: 1.1,
                  y: -5,
                  transition: { duration: 0.2 },
                }
          }
          style={{
            transformStyle: 'preserve-3d',
            perspective: '1000px',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
      {glitchActive && (
        <motion.span
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.3), transparent)',
            mixBlendMode: 'screen',
          }}
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ duration: 0.3 }}
        />
      )}
    </span>
  )
}

