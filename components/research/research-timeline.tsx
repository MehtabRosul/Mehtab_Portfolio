'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ResearchPaper } from '@/lib/data/research-papers'
import { PaperManuscript } from './paper-manuscript'

interface ResearchTimelineProps {
  papers: ResearchPaper[]
}

export function ResearchTimeline({ papers }: ResearchTimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(timelineRef, { once: true, amount: 0.1 })
  const [expandedPaper, setExpandedPaper] = useState<string | null>(null)

  // Group papers by year
  const papersByYear = papers.reduce((acc, paper) => {
    if (!acc[paper.year]) {
      acc[paper.year] = []
    }
    acc[paper.year].push(paper)
    return acc
  }, {} as Record<number, ResearchPaper[]>)

  const years = Object.keys(papersByYear)
    .map(Number)
    .sort((a, b) => b - a) // Most recent first

  return (
    <div ref={timelineRef} className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyber-purple via-cyber-blue to-cyber-green opacity-30" />

      {/* Papers */}
      <div className="space-y-16 md:space-y-24">
        {years.map((year, yearIndex) => {
          const yearPapers = papersByYear[year]
          
          return (
            <div key={year} className="relative">
              {/* Year marker */}
              <motion.div
                className="absolute left-0 md:left-1/2 -translate-x-1/2 md:-translate-x-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center font-bold text-lg md:text-xl z-10"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #00f0ff)',
                  color: '#000',
                  boxShadow: '0 4px 20px rgba(139, 92, 246, 0.4)',
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{
                  duration: 0.6,
                  delay: yearIndex * 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {year}
              </motion.div>

              {/* Papers for this year */}
              <div className="ml-24 md:ml-0 md:pl-12 md:pr-12 space-y-8">
                {yearPapers.map((paper, paperIndex) => (
                  <motion.div
                    key={paper.id}
                    className={`md:${paperIndex % 2 === 0 ? 'mr-auto md:pr-1/2' : 'ml-auto md:pl-1/2'} max-w-2xl`}
                    initial={{ opacity: 0, x: paperIndex % 2 === 0 ? -50 : 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: yearIndex * 0.2 + paperIndex * 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <PaperManuscript
                      paper={paper}
                      variant="full"
                      index={yearIndex * 10 + paperIndex}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

