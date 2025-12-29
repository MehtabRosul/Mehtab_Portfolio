'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HoverCard } from '@/components/animations/hover-card'
import { ScrollReveal } from '@/components/animations/scroll-reveal'
import { useStaggerChildren } from '@/lib/scroll-animations'
import { GradientText } from '@/components/ui/gradient-text'
import { Avatar } from '@/components/ui/avatar'

const categories = [
  'All',
  '2D Python Games',
  'ML Prediction Systems',
  'Detection Systems',
  'Mobile Apps',
  'Web Development',
  'BCI with AI-ML',
  'Cybersecurity',
]

const projects = [
  {
    id: 1,
    title: 'Advanced ML Prediction System',
    category: 'ML Prediction Systems',
    description: 'A sophisticated machine learning system for predictive analytics with high accuracy',
    tech: ['Python', 'TensorFlow', 'React', 'Node.js'],
    image: '/images/project1.jpg',
    link: '#',
    github: '#',
    featured: true,
    avatar: '/avatars/IMG_9787.PNG',
  },
  {
    id: 2,
    title: 'Object Detection System',
    category: 'Detection Systems',
    description: 'Real-time object detection using deep learning and computer vision',
    tech: ['Python', 'OpenCV', 'YOLO', 'PyTorch'],
    image: '/images/project2.jpg',
    link: '#',
    github: '#',
    featured: false,
    avatar: '/avatars/IMG_9788.PNG',
  },
  {
    id: 3,
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description: 'Full-stack e-commerce solution with modern architecture and payment integration',
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe'],
    image: '/images/project3.jpg',
    link: '#',
    github: '#',
    featured: false,
    avatar: '/avatars/IMG_9789.PNG',
  },
  {
    id: 4,
    title: 'BCI Neural Interface',
    category: 'BCI with AI-ML',
    description: 'Brain-Computer Interface system using AI and ML for neural signal processing',
    tech: ['Python', 'PyTorch', 'EEG', 'TensorFlow'],
    image: '/images/project4.jpg',
    link: '#',
    github: '#',
    featured: true,
    avatar: '/avatars/IMG_9792.PNG',
  },
  {
    id: 5,
    title: '2D Python Game Collection',
    category: '2D Python Games',
    description: 'Collection of engaging 2D games built with Python and Pygame',
    tech: ['Python', 'Pygame', 'NumPy'],
    image: '/images/project5.jpg',
    link: '#',
    github: '#',
    featured: false,
    avatar: '/avatars/IMG_9793.PNG',
  },
  {
    id: 6,
    title: 'Mobile Health App',
    category: 'Mobile Apps',
    description: 'Healthcare mobile application with AI-powered diagnostics',
    tech: ['React Native', 'Python', 'TensorFlow Lite'],
    image: '/images/project6.jpg',
    link: '#',
    github: '#',
    featured: false,
    avatar: '/avatars/IMG_9795.PNG',
  },
  {
    id: 7,
    title: 'Cybersecurity Tool Suite',
    category: 'Cybersecurity',
    description: 'Comprehensive cybersecurity tools for threat detection and analysis',
    tech: ['Python', 'C++', 'React', 'Docker'],
    image: '/images/project7.jpg',
    link: '#',
    github: '#',
    featured: false,
    avatar: '/avatars/IMG_9796.PNG',
  },
  {
    id: 8,
    title: 'AdTech Platform',
    category: 'Web Development',
    description: 'Advanced advertising technology platform with real-time bidding',
    tech: ['Next.js', 'Node.js', 'Redis', 'Kafka'],
    image: '/images/project8.jpg',
    link: '#',
    github: '#',
    featured: false,
    avatar: '/avatars/IMG_9781.PNG',
  },
]

