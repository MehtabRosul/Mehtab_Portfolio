'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import { ResearchPaper } from '@/lib/data/research-papers'
import { GradientText } from '@/components/ui/gradient-text'

interface PaperManuscriptProps {
  paper: ResearchPaper
  variant?: 'compact' | 'full'
  index?: number
}

export function PaperManuscript({ paper, variant = 'compact', index = 0 }: PaperManuscriptProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const categoryColors: Record<ResearchPaper['category'], string[]> = {
    'AI/ML': ['#00ff88', '#00d4aa', '#7fffd4'],
    'Cybersecurity': ['#00f0ff', '#0066ff', '#4c00ff'],
    'Healthcare': ['#8b5cf6', '#a855f7', '#c084fc'],
    'Other': ['#ec4899', '#f472b6', '#f9a8d4'],
  }

  const colors = categoryColors[paper.category]

  return (
    <motion.div
      className="relative group w-full h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Manuscript Container */}
      <div
        className="relative bg-background/80 backdrop-blur-sm border-2 rounded-lg overflow-hidden flex flex-col h-full"
        style={{
          borderColor: isHovered ? colors[0] : `${colors[0]}40`,
          boxShadow: isHovered
            ? `0 12px 40px ${colors[0]}30, 0 0 0 1px ${colors[0]}50, inset 0 1px 0 ${colors[0]}20`
            : `0 4px 16px ${colors[0]}10, 0 0 0 1px ${colors[0]}20`,
        }}
      >
        {/* Scroll-like top edge */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
        
        {/* Manuscript content */}
        <div className="p-6 md:p-8 lg:p-10 flex flex-col flex-grow">
          {/* Category badge */}
          <motion.div
            className="inline-block mb-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 + 0.2 }}
          >
            <span
              className="text-xs md:text-sm font-semibold px-3 py-1 rounded-full"
              style={{
                background: `${colors[0]}15`,
                color: colors[0],
                border: `1px solid ${colors[0]}40`,
              }}
            >
              {paper.category}
            </span>
          </motion.div>

          {/* Title - Academic style */}
          <motion.h3
            className="text-xl md:text-2xl lg:text-3xl font-serif font-bold mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 + 0.3 }}
          >
            <GradientText
              gradientColors={colors}
              duration={4}
              direction="left"
              ease="linear"
              className="inline-block"
            >
              {paper.title}
            </GradientText>
          </motion.h3>

          {/* Authors and Year */}
          <motion.div
            className="flex flex-wrap items-center gap-3 mb-4 text-sm md:text-base text-foreground/70"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 + 0.4 }}
          >
            <span className="font-medium">{paper.authors.join(', ')}</span>
            <span className="text-foreground/40">•</span>
            <span>{paper.year}</span>
          </motion.div>

          {/* Abstract */}
          <AnimatePresence mode="wait">
            {isExpanded || variant === 'full' ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <p className="text-sm md:text-base text-foreground/80 leading-relaxed font-serif">
                  {paper.abstract}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mb-6"
              >
                <p className="text-sm md:text-base text-foreground/70 leading-relaxed font-serif line-clamp-3">
                  {paper.abstract}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Keywords */}
          <motion.div
            className="flex flex-wrap gap-2 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 + 0.5 }}
          >
            {paper.keywords.slice(0, 5).map((keyword, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-1 rounded"
                style={{
                  background: `${colors[0]}10`,
                  color: colors[0],
                  border: `1px solid ${colors[0]}20`,
                }}
              >
                {keyword}
              </span>
            ))}
          </motion.div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-4 mt-auto">
            {/* Expand/Collapse button */}
            {variant === 'compact' && (
              <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 text-sm font-medium transition-colors"
                style={{ color: colors[0] }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isExpanded ? (
                  <>
                    <ChevronUp size={16} />
                    <span>Show Less</span>
                  </>
                ) : (
                  <>
                    <ChevronDown size={16} />
                    <span>Read Abstract</span>
                  </>
                )}
              </motion.button>
            )}

            {/* ResearchGate Link */}
            <motion.a
              href={paper.researchGateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all"
              style={{
                background: isHovered ? colors[0] : `${colors[0]}15`,
                color: isHovered ? '#000' : colors[0],
                border: `1px solid ${colors[0]}40`,
              }}
              whileHover={{ scale: 1.05, boxShadow: `0 4px 12px ${colors[0]}30` }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink size={16} />
              <span>View on ResearchGate</span>
            </motion.a>
          </div>
        </div>

        {/* Scroll-like bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
      </div>

      {/* Glow effect */}
      <motion.div
        className="absolute -inset-4 rounded-lg opacity-0 group-hover:opacity-100 blur-2xl pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, ${colors[0]}20, transparent 70%)`,
        }}
      />
    </motion.div>
  )
}

