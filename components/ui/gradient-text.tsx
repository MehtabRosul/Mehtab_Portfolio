'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { GoldenText } from './golden-text'

interface GradientTextProps {
  children: ReactNode
  className?: string
  gradientFrom?: string
  gradientTo?: string
  gradientColors?: string[]
  animate?: boolean
  duration?: number
  direction?: 'left' | 'right'
  ease?: 'linear' | 'easeInOut'
}

export function GradientText({ 
  children, 
  className = '', 
  gradientFrom = '#00f0ff',
  gradientTo = '#00ff88',
  gradientColors,
  animate = true,
  duration = 5,
  direction = 'left',
  ease = 'linear'
}: GradientTextProps) {
  // Helper to extract plain text from ReactNode for simple detection
  function extractText(node: ReactNode): string {
    if (node == null) return ''
    if (typeof node === 'string' || typeof node === 'number') return String(node)
    if (Array.isArray(node)) return node.map(n => extractText(n)).join(' ')
    // If it's a React element, try to read its props.children
    // @ts-ignore - access children of React element
    if (typeof node === 'object' && 'props' in (node as any)) {
      // @ts-ignore
      return extractText((node as any).props.children)
    }
    return ''
  }

  const combinedText = extractText(children).toLowerCase()
  // If the rendered text contains 'quantum', render golden text instead
  if (combinedText.includes('quantum')) {
    return (
      <GoldenText className={className}>{children}</GoldenText>
    )
  }
  // Use custom colors array if provided, otherwise use from/to
  const colors = gradientColors || [gradientFrom, gradientTo, gradientFrom]
  
  // Animation direction
  const startPos = direction === 'left' ? '0% 50%' : '100% 50%'
  const endPos = direction === 'left' ? '100% 50%' : '0% 50%'
  
  return (
    <motion.span
      className={`inline-block ${className}`}
      animate={animate ? {
        backgroundPosition: [startPos, endPos, startPos],
      } : {}}
      transition={animate ? {
        duration,
        repeat: Infinity,
        ease,
      } : {}}
      style={{
        background: `linear-gradient(90deg, ${colors.join(', ')})`,
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {children}
    </motion.span>
  )
}
