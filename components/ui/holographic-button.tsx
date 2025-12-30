'use client'

import { motion } from 'framer-motion'
import { ReactNode, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { applyMagneticEffect } from '@/lib/hover-animations'
import { useEffect, useRef } from 'react'

interface HolographicButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary'
}

export function HolographicButton({
  children,
  href,
  onClick,
  className,
  variant = 'primary',
}: HolographicButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null)

  useEffect(() => {
    if (buttonRef.current) {
      return applyMagneticEffect(buttonRef.current as HTMLElement, 0.2)
    }
  }, [])

  const baseStyles =
    variant === 'primary'
      ? 'bg-gradient-to-r from-cyber-blue/20 via-cyber-purple/20 to-cyber-blue/20'
      : 'bg-gradient-to-r from-cyber-purple/20 via-cyber-blue/20 to-cyber-purple/20'

  const content = (
    <motion.div
      ref={buttonRef as any}
      className={cn(
        'relative px-8 py-4 rounded-lg font-semibold text-white',
        'border border-cyber-blue/30 backdrop-blur-xl',
        'overflow-hidden group',
        baseStyles,
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Holographic shimmer */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        style={{
          background: `linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          )`,
        }}
        animate={{
          x: isHovered ? ['-100%', '200%'] : '-100%',
        }}
        transition={{
          duration: 1.5,
          repeat: isHovered ? Infinity : 0,
          repeatDelay: 0.5,
          ease: 'linear',
        }}
      />

      {/* Animated border gradient */}
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100"
        style={{
          background: `conic-gradient(
            from 0deg,
            rgba(0, 240, 255, 0.3),
            rgba(139, 92, 246, 0.3),
            rgba(0, 240, 255, 0.3)
          )`,
          padding: '1px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
        animate={{
          rotate: isHovered ? 360 : 0,
        }}
        transition={{
          duration: 3,
          repeat: isHovered ? Infinity : 0,
          ease: 'linear',
        }}
      />

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 blur-xl"
        style={{
          background: `radial-gradient(
            circle at center,
            rgba(0, 240, 255, 0.4),
            rgba(139, 92, 246, 0.2),
            transparent 70%
          )`,
        }}
        animate={{
          scale: isHovered ? [1, 1.2, 1] : 1,
          opacity: isHovered ? [0.5, 0.8, 0.5] : 0,
        }}
        transition={{
          duration: 2,
          repeat: isHovered ? Infinity : 0,
          ease: 'easeInOut',
        }}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.div>
  )

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {content}
      </Link>
    )
  }

  return (
    <button ref={buttonRef as any} onClick={onClick} className="inline-block">
      {content}
    </button>
  )
}

