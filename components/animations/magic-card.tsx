'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ProjectCategory } from '@/lib/projects-data'

interface MagicCardProps {
    children: React.ReactNode
    className?: string
    gradientColor?: string
    category: ProjectCategory
}

// --- Patterns ---

const CardPattern = ({ category, mouseX, mouseY, gradientColor }: { category: ProjectCategory, mouseX: any, mouseY: any, gradientColor: string }) => {
    // Determine pattern based on category
    let patternId = 'grid'
    if (category === 'AI/ML') patternId = 'neural'
    if (category === 'Quantum Computing') patternId = 'hex'
    if (category === 'Game Dev') patternId = 'matrix'
    if (category === 'Web Dev') patternId = 'blocks'
    if (category === 'Mobile App') patternId = 'waves'
    if (category === 'Tools & Utility') patternId = 'blueprint'

    const id = `pattern-${category.replace(/[^a-z0-9]/gi, '')}`

    return (
        <motion.div
            className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
                maskImage: useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, white, transparent)`,
                WebkitMaskImage: useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, white, transparent)`,
            }}
        >
            <svg className="absolute inset-0 w-full h-full text-white/20" style={{ color: gradientColor }}>
                <defs>
                    {/* 1. Neural Network (AI/ML) */}
                    <pattern id={`neural-${id}`} width="50" height="50" patternUnits="userSpaceOnUse">
                        <circle cx="10" cy="10" r="1.5" fill="currentColor" opacity="0.8" />
                        <circle cx="25" cy="35" r="1.5" fill="currentColor" opacity="0.8" />
                        <circle cx="40" cy="15" r="1.5" fill="currentColor" opacity="0.8" />
                        <path d="M10 10 L25 35 L40 15 L10 10" stroke="currentColor" strokeWidth="0.5" opacity="0.4" fill="none" />
                        <path d="M25 35 L10 60" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
                    </pattern>

                    {/* 2. Hex (Quantum) */}
                    <pattern id={`hex-${id}`} width="20" height="34.6" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                        <path d="M10 0l10 5.77v11.55l-10 5.77L0 17.32V5.77L10 0z" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
                    </pattern>

                    {/* 3. Matrix / Digital (Game Dev) */}
                    <pattern id={`matrix-${id}`} width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M5 0v20 M15 0v20 M0 5h20 M0 15h20" stroke="currentColor" strokeWidth="0.5" opacity="0.3" strokeDasharray="2 2" />
                        <rect x="5" y="5" width="5" height="5" fill="currentColor" opacity="0.4" />
                    </pattern>

                    {/* 4. Isometric Blocks (Web Dev) */}
                    <pattern id={`blocks-${id}`} width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M20 0 L40 10 L20 20 L0 10 Z M0 10 v20 L20 40 L20 20 M20 40 L40 30 v-20" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
                        <path d="M20 20 v20" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
                    </pattern>

                    {/* 5. Waves (Mobile) */}
                    <pattern id={`waves-${id}`} width="40" height="20" patternUnits="userSpaceOnUse">
                        <path d="M0 10 Q10 0 20 10 T40 10" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
                    </pattern>

                    {/* 6. Blueprint Grid (Tools & Utility) */}
                    <pattern id={`blueprint-${id}`} width="40" height="40" patternUnits="userSpaceOnUse">
                        <rect width="40" height="40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2" strokeDasharray="4 2" />
                        <path d="M0 0 L5 5 M35 35 L40 40 M0 40 L5 35 M35 5 L40 0" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                        <circle cx="20" cy="20" r="2" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
                    </pattern>
                </defs>

                <rect width="100%" height="100%" fill={
                    patternId === 'neural' ? `url(#neural-${id})` :
                        patternId === 'hex' ? `url(#hex-${id})` :
                            patternId === 'matrix' ? `url(#matrix-${id})` :
                                patternId === 'blocks' ? `url(#blocks-${id})` :
                                    patternId === 'waves' ? `url(#waves-${id})` :
                                        `url(#blueprint-${id})`
                } />
            </svg>
        </motion.div>
    )
}

// Category-specific ambient backgrounds (Retained and simplified slightly to let patterns shine)
const AmbientBackground = ({ category }: { category: ProjectCategory }) => {
    // ... same as before, just lighter opacity to not conflict with pattern
    if (category === 'Quantum Computing') {
        return (
            <div className="absolute inset-0 opacity-15 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.05),transparent_50%)]" />
            </div>
        )
    }
    // ... (Keeping it simple, minimal ambient as requested by "pattern only visible with hover")
    // Actually, to make pattern POP, let's keep background very dark/minimal.
    return <div className="absolute inset-0 opacity-10 pointer-events-none" />
}


export function MagicCard({ children, className, gradientColor = '#262626', category }: MagicCardProps) {
    const cardRef = useRef<HTMLDivElement>(null)

    // Mouse position tracking
    const mouseX = useMotionValue(-1000)
    const mouseY = useMotionValue(-1000)

    // Smooth springs for tilt effect
    const rotateX = useSpring(0, { damping: 20, stiffness: 300 })
    const rotateY = useSpring(0, { damping: 20, stiffness: 300 })

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect()

        // Spotlight position
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)

        // Tilt calculation
        const center = { x: left + width / 2, y: top + height / 2 }
        const distance = { x: clientX - center.x, y: clientY - center.y }

        // Max tilt angle
        rotateX.set((distance.y / height) * -5) // Reduced tilt for better readability
        rotateY.set((distance.x / width) * 5)
    }

    function onMouseLeave() {
        mouseX.set(-1000)
        mouseY.set(-1000)
        rotateX.set(0)
        rotateY.set(0)
    }

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{
                transformStyle: 'preserve-3d',
                rotateX,
                rotateY,
            }}
            className={cn(
                'group relative flex h-full flex-col overflow-hidden rounded-xl bg-black/40 border border-white/10 shadow-2xl transition-all duration-300',
                className
            )}
        >
            {/* 1. Ambient Background (Subtle base) */}
            <AmbientBackground category={category} />

            {/* 2. Spotlight Effect (Base Light) */}
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${gradientColor}15,
              transparent 80%
            )
          `
                }}
            />

            {/* 3. Pattern Reveal (Visible ONLY in light) */}
            <CardPattern category={category} mouseX={mouseX} mouseY={mouseY} gradientColor={gradientColor} />

            {/* 4. Border Beam */}
            <motion.div
                className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: useMotionTemplate`
             radial-gradient(
               400px circle at ${mouseX}px ${mouseY}px,
               ${gradientColor}30,
               transparent 40%
             )
           `
                }}
            />

            {/* 5. Content Container */}
            <div className="relative z-20 h-full flex flex-col p-6 backdrop-blur-[2px]">
                {children}
            </div>

        </motion.div>
    )
}
