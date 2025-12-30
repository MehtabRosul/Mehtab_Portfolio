'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, FileText, BookOpen, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GradientText } from '@/components/ui/gradient-text'
import { Avatar } from '@/components/ui/avatar'
import { GoldenText } from '@/components/ui/golden-text'
import { GradientCard } from '@/components/ui/gradient-card'

const researchPapers = [
  {
    id: 1,
    title: 'Advanced Machine Learning Techniques for Predictive Analytics',
    authors: 'Mehtab Aftabur Rosul et al.',
    year: 2024,
    category: 'AI/ML',
    abstract: 'This paper explores advanced ML techniques for improving prediction accuracy...',
    link: 'https://www.researchgate.net/profile/Mehtab-Rosul',
    pdf: '#',
    avatar: '/avatars/IMG_9787.PNG',
  },
  {
    id: 2,
    title: 'Brain-Computer Interface with AI-ML Integration',
    authors: 'Mehtab Aftabur Rosul et al.',
    year: 2023,
    category: 'BCI',
    abstract: 'A comprehensive study on integrating AI and ML with brain-computer interfaces...',
    link: 'https://www.researchgate.net/profile/Mehtab-Rosul',
    pdf: '#',
    avatar: '/avatars/IMG_9788.PNG',
  },
  {
    id: 3,
    title: 'Quantum Computing Applications in Machine Learning',
    authors: 'Mehtab Aftabur Rosul et al.',
    year: 2024,
    category: 'Quantum',
    abstract: 'Exploring the intersection of quantum computing and machine learning...',
    link: 'https://www.researchgate.net/profile/Mehtab-Rosul',
    pdf: '#',
    avatar: '/avatars/IMG_9789.PNG',
  },
]

const articles = [
  {
    id: 1,
    title: 'Building Production-Ready AI Systems',
    category: 'AI/ML',
    date: '2024-01-15',
    readTime: '5 min',
    link: '#',
    avatar: '/avatars/IMG_9792.PNG',
  },
  {
    id: 2,
    title: 'The Future of LLM Engineering',
    category: 'LLM',
    date: '2024-02-20',
    readTime: '8 min',
    link: '#',
    avatar: '/avatars/IMG_9793.PNG',
  },
  {
    id: 3,
    title: 'Quantum Computing: A Beginner\'s Guide',
    category: 'Quantum',
    date: '2024-03-10',
    readTime: '12 min',
    link: '#',
    avatar: '/avatars/IMG_9795.PNG',
  },
]

const categories = ['All', 'AI/ML', 'BCI', 'Quantum', 'LLM', 'Web Development']

