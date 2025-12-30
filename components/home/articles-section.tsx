'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { articles } from '@/lib/articles'
import { ScrollReveal } from '@/components/animations/scroll-reveal'
import { GradientText } from '@/components/ui/gradient-text'
import { Button } from '@/components/ui/button'
import React from 'react'

const cardThemes = [
  { // Cyber Mint
    color: '#0AFFA0',
    gradient: 'linear-gradient(45deg, #0A2E23, #051A14)',
  },
  { // Galactic Indigo
    color: '#8A2BE2',
    gradient: 'linear-gradient(45deg, #1A0D2E, #0A041A)',
  },
  { // Solar Flare
    color: '#FFA500',
    gradient: 'linear-gradient(45deg, #33230A, #1A1205)',
  },
  { // Nebula Pink
    color: '#FF1493',
    gradient: 'linear-gradient(45deg, #2E0D20, #1A0412)',
  }
];

export function ArticlesSection() {
  return (
    <section id="articles" className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background" />
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            background: [
              'radial-gradient(circle at 10% 20%, rgba(156, 254, 255, 0.1) 0%, transparent 40%)',
              'radial-gradient(circle at 80% 90%, rgba(167, 243, 208, 0.1) 0%, transparent 40%)',
              'radial-gradient(circle at 50% 50%, rgba(216, 180, 254, 0.1) 0%, transparent 40%)',
              'radial-gradient(circle at 10% 20%, rgba(156, 254, 255, 0.1) 0%, transparent 40%)',
            ],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
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
                gradientColors={['#9CFEFF', '#A7F3D0', '#D8B4FE', '#9CFEFF']}
                duration={5}
                direction="left"
                ease="linear"
                className="inline-block"
              >
                Latest Articles
              </GradientText>
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              Exploring the frontiers of technology, from AI to Quantum Computing.
            </p>
          </motion.div>
        </ScrollReveal>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {articles.slice(0, 4).map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>
        </div>

        {/* Centered Button Below Articles */}
        <div className="text-center mt-20">
          <Button asChild variant="neon" size="lg" className="group">
            <Link href="/resources">
              Explore All Articles
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function ArticleCard({ article, index }: { article: any; index: number }) {
  const theme = cardThemes[index % cardThemes.length];
  const cardRef = React.useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 300, damping: 40 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 40 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl h-full flex flex-col"
      style={{ 
        perspective: 1000,
        // @ts-ignore
        '--glow-color': theme.color,
        '--bg-gradient': theme.gradient,
       }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div 
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-500"
        style={{ 
          boxShadow: '0 0 15px 2px var(--glow-color)',
          border: '1px solid var(--glow-color)'
        }}
      />
      <motion.div 
        className="card-content relative bg-[var(--bg-gradient)] rounded-2xl h-full flex flex-col p-6 overflow-hidden"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        <div className="relative z-10 flex-1 flex flex-col" style={{ transform: 'translateZ(20px)' }}>
          <p className="text-sm mb-2 font-semibold" style={{ color: theme.color }}>{article.category}</p>
          <h3 className="text-lg font-bold mb-3 text-neutral-50 group-hover:text-white transition-colors duration-300 line-clamp-3">{article.title}</h3>
          <p className="text-neutral-400 text-xs mb-4">{article.authors.join(', ')} - {article.year}</p>
          <p className="text-neutral-400 text-sm flex-1 line-clamp-4">{article.abstract}</p>
        </div>
        <div className="relative z-10 pt-4 mt-auto" style={{ transform: 'translateZ(10px)' }}>
          <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ color: theme.color }} className="hover:text-white transition-colors duration-300 flex items-center font-bold text-sm">
            Read on ResearchGate <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}
