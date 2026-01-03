'use client'

import { useRef, useState, MouseEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ResourceCategory } from '@/lib/resources-data'

interface HolographicCardProps {
    children: React.ReactNode
    category: ResourceCategory
    className?: string
    glowIntensity?: number
}

const getCategoryColors = (category: ResourceCategory): { primary: string; secondary: string; accent: string } => {
    const colorMap: Record<ResourceCategory, { primary: string; secondary: string; accent: string }> = {
        'AI/ML': { primary: '#00f0ff', secondary: '#4f46e5', accent: '#8b5cf6' },
        'BCI': { primary: '#ec4899', secondary: '#f43f5e', accent: '#fb7185' },
        'Cybersecurity': { primary: '#ef4444', secondary: '#dc2626', accent: '#f87171' },
        'Sustainability': { primary: '#10b981', secondary: '#059669', accent: '#34d399' },
        'Edge Computing': { primary: '#8b5cf6', secondary: '#7c3aed', accent: '#a78bfa' },
        'Governance': { primary: '#f59e0b', secondary: '#d97706', accent: '#fbbf24' },
        'Digital Twins': { primary: '#06b6d4', secondary: '#0891b2', accent: '#22d3ee' },
        'Human-AI Collaboration': { primary: '#f472b6', secondary: '#ec4899', accent: '#fbcfe8' },
        'LLM & Agentic AI': { primary: '#6366f1', secondary: '#4f46e5', accent: '#818cf8' },
        'Product Engineering': { primary: '#14b8a6', secondary: '#0d9488', accent: '#2dd4bf' },
    }
    return colorMap[category] || { primary: '#00f0ff', secondary: '#4f46e5', accent: '#8b5cf6' }
}

export function HolographicCard({
    children,
    category,
    className = '',
    glowIntensity = 0.5
}: HolographicCardProps) {
    const cardRef = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)

    // Spotlight position for cursor following
    const spotlightX = useMotionValue(0)
    const spotlightY = useMotionValue(0)

    const colors = getCategoryColors(category)

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return

        const rect = cardRef.current.getBoundingClientRect()

        // Update spotlight position (normalized 0-100)
        const spotX = ((e.clientX - rect.left) / rect.width) * 100
        const spotY = ((e.clientY - rect.top) / rect.height) * 100

        spotlightX.set(spotX)
        spotlightY.set(spotY)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
    }

    return (
        <motion.div
            ref={cardRef}
            className={`relative group ${className}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}

            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
                {/* Base card with glassmorphism */}
                <div className="relative w-full h-full bg-gradient-to-br from-black/40 via-black/30 to-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-4 transition-all duration-300">

                    {/* Subtle gradient border */}
                    <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-700"
                        style={{
                            background: `linear-gradient(135deg, ${colors.primary}12, ${colors.secondary}10, ${colors.accent}08)`,
                            padding: '1.5px',
                            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                            WebkitMaskComposite: 'xor',
                            maskComposite: 'exclude',
                        }}
                    />

                    {/* Glowing border beam - follows cursor */}
                    <motion.div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
                        style={{
                            background: `radial-gradient(circle 200px at ${spotlightX.get()}% ${spotlightY.get()}%, ${colors.primary}40, transparent 70%)`,
                        }}
                        animate={{
                            background: isHovered
                                ? `radial-gradient(circle 200px at var(--mouse-x, 50%) var(--mouse-y, 50%), ${colors.primary}40, transparent 70%)`
                                : `radial-gradient(circle 200px at 50% 50%, ${colors.primary}00, transparent 70%)`,
                        }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Subtle shimmer effect */}
                    <motion.div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-15 pointer-events-none"
                        style={{
                            background: `linear-gradient(115deg, 
                transparent 0%, 
                ${colors.primary}20 25%, 
                ${colors.secondary}15 50%, 
                ${colors.accent}10 75%, 
                transparent 100%)`,
                            backgroundSize: '200% 200%',
                        }}
                        animate={{
                            backgroundPosition: isHovered ? ['0% 0%', '100% 100%'] : '0% 0%',
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            ease: 'easeInOut',
                        }}
                    />

                    {/* Spotlight effect that follows cursor */}
                    <motion.div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none mix-blend-overlay"
                        style={{
                            background: `radial-gradient(circle 300px at ${spotlightX.get()}% ${spotlightY.get()}%, ${colors.primary}15, transparent 60%)`,
                        }}
                    />

                    {/* Enhanced glow on hover */}
                    <div
                        className="absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 -z-10"
                        style={{
                            backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary}, ${colors.accent})`,
                        }}
                    />

                    {/* Content */}
                    <div className="relative z-10">
                        {children}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
