'use client'

import { ReactNode, useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import {
  Binary,
  Cpu,
  Database,
  BookOpen,
  Award,
  Briefcase,
  Code2,
  Brain,
  GraduationCap,
  MapPin,
  Mail,
  Globe,
  Smartphone,
  Sparkles,
  Atom,
  Network,
  Shield,
  Zap,
  Languages,
  Github,
  Linkedin
} from 'lucide-react'
import { BentoCard } from '@/components/ui/bento-card'

// Data definitions for Mehtab's actual profile
const interests = [
  { icon: Brain, label: 'AI Research', color: '#00f0ff' },
  { icon: Atom, label: 'Quantum Computing', color: '#8b5cf6' },
  { icon: Code2, label: 'Coding', color: '#00ff88' },
  { icon: Network, label: 'Deep Learning', color: '#0066ff' },
  { icon: Shield, label: 'Cybersecurity', color: '#ec4899' },
  { icon: Cpu, label: 'Robotics', color: '#FFD700' },
  { icon: Zap, label: 'Full-Stack Dev', color: '#61DAFB' },
  { icon: Database, label: 'Backend Dev', color: '#10B981' },
  { icon: Binary, label: 'DevOps', color: '#FF6B6B' },
]

const experiences = [
  {
    title: 'EncryptArx',
    role: 'Sr. Technical Researcher || AI-ML Engineer',
    period: 'Aug 2024 - Present',
    description: [
      'Leading R&D of AI models for cybersecurity applications',
      'Developing real-time threat detection systems',
      'Implementing predictive data protection frameworks',
      'Research published on ResearchGate (Jan 2025)',
    ],
    color: '#00f0ff',
    icon: Shield,
  },
  {
    title: 'Prodigy InfoTech',
    role: 'Android Development Intern',
    period: 'Jun 2023 - Aug 2023',
    description: [
      'Developed e-commerce applications using Kotlin',
      'Built messaging apps with Flutter framework',
      'Implemented responsive UI/UX designs',
      'Integrated RESTful APIs for data synchronization',
      'Collaborated with design team on user flows',
    ],
    color: '#0066ff',
    icon: Smartphone,
  },
  {
    title: 'VIEH Group',
    role: 'Machine Learning Intern',
    period: 'Feb 2023 - Jul 2023',
    description: [
      'Built predictive models for employee turnover',
      'Utilized Python and scikit-learn for analytics',
      'Achieved high accuracy in enterprise predictions',
      'Performed data preprocessing and feature engineering',
      'Created visualization dashboards for insights',
    ],
    color: '#8b5cf6',
    icon: Brain,
  },
  {
    title: 'Oasis Infobyte',
    role: 'Android Development Intern',
    period: 'Mar 2022 - May 2022',
    description: [
      'Developed utility apps (calculator, stopwatch)',
      'Implemented Java-based Android applications',
      'Focused on clean code and user experience',
      'Designed intuitive UI/UX following Material Design',
      'Implemented lifecycle management and state handling',
      'Conducted unit testing and debugging for reliability',
    ],
    color: '#00ff88',
    icon: Smartphone,
  },
  {
    title: 'Kodacy Robotics',
    role: 'Robotics Intern',
    period: 'Oct 2021 - Dec 2021',
    description: [
      'Worked with Arduino and Raspberry Pi',
      'Designed robotic circuits and RC systems',
      'Integrated hardware and software components',
      'Programmed microcontrollers for autonomous operations',
      'Implemented sensor integration and motor control',
      'Debugged and optimized embedded system performance',
    ],
    color: '#ec4899',
    icon: Cpu,
  },
]

const aiMLFrameworks = [
  { name: 'TensorFlow', color: '#FF6F00' },
  { name: 'Keras', color: '#D00000' },
  { name: 'PyTorch', color: '#EE4C2C' },
  { name: 'scikit-learn', color: '#F7931E' },
  { name: 'Pandas', color: '#00D9FF' },
  { name: 'NumPy', color: '#4CAF50' },
  { name: 'Matplotlib', color: '#00C853' },
  { name: 'Seaborn', color: '#76A5AF' },
  { name: 'XGBoost', color: '#FF6600' },
  { name: 'LightGBM', color: '#FFB900' },
  { name: 'YOLO', color: '#00FFFF' },
  { name: 'Transformers', color: '#FFD700' },
]

const backendStack = [
  { name: 'Node.js', color: '#339933' },
  { name: 'Express.js', color: '#FFFFFF' },
  { name: 'Django', color: '#0FFF50' },
  { name: 'Flask', color: '#FFFFFF' },
  { name: 'FastAPI', color: '#009688' },
  { name: 'MongoDB', color: '#47A248' },
  { name: 'PostgreSQL', color: '#336791' },
  { name: 'Redis', color: '#DC382D' },
  { name: 'GraphQL', color: '#E10098' },
  { name: 'REST API', color: '#61DAFB' },
]

const specializedTools = [
  { name: 'Qiskit', color: '#FFD700', label: 'Quantum' },
  { name: 'OpenCV', color: '#5C3EE8' },
  { name: 'LangChain', color: '#00FF88' },
  { name: 'Hugging Face', color: '#FFD21E' },
  { name: 'NLTK', color: '#4CAF50' },
  { name: 'SpaCy', color: '#09A3D5' },
  { name: 'Flask', color: '#FFFFFF' },
  { name: 'FastAPI', color: '#009688' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'Git', color: '#F05032' },
]

const frontendTools = [
  { name: 'ReactJS', color: '#61DAFB' },
  { name: 'Next.js', color: '#FFFFFF' },
  { name: 'ThreeJS', color: '#049EF4' },
  { name: 'TailwindCSS', color: '#06B6D4' },
  { name: 'Redux', color: '#9B59B6' },
  { name: 'Framer Motion', color: '#FF0055' },
  { name: 'Vite', color: '#646CFF' },
  { name: 'Webpack', color: '#8DD6F9' },
  { name: 'Zustand', color: '#F4C430' },
  { name: 'React Query', color: '#FF4154' },
  { name: 'Shadcn UI', color: '#FFFFFF' },
  { name: 'GSAP', color: '#88CE02' },
]

const education = [
  {
    title: 'MCA',
    field: 'Master of Computer Applications',
    location: 'Amity University Online',
    year: 'Dec 2023 - Dec 2025',
    color: '#00f0ff',
    icon: GraduationCap,
  },
  {
    title: 'BCA',
    field: 'Bachelor of Computer Applications',
    location: 'GIMT, ASTU',
    year: 'Jul 2020 - Jun 2023',
    color: '#8b5cf6',
    icon: GraduationCap,
  },
]

const certifications = [
  {
    name: 'AI Engineer',
    org: 'Simplilearn',
    color: '#FF9A00',
    image: '/Certificates/IMG_20240831_231728 (1).jpg'
  },
  {
    name: 'Applied AI',
    org: 'IBM',
    color: '#0066ff',
    image: '/Certificates/Certificate from IBM.jpg'
  },
  {
    name: 'AI & ML',
    org: 'NVIDIA',
    color: '#76B900',
    image: '/Certificates/Nvidia Certificate.jpg'
  },
  {
    name: 'Machine Learning',
    org: 'Simplilearn',
    color: '#00B4D8',
    image: '/Certificates/IMG_20240831_231742.jpg'
  },
  {
    name: 'Large Language Models',
    org: 'Google Cloud',
    color: '#4285F4',
    image: '/Certificates/WhatsApp Image 2023-12-28 at 15.57.27.jpg'
  },
  {
    name: 'Robotics Internship',
    org: 'Kodacy',
    color: '#ec4899',
    image: '/Certificates/Internship Complition Certificate from Kodacy.jpg'
  },
  {
    name: 'ML Internship',
    org: 'VIEH Group',
    color: '#00ff88',
    image: '/Certificates/Intership Certificate from VIEHGroup.jpeg'
  },
  {
    name: 'Android Development',
    org: 'Oasis Infobyte',
    color: '#3DDC84',
    image: '/Certificates/Complition Certificate from Oasis Infobyte.jpg'
  },
  {
    name: 'DevFest 2022',
    org: 'Google Developer Groups',
    color: '#FBBC04',
    image: '/Certificates/DevFest 2022 Cerificate.jpg'
  },
]

const spokenLanguages = [
  { name: 'English', flag: '🇬🇧', color: '#00f0ff' },
  { name: 'Hindi', flag: '🇮🇳', color: '#8b5cf6' },
  { name: 'Assamese', flag: '🇮🇳', color: '#00ff88' },
]

const contactDetails = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/MehtabRosul',
    color: '#00f0ff'
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/rosulmehtab/',
    color: '#0066ff'
  },
  {
    icon: BookOpen,
    label: 'ResearchGate',
    href: 'https://www.researchgate.net/profile/Mehtab-Rosul',
    color: '#00ff88'
  },
  {
    icon: Mail,
    label: 'Email',
    href: 'mailto:mehtabrosul10@gmail.com',
    color: '#8b5cf6'
  },
]

