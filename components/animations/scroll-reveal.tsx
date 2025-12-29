'use client'

import { ReactNode, useRef, useEffect } from 'react'
import { useFadeInUp } from '@/lib/scroll-animations'

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function ScrollReveal({ children, delay = 0, className }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  useFadeInUp(ref, delay)

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

