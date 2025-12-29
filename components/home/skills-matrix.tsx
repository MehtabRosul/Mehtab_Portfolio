'use client'

import { useState, useRef, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import { GradientText } from '@/components/ui/gradient-text'
import { SkillTypography } from '@/components/ui/skill-typography'
import { TopographicBackground } from '@/components/ui/topographic-background'
import { MolecularConnections } from '@/components/ui/molecular-connections'
import { ScrollReveal } from '@/components/animations/scroll-reveal'

interface SkillCategory {
  id: string
  title: string
  proficiency: number
  colorScheme: string[]
  skills: string[]
  description: string
  terminalCommand: string
    position: { row: number; col: number }
    bonds: string[] // Connected category IDs
}

const skillCategories: SkillCategory[] = [
  {
    id: 'ai-ml',
    title: 'AI/ML',
    proficiency: 95,
    colorScheme: ['#00ff88', '#00d4aa', '#7fffd4'],
    skills: [
      'TensorFlow',
      'Keras',
      'scikit-learn',
      'Pandas',
      'NumPy',
      'OpenCV',
      'LangChain',
      'spaCy',
      'Hugging Face',
      'NLP',
      'Computer Vision',
    ],
    description: 'Deep expertise in designing, training, and deploying intelligent systems',
    terminalCommand: 'python train_model.py --framework tensorflow --accuracy 95%',
    position: { row: 0, col: 0 },
    bonds: ['languages', 'backend'],
  },
  {
    id: 'languages',
    title: 'Languages',
    proficiency: 90,
    colorScheme: ['#00f0ff', '#0066ff', '#4c00ff'],
    skills: ['Python (Expert)', 'Java', 'C++', 'C', 'JavaScript', 'SQL', 'HTML/CSS'],
    description: 'Expert-level proficiency across multiple programming paradigms',
    terminalCommand: 'python --version && node --version && java -version',
    position: { row: 0, col: 1 },
    bonds: ['ai-ml', 'frontend', 'backend'],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    proficiency: 92,
    colorScheme: ['#8b5cf6', '#a855f7', '#c084fc'],
    skills: ['React.JS', 'Next.js', 'Three.JS', 'UI/UX Design'],
    description: 'Building modern, interactive user interfaces and experiences',
    terminalCommand: 'npm run dev --framework nextjs --port 3000',
    position: { row: 1, col: 0 },
    bonds: ['languages', 'backend'],
  },
  {
    id: 'backend',
    title: 'Backend',
    proficiency: 88,
    colorScheme: ['#00d9ff', '#0099ff', '#5b9aff'],
    skills: ['Node.js', 'FastAPI', 'Django', 'PostgreSQL', 'MongoDB'],
    description: 'Scalable server-side architectures and database systems',
    terminalCommand: 'uvicorn api:app --reload --host 0.0.0.0',
    position: { row: 1, col: 1 },
    bonds: ['languages', 'frontend', 'devops'],
  },
  {
    id: 'devops',
    title: 'DevOps',
    proficiency: 85,
    colorScheme: ['#ec4899', '#f472b6', '#f9a8d4'],
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Git', 'Infrastructure as Code'],
    description: 'Automation, infrastructure, and deployment pipelines',
    terminalCommand: 'kubectl apply -f deployment.yaml && docker-compose up',
    position: { row: 2, col: 0 },
    bonds: ['backend', 'quantum'],
  },
  {
    id: 'quantum',
    title: 'Quantum',
    proficiency: 75,
    colorScheme: ['#4f46e5', '#6366f1', '#818cf8'],
    skills: ['Qiskit', 'Quantum Algorithms', 'Simulation'],
    description: 'Exploring quantum computation as a future computational paradigm',
    terminalCommand: 'qiskit execute --circuit quantum_circuit --shots 1024',
    position: { row: 2, col: 1 },
    bonds: ['devops', 'ai-ml'],
  },
]

export function SkillsMatrix() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  // Calculate molecular connections with grid-based positions
  const connections = useMemo(() => {
    const conns: Array<{
      from: { x: number; y: number; id: string }
      to: { x: number; y: number; id: string }
      color: string
      strength: number
    }> = []

    // Convert grid positions to percentages for connections
    const getPositionPercent = (row: number, col: number) => {
      // Grid: 2 columns, 3 rows
      // Each cell: ~50% width, ~33% height
      const x = col === 0 ? 5 : 52 // Left: 5%, Right: 52%
      const y = row === 0 ? 10 : row === 1 ? 40 : 70 // Top: 10%, Middle: 40%, Bottom: 70%
      return { x, y }
    }

    skillCategories.forEach((category) => {
      category.bonds.forEach((bondId) => {
        const targetCategory = skillCategories.find((c) => c.id === bondId)
        if (targetCategory) {
          // Avoid duplicate connections
          const exists = conns.some(
            (c) =>
              (c.from.id === category.id && c.to.id === targetCategory.id) ||
              (c.from.id === targetCategory.id && c.to.id === category.id)
          )

          if (!exists) {
            const fromPos = getPositionPercent(category.position.row, category.position.col)
            const toPos = getPositionPercent(targetCategory.position.row, targetCategory.position.col)
            
            conns.push({
              from: {
                x: fromPos.x,
                y: fromPos.y,
                id: category.id,
              },
              to: {
                x: toPos.x,
                y: toPos.y,
                id: targetCategory.id,
              },
              color: category.colorScheme[0],
              strength: 1,
            })
          }
        }
      })
    })

    return conns
  }, [])

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-20 md:py-32 min-h-screen overflow-hidden"
    >
      {/* Background Layers */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 cyber-grid-bg opacity-10" />
        
        {/* Animated gradient mesh */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, rgba(0, 255, 136, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 30%, rgba(0, 255, 136, 0.1) 0%, transparent 50%)',
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
        <ScrollReveal className="text-center mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-black mb-4">
              <GradientText
                gradientColors={['#00ff88', '#00f0ff', '#8b5cf6', '#ec4899', '#00ff88']}
                duration={5}
                direction="left"
                ease="linear"
                className="inline-block"
              >
                Technical
              </GradientText>{' '}
              <span className="text-white">Expertise</span>
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              A comprehensive skill set spanning AI, full-stack development, and emerging technologies
            </p>
          </motion.div>
        </ScrollReveal>

        {/* Skills Display - Perfect Grid Layout - Centered */}
        <div 
          className="relative min-h-[600px] md:min-h-[900px] flex items-center justify-center"
          style={{ willChange: 'contents' }}
        >
          {/* Topographic Backgrounds for each category - Lazy loaded, Desktop only */}
          {isInView && (
            <div className="hidden md:block absolute inset-0">
              {skillCategories.map((category) => {
                // Convert grid position to percentage
                const x = category.position.col === 0 ? 5 : 52
                const y = category.position.row === 0 ? 10 : category.position.row === 1 ? 40 : 70
                return (
                  <TopographicBackground
                    key={`bg-${category.id}`}
                    proficiency={category.proficiency}
                    colorScheme={category.colorScheme}
                    isActive={hoveredCategory === category.id}
                    position={{ x, y }}
                  />
                )
              })}
            </div>
          )}


          {/* Skill Typography Components - Perfect Grid Layout */}
          {/* Mobile: Stacked with Borders */}
          <div className="block md:hidden space-y-8 max-w-2xl mx-auto">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.id}
                className="p-10 rounded-xl border-[3px] transition-all duration-300 overflow-hidden"
                style={{
                  borderColor: hoveredCategory === category.id 
                    ? `${category.colorScheme[0]}` 
                    : `${category.colorScheme[0]}60`,
                  borderWidth: '3px',
                  background: hoveredCategory === category.id
                    ? `linear-gradient(135deg, ${category.colorScheme[0]}15, ${category.colorScheme[1]}10, ${category.colorScheme[0]}08)`
                    : `linear-gradient(135deg, ${category.colorScheme[0]}10, ${category.colorScheme[1]}06, ${category.colorScheme[0]}04)`,
                  boxShadow: hoveredCategory === category.id
                    ? `0 16px 48px ${category.colorScheme[0]}40, 0 8px 24px ${category.colorScheme[0]}25, 0 0 0 2px ${category.colorScheme[0]}50, inset 0 1px 0 ${category.colorScheme[0]}20`
                    : `0 8px 24px ${category.colorScheme[0]}20, 0 4px 12px ${category.colorScheme[0]}15, 0 0 0 1px ${category.colorScheme[0]}30, inset 0 1px 0 ${category.colorScheme[0]}10`,
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{
                  borderColor: `${category.colorScheme[0]}`,
                  boxShadow: `0 20px 60px ${category.colorScheme[0]}50, 0 12px 36px ${category.colorScheme[0]}35, 0 0 0 3px ${category.colorScheme[0]}70, inset 0 2px 4px ${category.colorScheme[0]}25`,
                  scale: 1.03,
                  y: -4,
                }}
              >
                <SkillTypography
                  title={category.title}
                  proficiency={category.proficiency}
                  skills={category.skills}
                  colorScheme={category.colorScheme}
                  description={category.description}
                  terminalCommand={category.terminalCommand}
                  position={undefined}
                  index={index}
                  onHover={(isHovered) => {
                    setHoveredCategory(isHovered ? category.id : null)
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Desktop: Perfect 2x3 Grid - Centered */}
          <div className="hidden md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:gap-x-12 lg:gap-y-16 md:auto-rows-fr max-w-6xl mx-auto">
            {skillCategories.map((category, index) => {
              // Map grid position to grid placement
              const gridRow = category.position.row + 1
              const gridCol = category.position.col + 1
              
              return (
                <motion.div
                  key={category.id}
                  className="relative p-10 lg:p-12 rounded-xl border-[3px] transition-all duration-300 overflow-hidden"
                  style={{
                    gridRow,
                    gridColumn: gridCol,
                    zIndex: 10, // Above the animated lines
                    borderColor: hoveredCategory === category.id 
                      ? `${category.colorScheme[0]}` 
                      : `${category.colorScheme[0]}60`,
                    borderWidth: '3px',
                    background: hoveredCategory === category.id
                      ? `linear-gradient(135deg, ${category.colorScheme[0]}15, ${category.colorScheme[1]}10, ${category.colorScheme[0]}08)`
                      : `linear-gradient(135deg, ${category.colorScheme[0]}10, ${category.colorScheme[1]}06, ${category.colorScheme[0]}04)`,
                    boxShadow: hoveredCategory === category.id
                      ? `0 16px 48px ${category.colorScheme[0]}40, 0 8px 24px ${category.colorScheme[0]}25, 0 0 0 2px ${category.colorScheme[0]}50, inset 0 1px 0 ${category.colorScheme[0]}20`
                      : `0 8px 24px ${category.colorScheme[0]}20, 0 4px 12px ${category.colorScheme[0]}15, 0 0 0 1px ${category.colorScheme[0]}30, inset 0 1px 0 ${category.colorScheme[0]}10`,
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{
                    borderColor: `${category.colorScheme[0]}`,
                    boxShadow: `0 20px 60px ${category.colorScheme[0]}50, 0 12px 36px ${category.colorScheme[0]}35, 0 0 0 3px ${category.colorScheme[0]}70, inset 0 2px 4px ${category.colorScheme[0]}25`,
                    scale: 1.03,
                    y: -4,
                  }}
                >
                  <SkillTypography
                    title={category.title}
                    proficiency={category.proficiency}
                    skills={category.skills}
                    colorScheme={category.colorScheme}
                    description={category.description}
                    terminalCommand={category.terminalCommand}
                    position={undefined}
                    index={index}
                    onHover={(isHovered) => {
                      setHoveredCategory(isHovered ? category.id : null)
                    }}
                  />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
