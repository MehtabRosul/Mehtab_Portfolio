'use client'

import { ReactNode, useRef, useEffect } from 'react'
import { apply3DTilt, applyGlowPulse } from '@/lib/hover-animations'
import { cn } from '@/lib/utils'

interface HoverCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
}

export function HoverCard({ children, className, glowColor = '#00f0ff' }: HoverCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const cleanup1 = apply3DTilt(ref.current)
    const cleanup2 = applyGlowPulse(ref.current, glowColor)

    return () => {
      cleanup1()
      cleanup2()
    }
  }, [glowColor])

  return (
    <div
      ref={ref}
      className={cn('transform-gpu', className)}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  )
}

