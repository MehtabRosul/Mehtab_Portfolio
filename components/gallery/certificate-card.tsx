"use client"

import React, { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { Certificate } from '@/lib/certificates-data'
import { ShieldCheck, Calendar, Award, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CertificateCardProps {
    item: Certificate
    index: number
}

export function CertificateCard({ item, index }: CertificateCardProps) {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Smooth mouse values for parallax
    const smoothX = useSpring(mouseX, { stiffness: 200, damping: 20 })
    const smoothY = useSpring(mouseY, { stiffness: 200, damping: 20 })

    const color = item.color ?? '#ffffff'

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    return (
        <div
            onMouseMove={handleMouseMove}
            className="group relative h-full perspective-1000"
        >
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.08, duration: 0.6, type: "spring" }}
                className={cn(
                    "relative h-full overflow-hidden rounded-[24px] bg-[#0a0a0a] transition-all duration-500",
                    "border border-white/5",
                    "hover:shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)] hover:border-white/20",
                    "flex flex-col"
                )}
            >

                {/* --- MOUSE FOLLOWER SPOTLIGHTS --- */}

                {/* 1. Main Spotlight (Soft Glow) */}
                <motion.div
                    className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-[1]"
                    style={{
                        background: useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, ${color}25, transparent 60%)`
                    }}
                />

                {/* 2. Intense Border Glow (Sharp) */}
                <motion.div
                    className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-[2]"
                    style={{
                        background: useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, ${color}65, transparent 40%)`,
                        maskImage: 'linear-gradient(black, black), linear-gradient(black, black)',
                        maskClip: 'content-box, border-box',
                        maskComposite: 'exclude',
                        WebkitMaskComposite: 'xor',
                        padding: '1px',
                        borderRadius: '24px',
                        mixBlendMode: 'screen'
                    }}
                />

                {/* --- BACKGROUND LAYERS --- */}

                {/* 3. Base Noise Texture */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0 pointer-events-none mix-blend-overlay" />

                {/* 4. "Circuit" Grid Pattern (Reveals on Hover) */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none z-0"
                    style={{
                        backgroundImage: `linear-gradient(${color}33 1px, transparent 1px), linear-gradient(90deg, ${color}33 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                        maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
                    }}
                />


                {/* --- CONTENT LAYERS (Z-Index > 5) --- */}

                {/* Top Section */}
                <div className="relative z-10 p-6 pb-4 border-b border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            {/* Floating Icon Parallax */}
                            <motion.div
                                className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-[#111] border border-white/10 shadow-2xl group-hover:shadow-[0_0_20px_-5px_var(--shadow-color)] transition-shadow duration-500"
                                style={{ '--shadow-color': color } as any}
                                initial={false}
                                animate={{ y: 0 }}
                                whileHover={{ y: -5, scale: 1.05 }}
                            >
                                <Award className="w-6 h-6 transition-colors duration-500 group-hover:text-[var(--active-color)]" style={{ '--active-color': color, color: 'rgb(161 161 170)' } as any} />
                                {/* Inner glow for icon */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-50" />
                            </motion.div>

                            <div className="flex flex-col">
                                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 group-hover:text-zinc-400 transition-colors">Issuer</span>
                                <span className="text-sm font-bold text-zinc-200 tracking-wide group-hover:text-white transition-colors">{item.issuer}</span>
                            </div>
                        </div>

                        {item.verified && (
                            <motion.div
                                className="relative flex items-center justify-center"
                                whileHover={{ scale: 1.2, rotate: 10 }}
                            >
                                <div className="absolute inset-0 bg-emerald-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <ShieldCheck className="relative w-5 h-5 text-emerald-500/50 group-hover:text-emerald-400 transition-colors duration-300" />
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Middle Section */}
                <div className="relative z-10 p-6 flex-1 flex flex-col gap-5">

                    <div>
                        <h3 className="text-xl font-bold text-white leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all duration-300">
                            {item.title}
                        </h3>

                        <div className="mt-3 flex items-center gap-2 text-xs text-zinc-500 font-mono">
                            <span
                                className="px-2.5 py-1 rounded-md border border-white/5 bg-white/5 transition-colors duration-300 group-hover:border-white/10 group-hover:bg-white/10"
                                style={{ color: color }}
                            >
                                {item.type}
                            </span>
                            <span className="opacity-30">|</span>
                            <span className="flex items-center gap-1.5 group-hover:text-zinc-400 transition-colors">
                                <Calendar className="w-3.5 h-3.5" /> {item.date}
                            </span>
                        </div>
                    </div>

                    <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3 group-hover:text-zinc-300 transition-colors duration-300">
                        {item.description}
                    </p>

                    <div className="mt-auto pt-4 flex flex-wrap gap-2">
                        {item.skills.map((skill, i) => (
                            <span
                                key={i}
                                className="text-[11px] font-medium tracking-wide px-2.5 py-1 rounded-full bg-white/5 text-zinc-500 border border-white/5 transition-all duration-300 group-hover:bg-white/10 group-hover:text-zinc-300 group-hover:border-white/10"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Decorative Tech Lines */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute bottom-0 left-[20%] w-[60%] h-[1px] bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500" style={{ color: color }} />

            </motion.div>
        </div>
    )
}
