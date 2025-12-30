'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface HolographicBackgroundProps {
  className?: string
  intensity?: number
}

export function HolographicBackground({ className, intensity = 1 }: HolographicBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [isHovered, setIsHovered] = useState(false)

  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 })
  const springY = useSpring(mouseY, { damping: 15 })

  const rotateX = useTransform(springY, [-0.5, 0.5], [-5 * intensity, 5 * intensity])
  const rotateY = useTransform(springX, [-0.5, 0.5], [5 * intensity, -5 * intensity])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      mouseX.set((e.clientX - centerX) / rect.width)
      mouseY.set((e.clientY - centerY) / rect.height)
    }

    if (isHovered) {
      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isHovered, mouseX, mouseY])

  return (
    <div
      ref={containerRef}
      className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        mouseX.set(0)
        mouseY.set(0)
      }}
    >
      {/* Layer 1: Base gradient */}
      <motion.div
        className="absolute inset-0 opacity-60"
        style={{
          background: `conic-gradient(
            from 120deg at 20% 20%,
            rgba(0, 240, 255, 0.1),
            rgba(139, 92, 246, 0.1),
            rgba(255, 122, 182, 0.08),
            rgba(0, 240, 255, 0.1)
          )`,
          mixBlendMode: 'screen',
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Layer 2: Radial gradients */}
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(600px 200px at 10% 10%, rgba(0, 240, 255, 0.06), transparent 12%),
            radial-gradient(500px 180px at 90% 85%, rgba(139, 92, 246, 0.05), transparent 14%)
          `,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      />

      {/* Layer 3: Mesh gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `linear-gradient(
            135deg,
            rgba(0, 240, 255, 0.05) 0%,
            transparent 25%,
            transparent 75%,
            rgba(139, 92, 246, 0.05) 100%
          )`,
          mixBlendMode: 'overlay',
          rotateX: useTransform(rotateX, (v) => v * 0.5),
          rotateY: useTransform(rotateY, (v) => v * 0.5),
          transformStyle: 'preserve-3d',
        }}
      />

      {/* Layer 4: Animated scan lines */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 240, 255, 0.03) 2px,
            rgba(0, 240, 255, 0.03) 4px
          )`,
          mixBlendMode: 'screen',
        }}
        animate={{
          y: ['0%', '100%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  )
}

