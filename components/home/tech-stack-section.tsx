'use client'

import { useRef, useEffect, useMemo } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { GradientText } from '@/components/ui/gradient-text'

// Tech stack items with categories for color coding
const techStack = [
  'React',
  'Next.js',
  'TypeScript',
  'Vue.js',
  'Tailwind CSS',
  'Three.js',
  'Node.js',
  'Python',
  'FastAPI',
  'Django',
  'PostgreSQL',
  'MongoDB',
  'TensorFlow',
  'PyTorch',
  'OpenCV',
  'Scikit-learn',
  'Hugging Face',
  'Docker',
  'Kubernetes',
  'AWS',
  'Git',
  'Linux',
  'CI/CD',
  'React Native',
  'Flutter',
  'Rust',
  'C++',
  'Java',
  'GraphQL',
  'Redis',
  'Elasticsearch',
  'RabbitMQ',
]

// Color palette for dynamic gradients - using similar tones (blues, cyans, purples, greens, teals)
const colorPalettes = [
  { primary: '#06b6d4', secondary: '#0891b2', accent: '#22d3ee' }, // Cyan/Teal
  { primary: '#6366f1', secondary: '#4f46e5', accent: '#818cf8' }, // Indigo
  { primary: '#a855f7', secondary: '#9333ea', accent: '#c084fc' }, // Purple
  { primary: '#14b8a6', secondary: '#0d9488', accent: '#2dd4bf' }, // Teal
  { primary: '#5b9aff', secondary: '#3b82f6', accent: '#60a5fa' }, // Blue
  { primary: '#8b5cf6', secondary: '#7c3aed', accent: '#a78bfa' }, // Purple
  { primary: '#00d9ff', secondary: '#0099ff', accent: '#5b9aff' }, // Cyan/Blue
  { primary: '#00e6a0', secondary: '#00b894', accent: '#2dd4bf' }, // Green/Teal
]

interface TechTextProps {
  tech: string
  index: number
}

function TechText({ tech, index }: TechTextProps) {
  // Dynamic color based on index
  const colorIndex = index % colorPalettes.length
  const colors = colorPalettes[colorIndex]

  return (
    <motion.span
      className="inline-block whitespace-nowrap relative"
      style={{
        fontFamily: 'var(--font-jetbrains), monospace',
        fontWeight: 800,
        fontSize: 'clamp(1rem, 2vw, 1.75rem)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        scale: 1.05,
      }}
    >
      {/* Text with gradient */}
      <span
        className="relative z-10 block"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary}, ${colors.accent})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {tech}
      </span>
    </motion.span>
  )
}

interface ScrollingRowProps {
  direction: 'left' | 'right'
  speed: number
  delay?: number
}

function ScrollingRow({ direction, speed, delay = 0 }: ScrollingRowProps) {
  // Create 4 copies for ultra-smooth seamless loop
  const scrollingSet = useMemo(() => [...techStack, ...techStack, ...techStack, ...techStack], [])
  
  // Use percentage-based translation for perfect seamless loop
  // With 4 copies, moving 25% gives us one complete set
  const translateDistance = direction === 'left' ? '-25%' : '25%'

  return (
    <motion.div
      className="flex items-center gap-12 md:gap-16 lg:gap-20"
      style={{
        width: 'max-content',
        willChange: 'transform',
        transform: 'translate3d(0, 0, 0)', // Force GPU acceleration
        backfaceVisibility: 'hidden', // Prevent flickering
        WebkitBackfaceVisibility: 'hidden',
      }}
      animate={{
        x: [0, translateDistance],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: 'linear',
        delay,
        repeatType: 'loop' as const,
      }}
    >
      {scrollingSet.map((tech, index) => (
        <TechText
          key={`${tech}-${index}`}
          tech={tech}
          index={index % techStack.length}
        />
      ))}
    </motion.div>
  )
}

export function TechStackSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  return (
    <section
      ref={ref}
      id="tech-stack"
      className="relative -mt-10 md:-mt-16 py-16 md:py-20 overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* Clean Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.6, delay: 0.2 },
              },
            }}
          >
            <motion.div
              className="h-px w-16 bg-gradient-to-r from-transparent to-cyber-blue/50"
              initial={{ scaleX: 0 }}
              animate={controls}
              variants={{
                visible: {
                  scaleX: 1,
                  transition: { duration: 0.8, delay: 0.4 },
                },
              }}
            />
            <span className="text-xs md:text-sm font-medium text-cyber-blue/80 tracking-[0.2em] uppercase">
              Technologies & Tools
            </span>
            <motion.div
              className="h-px w-16 bg-gradient-to-l from-transparent to-cyber-blue/50"
              initial={{ scaleX: 0 }}
              animate={controls}
              variants={{
                visible: {
                  scaleX: 1,
                  transition: { duration: 0.8, delay: 0.4 },
                },
              }}
            />
          </motion.div>

          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-black mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 0.3 },
              },
            }}
          >
            <span className="text-white">Tech </span>
            <GradientText
              gradientColors={['#d946ef', '#a855f7', '#ec4899', '#f472b6', '#c084fc', '#d946ef']}
              duration={9}
              direction="left"
              ease="linear"
              className="font-black"
            >
              Stack
            </GradientText>
          </motion.h2>
        </motion.div>

        {/* Modern Tech Stack Carousel */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, delay: 0.6 },
            },
          }}
        >
          {/* Glassmorphism Container with 3D Effect */}
          <div
            className="relative h-28 md:h-32 lg:h-36 rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(99, 102, 241, 0.06) 50%, rgba(139, 92, 246, 0.08) 100%)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              boxShadow: '0 20px 60px rgba(139, 92, 246, 0.08)',
              transformStyle: 'preserve-3d',
              opacity: 0.85,
            }}
          >
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  'radial-gradient(ellipse at 20% 50%, rgba(139, 92, 246, 0.1), transparent 50%)',
                  'radial-gradient(ellipse at 80% 50%, rgba(99, 102, 241, 0.1), transparent 50%)',
                  'radial-gradient(ellipse at 50% 50%, rgba(139, 92, 246, 0.1), transparent 50%)',
                  'radial-gradient(ellipse at 20% 50%, rgba(139, 92, 246, 0.1), transparent 50%)',
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
                repeatDelay: 2,
              }}
            />

            {/* Scrolling Tech Stack with Perfect Edge Blending */}
            <div
              className="absolute inset-0 flex items-center"
              style={{
                overflow: 'hidden',
              }}
            >
              {/* Left fade mask - Perfect blend with background */}
              <div
                className="absolute left-0 top-0 bottom-0 z-30 pointer-events-none"
                style={{
                  width: '20%',
                  background: 'linear-gradient(to right, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.95) 20%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0) 100%)',
                }}
              />
              
              {/* Right fade mask - Perfect blend with background */}
              <div
                className="absolute right-0 top-0 bottom-0 z-30 pointer-events-none"
                style={{
                  width: '20%',
                  background: 'linear-gradient(to left, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.95) 20%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0) 100%)',
                }}
              />

              <div
                className="relative flex items-center"
                style={{
                  width: 'max-content',
                  minWidth: '100%',
                  willChange: 'transform',
                  transform: 'translateZ(0)', // Force GPU acceleration
                }}
              >
                <ScrollingRow
                  direction="left"
                  speed={60}
                  delay={0}
                />
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  )
}
