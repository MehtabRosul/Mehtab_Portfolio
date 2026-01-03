'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  FileText,
  BookOpen,
  Briefcase,
  Award,
  Search,
  Calendar,
  Users,
  ExternalLink,
  Sparkles,
  TrendingUp,
  Target,
} from 'lucide-react'
import Image from 'next/image'
import {
  allResources,
  researchPapers,
  articles,
  caseStudies,
  categories,
  Resource,
  ResearchPaper,
  Article,
  CaseStudy,
  ResourceType,
  ResourceCategory,
  searchResources
} from '@/lib/resources-data'
import { GradientText } from '@/components/ui/gradient-text'
import { GoldenText } from '@/components/ui/golden-text'
import { HolographicCard } from '@/components/animations/holographic-card'
import { SearchBar } from '@/components/resources/search-bar'
import { FilterPills } from '@/components/resources/filter-pills'
import { ScrollReveal } from '@/components/animations/scroll-reveal'

export function ResourcesContent() {
  const [activeType, setActiveType] = useState<ResourceType | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // All resources from data
  const allResources: Resource[] = [...researchPapers, ...articles, ...caseStudies]

  // Search filtering
  const filteredBySearch = useMemo(() => {
    if (!searchQuery.trim()) return allResources

    const lowerQuery = searchQuery.toLowerCase()
    return allResources.filter((resource) => {
      // Search in common fields
      const titleMatch = resource.title.toLowerCase().includes(lowerQuery)
      const categoryMatch = resource.category.toLowerCase().includes(lowerQuery)
      const tagsMatch = resource.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))

      // Type-specific searches
      if (resource.type === 'research-paper') {
        const paper = resource as ResearchPaper
        return (
          titleMatch ||
          categoryMatch ||
          tagsMatch ||
          paper.abstract.toLowerCase().includes(lowerQuery) ||
          paper.authors.some((author) => author.toLowerCase().includes(lowerQuery))
        )
      } else if (resource.type === 'article') {
        const article = resource as Article
        return titleMatch || categoryMatch || tagsMatch || article.summary.toLowerCase().includes(lowerQuery)
      } else if (resource.type === 'case-study') {
        const caseStudy = resource as CaseStudy
        return (
          titleMatch ||
          categoryMatch ||
          tagsMatch ||
          caseStudy.description.toLowerCase().includes(lowerQuery) ||
          caseStudy.techStack.some((tech) => tech.toLowerCase().includes(lowerQuery))
        )
      }

      return false
    })
  }, [searchQuery, allResources])

  // Calculate counts for filter pills
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    filteredBySearch.forEach((resource) => {
      counts[resource.type] = (counts[resource.type] || 0) + 1
    })
    return counts
  }, [filteredBySearch])

  // Filter by type only
  const filteredResources = useMemo(() => {
    return filteredBySearch.filter((resource) => {
      return activeType === 'all' || resource.type === activeType
    })
  }, [filteredBySearch, activeType])

  // Separate filtered resources by type
  const filteredPapers = filteredResources.filter((r) => r.type === 'research-paper') as ResearchPaper[]
  const filteredArticles = filteredResources.filter((r) => r.type === 'article') as Article[]
  const filteredCaseStudies = filteredResources.filter((r) => r.type === 'case-study') as CaseStudy[]

  // Calculate total citations for stats
  const totalCitations = researchPapers.reduce((sum, paper) => sum + (paper.citations || 0), 0)

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      {/* Hero Section */}
      <ScrollReveal className="text-center mb-20 space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 text-xs font-mono text-primary mb-4"
        >
          <Sparkles className="w-4 h-4" />
          <span>RESEARCH & PUBLICATIONS</span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl lg:text-9xl font-heading font-bold tracking-tight">
          <GradientText
            gradientColors={['#00f0ff', '#06b6d4', '#8b5cf6', '#c084fc', '#00f0ff']}
            duration={8}
            className="drop-shadow-[0_0_25px_rgba(79,70,229,0.6)]"
          >
            Knowledge Base
          </GradientText>
        </h1>

        <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground/80 leading-relaxed">
          Exploring the frontiers of <span className="text-primary font-semibold">AI/ML</span>,
          <span className="text-pink-400 font-semibold"> Brain-Computer Interfaces</span>,
          <span className="text-red-400 font-semibold"> Cybersecurity</span>, and beyond
        </p>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <StatCard value={researchPapers.length} label="Research Papers" icon={FileText} color="#00f0ff" />
          <StatCard value={articles.length} label="Articles" icon={BookOpen} color="#f472b6" />
          <StatCard value={caseStudies.length} label="Case Studies" icon={Briefcase} color="#10b981" />
        </motion.div>
      </ScrollReveal>

      {/* Search Bar */}
      <div className="max-w-4xl mx-auto mb-12">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* Filters */}
      <div className="max-w-6xl mx-auto mb-16">
        <FilterPills
          activeType={activeType}
          onTypeChange={setActiveType}
          typeCounts={typeCounts}
          totalCount={allResources.length}
        />
      </div>

      {/* Results Summary */}
      <div className="text-center mb-12">
        <p className="text-sm text-muted-foreground/60">
          Showing <span className="text-primary font-bold">{filteredResources.length}</span> of{' '}
          <span className="font-semibold">{allResources.length}</span> resources
        </p>
      </div>

      {/* Research Papers Section */}
      {filteredPapers.length > 0 && (
        <section className="mb-24">
          <SectionHeader title="Research Papers" icon={FileText} color="#00f0ff" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredPapers.map((paper, index) => (
              <ResearchPaperCard key={paper.id} paper={paper} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* Case Studies Section */}
      {filteredCaseStudies.length > 0 && (
        <section className="mb-24">
          <SectionHeader title="Case Studies" icon={Target} color="#10b981" />
          <div className="grid grid-cols-1 gap-8">
            {filteredCaseStudies.map((caseStudy, index) => (
              <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* Articles Section */}
      {filteredArticles.length > 0 && (
        <section className="mb-24">
          <SectionHeader title="Articles & Publications" icon={BookOpen} color="#f472b6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* No Results */}
      {filteredResources.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20"
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold mb-2">No resources found</h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your search or filters
          </p>
          <button
            onClick={() => {
              setSearchQuery('')
              setActiveType('all')
            }}
            className="px-6 py-3 rounded-xl bg-primary/20 hover:bg-primary/30 border border-primary/50 text-primary font-medium transition-all"
          >
            Clear All Filters
          </button>
        </motion.div>
      )}

      {/* ResearchGate CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-20 pt-12 border-t border-white/10"
      >
        <a
          href="https://www.researchgate.net/profile/Mehtab-Rosul"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 hover:border-primary/50 text-lg font-semibold transition-all duration-300 hover:scale-105 group"
        >
          <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span>View Full Profile on ResearchGate</span>
        </a>
      </motion.div>
    </div>
  )
}

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

interface StatCardProps {
  value: number
  label: string
  icon: React.ElementType
  color: string
}

function StatCard({ value, label, icon: Icon, color }: StatCardProps) {
  return (
    <motion.div
      className="relative group glass rounded-xl overflow-hidden border border-white/10 p-4"
      whileHover={{ scale: 1.03, y: -3 }}
      transition={{ duration: 0.2 }}
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl"
        style={{ background: color }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center space-y-2">
        <Icon className="w-6 h-6" style={{ color }} />
        <div className="text-4xl font-black font-heading" style={{ color }}>
          {value}
        </div>
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
          {label}
        </div>
      </div>

      {/* Border gradient on hover */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${color}20, transparent)`,
          padding: '1px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
    </motion.div>
  )
}

interface SectionHeaderProps {
  title: string
  icon: React.ElementType
  color: string
}

function SectionHeader({ title, icon: Icon, color }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-4 mb-10"
    >
      <div
        className="p-3 rounded-xl glass border border-white/10"
        style={{ boxShadow: `0 0 20px ${color} 30` }}
      >
        <Icon className="w-7 h-7" style={{ color }} />
      </div>
      <h2 className="text-3xl md:text-4xl font-bold font-heading">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
          {title}
        </span>
      </h2>
      <div className="h-px flex-1 bg-gradient-to-r from-white/20 via-white/5 to-transparent" />
    </motion.div>
  )
}

// ============================================================================
// RESEARCH PAPER CARD
// ============================================================================

function ResearchPaperCard({ paper, index }: { paper: ResearchPaper; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <HolographicCard category={paper.category} className="h-full">
        <div className="flex flex-col h-full space-y-3">
          {/* Header with Avatar */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border"
                  style={{
                    borderColor: `${getCategoryColor(paper.category)} 50`,
                    background: `${getCategoryColor(paper.category)} 15`,
                    color: getCategoryColor(paper.category),
                  }}
                >
                  {paper.category}
                </span>
                <span className="text-xs text-muted-foreground/60 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {paper.year}
                </span>
                {paper.readTime && (
                  <span className="text-xs text-muted-foreground/60">
                    {paper.readTime}
                  </span>
                )}
              </div>
            </div>

            {/* Avatar with parallax effect */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="relative w-12 h-12 rounded-lg overflow-hidden border-2 border-white/20 shadow-lg flex-shrink-0"
            >
              <Image
                src={paper.avatar}
                alt={paper.category}
                fill
                className="object-cover"
              />
              <div
                className="absolute inset-0 mix-blend-overlay opacity-30"
                style={{ background: getCategoryColor(paper.category) }}
              />
            </motion.div>
          </div>

          {/* Title */}
          <h3 className="text-base md:text-lg font-bold font-heading leading-tight line-clamp-2 group-hover:text-glow">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/95 to-white/90">
              {paper.title}
            </span>
          </h3>

          {/* Authors */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground/70">
            <Users className="w-3.5 h-3.5" />
            <span className="line-clamp-1">{paper.authors.join(', ')}</span>
          </div>

          {/* Abstract */}
          <p className="text-xs text-muted-foreground/80 line-clamp-3 leading-relaxed flex-1">
            {paper.abstract}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {paper.tags.slice(0, 4).map((tag, i) => (
              <span
                key={i}
                className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-muted-foreground/70 hover:border-white/20 hover:bg-white/10 transition-all"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="pt-2 border-t border-dashed border-white/10 flex items-center justify-between gap-3">
            {paper.citations !== undefined && (
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground/60">
                <Award className="w-3.5 h-3.5 text-yellow-500" />
                <span>{paper.citations} citations</span>
              </div>
            )}

            <a
              href={paper.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/20 hover:bg-primary/30 border border-primary/30 hover:border-primary/50 text-primary text-xs font-medium transition-all duration-300 group"
            >
              <span>View Paper</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </HolographicCard>
    </motion.div>
  )
}

// ============================================================================
// ARTICLE CARD
// ============================================================================

function ArticleCard({ article, index }: { article: Article; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <HolographicCard category={article.category} className="h-full">
        <div className="flex flex-col h-full space-y-3">
          {/* Avatar - Floating */}
          <motion.div
            whileHover={{ scale: 1.15, y: -5 }}
            className="relative w-10 h-10 rounded-lg overflow-hidden border-2 border-white/20 shadow-xl"
          >
            <Image
              src={article.avatar}
              alt={article.category}
              fill
              className="object-cover"
            />
            <div
              className="absolute inset-0 mix-blend-soft-light opacity-40"
              style={{ background: getCategoryColor(article.category) }}
            />
          </motion.div>

          {/* Category Pill */}
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg"
              style={{
                borderColor: `${getCategoryColor(article.category)} 50`,
                background: `${getCategoryColor(article.category)} 10`,
                color: getCategoryColor(article.category),
                border: `1px solid ${getCategoryColor(article.category)} 30`,
              }}
            >
              {article.category}
            </span>
            <span className="text-[10px] text-muted-foreground/50">{article.readTime}</span>
          </div>

          {/* Title */}
          <h3 className="text-sm md:text-base font-bold font-heading leading-tight line-clamp-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">
              {article.title}
            </span>
          </h3>

          {/* Summary */}
          <p className="text-xs text-muted-foreground/70 line-clamp-3 leading-relaxed flex-1">
            {article.summary}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {article.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="text-[8px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-white/5 text-muted-foreground/60"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="pt-2 border-t border-dashed border-white/10 flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground/50">
              {article.publishedDate}
            </span>

            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] font-medium text-primary hover:text-primary/80 transition-colors group"
            >
              <span>Read</span>
              <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </HolographicCard>
    </motion.div>
  )
}

// ============================================================================
// CASE STUDY CARD
// ============================================================================

function CaseStudyCard({ caseStudy, index }: { caseStudy: CaseStudy; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <HolographicCard category={caseStudy.category} className="h-full max-w-5xl" glowIntensity={0.7}>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Avatar & Meta */}
          <div className="lg:w-1/3 space-y-4">
            {/* Large Featured Avatar */}
            <motion.div
              whileHover={{
                scale: 1.03,
                filter: "brightness(1.1)"
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative aspect-square rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl max-w-[280px]"
            >
              <Image
                src={caseStudy.avatar}
                alt={caseStudy.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-block px-3 py-1.5 rounded-lg bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                  Case Study
                </span>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <div className="space-y-3 glass rounded-xl p-4 border border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground/60 uppercase tracking-wider">Project Duration</span>
                <span className="text-sm font-bold text-primary">6 months</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground/60 uppercase tracking-wider">Team Size</span>
                <span className="text-sm font-bold text-green-400">1 member</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground/60 uppercase tracking-wider">Impact</span>
                <span className="text-sm font-bold text-yellow-400">Medium</span>
              </div>
            </div>

            {/* Meta Info */}
            <div className="space-y-3">
              {caseStudy.organization && (
                <div className="text-sm text-muted-foreground/70">
                  <span className="font-semibold text-white/80">{caseStudy.organization}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
                <Calendar className="w-4 h-4" />
                <span>{caseStudy.year}</span>
              </div>
              <div
                className="text-xs font-bold uppercase px-3 py-1.5 rounded-lg inline-block"
                style={{
                  background: `${getCategoryColor(caseStudy.category)}15`,
                  color: getCategoryColor(caseStudy.category),
                  border: `1px solid ${getCategoryColor(caseStudy.category)}40`,
                }}
              >
                {caseStudy.category}
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:w-2/3 flex flex-col space-y-5">
            {/* Title */}
            <h3 className="text-xl md:text-2xl font-bold font-heading leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/95 to-white/85">
                {caseStudy.title}
              </span>
            </h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              {caseStudy.description}
            </p>

            {/* Tech Stack */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/60">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {caseStudy.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs font-bold px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20 transition-all"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Outcomes */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/60 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                Key Outcomes
              </h4>
              <ul className="space-y-2">
                {caseStudy.outcomes.map((outcome, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm text-muted-foreground/80 leading-relaxed"
                  >
                    <span className="text-green-400 mt-1 flex-shrink-0">✓</span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="pt-4 border-t border-dashed border-white/10">
              <a
                href={caseStudy.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/40 hover:border-green-500/60 text-green-400 font-semibold transition-all duration-300 hover:scale-105 group"
              >
                <span>Explore Case Study</span>
                <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </HolographicCard>
    </motion.div>
  )
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function getCategoryColor(category: ResourceCategory): string {
  const colorMap: Record<ResourceCategory, string> = {
    'AI/ML': '#00f0ff',
    'BCI': '#ec4899',
    'Cybersecurity': '#ef4444',
    'Sustainability': '#10b981',
    'Edge Computing': '#8b5cf6',
    'Governance': '#f59e0b',
    'Digital Twins': '#06b6d4',
    'Human-AI Collaboration': '#f472b6',
    'LLM & Agentic AI': '#6366f1',
    'Product Engineering': '#14b8a6',
  }
  return colorMap[category] || '#8b5cf6'
}
