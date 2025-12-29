'use client'

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { GradientText } from './gradient-text'
import { cn } from '@/lib/utils'

interface SkillTypographyProps {
  title: string
  proficiency: number
  skills: string[]
  colorScheme: string[]
  description?: string
  terminalCommand?: string
  position?: { x: number; y: number }
  index?: number
  onHover?: (isHovered: boolean) => void
}

export function SkillTypography({
  title,
  proficiency,
  skills,
  colorScheme,
  description,
  terminalCommand,
  position,
  index = 0,
  onHover,
}: SkillTypographyProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showTerminal, setShowTerminal] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Mouse position tracking for subtle parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const x = useSpring(mouseX, { stiffness: 150, damping: 15 })
  const y = useSpring(mouseY, { stiffness: 150, damping: 15 })
  
  const rotateX = useTransform(y, [-0.3, 0.3], ['-1deg', '1deg'])
  const rotateY = useTransform(x, [-0.3, 0.3], ['1deg', '-1deg'])

  // Debounce mouse move for performance
  const mouseMoveTimeoutRef = useRef<NodeJS.Timeout>()
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    
    // Debounce mouse move events
    if (mouseMoveTimeoutRef.current) {
      clearTimeout(mouseMoveTimeoutRef.current)
    }
    
    mouseMoveTimeoutRef.current = setTimeout(() => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      mouseX.set((e.clientX - centerX) / rect.width)
      mouseY.set((e.clientY - centerY) / rect.height)
    }, 16) // ~60fps
  }
  
  useEffect(() => {
    return () => {
      if (mouseMoveTimeoutRef.current) {
        clearTimeout(mouseMoveTimeoutRef.current)
      }
    }
  }, [])

  const handleMouseEnter = () => {
    setIsHovered(true)
    setShowTerminal(true)
    onHover?.(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setShowTerminal(false)
    onHover?.(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  // Generate proficiency bar
  const proficiencyBars = Math.floor(proficiency / 5)
  const proficiencyBar = '█'.repeat(proficiencyBars)

  return (
    <motion.div
      ref={containerRef}
      className="relative group"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: 'preserve-3d',
        willChange: isHovered ? 'transform, opacity' : 'auto',
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Main Typography Content */}
      <div className="relative z-10 w-full overflow-hidden">
        {/* Category Title - Large, Bold */}
        <motion.div
          className="mb-4 overflow-hidden"
          animate={{
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <GradientText
            gradientColors={colorScheme}
            duration={4}
            direction="left"
            ease="linear"
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight break-words"
          >
            {title}
          </GradientText>
        </motion.div>

        {/* Proficiency Display - Terminal Style */}
        <motion.div
          className="font-mono text-sm md:text-base mb-6"
          style={{ color: colorScheme[0] }}
          animate={{
            opacity: isHovered ? 1 : 0.7,
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-foreground/40">$</span>
            <span className="text-foreground/60">proficiency</span>
            <span className="text-foreground/40">=</span>
            <motion.span
              className="font-bold"
              animate={{
                color: isHovered ? colorScheme[0] : colorScheme[1],
              }}
            >
              {proficiency}%
            </motion.span>
          </div>
          <div className="mt-2 font-mono text-xs md:text-sm">
            <span className="text-foreground/40">[{proficiencyBar}]</span>
          </div>
        </motion.div>

        {/* Skills List - Minimalist */}
        <motion.div
          className="flex flex-wrap gap-3 md:gap-4 mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.3 }}
        >
          {skills.map((skill, skillIndex) => (
            <motion.span
              key={skill}
              className="text-sm md:text-base font-medium text-foreground/60 hover:text-foreground transition-colors"
              style={{
                color: isHovered ? colorScheme[0] : undefined,
              }}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 + skillIndex * 0.05 }}
              whileHover={{
                scale: 1.1,
                color: colorScheme[0],
              }}
            >
              {skill}
              {skillIndex < skills.length - 1 && (
                <span className="mx-2 text-foreground/30">·</span>
              )}
            </motion.span>
          ))}
        </motion.div>

        {/* Description - Subtle */}
        {description && (
          <motion.p
            className="text-sm md:text-base text-foreground/50 max-w-md leading-relaxed"
            animate={{
              opacity: isHovered ? 0.8 : 0.5,
            }}
          >
            {description}
          </motion.p>
        )}
      </div>

      {/* Terminal Overlay - Appears on Hover */}
      <AnimatePresence>
        {showTerminal && terminalCommand && (
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <TerminalOverlay
              command={terminalCommand}
              colorScheme={colorScheme}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle Glow Effect */}
      <motion.div
        className="absolute -inset-4 rounded-lg opacity-0 group-hover:opacity-100 blur-2xl pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, ${colorScheme[0]}20, transparent 70%)`,
        }}
      />
    </motion.div>
  )
}

// Terminal Overlay Component
function TerminalOverlay({
  command,
  colorScheme,
}: {
  command: string
  colorScheme: string[]
}) {
  const [displayedText, setDisplayedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    setDisplayedText('')
    let currentIndex = 0
    
    const typingInterval = setInterval(() => {
      if (currentIndex < command.length) {
        setDisplayedText(command.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(typingInterval)
      }
    }, 30)

    return () => clearInterval(typingInterval)
  }, [command])

  // Blinking cursor
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <div
      className="p-4 rounded-lg backdrop-blur-md border"
      style={{
        background: 'rgba(0, 0, 0, 0.8)',
        borderColor: `${colorScheme[0]}40`,
        boxShadow: `0 0 20px ${colorScheme[0]}20`,
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-xs text-foreground/40 font-mono">terminal</span>
      </div>
      <div className="font-mono text-sm" style={{ color: colorScheme[0] }}>
        <span className="text-foreground/60">$ </span>
        <span>{displayedText}</span>
        <motion.span
          animate={{ opacity: showCursor ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="ml-1"
          style={{ color: colorScheme[0] }}
        >
          ▊
        </motion.span>
      </div>
    </div>
  )
}

