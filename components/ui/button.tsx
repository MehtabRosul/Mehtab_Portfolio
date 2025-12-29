'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { useEffect, useRef } from 'react'
import { applyRippleEffect, applyShineEffect } from '@/lib/hover-animations'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-blue disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-cyber-blue text-black hover:bg-cyber-blue/90 cyber-glow',
        outline: 'border border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10',
        ghost: 'hover:bg-glass-medium text-foreground',
        glass: 'glass border-white/20 text-foreground hover:bg-glass-medium',
        neon: 'bg-gradient-to-r from-cyber-blue to-cyber-purple text-white hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, children, ...props }, ref) => {
    const internalRef = useRef<HTMLButtonElement>(null)
    const buttonRef = (ref || internalRef) as React.RefObject<HTMLButtonElement>

    useEffect(() => {
      if (buttonRef.current && !asChild) {
        const cleanup1 = applyRippleEffect(buttonRef.current, variant === 'neon' ? '#00f0ff' : '#8b5cf6')
        const cleanup2 = applyShineEffect(buttonRef.current)
        return () => {
          cleanup1()
          cleanup2()
        }
      }
    }, [variant, asChild, buttonRef])

    // If asChild is true, clone the child and apply our classes
    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<any>
      return React.cloneElement(child, {
        className: cn(buttonVariants({ variant, size, className }), child.props?.className),
        ref: buttonRef,
        ...(child.props || {}),
        ...Object.fromEntries(
          Object.entries(props).filter(([key]) => key !== 'asChild')
        ),
      })
    }

    // Remove asChild from props before spreading to DOM
    const { asChild: _, ...domProps } = props as any

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={buttonRef}
        {...domProps}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }

