'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Calendar, Sparkles, Layers, Terminal, Cpu, Globe, Smartphone, Wrench, Hash, Atom, Gamepad2, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { MagicCard } from '@/components/animations/magic-card'
import { ScrollReveal } from '@/components/animations/scroll-reveal'
import { GradientText } from '@/components/ui/gradient-text'
import { isQuantumContent, getGoldPaletteFor } from '@/lib/utils'
import { projectsData, ProjectCategory } from '@/lib/projects-data'

const categories: ProjectCategory[] = [
  'AI/ML',
  'Quantum Computing',
  'Game Dev',
  'Web Dev',
  'Mobile App',
  'Tools & Utility'
]

const getCategoryConfig = (cat: ProjectCategory) => {
  switch (cat) {
    case 'AI/ML': return { icon: Cpu, colors: ['#00f0ff', '#4f46e5', '#8b5cf6'] } // Cyan to Purple
    case 'Quantum Computing': return { icon: Atom, colors: ['#ffd700', '#f59e0b', '#fbbf24'] } // Gold
    case 'Game Dev': return { icon: Gamepad2, colors: ['#22c55e', '#10b981', '#34d399'] } // Green
    case 'Web Dev': return { icon: Globe, colors: ['#3b82f6', '#06b6d4', '#2563eb'] } // Blue/Cyan
    case 'Mobile App': return { icon: Smartphone, colors: ['#f472b6', '#db2777', '#be185d'] } // Pink
    case 'Tools & Utility': return { icon: Wrench, colors: ['#94a3b8', '#475569', '#64748b'] } // Slate
    default: return { icon: Hash, colors: ['#ffffff', '#888888', '#444444'] }
  }
}

function AnimatedCategoryIcon({ category, size = "w-12 h-12" }: { category: ProjectCategory, size?: string }) {
  const { icon: Icon, colors } = getCategoryConfig(category)
  const id = `gradient-${category.replace(/[^a-z0-9]/gi, '')}`

  return (
    <div className={`relative ${size} flex items-center justify-center`}>
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
            <motion.stop
              offset="0%"
              stopColor={colors[0]}
              animate={{ stopColor: colors }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatType: "mirror" }}
            />
            <motion.stop
              offset="50%"
              stopColor={colors[1]}
              animate={{ stopColor: [colors[1], colors[2], colors[0]] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatType: "mirror" }}
            />
            <motion.stop
              offset="100%"
              stopColor={colors[2]}
              animate={{ stopColor: [colors[2], colors[0], colors[1]] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatType: "mirror" }}
            />
          </linearGradient>
        </defs>
      </svg>
      <Icon className={`${size}`} style={{ stroke: `url(#${id})` }} />
    </div>
  )
}

const getCategoryIcon = (cat: ProjectCategory) => {
  const { icon: Icon } = getCategoryConfig(cat)
  return <Icon className="w-4 h-4" />
}

