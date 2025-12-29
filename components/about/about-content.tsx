'use client'

import { motion } from 'framer-motion'
import { Brain, Code, Atom, Sparkles, Award, Target, Lightbulb } from 'lucide-react'
import { GradientText } from '@/components/ui/gradient-text'
import { Avatar } from '@/components/ui/avatar'
import Image from 'next/image'

const timeline = [
  {
    year: '2014',
    title: 'Started Journey',
    description: 'Began exploring programming and AI/ML fundamentals',
    avatar: '/avatars/IMG_9781.PNG',
  },
  {
    year: '2018',
    title: 'Full-Stack Development',
    description: 'Started working as a full-stack developer on various industrial projects',
    avatar: '/avatars/IMG_9783.PNG',
  },
  {
    year: '2020',
    title: 'AI/ML Specialization',
    description: 'Deep dive into machine learning, neural networks, and AI systems',
    avatar: '/avatars/IMG_9784.PNG',
  },
  {
    year: '2022',
    title: 'LLM Engineering',
    description: 'Specialized in large language models and production AI systems',
    avatar: '/avatars/IMG_9787.PNG',
  },
  {
    year: '2024',
    title: 'Quantum Computing',
    description: 'Current focus on quantum computing research and applications',
    avatar: '/avatars/IMG_9788.PNG',
  },
]

const philosophy = [
  {
    icon: Target,
    title: 'Problem-Solving First',
    description: 'Every solution starts with understanding the core problem',
    avatar: '/avatars/IMG_9789.PNG',
  },
  {
    icon: Lightbulb,
    title: 'Innovation Driven',
    description: 'Constantly exploring cutting-edge technologies and methodologies',
    avatar: '/avatars/IMG_9792.PNG',
  },
  {
    icon: Award,
    title: 'Quality Focused',
    description: 'Production-ready code and world-class design standards',
    avatar: '/avatars/IMG_9793.PNG',
  },
]

const expertiseItems = [
  {
    icon: Brain,
    title: 'AI/ML Engineering',
    description: 'Extensive experience in machine learning, deep learning, neural networks, and AI system architecture. Built numerous prediction and detection systems.',
    color: 'text-cyber-blue',
    avatar: '/avatars/IMG_9795.PNG',
  },
  {
    icon: Code,
    title: 'LLM Engineering',
    description: 'Specialized in large language models, fine-tuning, prompt engineering, and deploying production-ready LLM applications.',
    color: 'text-cyber-purple',
    avatar: '/avatars/IMG_9796.PNG',
  },
  {
    icon: Atom,
    title: 'Quantum Computing',
    description: 'Passionate researcher studying quantum algorithms, quantum machine learning, and building quantum simulations.',
    color: 'text-cyber-green',
    avatar: '/avatars/IMG_9781.PNG',
  },
  {
    icon: Sparkles,
    title: 'Full-Stack Development',
    description: 'End-to-end development expertise from frontend to backend, working with modern frameworks and technologies.',
    color: 'text-cyber-gold',
    avatar: '/avatars/IMG_9783.PNG',
  },
]

// Avatar grid for hero section
const avatarGrid = [
  '/avatars/IMG_9796.PNG',
  '/avatars/IMG_9781.PNG',
  '/avatars/IMG_9783.PNG',
  '/avatars/IMG_9784.PNG',
  '/avatars/IMG_9787.PNG',
  '/avatars/IMG_9788.PNG',
]

