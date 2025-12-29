'use client'

import { cn } from '@/lib/utils'

export function GoldenText({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={cn('text-[#D4AF37]', className)}>
      {children}
    </span>
  )
}