export function ProjectsContent() {
  const [activeSection, setActiveSection] = useState<ProjectCategory>('AI/ML')

  // Group projects by category
  const groupedProjects = useMemo(() => {
    const groups: Record<string, typeof projectsData> = {}

    categories.forEach(cat => {
      const projects = projectsData.filter(p => p.category === cat)
        .sort((a, b) => (a.featured === b.featured) ? 0 : a.featured ? -1 : 1)

      if (projects.length > 0) {
        groups[cat] = projects
      }
    })
    return groups
  }, [])

  const [isScrolling, setIsScrolling] = useState(false)

  // Scroll Spy Logic
  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return // Don't spy while auto-scrolling

      const scrollPosition = window.scrollY + 200 // Offset for header

      // 1. Back to Top Check (User Request)
      if (window.scrollY < 300) {
        setActiveSection('AI/ML')
        return
      }

      // 2. Find active section
      for (const category of categories) {
        const element = document.getElementById(`section-${category}`)
        if (element) {
          const { top, bottom } = element.getBoundingClientRect()
          const absoluteTop = top + window.pageYOffset
          const absoluteBottom = bottom + window.pageYOffset

          if (scrollPosition >= absoluteTop && scrollPosition < absoluteBottom) {
            setActiveSection(category)
            break
          }
        }
      }
    }

    let timeoutId: NodeJS.Timeout
    const throttledScroll = () => {
      if (timeoutId) return
      timeoutId = setTimeout(() => {
        handleScroll()
        timeoutId = undefined!
      }, 100)
    }

    window.addEventListener('scroll', throttledScroll)
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [isScrolling, groupedProjects])

  const scrollToSection = (category: ProjectCategory) => {
    setIsScrolling(true)
    setActiveSection(category)
    const element = document.getElementById(`section-${category}`)
    if (element) {
      const yOffset = -120 // Offset for sticky header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })

      // Reset isScrolling after animation
      setTimeout(() => setIsScrolling(false), 1000)
    }
  }

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen relative">
      {/* Header Section */}
      <ScrollReveal className="text-center mb-16 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-primary/20 text-xs font-mono text-primary mb-4">
          <Sparkles className="w-3 h-3" />
          <span>EXPLORE THE ARCHIVES</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight">
          <GradientText
            gradientColors={['#00f0ff', '#4f46e5', '#8b5cf6', '#d946ef']}
            duration={8}
            className="drop-shadow-[0_0_15px_rgba(79,70,229,0.5)]"
          >
            Innovation
          </GradientText>
          <span className="block text-3xl md:text-5xl lg:text-6xl mt-2 text-foreground/80 font-light">
            Through Code
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-muted-foreground/80 leading-relaxed">
          A curated collection of <span className="text-primary font-semibold">{projectsData.length}+</span> projects spanning quantum computing, artificial intelligence, and interactive experiences.
        </p>
      </ScrollReveal>

      {/* Sticky Navigation Rail */}
      <div className="sticky top-4 z-40 mb-16 flex justify-center w-full">
        <div className="glass-strong rounded-full p-1.5 border border-white/10 shadow-2xl backdrop-blur-xl flex items-center gap-1 overflow-x-auto max-w-[95vw] no-scrollbar">
          {categories.filter(cat => groupedProjects[cat]?.length > 0).map((cat) => (
            <button
              key={cat}
              onClick={() => scrollToSection(cat)}
              className={`relative px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap flex items-center gap-2 group ${activeSection === cat
                ? 'text-white'
                : 'text-muted-foreground hover:text-white'
                }`}
            >
              {activeSection === cat && (
                <motion.div
                  layoutId="activePill"
                  className="absolute inset-0 bg-primary/20 border border-primary/50 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.4)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {getCategoryIcon(cat)}
                {cat}
                <span className="opacity-50 text-[10px]">({groupedProjects[cat]?.length})</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-32">
        {Object.entries(groupedProjects).map(([category, projects]) => (
          <section key={category} id={`section-${category}`} className="scroll-mt-32">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex items-center gap-6 mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-bold font-heading flex items-center gap-4 text-glow">
                <AnimatedCategoryIcon category={category as ProjectCategory} size="w-12 h-12" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/80 to-white/50">
                  {category}
                </span>
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </motion.div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => {
                const isQuantum = isQuantumContent(project.title) || project.category === 'Quantum Computing'
                const gold = isQuantum ? getGoldPaletteFor(project.title) : null

                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <MagicCard
                      className="h-full group hover:-translate-y-1"
                      category={project.category}
                      gradientColor={getCategoryConfig(project.category).colors[1]}
                    >
                      {/* Status / Featured Badge */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex gap-2">
                          {project.featured && (
                            <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 px-2 py-0.5 text-[10px]">
                              FEATURED
                            </Badge>
                          )}
                          {project.lastUpdated === 'Private' && (
                            <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/20 px-2 py-0.5 text-[10px]">
                              PRIVATE
                            </Badge>
                          )}
                        </div>
                        <div className="text-muted-foreground/30 transform transition-transform group-hover:scale-110 group-hover:rotate-12 duration-500">
                          {getCategoryIcon(project.category)}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 space-y-4">
                        <h3
                          className="text-2xl font-bold font-heading transition-all duration-300 line-clamp-1 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                          style={{
                            // Dynamic glow color based on category
                            textShadow: `0 0 20px ${getCategoryConfig(project.category).colors[1]}00` // Initial transparent
                          }}
                        >
                          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90 group-hover:to-white transition-all duration-300"
                            style={{
                              filter: `drop-shadow(0 0 8px ${getCategoryConfig(project.category).colors[1]}80)`
                            }}>
                            {project.title}
                          </span>
                        </h3>
                        <p className="text-sm text-muted-foreground/80 line-clamp-3 leading-relaxed group-hover:text-muted-foreground transition-colors duration-300">
                          {project.description}
                        </p>
                      </div>

                      {/* Tech Stack */}
                      <div className="mt-8 mb-6">
                        <div className="flex flex-wrap gap-2">
                          {project.tech.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-muted-foreground transition-all duration-300 group-hover:border-white/10 group-hover:bg-white/10 group-hover:text-white"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.tech.length > 4 && (
                            <span className="text-[10px] px-2 py-1 text-muted-foreground">+ {project.tech.length - 4}</span>
                          )}
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="pt-4 border-t border-dashed border-white/10 flex items-center justify-between text-xs text-muted-foreground/60 group-hover:text-muted-foreground transition-colors duration-300">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            <span>{project.lastUpdated}</span>
                          </div>
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all duration-300 border border-white/5 hover:border-white/20"
                            >
                              <ExternalLink className="w-3 h-3" />
                              <span>Visit</span>
                            </a>
                          )}
                        </div>
                        <div className="flex items-center gap-1 group-hover:text-amber-400 transition-colors">
                          <Star className="w-3 h-3" />
                          <span>{project.stars}</span>
                        </div>
                      </div>
                    </MagicCard>
                  </motion.div>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}