// Research Publications Data
const researchPublications = [
  {
    type: 'Research Paper',
    title: 'Enhancing Cybersecurity',
    subtitle: 'Advanced Scalable Real-Time Threat Detection System',
    url: 'https://www.researchgate.net/publication/386335978_Enhancing_Cybersecurity_through_a_Comprehensive_Intelligent_Framework_An_Advanced_Scalable_Real-Time_Threat_Detection_System',
    date: 'Jan 2025',
    icon: Shield,
  },
  {
    type: 'Research Paper',
    title: 'Advanced Dialogue Management',
    subtitle: 'Comprehensive Framework for Conversational AI',
    url: 'https://www.researchgate.net/publication/386341974_Integrating_Advanced_Dialogue_Management_Natural_Language_Generation_and_User_Personalization_in_Conversational_AI_A_Comprehensive_Framework',
    date: 'Dec 2024',
    icon: Brain,
  },
  {
    type: 'Research Paper',
    title: 'AI-Driven BCI',
    subtitle: 'Restoring Mobility in Individuals with Paralysis',
    url: 'https://www.researchgate.net/publication/398124177_Artificial_Intelligence-Driven_BCI_for_Restoring_Mobility_in_Individuals_with_Paralysis',
    date: 'Nov 2024',
    icon: Cpu,
  },
  {
    type: 'Article',
    title: 'Sustainability & Green AI',
    subtitle: 'Energy-Efficient Models & Sustainable Data Centers',
    url: 'https://www.researchgate.net/publication/398123802_Sustainability_Green_AI_Energy-Efficient_Models_Sustainable_Data_Centers_Practical_Roadmap',
    date: 'Oct 2024',
    icon: Sparkles,
  },
  {
    type: 'Article',
    title: 'Edge LLMs for Wearables',
    subtitle: 'Privacy-First On-Device AI for Smartwatch OS',
    url: 'https://www.researchgate.net/publication/399156132_Edge_LLMs_for_Wearables_and_Smartwatch_OS_Explainable_product-forward_privacy-first_on-device_AI',
    date: 'Sep 2024',
    icon: Smartphone,
  },
  {
    type: 'Article',
    title: 'Digital Twins Real-Time Control',
    subtitle: 'Resilient Cities & Personalized Medicine',
    url: 'https://www.researchgate.net/publication/398423745_Digital_Twins_Real-Time_Control_for_Resilient_Cities_Personalized_Medicine_A_Comprehensive_Multidisciplinary_Forward-Looking_Scientific_Review',
    date: 'Aug 2024',
    icon: Network,
  },
  {
    type: 'Article',
    title: 'Human-AI Collaborative Creativity',
    subtitle: 'Co-Creation Frameworks & Practical Applications',
    url: 'https://www.researchgate.net/publication/399156063_Human-AI_Collaborative_Creativity_Co-Creation_Frameworks_Practical_Shareable_and_Product-',
    date: 'Jul 2024',
    icon: Code2,
  },
  {
    type: 'Article',
    title: 'Cross-cutting: Past, Present, Future',
    subtitle: 'Historical Surveys with Future Roadmaps',
    url: 'https://www.researchgate.net/publication/399156071_Cross-cutting_Past_Present_Future_Review_Ideas_Historical_Surveys_with_Future_Roadmaps_-_A_Long-Form_Review_to_Attract_Citations_and_Shares',
    date: 'Jun 2024',
    icon: BookOpen,
  },
  {
    type: 'Case Study',
    title: 'Carbon Coin',
    subtitle: 'A Product Engineering Case Study',
    url: 'https://www.researchgate.net/publication/399155868_Carbon_Coin_-Case_Study_A_Product_Engineering_Case_Study',
    date: 'May 2024',
    icon: Database,
  },
]

