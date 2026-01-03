"use client"

import React, { useState, useMemo } from 'react'
import { CERTIFICATES_DATA, Certificate } from '@/lib/certificates-data'
import { SearchFilter } from '@/components/gallery/search-filter'
import { CertificateCard } from '@/components/gallery/certificate-card'
import { motion, AnimatePresence } from 'framer-motion'

const CATEGORIES = ['All', 'Certification', 'Internship', 'Offer Letter', 'Award']

export function GalleryContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredItems = useMemo(() => {
    let result = CERTIFICATES_DATA

    // Filter by Category
    if (activeCategory && activeCategory !== 'All') {
      result = result.filter(item => item.type === activeCategory)
    }

    // Filter by Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.issuer.toLowerCase().includes(q) ||
        item.skills.some(skill => skill.toLowerCase().includes(q))
      )
    }

    return result
  }, [searchQuery, activeCategory])

  // Mouse move effect for cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    for (const card of document.getElementsByClassName("group") as any) {
      const rect = card.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8 min-h-screen relative z-10" onMouseMove={handleMouseMove}>

      {/* Header Section */}
      <div className="flex flex-col items-center text-center space-y-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/50">
              Wall of{' '}
            </span>
            <span className="bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.purple.400),theme(colors.pink.500),theme(colors.indigo.500),theme(colors.purple.400))] bg-[length:200%_auto] animate-gradient-text shadow-xl">
              Distinction
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-zinc-400 leading-relaxed">
            A digital archive of professional milestones, certified skills, and industry recognitions.
          </p>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full"
        >
          <SearchFilter
            categories={CATEGORIES}
            onSearch={setSearchQuery}
            onFilterChange={setActiveCategory}
          />
        </motion.div>
      </div>

      {/* Grid Section */}
      <div className="relative min-h-[400px]">
        {filteredItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-zinc-500"
          >
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-lg">No credentials found matching your criteria.</p>
            <button
              onClick={() => { setSearchQuery(""); setActiveCategory(null); }}
              className="mt-4 text-sm text-purple-400 hover:text-purple-300 underline"
            >
              Clear filters
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            <AnimatePresence mode='popLayout'>
              {filteredItems.map((item, idx) => (
                <CertificateCard key={item.id} item={item} index={idx} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Decorative Bottom */}
      <div className="mt-20 border-t border-white/5 pt-8 text-center">
        <p className="text-xs text-zinc-600 font-mono uppercase tracking-widest">
          Verified Digital Architecture • 2024
        </p>
      </div>

      <style jsx global>{`
        @keyframes gradient-text {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-text {
          animation: gradient-text 5s ease infinite;
        }
      `}</style>

    </div>
  )
}
