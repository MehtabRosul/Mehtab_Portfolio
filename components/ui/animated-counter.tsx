'use client'

import { useEffect, useState, useRef } from 'react'
import { useInView } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  duration?: number
  className?: string
}

export function AnimatedCounter({
  value,
  suffix = '',
  duration = 2000,
  className = '',
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px' })

  useEffect(() => {
    // Check if element is already in view on mount
    const checkInView = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight + 200 && rect.bottom > -200
        return isVisible
      }
      return false
    }

    const startAnimation = () => {
      if (hasAnimated) return
      setHasAnimated(true)

      let startTime: number | null = null
      const startValue = 0

      const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)

        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3)
        const currentCount = Math.floor(startValue + (value - startValue) * easeOut)

        setCount(currentCount)

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setCount(value)
        }
      }

      requestAnimationFrame(animate)
    }

    // Trigger animation if in view or already visible
    if (isInView || checkInView()) {
      // Small delay to ensure component is fully mounted
      setTimeout(startAnimation, 200)
    } else {
      // Fallback: start animation after a delay if view detection doesn't work
      const timeoutId = setTimeout(() => {
        if (!hasAnimated) {
          startAnimation()
        }
      }, 1000)
      
      return () => clearTimeout(timeoutId)
    }
  }, [isInView, value, duration, hasAnimated])

  return (
    <span ref={ref} className={className}>
      {count}
      {suffix}
    </span>
  )
}

