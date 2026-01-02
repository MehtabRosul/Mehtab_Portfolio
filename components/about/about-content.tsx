'use client'

import { motion } from 'framer-motion'
import { 
  Gamepad2, 
  Film,
  Globe,
  Code,
  Brain,
  GraduationCap,
  Sparkles,
  Calendar,
  Phone,
  MapPin
} from 'lucide-react'
import { BentoCard } from '@/components/ui/bento-card'

// Data definitions
const interests = [
  { icon: Gamepad2, label: 'Gaming', color: '#00f0ff' },
  { icon: Film, label: 'Film Making', color: '#8b5cf6' },
  { icon: Globe, label: 'Traveling', color: '#00ff88' },
]

const experiences = [
  {
    title: 'Freelancer',
    role: 'Logo/Brand Designer',
    period: '2021 - now',
    description: [
      'Worked on diverse logo and brand identity projects.',
      'Collaborated with clients from multiple countries.',
      'Developed a versatile design skill set.',
      'Adapted to unique challenges and requirements.',
    ],
    color: '#111827',
  },
  {
    title: 'Meetzed',
    role: 'Graphic Designer',
    period: '2020 - 2021',
    description: [
      'Collaboration: Supported Lead Designer on projects.',
      'Branding: Crafted unique brand identities.',
      'Tools: Used Illustrator, Photoshop & InDesign.',
    ],
    color: '#111827',
  },
]

const designTools = [
  { name: 'Ai', color: '#FF9A00' },
  { name: 'Ps', color: '#31A8FF' },
  { name: 'Id', color: '#FF3366' },
  { name: 'Xd', color: '#FF61F6' },
]

const editingTools = [
  { name: 'Ae', color: '#9B51FF' },
  { name: 'Pr', color: '#E64A19' },
  { name: 'Resolve', color: '#00A3A3' },
]

const languages = [
  { name: 'Hindi', flag: '🇮🇳', color: '#00f0ff' },
  { name: 'English', flag: '🇬🇧', color: '#8b5cf6' },
  { name: 'English (US)', flag: '🇺🇸', color: '#00ff88' },
]

const education = [
  { title: 'High School', field: 'Humanities', location: 'Delhi Cantonment, India', year: '2017', color: '#111827' },
  { title: 'Diploma', field: 'Animation and Graphic Design', location: 'Delhi, India', year: '2017-18', color: '#111827' },
  { title: 'Graduation', field: 'Bachelor of fine Arts - IGNOU Delhi, India', location: '', year: '2017-21', color: '#111827' },
]

const portfolioLinks = [
  { label: 'Bento', href: '#', color: '#111827' },
  { label: 'Behance', href: '#', color: '#1769FF' },
  { label: 'Instagram', href: '#', color: '#E1306C' },
  { label: 'YouTube', href: '#', color: '#FF0000' },
  { label: 'Dribbble', href: '#', color: '#EA4C89' },
]

const details = [
  { icon: Calendar, label: '26 years', color: '#111827' },
  { icon: Globe, label: 'iamsunilfreelancer.com', color: '#111827' },
  { icon: Phone, label: '+91 9899052055', color: '#111827' },
  { icon: MapPin, label: 'India', color: '#111827' },
]

