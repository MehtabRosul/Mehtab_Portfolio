 'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GradientText } from '@/components/ui/gradient-text'
import { ScrollReveal } from '@/components/animations/scroll-reveal'

export function GalleryBanner() {
  return (
    <section id="gallery-banner" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background subtle animated gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-background/60" />
        <motion.div
          className="absolute -top-24 -left-32 w-[48rem] h-[48rem] rounded-full opacity-10 blur-3xl"
          animate={{ rotate: [0, 30, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          style={{ background: 'radial-gradient(circle at 30% 30%, rgba(127,0,255,0.12), transparent 30%), radial-gradient(circle at 70% 70%, rgba(0,223,216,0.08), transparent 30%)' }}
        />
        <motion.div
          className="absolute -bottom-24 -right-32 w-[36rem] h-[36rem] rounded-full opacity-8 blur-2xl"
          animate={{ rotate: [0, -25, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          style={{ background: 'radial-gradient(circle at 40% 40%, rgba(0,124,240,0.10), transparent 30%), radial-gradient(circle at 80% 20%, rgba(255,20,147,0.06), transparent 30%)' }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-cyber-blue/40" />
                <span className="text-xs md:text-sm font-medium text-cyber-blue/80 tracking-widest uppercase">Gallery</span>
                <span className="h-px w-12 bg-gradient-to-l from-transparent to-cyber-blue/40" />
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black leading-tight mb-4">
                <span className="text-white">Proof &amp; </span>
                <GradientText gradientColors={["#00DFD8", "#7F00FF", "#007CF0"]} duration={12} direction="left" className="inline-block">
                  Achievements
                </GradientText>
              </h2>

              <p className="text-lg text-foreground/70 max-w-2xl mb-6">
                A curated showcase of certificates, awards, and selected recognitions — tangible proof of experience, delivered with clarity and craft.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Button asChild variant="neon" size="lg" className="group">
                  <Link href="/gallery">
                    View Gallery
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>

                <div className="flex items-center gap-6 ml-2">
                  <div className="text-sm">
                    <div className="text-2xl font-bold text-white">45+</div>
                    <div className="text-foreground/70">Certificates</div>
                  </div>
                  <div className="h-px w-px bg-foreground/10" />
                  <div className="text-sm">
                    <div className="text-2xl font-bold text-white">12</div>
                    <div className="text-foreground/70">Awards</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right decorative column */}
            <div className="lg:col-span-5 hidden lg:flex justify-end">
              <div className="w-[420px] h-[260px] rounded-3xl bg-gradient-to-br from-[#0b1220] to-[#071226] border border-white/5 p-6 relative overflow-hidden">
                {/* Decorative typographic layers */}
                <motion.div
                  className="absolute -top-10 -left-10 text-[7rem] font-extrabold text-white/3 pointer-events-none select-none"
                  animate={{ x: [0, -20, 0], y: [0, 10, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                >
                  G
                </motion.div>

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="text-xs uppercase text-foreground/60 mb-1">Featured</div>
                    <div className="text-white font-semibold text-lg">Best Certificate</div>
                    <div className="text-foreground/60 text-sm mt-2">Awarded for excellence in research and engineering.</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-foreground/60">Issued: 2024</div>
                    <div className="text-sm text-foreground/60">Verified</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
