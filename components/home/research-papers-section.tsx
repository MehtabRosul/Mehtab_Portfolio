'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import { getFeaturedPapers } from '@/lib/data/research-papers'
import { PaperManuscript } from '@/components/research/paper-manuscript'
import { GradientText } from '@/components/ui/gradient-text'
import { ScrollReveal } from '@/components/animations/scroll-reveal'

export function ResearchPapersSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const featuredPapers = getFeaturedPapers()

  return (
    <section
      ref={sectionRef}
      id="home-research"
      className="relative py-20 md:py-32 min-h-screen overflow-hidden"
    >
      {/* Background Layers */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background" />
        
        {/* Subtle academic-themed background */}
        <div className="absolute inset-0 cyber-grid-bg opacity-5" />
        
        {/* Animated gradient mesh */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 70%, rgba(0, 240, 255, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(0, 255, 136, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Subtle paper texture overlay */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(255, 255, 255, 0.03) 2px,
              rgba(255, 255, 255, 0.03) 4px
            )`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <BookOpen className="w-8 h-8 md:w-10 md:h-10" style={{ color: '#8b5cf6' }} />
              <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-black">
                <GradientText
                  gradientColors={['#4F46E5', '#818CF8', '#A78BFA', '#4F46E5']}
                  duration={8}
                  direction="right"
                  ease="linear"
                  className="inline-block"
                >
                  Research
                </GradientText>{' '}
                <span className="text-white">Publications</span>
              </h2>
            </div>
            <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              Exploring cutting-edge research in AI, cybersecurity, and healthcare through innovative frameworks and intelligent systems
            </p>
          </motion.div>
        </ScrollReveal>

        {/* Featured Papers - Manuscript Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
          {featuredPapers.map((paper, index) => (
            <div key={paper.id} className="flex">
              <PaperManuscript
                paper={paper}
                variant="compact"
                index={index}
              />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link href="/resources">
            <motion.button
              className="group relative px-8 py-4 rounded-lg font-semibold text-base md:text-lg overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6, #00f0ff)',
                color: '#000',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-3">
                View All Research Papers
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
              
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                }}
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: 'linear',
                }}
              />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

