'use client'

import { useEffect, useRef } from 'react'
import { applyMagneticEffect } from '@/lib/hover-animations'
import { Button, ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function MagneticButton({ className, children, ...props }: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (ref.current) {
      return applyMagneticEffect(ref.current, 0.3)
    }
  }, [])

  return (
    <Button ref={ref} className={cn('relative', className)} {...props}>
      {children}
    </Button>
  )
}

