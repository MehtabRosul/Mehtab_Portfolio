'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface GlitchEffectProps {
  children: ReactNode
  className?: string
  trigger?: boolean
  intensity?: 'low' | 'medium' | 'high'
}

export function GlitchEffect({ children, className, trigger, intensity = 'medium' }: GlitchEffectProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    if (trigger !== undefined) {
      setIsGlitching(trigger)
      if (trigger) {
        const timer = setTimeout(() => setIsGlitching(false), 200)
        return () => clearTimeout(timer)
      }
    }
  }, [trigger])

  const intensityMap = {
    low: { offset: 2, blur: 0.5 },
    medium: { offset: 5, blur: 1 },
    high: { offset: 10, blur: 2 },
  }

  const { offset, blur } = intensityMap[intensity]

  return (
    <span className={cn('relative inline-block', className)}>
      <AnimatePresence>
        {isGlitching && (
          <>
            {/* Red channel */}
            <motion.span
              className="absolute inset-0"
              style={{
                color: '#ff0000',
                textShadow: `${offset}px 0 0 rgba(255, 0, 0, 0.8)`,
                filter: `blur(${blur}px)`,
                mixBlendMode: 'screen',
              }}
              initial={{ x: -offset, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: offset, opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              {children}
            </motion.span>

            {/* Blue channel */}
            <motion.span
              className="absolute inset-0"
              style={{
                color: '#00ffff',
                textShadow: `${-offset}px 0 0 rgba(0, 255, 255, 0.8)`,
                filter: `blur(${blur}px)`,
                mixBlendMode: 'screen',
              }}
              initial={{ x: offset, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -offset, opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              {children}
            </motion.span>

            {/* Displacement overlay */}
            <motion.span
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(
                  90deg,
                  transparent 0%,
                  rgba(0, 240, 255, 0.1) 25%,
                  transparent 50%,
                  rgba(255, 0, 255, 0.1) 75%,
                  transparent 100%
                )`,
                mixBlendMode: 'overlay',
                clipPath: `inset(0 ${Math.random() * 20}% 0 ${Math.random() * 20}%)`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.2 }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Base content */}
      <span className="relative z-10">{children}</span>
    </span>
  )
}

