'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import { GradientText } from '@/components/ui/gradient-text'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import { useRef } from 'react'

import { GoldenText } from '@/components/ui/golden-text'

// Custom ResearchGate Icon Component - R with superscript G (matching official logo)
const ResearchGateIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <div className={`flex items-center justify-center w-full h-full ${className || ''}`} style={style}>
    <div className="relative inline-flex items-baseline justify-center" style={{ fontFamily: 'serif, Georgia, "Times New Roman", serif' }}>
      {/* Large serif R */}
      <span 
        className="font-bold"
        style={{ 
          fontSize: '14px',
          color: 'currentColor',
          lineHeight: '1',
          fontFamily: 'serif, Georgia, "Times New Roman", serif',
          display: 'inline-block'
        }}
      >
        R
      </span>
      {/* Small sans-serif G as superscript with proper gap matching official logo */}
      <span 
        className="font-bold"
        style={{ 
          fontSize: '9px',
          color: 'currentColor',
          lineHeight: '1',
          fontFamily: 'sans-serif, Arial, Helvetica, sans-serif',
          position: 'relative',
          top: '-0.6em',
          left: '0.1em', // Proper gap between R and G as shown in images
          display: 'inline-block'
        }}
      >
        G
      </span>
    </div>
  </div>
)

export function HeroSection() {
  const roles = ['AI-ML Engineer', 'LLM Specialist', 'Full-Stack Developer', 'Developer', 'Technical Researcher','DevOps Engineer', <span key="q-c-e"><GoldenText>Quantum</GoldenText> Computing Enthusiast</span>]
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)

  const socialLinks = [
    { 
      icon: Github, 
      href: 'https://github.com/MehtabRosul', 
      label: 'GitHub', 
      color: '#00f0ff',
      bgColor: 'rgba(0, 240, 255, 0.3)',
      borderColor: 'rgba(0, 240, 255, 0.7)',
      hoverColor: 'rgba(0, 240, 255, 0.4)',
      glow: 'rgba(0, 240, 255, 0.5)',
      isCustom: false
    },
    { 
      icon: Linkedin, 
      href: 'https://www.linkedin.com/in/rosulmehtab/', 
      label: 'LinkedIn', 
      color: '#0066ff',
      bgColor: 'rgba(0, 102, 255, 0.3)',
      borderColor: 'rgba(0, 102, 255, 0.7)',
      hoverColor: 'rgba(0, 102, 255, 0.4)',
      glow: 'rgba(0, 102, 255, 0.5)',
      isCustom: false
    },
    { 
      icon: ResearchGateIcon, 
      href: 'https://www.researchgate.net/profile/Mehtab-Rosul', 
      label: 'ResearchGate', 
      color: '#00ff88',
      bgColor: 'rgba(0, 255, 136, 0.3)',
      borderColor: 'rgba(0, 255, 136, 0.7)',
      hoverColor: 'rgba(0, 255, 136, 0.4)',
      glow: 'rgba(0, 255, 136, 0.5)',
      isCustom: true
    },
    { 
      icon: Mail, 
      href: 'mailto:mehtabrosul10@gmail.com', 
      label: 'Email', 
      color: '#8b5cf6',
      bgColor: 'rgba(139, 92, 246, 0.3)',
      borderColor: 'rgba(139, 92, 246, 0.7)',
      hoverColor: 'rgba(139, 92, 246, 0.4)',
      glow: 'rgba(139, 92, 246, 0.5)',
      isCustom: false
    },
  ]

  // Cycle through roles every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
    }, 3000) // Change every 3 seconds

    return () => clearInterval(interval)
  }, [roles.length])

  return (
    <section id="home" className="relative min-h-screen flex items-start justify-start pt-32 md:pt-40 lg:pt-44 pb-20 md:pb-28">
      {/* Particle Effects Container - Keep untouched */}
      <div className="absolute inset-0 z-0" />

      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/95 z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyber-blue/5 via-transparent to-transparent z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-cyber-purple/5 via-transparent to-transparent z-0" />

      {/* Content Layer */}
      <div className="w-full pl-6 sm:pl-8 md:pl-10 lg:pl-16 xl:pl-24 2xl:pl-28 pr-4 sm:pr-6 lg:pr-8 relative z-20">
        <motion.div
          className="flex flex-col items-start text-left space-y-6 max-w-2xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-3"
          >
            <motion.div
              className="h-px w-12 bg-gradient-to-r from-transparent to-cyber-blue/50"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
            <span className="text-sm md:text-base font-medium text-cyber-blue/80 tracking-[0.2em] uppercase">
              Hey! Welcome to My Portfolio, I&apos;m
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-black leading-[1.1] tracking-tight whitespace-nowrap"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-white inline">MEHTAB </span>
            <GradientText 
              gradientColors={['#00f0ff', '#0066ff', '#4c00ff', '#8b5cf6', '#7c3aed', '#00f0ff']}
              duration={8}
              direction="left"
              ease="linear"
              className="inline font-black"
            >
              AFTABUR ROSUL
            </GradientText>
          </motion.h1>

          {/* Role Tags - Animated Single Label */}
          <div
            className="flex items-center justify-start gap-3 h-10"
            style={{ minHeight: '2.5rem' }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={currentRoleIndex}
                className="px-4 py-1.5 rounded-full border border-cyber-blue/30 text-cyber-blue bg-cyber-blue/10 text-sm font-medium backdrop-blur-sm"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.9 }}
                transition={{ 
                  duration: 0.6, 
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.1
                }}
                whileHover={{ scale: 1.05 }}
              >
                {roles[currentRoleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Description */}
          <motion.p
            className="text-sm md:text-base text-foreground/60 max-w-2xl leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            A developer and researcher focused on <span className="text-foreground/80 font-medium">programming, software development, and AI/ML engineering</span>, with strong interest in building <span className="text-foreground/80 font-medium">intelligent, scalable, and well-designed technical systems</span>. Driven by <span className="text-foreground/80 font-medium">hands-on coding, continuous learning, and creating impactful technology solutions</span>.
          </motion.p>

          {/* Connect me on Text - Attractive Design */}
          <motion.div
            className="pt-6 pb-4 flex items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Decorative Line */}
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-cyber-blue/30 to-cyber-blue/30 flex-1 max-w-[60px]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
            
            {/* Text with Light Gradient */}
            <motion.span
              className="text-xs md:text-sm font-semibold uppercase tracking-[0.15em] relative"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
            >
              <GradientText
                gradientColors={['#7dd3fc', '#60a5fa', '#a78bfa', '#c084fc']}
                duration={6}
                direction="left"
                ease="linear"
                className="inline-block"
              >
                Connect me on
              </GradientText>
              
              {/* Subtle Glow Effect */}
              <motion.span
                className="absolute inset-0 blur-sm opacity-30"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <GradientText
                  gradientColors={['#7dd3fc', '#60a5fa', '#a78bfa', '#c084fc']}
                  duration={6}
                  direction="left"
                  ease="linear"
                  className="inline-block"
                >
                  Connect me on
                </GradientText>
              </motion.span>
            </motion.span>
            
            {/* Animated Connection Indicator */}
            <motion.div
              className="flex items-center gap-1 ml-1"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Animated Sparkles */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="relative"
                  style={{
                    width: '4px',
                    height: '4px',
                  }}
                >
                  {/* Main Sparkle */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `radial-gradient(circle, rgba(125, 211, 252, 0.8) 0%, transparent 70%)`,
                    }}
                    animate={{
                      scale: [0.8, 1.4, 0.8],
                      opacity: [0.5, 1, 0.5],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: 'easeInOut'
                    }}
                  />
                  {/* Outer Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `radial-gradient(circle, rgba(125, 211, 252, 0.4) 0%, transparent 70%)`,
                    }}
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: 'easeInOut'
                    }}
                  />
                </motion.div>
              ))}
              
              {/* Animated Arrow */}
              <motion.div
                className="ml-1.5"
                animate={{
                  x: [0, 4, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="text-sky-300"
                >
                  <path
                    d="M2 6h8M7 3l3 3-3 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ opacity: 0.7 }}
                  />
                </svg>
              </motion.div>
            </motion.div>
            
            {/* Decorative Line */}
            <motion.div
              className="h-px bg-gradient-to-l from-transparent via-cyber-blue/30 to-cyber-blue/30 flex-1 max-w-[60px]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>

          {/* Social Media Icons - Consistent Sizing & Alignment */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {socialLinks.map((social, index) => {
              const Icon = social.icon
              const isHovered = hoveredSocial === social.label
              
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                  onMouseEnter={() => setHoveredSocial(social.label)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.9 + index * 0.1,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover={{ 
                    y: -2
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Background Glow */}
                  <motion.div
                    className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${social.glow}, transparent)`,
                    }}
                  />

                  {/* Main Container - Glass Morphism Effect */}
                  <motion.div
                    className="relative h-10 px-3 rounded-lg flex items-center justify-center gap-2.5 overflow-hidden min-w-[100px]"
                    style={{
                      background: isHovered 
                        ? `linear-gradient(135deg, ${social.bgColor.replace('0.3', '0.15')}, ${social.hoverColor.replace('0.4', '0.2')})`
                        : social.bgColor.replace('0.3', '0.1'),
                      backdropFilter: 'blur(16px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                      border: `1px solid ${social.borderColor.replace('0.7', '0.3')}`,
                      boxShadow: isHovered 
                        ? `0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 0 0 1px ${social.borderColor.replace('0.7', '0.2')}`
                        : `0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)`,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Glass Overlay */}
                    <div
                      className="absolute inset-0 rounded-lg pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                        mixBlendMode: 'overlay',
                      }}
                    />
                    {/* Shimmer Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                      initial={{ x: '-100%' }}
                      animate={{ x: isHovered ? '200%' : '-100%' }}
                      transition={{ 
                        duration: 1.2,
                        repeat: isHovered ? Infinity : 0,
                        ease: 'easeInOut',
                        repeatDelay: 1.5
                      }}
                    />

                    {/* Icon - Small & Visible - White */}
                    <motion.div
                      className="relative z-10 flex items-center justify-center flex-shrink-0"
                      style={{ width: '18px', height: '18px' }}
                      animate={{
                        scale: isHovered ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {social.isCustom ? (
                        <Icon 
                          className="w-full h-full transition-colors duration-300"
                          style={{ 
                            color: '#ffffff',
                            filter: 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.5))'
                          }}
                        />
                      ) : (
                        <Icon 
                          className="w-full h-full transition-colors duration-300"
                          style={{ 
                            color: '#ffffff',
                            stroke: '#ffffff',
                            strokeWidth: 2.5,
                            fill: 'none',
                            filter: 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.5))'
                          }}
                        />
                      )}
                    </motion.div>

                    {/* Label Text - Consistent Size */}
                    <motion.span
                      className="relative z-10 text-sm font-semibold transition-colors duration-300 whitespace-nowrap"
                      style={{ 
                        color: '#ffffff',
                        textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',
                        fontSize: '14px',
                        lineHeight: '1.2'
                      }}
                      animate={{
                        color: isHovered ? social.color : '#ffffff',
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {social.label}
                    </motion.span>
                  </motion.div>
                </motion.a>
              )
            })}
          </motion.div>

          {/* Statistics Section - Text & Numbers Only */}
          <motion.div
            className="flex items-center gap-4 md:gap-6 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Total Experience */}
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <GradientText
                gradientColors={['#00f0ff', '#0066ff', '#00d4ff']}
                duration={4}
                direction="left"
                ease="linear"
                className="text-[9px] uppercase tracking-wider leading-tight mb-0.5"
              >
                Experience
              </GradientText>
              <div className="flex items-baseline gap-1">
                <GradientText
                  gradientColors={['#00f0ff', '#0066ff', '#00d4ff']}
                  duration={4}
                  direction="left"
                  ease="linear"
                  className="text-xs md:text-sm font-semibold"
                >
                  <AnimatedCounter
                    value={5}
                    suffix="+"
                    duration={3500}
                    className=""
                  />
                </GradientText>
                <span className="text-[9px] text-foreground/50">Years</span>
              </div>
            </motion.div>

            {/* Research Papers */}
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <GradientText
                gradientColors={['#a78bfa', '#8b5cf6', '#c084fc']}
                duration={4}
                direction="left"
                ease="linear"
                className="text-[9px] uppercase tracking-wider leading-tight mb-0.5"
              >
                Papers
              </GradientText>
              <div className="flex items-baseline gap-1">
                <GradientText
                  gradientColors={['#a78bfa', '#8b5cf6', '#c084fc']}
                  duration={4}
                  direction="left"
                  ease="linear"
                  className="text-xs md:text-sm font-semibold"
                >
                  <AnimatedCounter
                    value={12}
                    suffix="+"
                    duration={3500}
                    className=""
                  />
                </GradientText>
                <span className="text-[9px] text-foreground/50">Published</span>
              </div>
            </motion.div>

            {/* Projects Completed */}
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <GradientText
                gradientColors={['#00ff88', '#00d4aa', '#00ffaa']}
                duration={4}
                direction="left"
                ease="linear"
                className="text-[9px] uppercase tracking-wider leading-tight mb-0.5"
              >
                Projects
              </GradientText>
              <div className="flex items-baseline gap-1">
                <GradientText
                  gradientColors={['#00ff88', '#00d4aa', '#00ffaa']}
                  duration={4}
                  direction="left"
                  ease="linear"
                  className="text-xs md:text-sm font-semibold"
                >
                  <AnimatedCounter
                    value={50}
                    suffix="+"
                    duration={3500}
                    className=""
                  />
                </GradientText>
                <span className="text-[9px] text-foreground/50">Completed</span>
              </div>
            </motion.div>

            {/* Articles */}
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <GradientText
                gradientColors={['#ec4899', '#f472b6', '#f9a8d4']}
                duration={4}
                direction="left"
                ease="linear"
                className="text-[9px] uppercase tracking-wider leading-tight mb-0.5"
              >
                Articles
              </GradientText>
              <div className="flex items-baseline gap-1">
                <GradientText
                  gradientColors={['#ec4899', '#f472b6', '#f9a8d4']}
                  duration={4}
                  direction="left"
                  ease="linear"
                  className="text-xs md:text-sm font-semibold"
                >
                  <AnimatedCounter
                    value={8}
                    suffix="+"
                    duration={3500}
                    className=""
                  />
                </GradientText>
                <span className="text-[9px] text-foreground/50">Written</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
