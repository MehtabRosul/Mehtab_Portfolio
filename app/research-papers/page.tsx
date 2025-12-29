'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { researchPapers, ResearchPaper } from '@/lib/data/research-papers'
import { ResearchTimeline } from '@/components/research/research-timeline'
import { PaperFilters } from '@/components/research/paper-filters'
import { GradientText } from '@/components/ui/gradient-text'
import { BookOpen } from 'lucide-react'

export default function ResearchPapersPage() {
  const [filteredPapers, setFilteredPapers] = useState<ResearchPaper[]>(researchPapers)

  return (
    <main className="relative min-h-screen pt-20 md:pt-32 pb-20">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 cyber-grid-bg opacity-5" />
        
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 70%, rgba(0, 240, 255, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(0, 255, 136, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <BookOpen className="w-10 h-10 md:w-12 md:h-12" style={{ color: '#8b5cf6' }} />
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-black">
              <GradientText
                gradientColors={['#8b5cf6', '#00f0ff', '#00ff88', '#ec4899', '#8b5cf6']}
                duration={5}
                direction="left"
                ease="linear"
                className="inline-block"
              >
                Research
              </GradientText>{' '}
              <span className="text-white">Publications</span>
            </h1>
          </div>
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            A comprehensive collection of research contributions in AI, cybersecurity, and healthcare
          </p>
        </motion.div>

        {/* Filters */}
        <PaperFilters papers={researchPapers} onFilterChange={setFilteredPapers} />

        {/* Results count */}
        {filteredPapers.length !== researchPapers.length && (
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-foreground/60">
              Showing {filteredPapers.length} of {researchPapers.length} papers
            </p>
          </motion.div>
        )}

        {/* No results */}
        {filteredPapers.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-xl text-foreground/60 mb-4">No papers found matching your filters</p>
            <p className="text-foreground/40">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}

        {/* Timeline */}
        {filteredPapers.length > 0 && (
          <ResearchTimeline papers={filteredPapers} />
        )}
      </div>
    </main>
  )
}