export function AboutContent() {
  return (
    <div className="container mx-auto px-4 py-20">
      {/* Hero Section with Avatar Grid */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <h1 className="text-5xl md:text-6xl lg:text-8xl font-heading font-bold mb-6">
          <span className="text-white">About</span>{' '}
          <GradientText 
            gradientColors={['#00f0ff', '#5b8def', '#8b5cf6', '#a855f7', '#ec4899']}
            duration={4}
            direction="right"
            ease="easeInOut"
          >
            Me
          </GradientText>
        </h1>
        
        {/* Avatar Grid */}
        <motion.div
          className="flex justify-center items-center gap-3 mb-8 flex-wrap"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {avatarGrid.map((avatar, index) => (
            <motion.div
              key={avatar}
              initial={{ opacity: 0, y: 20, rotate: -180 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1, type: 'spring' }}
              whileHover={{ scale: 1.2, rotate: 10, zIndex: 10 }}
            >
              <Avatar
                src={avatar}
                alt="Avatar"
                size="md"
                variant="circle"
                glow
                animated
              />
            </motion.div>
          ))}
        </motion.div>

        <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto">
          A passionate AI/ML Engineer and Full-Stack Developer with a deep love for 
          innovation, quantum computing, and creating exceptional digital experiences
        </p>
      </motion.div>

      {/* Personal Story - Split Layout */}
      <section className="mb-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-strong rounded-2xl p-8 md:p-12 border border-cyber-blue/30"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-cyber-purple">
              My Story
            </h2>
            <div className="space-y-4 text-foreground/80 text-base md:text-lg leading-relaxed">
              <p>
                I&apos;m <strong className="text-cyber-blue">Mehtab Aftabur Rosul</strong>, an AI/ML Engineer 
                and LLM Specialist with over a decade of experience in building production-ready systems. 
                My journey began with a fascination for mathematics, physics, and logic, which naturally 
                led me to programming and artificial intelligence.
              </p>
              <p>
                As a full-stack developer, I&apos;ve worked solo on numerous projects across various industries 
                including e-commerce, adtech, travel tech, automotive tech, and medical tech. Each project 
                has been a learning experience, pushing me to deliver world-class solutions.
              </p>
              <p>
                My core domain is <strong className="text-cyber-green">AI-ML</strong>, where I&apos;ve developed 
                prediction systems, detection systems, and worked extensively with Brain-Computer Interfaces 
                (BCI) combined with AI-ML. Currently, I&apos;m an <strong className="text-cyber-purple">LLM Engineer</strong>, 
                working on cutting-edge language model applications.
              </p>
              <p>
                Beyond my professional work, I&apos;m deeply fascinated by <strong className="text-cyber-gold">Quantum Computing</strong>. 
                I spend significant time studying, learning, and building simulations to understand this 
                revolutionary field better.
              </p>
            </div>
          </motion.div>

          {/* Avatar Photo on Right */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/20 via-cyber-purple/20 to-cyber-green/20 rounded-2xl blur-2xl -z-10" />
            <div className="absolute inset-0 border-2 border-cyber-blue/30 rounded-2xl" />
            <Image
              src="/images/mehtab images/mehtab2.PNG"
              alt="Mehtab Aftabur Rosul"
              fill
              className="object-cover object-center rounded-2xl"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-heading font-bold mb-12 text-center"
        >
          <span className="text-cyber-blue">Career</span>{' '}
          <span className="text-foreground">Timeline</span>
        </motion.h2>
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyber-blue via-cyber-purple to-cyber-green" />
          
          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative pl-20 md:pl-24"
              >
                {/* Timeline Dot with Avatar */}
                <div className="absolute left-6 md:left-10 top-2">
                  <div className="relative">
                    <div className="w-4 h-4 bg-cyber-blue rounded-full border-4 border-background cyber-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10" />
                    <Avatar
                      src={item.avatar}
                      alt={item.year}
                      size="md"
                      variant="circle"
                      glow
                      className="border-cyber-blue/50"
                    />
                  </div>
                </div>
                
                <div className="glass-strong rounded-xl p-6 border border-cyber-blue/30">
                  <div className="text-cyber-blue font-bold text-lg mb-2">{item.year}</div>
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-foreground/70">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Deep Dive */}
      <section className="mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-heading font-bold mb-12 text-center"
        >
          <span className="text-cyber-green">Core</span>{' '}
          <span className="text-foreground">Expertise</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {expertiseItems.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="glass-strong rounded-xl p-8 border border-cyber-blue/30 relative overflow-hidden group"
              >
                {/* Avatar as decorative element */}
                <div className="absolute -bottom-4 -right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Avatar
                    src={item.avatar}
                    alt={item.title}
                    size="xl"
                    variant="circle"
                    className="border-cyber-blue/20"
                  />
                </div>

                <div className="relative z-10">
                  <Icon className={`w-12 h-12 ${item.color} mb-4`} />
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-foreground/70 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Philosophy */}
      <section>
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-heading font-bold mb-12 text-center"
        >
          <span className="text-cyber-gold">Philosophy</span>{' '}
          <span className="text-foreground">& Approach</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {philosophy.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-strong rounded-xl p-6 border border-cyber-blue/30 text-center relative overflow-hidden group"
              >
                {/* Avatar in background */}
                <div className="absolute top-2 right-2 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Avatar
                    src={item.avatar}
                    alt={item.title}
                    size="lg"
                    variant="circle"
                  />
                </div>

                <div className="relative z-10">
                  <Icon className="w-10 h-10 text-cyber-gold mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-foreground/70 text-sm">{item.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