// Research Publications Showcase Component
function ResearchPublicationsShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Auto-rotation effect - cycles through publications
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % researchPublications.length)
      }, 6000) // Change every 6 seconds
      return () => clearInterval(interval)
    }
  }, [isHovered])

  const currentPub = researchPublications[currentIndex]
  const Icon = currentPub.icon

  return (
    <div
      className="relative z-10 h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-cyber-green" />
          <h3 className="text-base sm:text-lg font-bold text-cyber-green">Research</h3>
        </div>
        {/* Progress indicator */}
        <span className="text-[0.6rem] text-cyber-green/60 font-medium">
          {currentIndex + 1} / {researchPublications.length}
        </span>
      </div>

      {/* Single Publication Display with Animation */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.a
            key={currentIndex}
            href={currentPub.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full"
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="p-4 bg-neutral-800/30 rounded-xl border border-neutral-700 hover:border-cyber-green/50 transition-all duration-300 h-full cursor-pointer hover:shadow-[0_0_25px_rgba(0,255,136,0.2)]">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 rounded-lg bg-neutral-800 border border-cyber-green/30 flex-shrink-0">
                  <Icon className="w-5 h-5 text-cyber-green" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-bold text-sm text-cyber-green leading-tight">
                      {currentPub.title}
                    </h4>
                    <span className="px-2 py-0.5 rounded text-[0.65rem] bg-cyber-green/10 border border-cyber-green/30 text-cyber-green font-medium whitespace-nowrap flex-shrink-0">
                      {currentPub.type}
                    </span>
                  </div>
                  <p className="text-xs text-foreground/70 leading-relaxed mb-3">
                    {currentPub.subtitle}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-foreground/50">
                    <Database className="w-3 h-3" />
                    <span>Published on ResearchGate</span>
                  </div>
                  <div className="mt-3 px-2 py-1 rounded-full bg-cyber-green/10 border border-cyber-green/30 text-cyber-green text-[0.65rem] font-medium inline-block">
                    {currentPub.date}
                  </div>
                </div>
              </div>
            </div>
          </motion.a>
        </AnimatePresence>
      </div>

      {/* Navigation dots */}
      <div className="flex items-center justify-center gap-1.5 mt-4">
        {researchPublications.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex
              ? 'w-6 bg-cyber-green'
              : 'w-1.5 bg-cyber-green/30 hover:bg-cyber-green/50'
              }`}
            aria-label={`Go to publication ${index + 1}`}
          />
        ))}
      </div>

      <p className="text-xs text-foreground/50 mt-3 text-center">
        {researchPublications.length} publications • Click to view on ResearchGate
      </p>
    </div>
  )
}


export function AboutContent() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const avatars = [
    '/avatars/IMG_9783.PNG',
    '/avatars/IMG_9788.PNG',
    '/avatars/IMG_9789.PNG',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % avatars.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative min-h-screen">
      {/* Animated Neural Network Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="neural-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <line x1="30" y1="30" x2="60" y2="30" stroke="#ffffff" strokeWidth="0.5" opacity="0.1" />
              <line x1="30" y1="30" x2="30" y2="60" stroke="#ffffff" strokeWidth="0.5" opacity="0.1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-7xl">
        {/* Page Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-green bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About Me
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg text-foreground/70 max-w-3xl mx-auto mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Exploring the intersection of artificial intelligence, quantum computing, and cutting-edge technology.
            Passionate about building innovative solutions that shape the future.
          </motion.p>
          {/* Decorative Line */}
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-green mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
        </motion.div>

        {/* Row 1: Avatar + Introduction + Interests */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 mb-6">
          {/* Avatar Card with Premium Animation */}
          <BentoCard
            span={1}
            glowColor="#00f0ff"
            delay={0.1}
            className="md:col-span-4 p-4 sm:p-6 bg-gradient-to-br from-[#1b1b1b] to-[#111111] h-[450px] flex items-center justify-center overflow-hidden relative group"
          >
            {/* Rotating Gradient Border Effect */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'conic-gradient(from 0deg, #00f0ff, #8b5cf6, #00ff88, #00f0ff)',
                padding: '2px',
                borderRadius: '1rem',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-full h-full bg-[#1b1b1b] rounded-[calc(1rem-2px)]" />
            </motion.div>

            <div className="w-full h-full flex items-center justify-center relative z-10">
              <div className="w-[360px] h-[360px] invisible" />
              <AnimatePresence>
                <motion.img
                  key={avatars[currentImageIndex]}
                  src={avatars[currentImageIndex]}
                  alt="Mehtab Aftabur Rosul"
                  initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', zIndex: 10 }}
                  exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)', zIndex: 0 }}
                  transition={{
                    duration: 1.2,
                    ease: "easeInOut"
                  }}
                  width="360"
                  height="360"
                  className="rounded-2xl absolute inset-0 m-auto transition-all duration-300"
                  style={{ objectFit: 'contain' }}
                />
              </AnimatePresence>
            </div>
          </BentoCard>

          <div className="md:col-span-8 space-y-4 sm:space-y-6">
            {/* Introduction Card */}
            <BentoCard
              span={1}
              glowColor="#00f0ff"
              delay={0.2}
              className="p-6 bg-gradient-to-br from-[#1b1b1b] to-[#151515] h-[280px] relative overflow-hidden group"
            >
              {/* Animated Gradient Accent */}
              <motion.div
                className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyber-blue via-cyber-purple to-cyber-green"
                animate={{
                  background: [
                    'linear-gradient(180deg, #00f0ff 0%, #8b5cf6 50%, #00ff88 100%)',
                    'linear-gradient(180deg, #00ff88 0%, #00f0ff 50%, #8b5cf6 100%)',
                    'linear-gradient(180deg, #8b5cf6 0%, #00ff88 50%, #00f0ff 100%)',
                  ]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              />

              <div className="h-full flex items-center pl-4">
                <div className="space-y-4">
                  <motion.div
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <Binary className="w-3.5 h-3.5 text-cyber-blue" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-cyber-blue/90" style={{ fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: '0.15em' }}>
                      Software Developer, AI-ML Engineer, Technical Researcher
                    </span>
                  </motion.div>

                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <p className="text-base sm:text-lg text-foreground/95 leading-relaxed font-light" style={{ fontFamily: 'Inter, system-ui, sans-serif', lineHeight: '1.7' }}>
                      I'm <span className="font-bold bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-green bg-clip-text text-transparent" style={{ fontWeight: 700 }}>Mehtab Aftabur Rosul</span>,
                      a passionate <span className="font-semibold text-cyber-blue">AI/ML Engineer</span> and <span className="font-semibold text-cyber-purple">Technical Researcher</span> specializing in
                      <span className="font-semibold text-cyber-blue"> cybersecurity research</span>,
                      <span className="font-semibold text-cyber-purple"> quantum computing</span>, and
                      <span className="font-semibold text-cyber-green"> intelligent systems</span>.
                    </p>

                    <p className="text-sm sm:text-base text-foreground/80 leading-relaxed font-light" style={{ fontFamily: 'Inter, system-ui, sans-serif', lineHeight: '1.65' }}>
                      Currently leading cutting-edge AI-driven research at <span className="font-semibold text-white">EncryptArx</span>, developing real-time threat detection frameworks with published work on <span className="font-medium text-cyber-green">ResearchGate</span>.
                      Experienced in <span className="font-medium text-cyber-blue">full-stack development</span>, <span className="font-medium text-cyber-purple">DevOps</span>, and building scalable systems with
                      <span className="font-medium"> TensorFlow</span>, <span className="font-medium">PyTorch</span>, <span className="font-medium">Qiskit</span>, and modern web technologies.
                    </p>
                  </motion.div>
                </div>
              </div>
            </BentoCard>

            {/* Interests Card */}
            <BentoCard
              span={1}
              glowColor="#8b5cf6"
              delay={0.3}
              className="p-6 bg-gradient-to-br from-[#1b1b1b] to-[#151515] h-[144px] relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 h-full">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-cyber-purple" />
                  <h3 className="text-lg sm:text-xl font-bold text-cyber-purple whitespace-nowrap">Core Interests</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest, index) => {
                    const Icon = interest.icon
                    return (
                      <motion.button
                        key={interest.label}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-neutral-800/50 border border-neutral-700 backdrop-blur-sm hover:scale-105 hover:shadow-lg transition-all duration-300"
                        style={{
                          borderColor: interest.color + '40',
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                        whileHover={{
                          boxShadow: `0 0 20px ${interest.color}40`,
                          borderColor: interest.color + '80',
                        }}
                      >
                        <Icon className="w-3.5 h-3.5" style={{ color: interest.color }} />
                        <span className="text-xs font-medium">{interest.label}</span>
                      </motion.button>
                    )
                  })}
                </div>
              </div>
            </BentoCard>
          </div>
        </div>

        {/* Row 2: Primary Experience Cards (Top 3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
          {experiences.slice(0, 3).map((exp, index) => {
            const Icon = exp.icon
            return (
              <BentoCard
                key={exp.title}
                span={1}
                glowColor={exp.color}
                delay={0.4 + index * 0.1}
                className="p-4 sm:p-6 bg-gradient-to-br from-[#1b1b1b] to-[#111111] min-h-[280px] group relative overflow-hidden"
              >
                {/* Hover Glow Effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl"
                  style={{ background: exp.color }}
                />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <motion.div
                        className="p-2 rounded-lg bg-neutral-800/50 border border-neutral-700"
                        style={{ borderColor: exp.color + '40' }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Icon className="w-5 h-5" style={{ color: exp.color }} />
                      </motion.div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold mb-1">{exp.title}</h3>
                        <p className="text-sm text-foreground/70 mb-2">{exp.role}</p>
                      </div>
                    </div>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium glass border self-start mb-4"
                    style={{
                      borderColor: exp.color + '40',
                      color: exp.color,
                    }}
                  >
                    {exp.period}
                  </span>
                  <ul className="space-y-2 flex-1">
                    {exp.description.map((item, i) => (
                      <motion.li
                        key={i}
                        className="text-xs sm:text-sm text-foreground/70 flex items-start gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 + i * 0.05 }}
                      >
                        <Zap className="w-3 h-3 mt-1 flex-shrink-0" style={{ color: exp.color }} />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </BentoCard>
            )
          })}
        </div>

        {/* Row 3: Tech Stack Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
          {/* AI/ML Frameworks */}
          <BentoCard
            span={1}
            glowColor="#00f0ff"
            delay={0.7}
            className="p-4 sm:p-6 bg-gradient-to-br from-[#1b1b1b] to-[#111111] min-h-[200px]"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-cyber-blue" />
                <h3 className="text-base sm:text-lg font-bold text-cyber-blue">AI/ML Frameworks</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {aiMLFrameworks.map((tool, index) => (
                  <motion.span
                    key={tool.name}
                    className="px-2 py-1 rounded-lg text-[0.65rem] font-medium bg-neutral-800/50 border border-neutral-700 hover:scale-105 transition-transform duration-300"
                    style={{ color: tool.color }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.05 }}
                    whileHover={{
                      boxShadow: `0 0 15px ${tool.color}30`,
                      borderColor: tool.color + '60',
                    }}
                  >
                    {tool.name}
                  </motion.span>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* Backend Stack */}
          <BentoCard
            span={1}
            glowColor="#00ff88"
            delay={0.75}
            className="p-4 sm:p-6 bg-gradient-to-br from-[#1b1b1b] to-[#111111] min-h-[200px]"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-2 mb-4">
                <Database className="w-5 h-5 text-cyber-green" />
                <h3 className="text-base sm:text-lg font-bold text-cyber-green">Backend</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {backendStack.map((tech, index) => (
                  <motion.span
                    key={tech.name}
                    className="px-2 py-1 rounded-lg text-[0.65rem] font-medium bg-neutral-800/50 border border-neutral-700 hover:scale-105 transition-transform duration-300"
                    style={{ color: tech.color }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.85 + index * 0.05 }}
                    whileHover={{
                      boxShadow: `0 0 15px ${tech.color}30`,
                      borderColor: tech.color + '60',
                    }}
                  >
                    {tech.name}
                  </motion.span>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* Specialized Tools */}
          <BentoCard
            span={1}
            glowColor="#FFD700"
            delay={0.8}
            className="p-4 sm:p-6 bg-gradient-to-br from-[#1b1b1b] to-[#111111] min-h-[200px]"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-2 mb-4">
                <Atom className="w-5 h-5 text-[#FFD700]" />
                <h3 className="text-base sm:text-lg font-bold text-[#FFD700]">Quantum & Specialized</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {specializedTools.map((tool, index) => (
                  <motion.span
                    key={tool.name}
                    className="px-2 py-1 rounded-lg text-[0.65rem] font-medium bg-neutral-800/50 border border-neutral-700 hover:scale-105 transition-transform duration-300"
                    style={{ color: tool.color }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.05 }}
                    whileHover={{
                      boxShadow: `0 0 15px ${tool.color}30`,
                      borderColor: tool.color + '60',
                    }}
                  >
                    {tool.name}
                    {tool.label && <span className="ml-1 text-[0.65rem] opacity-70">({tool.label})</span>}
                  </motion.span>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* Frontend Tools */}
          <BentoCard
            span={1}
            glowColor="#61DAFB"
            delay={0.85}
            className="p-4 sm:p-6 bg-gradient-to-br from-[#1b1b1b] to-[#111111] min-h-[200px]"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-2 mb-4">
                <Network className="w-5 h-5 text-[#61DAFB]" />
                <h3 className="text-base sm:text-lg font-bold text-[#61DAFB]">Frontend Stack</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {frontendTools.map((tool, index) => (
                  <motion.span
                    key={tool.name}
                    className="px-2 py-1 rounded-lg text-[0.65rem] font-medium bg-neutral-800/50 border border-neutral-700 hover:scale-105 transition-transform duration-300"
                    style={{ color: tool.color }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.95 + index * 0.05 }}
                    whileHover={{
                      boxShadow: `0 0 15px ${tool.color}30`,
                      borderColor: tool.color + '60',
                    }}
                  >
                    {tool.name}
                  </motion.span>
                ))}
              </div>
            </div>
          </BentoCard>
        </div>

        {/* Row 4: Education + Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
          {/* Education */}
          <BentoCard
            span={1}
            glowColor="#00f0ff"
            delay={0.9}
            className="p-4 sm:p-6 bg-gradient-to-br from-[#1b1b1b] to-[#111111] min-h-[360px]"
          >
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-5 h-5 text-cyber-blue" />
              <h3 className="text-base sm:text-lg font-bold text-cyber-blue">Education</h3>
            </div>
            <div className="space-y-4">
              {education.map((edu, index) => {
                const Icon = edu.icon
                return (
                  <motion.div
                    key={edu.title}
                    className="flex items-start gap-4 p-4 bg-neutral-800/30 rounded-xl border border-neutral-700 hover:border-neutral-600 transition-all duration-300 group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 + index * 0.1 }}
                    whileHover={{ scale: 1.02, boxShadow: `0 0 20px ${edu.color}20` }}
                  >
                    <div className="p-2 rounded-lg bg-neutral-800 border border-neutral-700 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5" style={{ color: edu.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-bold text-sm sm:text-base mb-1" style={{ color: edu.color }}>
                            {edu.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-foreground/70 font-medium">{edu.field}</p>
                          <p className="text-xs text-foreground/50 mt-1">{edu.location}</p>
                        </div>
                        <span
                          className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium glass border whitespace-nowrap"
                          style={{ borderColor: edu.color + '40', color: edu.color }}
                        >
                          {edu.year}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </BentoCard>

          {/* Certifications */}
          <BentoCard
            span={1}
            glowColor="#8b5cf6"
            delay={0.95}
            className="p-4 sm:p-6 bg-gradient-to-br from-[#1b1b1b] to-[#111111] min-h-[360px]"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-cyber-purple" />
                <h3 className="text-base sm:text-lg font-bold text-cyber-purple">Certifications</h3>
              </div>
              <span className="text-[0.65rem] text-cyber-purple/60 font-medium">
                {certifications.length} certificates
              </span>
            </div>

            {/* Scrollable Certifications Grid - Shows 6 by default */}
            <div
              className="overflow-y-auto pr-2 custom-cert-scrollbar"
              onWheel={(e) => {
                // Allow wheel scrolling within this container
                const container = e.currentTarget
                const isScrollable = container.scrollHeight > container.clientHeight

                if (isScrollable) {
                  const isAtTop = container.scrollTop === 0
                  const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 1

                  // Prevent page scroll if we're scrolling within bounds
                  if ((e.deltaY < 0 && !isAtTop) || (e.deltaY > 0 && !isAtBottom)) {
                    e.stopPropagation()
                  }
                }
              }}
              style={{
                maxHeight: '260px',
                WebkitOverflowScrolling: 'touch',
                scrollBehavior: 'smooth',
                overscrollBehavior: 'contain'
              }}
            >
              <div className="grid grid-cols-2 gap-2.5">
                {certifications.map((cert, index) => (
                  <motion.a
                    key={cert.name}
                    href={cert.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-neutral-800/30 rounded-xl border border-neutral-700 transition-all duration-300 cursor-pointer"
                    style={{ touchAction: 'auto' }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.05 + index * 0.05 }}
                    whileHover={{
                      boxShadow: `0 0 15px ${cert.color}20`,
                      borderColor: cert.color + '60'
                    }}
                  >
                    <div>
                      <div className="flex items-start gap-2 mb-1.5">
                        <Award className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: cert.color }} />
                        <h4 className="font-bold text-[0.7rem] leading-tight line-clamp-2" style={{ color: cert.color }}>
                          {cert.name}
                        </h4>
                      </div>
                      <p className="text-[0.6rem] text-foreground/60 ml-5">{cert.org}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Custom Scrollbar Styles */}
            <style jsx>{`
              .custom-cert-scrollbar {
                scrollbar-width: thin;
                scrollbar-color: rgba(139, 92, 246, 0.3) rgba(0, 0, 0, 0.2);
              }
              .custom-cert-scrollbar::-webkit-scrollbar {
                width: 6px;
              }
              .custom-cert-scrollbar::-webkit-scrollbar-track {
                background: rgba(0, 0, 0, 0.2);
                border-radius: 10px;
              }
              .custom-cert-scrollbar::-webkit-scrollbar-thumb {
                background: rgba(139, 92, 246, 0.4);
                border-radius: 10px;
                transition: background 0.2s ease;
              }
              .custom-cert-scrollbar::-webkit-scrollbar-thumb:hover {
                background: rgba(139, 92, 246, 0.6);
              }
            `}</style>
          </BentoCard>
        </div>

        {/* Row 5: Research Publications + Earlier Experience */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
          {/* Research Publications */}
          <BentoCard
            span={1}
            glowColor="#00ff88"
            delay={1.0}
            className="md:col-span-1 p-4 sm:p-6 bg-gradient-to-br from-[#1b1b1b] to-[#111111] relative overflow-hidden group"
          >
            <motion.div
              className="absolute top-0 right-0 w-32 h-32 bg-cyber-green/5 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <ResearchPublicationsShowcase />
          </BentoCard>

          {/* Earlier Experience */}
          {experiences.slice(3, 5).map((exp, index) => {
            const Icon = exp.icon
            return (
              <BentoCard
                key={exp.title}
                span={1}
                glowColor={exp.color}
                delay={1.05 + index * 0.1}
                className="p-4 sm:p-6 bg-gradient-to-br from-[#1b1b1b] to-[#111111] group relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl"
                  style={{ background: exp.color }}
                />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <motion.div
                        className="p-2 rounded-lg bg-neutral-800/50 border border-neutral-700"
                        style={{ borderColor: exp.color + '40' }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <Icon className="w-5 h-5" style={{ color: exp.color }} />
                      </motion.div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold mb-1">{exp.title}</h3>
                        <p className="text-xs text-foreground/70 mb-2">{exp.role}</p>
                      </div>
                    </div>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium glass border mb-3 inline-block"
                    style={{ borderColor: exp.color + '40', color: exp.color }}
                  >
                    {exp.period}
                  </span>
                  <ul className="space-y-1.5">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-xs text-foreground/70 flex items-start gap-2">
                        <span className="text-foreground mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </BentoCard>
            )
          })}
        </div>

        {/* Row 6: Languages + Contact Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Spoken Languages */}
          <BentoCard
            span={1}
            glowColor="#00f0ff"
            delay={1.1}
            className="p-4 sm:p-6 bg-gradient-to-br from-[#1b1b1b] to-[#111111]"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 h-full">
              <div className="flex items-center gap-2">
                <Languages className="w-5 h-5 text-cyber-blue" />
                <h3 className="text-base sm:text-lg font-bold text-cyber-blue whitespace-nowrap">Languages</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {spokenLanguages.map((lang, index) => (
                  <motion.div
                    key={lang.name}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-800/50 border border-neutral-700 hover:scale-105 transition-transform duration-300"
                    style={{ borderColor: lang.color + '40' }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    whileHover={{ boxShadow: `0 0 20px ${lang.color}30` }}
                  >
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="text-sm font-medium" style={{ color: lang.color }}>{lang.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* Contact Details */}
          <BentoCard
            span={1}
            glowColor="#8b5cf6"
            delay={1.15}
            className="p-4 sm:p-6 bg-gradient-to-br from-[#1b1b1b] to-[#111111]"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 h-full">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyber-purple" />
                <h3 className="text-base sm:text-lg font-bold text-cyber-purple whitespace-nowrap">Contact</h3>
              </div>
              <div className="flex gap-3">
                {contactDetails.map((detail, index) => {
                  const Icon = detail.icon
                  return (
                    <motion.a
                      key={detail.label}
                      href={detail.href}
                      target={detail.href.startsWith('mailto:') ? '_self' : '_blank'}
                      rel={detail.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                      className="flex items-center gap-2 px-3 py-2 rounded-full bg-neutral-800/50 border border-neutral-700 hover:scale-105 transition-transform duration-300 cursor-pointer"
                      style={{ borderColor: detail.color + '40' }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.25 + index * 0.1 }}
                      whileHover={{ boxShadow: `0 0 20px ${detail.color}30` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: detail.color }} />
                      <span className="text-xs font-medium">{detail.label}</span>
                    </motion.a>
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