export function AboutContent() {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
          
          <BentoCard
            span={1}
            glowColor="#111827"
            delay={0.1}
            className="md:col-span-1 p-4 sm:p-6 bg-[#1b1b1b] min-h-[200px] flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, type: 'spring' }}
              className="w-full h-full flex items-center justify-center"
            >
              <img
                src="/avatars/IMG_9783.PNG"
                alt="Sunil Kumar"
                width="300"
                height="300"
                className="rounded-2xl"
                style={{ objectFit: 'contain' }}
              />
            </motion.div>
          </BentoCard>

          <div className="md:col-span-1 space-y-4 sm:space-y-6">
            <BentoCard span={1} glowColor="#111827" delay={0.2} className="p-4 sm:p-6 bg-[#1b1b1b]">
              <div className="h-full flex items-center min-h-[200px] sm:min-h-[240px]">
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground/90 leading-relaxed">
                  My name is <span className="font-semibold">Sunil Kumar</span> self-taught logo/brand
                  designer with 4+ years of experience creating modern, clean, and minimal brands that make
                  a lasting impression.
                </p>
              </div>
            </BentoCard>

            <BentoCard span={1} glowColor="#111827" delay={0.3} className="p-4 sm:p-6 bg-[#1b1b1b]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <h3 className="text-lg sm:text-xl font-bold text-cyber-purple whitespace-nowrap">Interests</h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {interests.map((interest) => {
                    const Icon = interest.icon
                    return (
                      <button
                        key={interest.label}
                        className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-neutral-800 border border-neutral-700"
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: interest.color }} />
                        <span className="text-xs sm:text-sm font-medium">{interest.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </BentoCard>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
          <div className="space-y-4 sm:space-y-6">
            <BentoCard span={1} glowColor="#111827" delay={0.4} className="p-4 sm:p-6 bg-[#1b1b1b]">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-1">Freelancer</h3>
                  <p className="text-sm text-foreground/70 mb-2">Logo/Brand Designer</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium glass border whitespace-nowrap">2021 - now</span>
              </div>
              <ul className="space-y-2">
                {experiences[0].description.map((item, i) => (
                  <li key={i} className="text-xs sm:text-sm text-foreground/70 flex items-start gap-2">
                    <span className="text-foreground mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </BentoCard>

            <BentoCard span={1} glowColor="#111827" delay={0.5} className="p-4 sm:p-6 bg-[#1b1b1b]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <h3 className="text-base sm:text-lg font-bold text-cyber-blue whitespace-nowrap flex items-center gap-2">
                  <Brain className="w-4 h-4 sm:w-5 sm:h-5" />
                  Design Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {designTools.map((tool, index) => (
                    <span
                      key={tool.name}
                      className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-neutral-800 border border-neutral-700"
                      style={{ color: tool.color }}
                    >
                      {tool.name}
                    </span>
                  ))}
                </div>
              </div>
            </BentoCard>

            <BentoCard span={1} glowColor="#111827" delay={0.6} className="p-4 sm:p-6 bg-[#1b1b1b]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <h3 className="text-base sm:text-lg font-bold text-cyber-purple whitespace-nowrap flex items-center gap-2">
                  <Code className="w-4 h-4 sm:w-5 sm:h-5" />
                  Editing Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {editingTools.map((tool, index) => (
                    <span
                      key={tool.name}
                      className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-neutral-800 border border-neutral-700"
                      style={{ color: tool.color }}
                    >
                      {tool.name}
                    </span>
                  ))}
                </div>
              </div>
            </BentoCard>

            <BentoCard span={1} glowColor="#111827" delay={0.7} className="p-4 sm:p-6 bg-[#1b1b1b] min-h-[175px]">
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 h-full">
                <h3 className="text-base sm:text-lg my-auto font-bold text-cyber-green whitespace-nowrap">Languages</h3>
                <div className="flex flex-wrap gap-3">
                  {languages.map((lang, index) => (
                    <div
                      key={lang.name}
                      className="flex items-center gap-2"
                    >
                      <span className="text-xl sm:text-2xl">{lang.flag}</span>
                      <span className="text-xs sm:text-sm font--medium">{lang.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </BentoCard>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <BentoCard span={1} glowColor="#111827" delay={0.4} className="p-4 sm:p-6 bg-[#1b1b1b]">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-1">Meetzed</h3>
                  <p className="text-sm text-foreground/70 mb-2">Graphic Designer</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium glass border whitespace-nowrap">2020 - 2021</span>
              </div>
              <ul className="space-y-2">
                {experiences[1].description.map((item, i) => (
                  <li key={i} className="text-xs sm:text-sm text-foreground/70 flex items-start gap-2">
                    <span className="text-foreground mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </BentoCard>

            <BentoCard span={1} glowColor="#111827" delay={0.5} className="p-4 sm:p-6 bg-[#1b1b1b]">
              <h3 className="text-base sm:text-lg font-bold mb-4 text-cyber-purple flex items-center gap-2">
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
                Education
              </h3>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div
                    key={edu.title}
                    className="flex items-start justify-between p-3 sm:p-4 bg-neutral-800 rounded-xl border border-neutral-700"
                  >
                    <div>
                      <h4 className="font-bold text-sm sm:text-base mb-1">{edu.title}</h4>
                      <p className="text-xs sm:text-sm text-foreground/70">{edu.field}</p>
                      <p className="text-xs text-foreground/50 mt-1">{edu.location}</p>
                    </div>
                    <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium glass border whitespace-nowrap">{edu.year}</span>
                  </div>
                ))}
              </div>
            </BentoCard>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <BentoCard span={1} glowColor="#111827" delay={0.8} className="md:col-span-1 p-4 sm:p-6 bg-[#1b1b1b]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <h3 className="text-base sm:text-lg font-bold text-cyber-blue whitespace-nowrap flex items-center gap-2">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                Portfolio
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {portfolioLinks.map((link, index) => {
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center px-3 h-10 sm:h-10 rounded-lg bg-neutral-800 border border-neutral-700 text-xs font-medium"
                      style={{ color: link.color }}
                      title={link.label}
                    >
                      {link.label}
                    </a>
                  )
                })}
              </div>
            </div>
          </BentoCard>

          <BentoCard span={1} glowColor="#111827" delay={0.9} className="md:col-span-1 p-4 sm:p-6 bg-[#1b1b1b]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <h3 className="text-base sm:text-lg font-bold text-cyber-green whitespace-nowrap">Details</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {details.map((detail, index) => {
                  const Icon = detail.icon
                  return (
                    <div
                      key={detail.label}
                      className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-neutral-800 border border-neutral-700"
                    >
                      <Icon className="w-4 h-4" style={{ color: detail.color }} />
                      <span className="text-xs sm:text-sm font-medium">{detail.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </BentoCard>
        </div>
      </div>
    </div>
  )
}
