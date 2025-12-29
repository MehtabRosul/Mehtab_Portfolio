'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { Search, X } from 'lucide-react'
import { ResearchPaper } from '@/lib/data/research-papers'

interface PaperFiltersProps {
  papers: ResearchPaper[]
  onFilterChange: (filteredPapers: ResearchPaper[]) => void
}

export function PaperFilters({ papers, onFilterChange }: PaperFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState<ResearchPaper['category'] | 'All'>('All')
  const [selectedYear, setSelectedYear] = useState<number | 'All'>('All')
  const [searchQuery, setSearchQuery] = useState('')

  const categories: ResearchPaper['category'][] = ['AI/ML', 'Cybersecurity', 'Healthcare', 'Other']
  const years = Array.from(new Set(papers.map(p => p.year))).sort((a, b) => b - a)

  const applyFilters = useCallback(() => {
    let filtered = [...papers]

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    // Year filter
    if (selectedYear !== 'All') {
      filtered = filtered.filter(p => p.year === selectedYear)
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.abstract.toLowerCase().includes(query) ||
        p.keywords.some(k => k.toLowerCase().includes(query)) ||
        p.authors.some(a => a.toLowerCase().includes(query))
      )
    }

    onFilterChange(filtered)
  }, [papers, onFilterChange, selectedCategory, selectedYear, searchQuery])

  // Apply filters when any filter changes
  useEffect(() => {
    applyFilters()
  }, [applyFilters])

  const handleCategoryChange = (category: ResearchPaper['category'] | 'All') => {
    setSelectedCategory(category)
  }

  const handleYearChange = (year: number | 'All') => {
    setSelectedYear(year)
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
  }

  const clearFilters = () => {
    setSelectedCategory('All')
    setSelectedYear('All')
    setSearchQuery('')
  }

  const hasActiveFilters = selectedCategory !== 'All' || selectedYear !== 'All' || searchQuery.trim() !== ''

  return (
    <div className="space-y-6 mb-12">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
        <input
          type="text"
          placeholder="Search papers by title, abstract, keywords, or authors..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full pl-12 pr-12 py-4 rounded-lg bg-background/80 backdrop-blur-sm border-2 border-foreground/20 focus:border-cyber-purple focus:outline-none transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => handleSearchChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-foreground/10 transition-colors"
          >
            <X className="w-4 h-4 text-foreground/60" />
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground/60">Category:</span>
          <div className="flex flex-wrap gap-2">
            <motion.button
              onClick={() => handleCategoryChange('All')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === 'All'
                  ? 'bg-cyber-purple text-black'
                  : 'bg-background/80 border-2 border-foreground/20 text-foreground/70 hover:border-cyber-purple/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All
            </motion.button>
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-cyber-purple text-black'
                    : 'bg-background/80 border-2 border-foreground/20 text-foreground/70 hover:border-cyber-purple/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Year Filter */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground/60">Year:</span>
          <div className="flex flex-wrap gap-2">
            <motion.button
              onClick={() => handleYearChange('All')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedYear === 'All'
                  ? 'bg-cyber-blue text-black'
                  : 'bg-background/80 border-2 border-foreground/20 text-foreground/70 hover:border-cyber-blue/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All
            </motion.button>
            {years.map((year) => (
              <motion.button
                key={year}
                onClick={() => handleYearChange(year)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedYear === year
                    ? 'bg-cyber-blue text-black'
                    : 'bg-background/80 border-2 border-foreground/20 text-foreground/70 hover:border-cyber-blue/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {year}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <motion.button
            onClick={clearFilters}
            className="ml-auto px-4 py-2 rounded-lg text-sm font-medium bg-background/80 border-2 border-foreground/20 text-foreground/70 hover:border-red-500/50 transition-all flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-4 h-4" />
            Clear Filters
          </motion.button>
        )}
      </div>
    </div>
  )
}

