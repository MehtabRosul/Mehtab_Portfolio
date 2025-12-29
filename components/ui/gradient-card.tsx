'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn, isQuantumContent, getGoldPaletteFor } from '@/lib/utils'

interface GradientCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
  hover?: boolean
  delay?: number
}

export function GradientCard({
  children,
  className,
  glowColor = '#00f0ff',
  hover = true,
  delay = 0,
}: GradientCardProps) {
  const isQuantum = isQuantumContent(children)
  const gold = isQuantum ? getGoldPaletteFor((typeof children === 'string' ? children : undefined) as any) : null
  return (
    <motion.div
      className={cn(
        'glass-strong rounded-xl p-6 border border-cyber-blue/30',
        'transition-all duration-300',
        hover && 'hover:border-cyber-blue/50 hover:shadow-lg',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={hover ? { scale: 1.05, y: -5 } : {}}
      style={
        hover
          ? isQuantum
            ? { boxShadow: `0 0 30px ${gold!.glow}33`, border: `1px solid ${gold!.border}` }
            : { boxShadow: `0 0 20px ${glowColor}20` }
          : {}
      }
    >
      {children}
    </motion.div>
  )
}

