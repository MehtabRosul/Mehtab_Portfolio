'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { apply3DTilt, applyMagneticEffect } from '@/lib/hover-animations'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface Project {
  id: number
  slug: string
  title: string
  category: string
  description: string
  tech: string[]
  image: string
  link?: string
  github?: string
  featured?: boolean
  avatar: string
  colorScheme: string[]
  metrics?: {
    accuracy?: number
    users?: number
    performance?: number
  }
}

interface AnimatedProjectCardProps {
  project: Project
  index?: number
  className?: string
}

export function AnimatedProjectCard({ 
  project, 
  index = 0,
  className 
}: AnimatedProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [isMobile, setIsMobile] = useState(false)
  
  // Detect mobile for performance optimization
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!cardRef.current) return

    const cleanup1 = apply3DTilt(cardRef.current)
    const cleanup2 = applyMagneticEffect(cardRef.current, 0.15)

    return () => {
      cleanup1()
      cleanup2()
    }
  }, [])

  // Debounce mouse move for performance
  const mouseMoveTimeoutRef = useRef<NodeJS.Timeout>()
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    // Debounce mouse move events
    if (mouseMoveTimeoutRef.current) {
      clearTimeout(mouseMoveTimeoutRef.current)
    }
    
    mouseMoveTimeoutRef.current = setTimeout(() => {
      const rect = cardRef.current?.getBoundingClientRect()
      if (!rect) return
      
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      setMousePosition({ x, y })
      
      // Calculate parallax for image (subtle movement)
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const parallaxX = ((x - centerX) / centerX) * 10
      const parallaxY = ((y - centerY) / centerY) * 10
      setImageParallax({ x: parallaxX, y: parallaxY })
      
      // Create particles on hover (throttled, disabled on mobile for performance)
      if (isHovered && !isMobile && Math.random() > 0.85) {
        const newParticle = {
          id: Date.now() + Math.random(),
          x: (x / rect.width) * 100,
          y: (y / rect.height) * 100,
        }
        setParticles((prev) => {
          // Limit particles to 5 on mobile, 10 on desktop
          const maxParticles = isMobile ? 5 : 10
          const updated = [...prev, newParticle].slice(-maxParticles)
          return updated
        })
        
        setTimeout(() => {
          setParticles((prev) => prev.filter((p) => p.id !== newParticle.id))
        }, 1000)
      }
    }, 16) // ~60fps
  }
  
  useEffect(() => {
    return () => {
      if (mouseMoveTimeoutRef.current) {
        clearTimeout(mouseMoveTimeoutRef.current)
      }
    }
  }, [])

  const gradientStyle = {
    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${project.colorScheme[0]}15, ${project.colorScheme[1]}08, transparent 70%)`,
  }
  
  // Image parallax position based on mouse
  const [imageParallax, setImageParallax] = useState({ x: 0, y: 0 })

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        'project-card relative group overflow-hidden rounded-2xl',
        'border border-cyber-blue/20 backdrop-blur-xl',
        'bg-gradient-to-br from-background/80 via-background/60 to-background/80',
        'transform-gpu h-full flex flex-col',
        className
      )}
      style={{
        willChange: isHovered ? 'transform, opacity' : 'auto',
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1]
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setParticles([])
        setImageParallax({ x: 0, y: 0 })
      }}
    >
      {/* Dynamic Gradient Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={gradientStyle}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Glass Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

      {/* Animated Border Glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${project.colorScheme[0]}40, ${project.colorScheme[1]}40, transparent)`,
          opacity: 0,
        }}
        animate={{
          opacity: isHovered ? [0, 0.6, 0.4] : 0,
        }}
        transition={{
          duration: 2,
          repeat: isHovered ? Infinity : 0,
          ease: 'easeInOut',
        }}
      />

      {/* Particles - Disabled on mobile for performance */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                background: project.colorScheme[0],
                boxShadow: `0 0 10px ${project.colorScheme[0]}`,
                willChange: 'transform, opacity',
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ 
                scale: [0, 2, 0],
                opacity: [1, 0.5, 0],
                y: [0, -30],
                x: [0, (Math.random() - 0.5) * 20],
              }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          ))}
        </div>
      )}

      {/* Shimmer Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
        }}
        animate={{
          x: isHovered ? ['-100%', '200%'] : '-100%',
        }}
        transition={{
          duration: 1.5,
          repeat: isHovered ? Infinity : 0,
          repeatDelay: 1,
          ease: 'linear',
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Image Section with Hover Animations */}
        <div 
          className="relative h-64 md:h-72 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${project.colorScheme[0]}20, ${project.colorScheme[1]}15)`,
          }}
        >
          {/* Demo Image with Parallax and Zoom Effects */}
          <motion.div
            className="absolute inset-0"
            animate={{
              scale: isHovered ? 1.15 : 1,
              x: imageParallax.x,
              y: imageParallax.y,
            }}
            transition={{
              scale: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
              x: { duration: 0.3, ease: 'easeOut' },
              y: { duration: 0.3, ease: 'easeOut' },
            }}
            style={{
              willChange: 'transform',
            }}
          >
            {/* Demo Image with Hover Effects */}
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-all duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
              quality={90}
            />
            
            {/* Gradient Overlay that intensifies on hover */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${project.colorScheme[0]}40, ${project.colorScheme[1]}30, transparent)`,
              }}
              animate={{
                opacity: isHovered ? 0.3 : 0.5,
              }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>

          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 cyber-grid-bg opacity-20" />

          {/* Animated Shine Effect on Image */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)',
            }}
            animate={{
              x: isHovered ? ['-100%', '200%'] : '-100%',
            }}
            transition={{
              duration: 1.2,
              repeat: isHovered ? Infinity : 0,
              repeatDelay: 1.5,
              ease: 'linear',
            }}
          />

          {/* Category Badge Overlay */}
          <div className="absolute top-4 left-4 z-10">
            <motion.span
              className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md"
              style={{
                background: `${project.colorScheme[0]}30`,
                border: `1px solid ${project.colorScheme[0]}60`,
                color: project.colorScheme[0],
              }}
              whileHover={{ scale: 1.1 }}
            >
              {project.category}
            </motion.span>
          </div>

          {/* Featured Badge */}
          {project.featured && (
            <motion.div
              className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md z-10"
              style={{
                background: `linear-gradient(135deg, ${project.colorScheme[0]}40, ${project.colorScheme[1]}40)`,
                border: `1px solid ${project.colorScheme[0]}60`,
                color: project.colorScheme[0],
              }}
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              Featured
            </motion.div>
          )}

          {/* Avatar */}
          <div className="absolute bottom-4 right-4 z-10">
            <motion.div
              animate={{
                scale: isHovered ? 1.15 : 1,
                rotate: isHovered ? 5 : 0,
              }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.2, rotate: 10 }}
            >
              <Image
                src={project.avatar}
                alt="Creator"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full border-2 border-cyber-blue/50 object-cover shadow-lg"
              />
            </motion.div>
          </div>

          {/* Hover Overlay with Color Shift */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${project.colorScheme[0]}20, transparent 60%)`,
            }}
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Body Section */}
        <div className="flex-1 p-6 md:p-8 flex flex-col min-h-[280px]">

          {/* Title */}
          <motion.h3
            className="text-2xl md:text-3xl font-bold mb-3"
            animate={{
              color: isHovered ? project.colorScheme[0] : '#ffffff',
            }}
            transition={{ duration: 0.3 }}
          >
            {project.title}
          </motion.h3>

          {/* Description */}
          <p className="text-foreground/70 mb-6 leading-relaxed text-sm md:text-base flex-1">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((tech, techIndex) => (
              <motion.span
                key={tech}
                className="px-3 py-1.5 text-xs rounded-lg border backdrop-blur-sm"
                style={{
                  background: `${project.colorScheme[0]}10`,
                  borderColor: `${project.colorScheme[0]}30`,
                  color: project.colorScheme[0],
                }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: techIndex * 0.05 }}
                whileHover={{
                  scale: 1.1,
                  background: `${project.colorScheme[0]}25`,
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="group/btn"
                style={{
                  color: project.colorScheme[0],
                }}
              >
                <Link href={`/projects/${project.slug}`}>
                  <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:translate-x-1 transition-transform" />
                  View Details
                </Link>
              </Button>
            </motion.div>
            {project.github && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="group/btn"
                  style={{
                    color: project.colorScheme[1],
                  }}
                >
                  <Link href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                    Code
                  </Link>
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <motion.div
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, ${project.colorScheme[0]}40, transparent 70%)`,
        }}
      />
    </motion.div>
  )
}

