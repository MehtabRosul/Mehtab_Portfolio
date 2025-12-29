'use client'

import { ReactNode, useRef, useEffect } from 'react'
import { useTextReveal } from '@/lib/scroll-animations'

interface TextRevealProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function TextReveal({ children, delay = 0, className }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  useTextReveal(ref, delay)

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