export function ResourcesContent() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPapers = researchPapers.filter(paper => {
    const matchesCategory = selectedCategory === 'All' || paper.category === selectedCategory
    const matchesSearch = paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         paper.abstract.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="container mx-auto px-4 py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-6xl lg:text-8xl font-heading font-bold mb-6">
          <GradientText 
            gradientColors={['#00f0ff', '#06b6d4', '#8b5cf6', '#c084fc', '#00f0ff']}
            duration={5.5}
            direction="left"
            ease="easeInOut"
          >
            Resources
          </GradientText>
        </h1>
        <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto">
          Research papers, articles, and case studies from my work in AI/ML, <GoldenText>quantum computing</GoldenText>, and technology
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-12"
      >
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
            <input
              type="text"
              placeholder="Search papers and articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 glass-strong rounded-lg border border-cyber-blue/30 focus:border-cyber-blue focus:outline-none bg-background/50 backdrop-blur-sm"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-all duration-200 font-medium ${
                selectedCategory === category
                  ? 'bg-cyber-green text-black cyber-glow shadow-lg shadow-cyber-green/50'
                  : 'glass border border-cyber-green/30 text-foreground hover:bg-cyber-green/20 hover:border-cyber-green/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category === 'Quantum' ? <GoldenText>Quantum</GoldenText> : category}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Research Papers Section */}
      <section className="mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-heading font-bold mb-8 flex items-center gap-3"
        >
          <FileText className="w-10 h-10 text-cyber-blue" />
          <span>Research Papers</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPapers.map((paper, index) => (
            <GradientCard
              key={paper.id}
              className="relative overflow-hidden group"
              glowColor="#00f0ff"
              delay={index * 0.1}
            >
              {/* Avatar as decorative element */}
              <div className="absolute -top-4 -right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Avatar
                  src={paper.avatar}
                  alt={paper.category}
                  size="lg"
                  variant="circle"
                />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-cyber-blue font-semibold">{paper.category === 'Quantum' ? <GoldenText>Quantum</GoldenText> : paper.category}</span>
                  <span className="text-sm text-foreground/60">{paper.year}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">
                  {paper.title.startsWith('Quantum Computing') ? 
                    <><GoldenText>Quantum Computing</GoldenText> Applications in Machine Learning</> : 
                    paper.title
                  }
                </h3>
                <p className="text-sm text-foreground/60 mb-2">By {paper.authors}</p>
                <p className="text-sm text-foreground/70 mb-4 line-clamp-3">{paper.abstract}</p>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" asChild>
                    <a href={paper.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View
                    </a>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <a href={paper.pdf}>
                      <FileText className="w-4 h-4 mr-2" />
                      PDF
                    </a>
                  </Button>
                </div>
              </div>
            </GradientCard>
          ))}
        </div>
      </section>

      {/* Articles Section */}
      <section>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-heading font-bold mb-8 flex items-center gap-3"
        >
          <BookOpen className="w-10 h-10 text-cyber-purple" />
          <span>Articles & Case Studies</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article, index) => (
            <GradientCard
              key={article.id}
              className="relative overflow-hidden group"
              glowColor="#8b5cf6"
              delay={index * 0.1}
            >
              {/* Avatar as decorative element */}
              <div className="absolute -top-4 -right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Avatar
                  src={article.avatar}
                  alt={article.category}
                  size="lg"
                  variant="circle"
                />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-cyber-purple font-semibold">{article.category === 'Quantum' ? <GoldenText>Quantum</GoldenText> : article.category}</span>
                  <span className="text-sm text-foreground/60">{article.readTime}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">
                  {article.title.startsWith('Quantum Computing') ? 
                    <><GoldenText>Quantum Computing</GoldenText>: A Beginner&apos;s Guide</> : 
                    article.title
                  }
                </h3>
                <p className="text-sm text-foreground/60 mb-4">{article.date}</p>
                <Button variant="ghost" size="sm" asChild>
                  <a href={article.link}>
                    Read More
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </GradientCard>
          ))}
        </div>
      </section>

      {/* Certificates Section */}
      <section className="mt-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-heading font-bold mb-8 flex items-center gap-3"
        >
          <BookOpen className="w-10 h-10 text-cyber-green" />
          <span>Certificates & Achievements</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder certificate cards — replace with real data as needed */}
          {[
            { id: 1, title: 'Deep Learning Specialization', issuer: 'Coursera', year: 2023 },
            { id: 2, title: 'Advanced NLP with Transformers', issuer: 'Udemy', year: 2024 },
            { id: 3, title: 'Quantum Computing Foundations', issuer: 'edX', year: 2024 },
          ].map((cert) => (
            <GradientCard key={cert.id} className="relative overflow-hidden group" glowColor="#00ff88">
              <div className="relative z-10 p-6">
                <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
                <p className="text-sm text-foreground/60 mb-4">{cert.issuer} • {cert.year}</p>
                <Button variant="ghost" size="sm">View</Button>
              </div>
            </GradientCard>
          ))}
        </div>
      </section>

      {/* ResearchGate Link */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <Button variant="outline" size="lg" asChild>
          <a href="https://www.researchgate.net/profile/Mehtab-Rosul" target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-5 h-5 mr-2" />
            View All on ResearchGate
          </a>
        </Button>
      </motion.div>
    </div>
  )
}
