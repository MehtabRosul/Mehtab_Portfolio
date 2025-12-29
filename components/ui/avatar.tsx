'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface AvatarProps {
  src: string
  alt?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  variant?: 'circle' | 'rounded' | 'square'
  glow?: boolean
  animated?: boolean
}

const sizeMap = {
  sm: 'w-12 h-12',
  md: 'w-16 h-16',
  lg: 'w-24 h-24',
  xl: 'w-32 h-32',
}

const variantMap = {
  circle: 'rounded-full',
  rounded: 'rounded-xl',
  square: 'rounded-none',
}

export function Avatar({
  src,
  alt = 'Avatar',
  size = 'md',
  className,
  variant = 'circle',
  glow = false,
  animated = false,
}: AvatarProps) {
  const Component = animated ? motion.div : 'div'

  const baseClasses = cn(
    'relative overflow-hidden',
    sizeMap[size],
    variantMap[variant],
    !className?.includes('border-0') && !className?.includes('!border-0') && 'border-2 border-cyber-blue/30',
    glow && 'cyber-glow shadow-lg shadow-cyber-blue/50',
    className
  )

  const content = (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      sizes={`${sizeMap[size]}`}
    />
  )

  if (animated) {
    return (
      <Component
        className={baseClasses}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {content}
      </Component>
    )
  }

  return <div className={baseClasses}>{content}</div>
}

