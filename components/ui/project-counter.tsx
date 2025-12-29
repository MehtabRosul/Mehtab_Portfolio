'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import { GradientText } from './gradient-text'

interface ProjectCounterProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  gradientColors?: string[]
  className?: string
  label?: string
}

export function ProjectCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
  gradientColors = ['#00f0ff', '#0066ff', '#8b5cf6'],
  className = '',
  label,
}: ProjectCounterProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const spring = useSpring(count, { damping: 30, stiffness: 100 })

  useEffect(() => {
    count.set(value)
    spring.on('change', (latest) => {
      setDisplayValue(Math.round(latest))
    })

    return () => {
      spring.destroy()
    }
  }, [value, count, spring])

  return (
    <motion.div
      className={`flex flex-col items-center ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {label && (
        <motion.span
          className="text-xs uppercase tracking-wider text-foreground/60 mb-2"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {label}
        </motion.span>
      )}
      <motion.div
        className="flex items-baseline"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        {prefix && (
          <span className="text-sm text-foreground/50 mr-1">{prefix}</span>
        )}
        <GradientText
          gradientColors={gradientColors}
          duration={3}
          direction="left"
          ease="linear"
          className="text-4xl md:text-5xl font-black"
        >
          {displayValue}
        </GradientText>
        {suffix && (
          <motion.span
            className="text-2xl md:text-3xl font-bold ml-1"
            style={{
              background: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 0.5,
              delay: duration,
            }}
          >
            {suffix}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  )
}

