'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { MorphingText } from '@/components/ui/morphing-text'
import { GlitchEffect } from '@/components/ui/glitch-effect'
import { HolographicButton } from '@/components/ui/holographic-button'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import { GradientText } from '@/components/ui/gradient-text'
import { cn } from '@/lib/utils'

export function GalleryBanner() {
  const [count, setCount] = useState(0)
  const [visible, setVisible] = useState(false)
  const [glitchTrigger, setGlitchTrigger] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    let mounted = true
    const target = 42
    const dur = 1100
    const start = Date.now()
    const tick = () => {
      if (!mounted) return
      const t = Math.min(1, (Date.now() - start) / dur)
      const eased = Math.pow(t, 0.6)
      const v = Math.floor(eased * target)
      setCount(v)
      if (t < 1) requestAnimationFrame(tick)
    }
    tick()

    const mountTimer = setTimeout(() => setVisible(true), 80)
    return () => {
      mounted = false
      clearTimeout(mountTimer)
    }
  }, [])

  useEffect(() => {
    if (!sectionRef.current) return
    const el = sectionRef.current
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            obs.unobserve(el)
          }
        })
      },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [sectionRef])

  // Trigger glitch effect periodically
  useEffect(() => {
    if (!visible) return
    const interval = setInterval(() => {
      setGlitchTrigger(true)
      setTimeout(() => setGlitchTrigger(false), 200)
    }, 5000)
    return () => clearInterval(interval)
  }, [visible])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="gallery-banner-heading"
      className="relative isolate overflow-hidden rounded-3xl bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#07101a] via-[#081724] to-[#000000] min-h-[420px] sm:min-h-[520px] lg:min-h-[620px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:py-32">
        <div className="w-full">
          {/* Content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Title with Morphing Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h1
                id="gallery-banner-heading"
                className="text-3xl font-extrabold tracking-tight leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl whitespace-nowrap inline-block min-w-max"
              >
                <GlitchEffect trigger={glitchTrigger} intensity="low">
                  <MorphingText text="A curated showcase of credentials" delay={0.4} onGlitch />
                </GlitchEffect>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <p className="mt-4 max-w-2xl text-lg text-gray-300 leading-relaxed">
                <GlitchEffect trigger={glitchTrigger} intensity="low">
                  Browse certificates, awards and recognitions with detailed context. Each entry includes issuer,
                  date and a short note. Explore the story behind each achievement.
                </GlitchEffect>
              </p>
            </motion.div>

            {/* CTA Button and Stats */}
            <motion.div
              className="mt-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <HolographicButton href="/gallery" variant="primary">
                <span>Open Gallery</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="inline-block ml-2"
                >
                  →
                </motion.span>
              </HolographicButton>

              <div className="flex items-center gap-6">
                <motion.div
                  className="inline-flex flex-col"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={visible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1.4 }}
                >
                  <span className="text-2xl font-medium text-white">
                    <AnimatedCounter value={count} duration={1500} />
                  </span>
                  <span className="text-sm text-gray-400">items</span>
                </motion.div>
                <div className="hidden h-6 w-px bg-white/10 sm:block" />
                <motion.div
                  className="text-sm text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={visible ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1.6 }}
                >
                  <GradientText
                    gradientColors={['#00f0ff', '#8b5cf6', '#00ff88']}
                    duration={4}
                    direction="left"
                  >
                    Verified · Professional · Timelined
                  </GradientText>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

    </section>
  )
}