export function ProjectsContent() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const containerRef = useRef<HTMLDivElement>(null)
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory)

  useStaggerChildren(containerRef, '.project-card', 0.1)

  const featuredProjects = filteredProjects.filter(p => p.featured)
  const regularProjects = filteredProjects.filter(p => !p.featured)

  return (
    <div className="container mx-auto px-4 py-20">
      {/* Header */}
      <ScrollReveal className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl lg:text-8xl font-heading font-bold mb-6">
          <span className="text-white">My</span>{' '}
          <GradientText 
            gradientColors={['#00f0ff', '#4f46e5', '#6366f1', '#8b5cf6', '#a855f7']}
            duration={5.5}
            direction="right"
            ease="linear"
          >
            Projects
          </GradientText>
        </h1>
        <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto">
          A collection of innovative projects spanning AI/ML, web development, games, and emerging technologies
        </p>
      </ScrollReveal>

      {/* Category Filters */}
      <ScrollReveal delay={0.2} className="mb-12">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-all duration-200 font-medium ${
                selectedCategory === category
                  ? 'bg-cyber-blue text-black cyber-glow shadow-lg shadow-cyber-blue/50'
                  : 'glass border border-cyber-blue/30 text-foreground hover:bg-cyber-blue/20 hover:border-cyber-blue/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </ScrollReveal>

      {/* Projects Grid - Asymmetric Layout */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div ref={containerRef} className="space-y-8">
            {/* Featured Projects - Large Cards */}
            {featuredProjects.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredProjects.map((project) => (
                  <HoverCard
                    key={project.id}
                    className="project-card glass-strong rounded-2xl overflow-hidden border border-cyber-blue/30 group"
                    glowColor="#8b5cf6"
                  >
                    <div className="grid md:grid-cols-1 gap-0">
                      {/* Image Section */}
                      <div className="h-64 bg-gradient-to-br from-cyber-blue/20 via-cyber-purple/20 to-cyber-green/20 relative overflow-hidden">
                        <div className="absolute inset-0 cyber-grid-bg opacity-50" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl font-bold text-cyber-blue/50">
                            {project.category}
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Avatar overlay */}
                        <div className="absolute bottom-4 right-4">
                          <Avatar
                            src={project.avatar}
                            alt="Creator"
                            size="md"
                            variant="circle"
                            glow
                            animated
                          />
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-cyber-blue font-semibold px-3 py-1 glass rounded-full">
                            {project.category}
                          </span>
                          <span className="text-xs text-foreground/40">FEATURED</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                        <p className="text-foreground/60 mb-4 text-sm leading-relaxed">{project.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 text-xs glass rounded-md border border-cyber-blue/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" asChild>
                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              View
                            </a>
                          </Button>
                          <Button variant="ghost" size="sm" asChild>
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="w-4 h-4 mr-2" />
                              Code
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </HoverCard>
                ))}
              </div>
            )}

            {/* Regular Projects - Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularProjects.map((project) => (
                <HoverCard
                  key={project.id}
                  className="project-card glass-strong rounded-xl overflow-hidden border border-cyber-blue/30 group"
                  glowColor="#00f0ff"
                >
                  {/* Project Image */}
                  <div className="h-48 bg-gradient-to-br from-cyber-blue/20 to-cyber-purple/20 relative overflow-hidden">
                    <div className="absolute inset-0 cyber-grid-bg opacity-50" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-cyber-blue/50">
                        {project.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-cyber-blue/0 group-hover:bg-cyber-blue/10 transition-colors" />
                    
                    {/* Avatar in corner */}
                    <div className="absolute top-3 right-3">
                      <Avatar
                        src={project.avatar}
                        alt="Creator"
                        size="sm"
                        variant="circle"
                        className="border-cyber-purple/30"
                      />
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-cyber-blue font-semibold">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-foreground/60 mb-4 text-sm">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs glass rounded-md border border-cyber-blue/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View
                        </a>
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    </div>
                  </div>
                </HoverCard>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-xl text-foreground/60">No projects found in this category.</p>
        </motion.div>
      )}
    </div>
  )
}