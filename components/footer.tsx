'use client'

import { motion } from 'framer-motion'
import { GradientText } from '@/components/ui/gradient-text'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-cyber-blue/10 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#07101a] via-[#081724] to-[#000000]">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-blue/30 to-transparent" />

      <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12 py-10 sm:py-12">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          {/* Copyright */}
          <motion.div
            className="text-sm text-foreground/70 text-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="flex items-center gap-2 justify-center flex-wrap">
              <span>© {currentYear}</span>
              <GradientText
                gradientColors={['#00f0ff', '#8b5cf6', '#00ff88']}
                duration={4}
                direction="left"
                className="font-semibold"
              >
                Mehtab Aftabur Rosul
              </GradientText>
              <span>• All Rights Reserved</span>
            </p>
          </motion.div>

          {/* Separator */}
          <div className="hidden md:block w-px h-4 bg-cyber-blue/20" />

          {/* Additional Info */}
          <motion.div
            className="text-sm text-foreground/50 text-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p>Built & Design with experties by Mr. Rosul</p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
