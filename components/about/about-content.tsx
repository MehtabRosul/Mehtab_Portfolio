'use client'

import { motion } from 'framer-motion'
import { 
  Gamepad2, 
  BookOpen,
  Atom,
  Code,
  Github, 
  Linkedin, 
  Mail,
  Globe,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Brain,
  Sparkles,
  User
  , Camera, Film, Airplay
} from 'lucide-react'
import { Avatar } from '@/components/ui/avatar'
import { BentoCard } from '@/components/ui/bento-card'

// Interests data
const interests = [
  { icon: Gamepad2, label: 'Gaming', color: '#00f0ff' },
  { icon: Film, label: 'Film Making', color: '#8b5cf6' },
  { icon: Globe, label: 'Traveling', color: '#00ff88' },
]

// Experience data
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

// AI/ML Tools data

// Design Tools (matching screenshot badges - Ai, Ps, Id, Xd)
const designTools = [
  { name: 'Ai', color: '#FF9A00' },
  { name: 'Ps', color: '#31A8FF' },
  { name: 'Id', color: '#FF3366' },
  { name: 'Xd', color: '#FF61F6' },
]

// Editing Tools (After Effects, Premiere, DaVinci Resolve)
const editingTools = [
  { name: 'Ae', color: '#9B51FF' },
  { name: 'Pr', color: '#E64A19' },
  { name: 'Resolve', color: '#00A3A3' },
]

// Languages data (flags)
const languages = [
  { name: 'Hindi', flag: '��', color: '#00f0ff' },
  { name: 'English', flag: '🇬🇧', color: '#8b5cf6' },
  { name: 'English (US)', flag: '🇺🇸', color: '#00ff88' },
]

// Education data (matching screenshot placeholders)
const education = [
  { title: 'High School', field: 'Humanities', location: 'Delhi Cantonment, India', year: '2017', color: '#111827' },
  { title: 'Diploma', field: 'Animation and Graphic Design', location: 'Delhi, India', year: '2017-18', color: '#111827' },
  { title: 'Graduation', field: 'Bachelor of fine Arts - IGNOU Delhi, India', location: '', year: '2017-21', color: '#111827' },
]

// Portfolio links - use simple labels/icons to match screenshot (Bento, Behance, Instagram, Youtube, Dribbble)
const portfolioLinks = [
  { label: 'Bento', href: '#', color: '#111827' },
  { label: 'Behance', href: '#', color: '#1769FF' },
  { label: 'Instagram', href: '#', color: '#E1306C' },
  { label: 'YouTube', href: '#', color: '#FF0000' },
  { label: 'Dribbble', href: '#', color: '#EA4C89' },
]

// Details (matching screenshot)
const details = [
  { icon: Calendar, label: '26 years', color: '#111827' },
  { icon: Globe, label: 'iamsunilfreelancer.com', color: '#111827' },
  { icon: Phone, label: '+91 9899052055', color: '#111827' },
  { icon: MapPin, label: 'India', color: '#111827' },
]

