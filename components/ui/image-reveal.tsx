'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ImageRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

const directionMap = {
  up: { initial: { y: 50, opacity: 0 }, animate: { y: 0, opacity: 1 } },
  down: { initial: { y: -50, opacity: 0 }, animate: { y: 0, opacity: 1 } },
  left: { initial: { x: 50, opacity: 0 }, animate: { x: 0, opacity: 1 } },
  right: { initial: { x: -50, opacity: 0 }, animate: { x: 0, opacity: 1 } },
}

export function ImageReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
}: ImageRevealProps) {
  const { initial, animate } = directionMap[direction]

  return (
    <motion.div
      className={cn('relative overflow-hidden', className)}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

