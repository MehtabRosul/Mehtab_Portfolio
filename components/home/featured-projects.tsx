'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ScrollReveal } from '@/components/animations/scroll-reveal'
import { GradientText } from '@/components/ui/gradient-text'
import { AnimatedProjectCard } from '@/components/ui/animated-project-card'
import { ProjectCounter } from '@/components/ui/project-counter'
import { useRef } from 'react'

interface Project {
  id: number
  slug: string
  title: string
  category: string
  description: string
  tech: string[]
  image: string
  link?: string
  github?: string
  featured?: boolean
  avatar: string
  colorScheme: string[]
  metrics?: {
    accuracy?: number
    users?: number
    performance?: number
  }
  longDescription?: string
  features?: string[]
  screenshots?: string[]
  year?: number
  status?: 'Active' | 'Completed' | 'Archived'
}

const featuredProjects: Project[] = [
  {
    id: 1,
    slug: 'ml-prediction-system',
    title: 'ML Prediction System',
    category: 'AI/ML',
    description: 'Advanced machine learning system for predictive analytics with high accuracy and real-time processing capabilities',
    tech: ['Python', 'TensorFlow', 'React', 'Node.js'],
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop&auto=format',
    link: '#',
    github: '#',
    featured: true,
    avatar: '/avatars/IMG_9787.PNG',
    colorScheme: ['#00f0ff', '#0066ff', '#4c00ff'],
    metrics: {
      accuracy: 95,
      users: 10000,
      performance: 98,
    },
    longDescription: 'A sophisticated machine learning system designed for predictive analytics with exceptional accuracy and real-time processing capabilities.',
    features: [
      'Real-time prediction processing',
      'High accuracy models',
      'Scalable architecture',
      'Interactive dashboard',
    ],
    screenshots: ['/images/project1.jpg'],
    year: 2024,
    status: 'Active',
  },
  {
    id: 2,
    slug: 'bci-ai-ml',
    title: 'BCI with AI-ML',
    category: 'Brain-Computer Interface',
    description: 'Revolutionary brain-computer interface using AI and ML for neural signal processing and interpretation',
    tech: ['Python', 'PyTorch', 'React', 'EEG'],
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop&auto=format',
    link: '#',
    github: '#',
    featured: false,
    avatar: '/avatars/IMG_9788.PNG',
    colorScheme: ['#00ff88', '#00d4aa', '#7fffd4'],
    metrics: {
      accuracy: 92,
      users: 5000,
      performance: 94,
    },
    longDescription: 'A cutting-edge brain-computer interface system that leverages AI and machine learning for advanced neural signal processing.',
    features: [
      'Neural signal processing',
      'Real-time EEG analysis',
      'ML-based pattern recognition',
      'Interactive visualization',
    ],
    screenshots: ['/images/project2.jpg'],
    year: 2024,
    status: 'Active',
  },
  {
    id: 3,
    slug: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description: 'Full-stack e-commerce solution with modern architecture, seamless payment integration, and exceptional user experience',
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&auto=format',
    link: '#',
    github: '#',
    featured: false,
    avatar: '/avatars/IMG_9789.PNG',
    colorScheme: ['#8b5cf6', '#a855f7', '#c084fc'],
    metrics: {
      users: 25000,
      performance: 96,
    },
    longDescription: 'A comprehensive e-commerce platform built with modern web technologies, featuring seamless payment processing and intuitive user interface.',
    features: [
      'Secure payment processing',
      'Real-time inventory management',
      'Advanced search and filtering',
      'Responsive design',
    ],
    screenshots: ['/images/project3.jpg'],
    year: 2023,
    status: 'Completed',
  },
  {
    id: 4,
    slug: 'quantum-computing-simulator',
    title: 'Quantum Computing Simulator',
    category: 'Quantum Computing',
    description: 'Advanced quantum computing simulator with visualization tools and algorithm testing capabilities',
    tech: ['Python', 'Qiskit', 'React', 'WebGL'],
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop&auto=format',
    link: '#',
    github: '#',
    featured: false,
    avatar: '/avatars/IMG_9792.PNG',
    colorScheme: ['#FFD700', '#FFC300', '#FFB700'],
    metrics: {
      accuracy: 99,
      users: 3000,
      performance: 97,
    },
    longDescription: 'An innovative quantum computing simulator that enables researchers and developers to test quantum algorithms with high fidelity.',
    features: [
      'Quantum circuit visualization',
      'Algorithm testing framework',
      'High-performance simulation',
      'Interactive quantum gates',
    ],
    screenshots: ['/images/project4.jpg'],
    year: 2024,
    status: 'Active',
  },
]

export function FeaturedProjects() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section id="featured-projects" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-blue/5 to-transparent pointer-events-none" />
      <div className="absolute inset-0 cyber-grid-bg opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <ScrollReveal className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-black mb-4">
              <GradientText
                gradientColors={['#7928CA', '#FF0080', '#00BFFF', '#7928CA']}
                duration={4}
                direction="right"
                ease="linear"
                className="inline-block"
              >
                Featured
              </GradientText>{' '}
              <span className="text-white">Projects</span>
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              Showcasing innovative solutions across AI, web, quantum computing, and emerging technologies
            </p>
          </motion.div>

          {/* Animated Metrics */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 md:gap-12 mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <ProjectCounter
              value={4}
              suffix=""
              gradientColors={['#00f0ff', '#0066ff']}
              label="Featured"
            />
            <ProjectCounter
              value={50}
              suffix="+"
              gradientColors={['#8b5cf6', '#a855f7']}
              label="Total Projects"
            />
            <ProjectCounter
              value={95}
              suffix="%"
              gradientColors={['#00ff88', '#00d4aa']}
              label="Avg. Performance"
            />
          </motion.div>
        </ScrollReveal>

        {/* Projects Grid - Uniform Layout */}
        <div ref={containerRef} className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredProjects.map((project, index) => (
              <AnimatedProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <ScrollReveal delay={0.5} className="text-center mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/projects">
              <Button
                size="lg"
                className="group relative overflow-hidden px-8 py-6 text-base font-semibold"
                style={{
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(168, 85, 247, 0.2))',
                  border: '1px solid rgba(139, 92, 246, 0.5)',
                  color: '#ffffff',
                }}
              >
                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
                  }}
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: 'linear',
                  }}
                />

                <span className="relative z-10 flex items-center gap-2">
                  View All Projects
                  <motion.div
                    animate={{
                      x: [0, 4, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                </span>

                {/* Glow Effect */}
                <motion.div
                  className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.6), transparent 70%)',
                  }}
                />
              </Button>
            </Link>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  )
}
