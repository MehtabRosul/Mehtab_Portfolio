'use client'

import { ReactNode, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface BentoCardProps {
  children: ReactNode
  className?: string
  span?: 1 | 2 | 3
  glowColor?: string
  delay?: number
}

export function BentoCard({
  children,
  className,
  span = 1,
  glowColor = '#00f0ff',
  delay = 0,
}: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Motion values for smooth animations with improved spring physics
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Enhanced spring configuration for smoother, more responsive tracking
  const springConfig = { damping: 30, stiffness: 300, mass: 0.5 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  // More pronounced 3D rotation effect
  const rotateX = useTransform(y, [-0.5, 0.5], ['5deg', '-5deg'])
  const rotateY = useTransform(x, [-0.5, 0.5], ['-5deg', '5deg'])

  // small inner content parallax
  const contentX = useTransform(x, [-0.5, 0.5], [-6, 6])
  const contentY = useTransform(y, [-0.5, 0.5], [-6, 6])

  // Subtle scale effect on hover (based mostly on X for a smooth result)
  const scale = useTransform(x, (latestX) => {
    const v = typeof latestX === 'number' ? Math.abs(latestX) : 0
    return 1 + v * 0.02
  })

  // Handle mouse move with improved tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Normalize mouse position to -1 to 1 range
    const xPos = (e.clientX - centerX) / (rect.width / 2)
    const yPos = (e.clientY - centerY) / (rect.height / 2)

    // Clamp values for smoother edge behavior
    mouseX.set(Math.max(-1, Math.min(1, xPos)))
    mouseY.set(Math.max(-1, Math.min(1, yPos)))

    // Update mouse position for gradient spotlight
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseLeave = () => {
    // Smooth return to center
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
    setMousePosition({ x: 0, y: 0 })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  // Enhanced gradient spotlight effect with multiple layers
  const gradientStyle = isHovered
    ? {
        background: `radial-gradient(circle 400px at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}25, ${glowColor}08 40%, transparent 70%)`,
      }
    : {}

  // Secondary gradient for depth
  const secondaryGradientStyle = isHovered
    ? {
        background: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}15, transparent 50%)`,
      }
    : {}

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        'glass-strong rounded-2xl p-6 border border-cyber-blue/20 relative overflow-hidden group cursor-interactive',
        'transition-all duration-300',
        span === 1 && 'col-span-1',
        span === 2 && 'col-span-1 md:col-span-2',
        span === 3 && 'col-span-1 md:col-span-3',
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        scale: isHovered ? scale : 1,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        borderColor: isHovered ? `${glowColor}50` : undefined,
      }}
    >
      {/* Primary gradient spotlight overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          ...gradientStyle,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Secondary gradient for depth */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          ...secondaryGradientStyle,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Enhanced glow border effect with animation */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          boxShadow: isHovered
            ? `0 0 40px ${glowColor}30, 0 0 80px ${glowColor}15, inset 0 0 40px ${glowColor}10`
            : 'none',
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          border: `1px solid ${glowColor}`,
          opacity: isHovered ? 0.4 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Content with 3D transform and gentle parallax */}
      <motion.div
        className="relative z-10"
        style={{ translateZ: '30px', x: contentX, y: contentY }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

