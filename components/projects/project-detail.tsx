'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, Users, TrendingUp, CheckCircle, Calendar, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GradientText } from '@/components/ui/gradient-text'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import Image from 'next/image'
import Link from 'next/link'

export function ProjectDetail({ project, relatedProjects }: { project: any; relatedProjects: any[] }) {
  if (!project) return null

  const metricItems = [
    {
      icon: CheckCircle,
      label: 'Accuracy',
      value: project.metrics?.accuracy,
      suffix: '%',
      color: '#00f0ff',
    },
    {
      icon: Users,
      label: 'Users',
      value: project.metrics?.users,
      suffix: '+',
      color: '#00ff88',
    },
    {
      icon: TrendingUp,
      label: 'Performance',
      value: project.metrics?.performance,
      suffix: '%',
      color: '#ec4899',
    },
  ].filter(item => item.value !== undefined);

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <header className="mb-12 text-center">
          <motion.div
            className="inline-block px-4 py-2 rounded-full mb-4"
            style={{
              background: `linear-gradient(135deg, ${project.colorScheme[0]}33, ${project.colorScheme[1]}33)`,
              border: `1px solid ${project.colorScheme[0]}80`
            }}
          >
            <span className="font-semibold" style={{ color: project.colorScheme[0] }}>{project.category}</span>
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold font-heading">
            <GradientText gradientColors={project.colorScheme} duration={5}>
              {project.title}
            </GradientText>
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 mt-4 max-w-3xl mx-auto">{project.description}</p>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Left/Main column */}
          <div className="lg:col-span-2">
            {/* Project Image */}
            <motion.div className="mb-8 rounded-xl overflow-hidden shadow-2xl"
              style={{ boxShadow: `0 0 40px -10px ${project.colorScheme[1]}40` }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={project.image}
                alt={project.title}
                width={1200}
                height={675}
                className="w-full h-auto"
              />
            </motion.div>

            {/* Long Description */}
            <div className="prose prose-invert prose-lg max-w-none mb-8 text-foreground/80">
              <p>{project.longDescription}</p>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4 flex items-center">
                <GradientText gradientColors={project.colorScheme} className="mr-2">Features</GradientText>
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.features.map((feature: string, index: number) => (
                  <motion.li
                    key={index}
                    className="flex items-start p-4 rounded-lg"
                    style={{ background: 'rgba(255,255,255,0.03)'}}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <CheckCircle className="w-5 h-5 mr-3 mt-1 flex-shrink-0" style={{ color: project.colorScheme[0] }} />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            {/* Screenshots */}
            {project.screenshots && project.screenshots.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-4">
                        <GradientText gradientColors={project.colorScheme}>Screenshots</GradientText>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {project.screenshots.map((ss: string, index: number) => (
                            <motion.div key={index} whileHover={{scale: 1.05}} className="rounded-lg overflow-hidden">
                                <Image src={ss} alt={`${project.title} screenshot ${index+1}`} width={800} height={450} className="w-full"/>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

          </div>

          {/* Right/Sidebar column */}
          <aside>
            <div className="sticky top-24 space-y-6">
              {/* Tech Stack */}
              <div className="p-6 rounded-xl glass-strong border border-white/10">
                <h3 className="text-xl font-bold mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech: string) => (
                    <span key={tech} className="px-3 py-1 text-sm rounded-full" style={{ background: `rgba(255,255,255,0.05)`, border: '1px solid rgba(255,255,255,0.1)'}}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Metrics */}
              {metricItems.length > 0 && (
                <div className="p-6 rounded-xl glass-strong border border-white/10">
                    <h3 className="text-xl font-bold mb-4">Metrics</h3>
                    <div className="space-y-4">
                        {metricItems.map(metric => (
                            <div key={metric.label} className="flex items-center">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3" style={{ background: `${metric.color}20`, border: `1px solid ${metric.color}80`}}>
                                    <metric.icon className="w-5 h-5" style={{ color: metric.color }} />
                                </div>
                                <div>
                                    <div className="text-sm text-foreground/70">{metric.label}</div>
                                    <div className="text-2xl font-bold">
                                        <AnimatedCounter value={metric.value} suffix={metric.suffix} duration={2000} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
              )}

              {/* Project Info */}
              <div className="p-6 rounded-xl glass-strong border border-white/10">
                <h3 className="text-xl font-bold mb-4">Project Info</h3>
                <ul className="space-y-3 text-foreground/80">
                  <li className="flex items-center"><Calendar className="w-4 h-4 mr-3" /> Year: {project.year}</li>
                  <li className="flex items-center"><Tag className="w-4 h-4 mr-3" /> Status: {project.status}</li>
                </ul>
              </div>

              {/* Links */}
              <div className="flex flex-col space-y-3">
                <Button size="lg" asChild className="w-full">
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-5 h-5 mr-2" /> Live Demo
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild className="w-full">
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5 mr-2" /> View Source
                  </a>
                </Button>
              </div>

            </div>
          </aside>
        </div>
        
        {/* Related Projects */}
        {relatedProjects && relatedProjects.length > 0 && (
          <div className="mt-24">
            <h2 className="text-3xl font-bold text-center mb-8">
              <GradientText gradientColors={['#e0e7ff', '#c7d2fe', '#a5b4fc']}>Related Projects</GradientText>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.map(rp => (
                <Link href={`/projects/${rp.slug}`} key={rp.id}>
                  <motion.div
                    className="p-6 rounded-xl glass-strong border border-white/10 h-full flex flex-col"
                    whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
                  >
                    <h3 className="text-xl font-bold mb-2" style={{ color: rp.colorScheme[0]}}>{rp.title}</h3>
                    <p className="text-foreground/70 text-sm mb-4 flex-grow">{rp.description}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {rp.tech.slice(0, 3).map((tech: string) => (
                        <span key={tech} className="px-2 py-1 text-xs rounded-full" style={{ background: `rgba(255,255,255,0.05)`, border: '1px solid rgba(255,255,255,0.1)'}}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