export function AboutContent() {
  return (
    <div className="relative min-h-screen">
      {/* Solid dark background to match reference UI */}
      <div className="fixed inset-0 -z-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-7xl">
        {/* Top Section: Avatar + About Me + Interests */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
          {/* Avatar Card - Square, Left */}
          <BentoCard span={1} glowColor="#111827" delay={0.1} className="aspect-square p-4 sm:p-6 bg-white">
            <div className="flex items-center justify-center h-full">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, type: 'spring' }}
                className="relative w-full h-full"
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Avatar
                    src="/avatars/IMG_9783.PNG"
                    alt="Sunil Kumar"
                    size="xl"
                    variant="square"
                    glow
                    className="!w-full !h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </BentoCard>

          {/* About Me Card - Right */}
          <BentoCard span={1} glowColor="#111827" delay={0.2} className="p-4 sm:p-6 bg-[#1b1b1b]">
            <div className="h-full flex items-center min-h-[200px] sm:min-h-[240px]">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground/90 leading-relaxed"
              >
                My name is <span className="font-semibold">Sunil Kumar</span> self- taught logo/brand
                designer with 4+ years of experience creating modern, clean, and minimal brands that make
                a lasting impression.
              </motion.p>
            </div>
          </BentoCard>
        </div>

        {/* Interests Card - Below About Me */}
        <div className="mb-6">
          <BentoCard span={2} glowColor="#111827" delay={0.3} className="col-span-1 md:col-span-2 p-4 sm:p-6 bg-[#1b1b1b]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <h3 className="text-lg sm:text-xl font-bold text-cyber-purple whitespace-nowrap">Interests</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {interests.map((interest, index) => {
                  const Icon = interest.icon
                  return (
                    <motion.button
                      key={interest.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-neutral-800 border border-neutral-700"
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: interest.color }} />
                      <span className="text-xs sm:text-sm font-medium">{interest.label}</span>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </BentoCard>
        </div>

        {/* Middle Section: Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
          {/* Left Column */}
          <div className="space-y-4 sm:space-y-6">
            {/* Experience Card - Freelancer */}
            <BentoCard span={1} glowColor="#111827" delay={0.4} className="p-4 sm:p-6 bg-[#1b1b1b]">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-1">Freelancer</h3>
                  <p className="text-sm text-foreground/70 mb-2">Logo/Brand Designer</p>
                </div>
                <span
                  className="px-3 py-1 rounded-full text-xs font-medium glass border whitespace-nowrap"
                  style={{
                    borderColor: '#11182740',
                    color: '#ffffff',
                  }}
                >
                  2021 - now
                </span>
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

            {/* AI/ML Tools Card */}
            <BentoCard span={1} glowColor="#111827" delay={0.5} className="p-4 sm:p-6 bg-[#1b1b1b]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <h3 className="text-base sm:text-lg font-bold text-cyber-blue whitespace-nowrap flex items-center gap-2">
                  <Brain className="w-4 h-4 sm:w-5 sm:h-5" />
                  Design Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {designTools.map((tool, index) => (
                    <motion.span
                      key={tool.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                      className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-neutral-800 border border-neutral-700"
                      style={{ color: tool.color }}
                    >
                      {tool.name}
                    </motion.span>
                  ))}
                </div>
              </div>
            </BentoCard>

            {/* Development Tools Card */}
            <BentoCard span={1} glowColor="#111827" delay={0.6} className="p-4 sm:p-6 bg-[#1b1b1b]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <h3 className="text-base sm:text-lg font-bold text-cyber-purple whitespace-nowrap flex items-center gap-2">
                  <Code className="w-4 h-4 sm:w-5 sm:h-5" />
                  Editing Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {editingTools.map((tool, index) => (
                    <motion.span
                      key={tool.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                      className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-neutral-800 border border-neutral-700"
                      style={{ color: tool.color }}
                    >
                      {tool.name}
                    </motion.span>
                  ))}
                </div>
              </div>
            </BentoCard>

            {/* Languages Card */}
            <BentoCard span={1} glowColor="#111827" delay={0.7} className="p-4 sm:p-6 bg-[#1b1b1b] min-h-[175px]">
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 h-full">
                <h3 className="text-base sm:text-lg my-auto font-bold text-cyber-green whitespace-nowrap">Languages</h3>
                <div className="flex flex-wrap gap-3">
                  {languages.map((lang, index) => (
                    <motion.div
                      key={lang.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <span className="text-xl sm:text-2xl">{lang.flag}</span>
                      <span className="text-xs sm:text-sm font--medium">{lang.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </BentoCard>
          </div>

          {/* Right Column */}
          <div className="space-y-4 sm:space-y-6">
            {/* Experience Card - Full-Stack Developer */}
            <BentoCard span={1} glowColor="#111827" delay={0.4} className="p-4 sm:p-6 bg-[#1b1b1b]">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-1">Full-Stack Developer</h3>
                  <p className="text-sm text-foreground/70 mb-2">Graphic Designer</p>
                </div>
                <span
                  className="px-3 py-1 rounded-full text-xs font-medium glass border whitespace-nowrap"
                  style={{
                    borderColor: '#11182740',
                    color: '#ffffff',
                  }}
                >
                  2020 - 2021
                </span>
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

            {/* Education Cards */}
            <BentoCard span={1} glowColor="#111827" delay={0.5} className="p-4 sm:p-6 bg-[#1b1b1b]">
              <h3 className="text-base sm:text-lg font-bold mb-4 text-cyber-purple flex items-center gap-2">
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
                Education
              </h3>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <motion.div
                    key={edu.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className="flex items-start justify-between p-3 sm:p-4 bg-neutral-800 rounded-xl border border-neutral-700"
                    style={{
                      borderColor: `${edu.color}20`,
                    }}
                  >
                    <div>
                      <h4 className="font-bold text-sm sm:text-base mb-1">{edu.title}</h4>
                      <p className="text-xs sm:text-sm text-foreground/70">{edu.field}</p>
                      <p className="text-xs text-foreground/50 mt-1">{edu.location}</p>
                    </div>
                    <span
                      className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium glass border whitespace-nowrap"
                      style={{
                        borderColor: `${edu.color}40`,
                        color: '#ffffff',
                      }}
                    >
                      {edu.year}
                    </span>
                  </motion.div>
                ))}
              </div>
            </BentoCard>
          </div>
        </div>

        {/* Bottom Section: Portfolio + Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Portfolio Card */}
          <BentoCard span={1} glowColor="#111827" delay={0.8} className="md:col-span-1 p-4 sm:p-6 bg-[#1b1b1b]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <h3 className="text-base sm:text-lg font-bold text-cyber-blue whitespace-nowrap flex items-center gap-2">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                Portfolio
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {portfolioLinks.map((link, index) => {
                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.25, delay: 0.9 + index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center justify-center px-3 h-10 sm:h-10 rounded-lg bg-neutral-800 border border-neutral-700 text-xs font-medium"
                      style={{ color: link.color }}
                      title={link.label}
                    >
                      {link.label}
                    </motion.a>
                  )
                })}
              </div>
            </div>
          </BentoCard>

          {/* Details Card */}
          <BentoCard span={1} glowColor="#111827" delay={0.9} className="md:col-span-1 p-4 sm:p-6 bg-[#1b1b1b]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <h3 className="text-base sm:text-lg font-bold text-cyber-green whitespace-nowrap">Details</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {details.map((detail, index) => {
                  const Icon = detail.icon
                  return (
                    <motion.div
                      key={detail.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 1.0 + index * 0.1 }}
                      className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-neutral-800 border border-neutral-700"
                    >
                      <Icon className="w-4 h-4" style={{ color: detail.color }} />
                      <span className="text-xs sm:text-sm font-medium">{detail.label}</span>
                    </motion.div>
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
