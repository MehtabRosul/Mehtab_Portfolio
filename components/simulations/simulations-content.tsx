'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Settings, Download } from 'lucide-react'
import { GoldenText } from '@/components/ui/golden-text'
import { GradientText } from '@/components/ui/gradient-text'
import { Button } from '@/components/ui/button'

const simulations = [
  {
    id: 1,
    title: <><GoldenText>Quantum</GoldenText> Particle Simulation</>,
    category: <GoldenText>Quantum</GoldenText>,
    description: 'Interactive visualization of quantum particle behavior',
    image: '/images/sim1.jpg',
  },
  {
    id: 2,
    title: 'Neural Network Visualization',
    category: 'AI/ML',
    description: 'Real-time neural network training visualization',
    image: '/images/sim2.jpg',
  },
  {
    id: 3,
    title: 'Physics Engine Demo',
    category: 'Physics',
    description: 'Advanced physics simulation with multiple bodies',
    image: '/images/sim3.jpg',
  },
]

export function SimulationsContent() {
  const [selectedSim, setSelectedSim] = useState<number | null>(null)

  return (
    <div className="container mx-auto px-4 py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-6xl md:text-8xl font-heading font-bold mb-6">
          <GradientText 
            gradientColors={['#00f0ff', '#3b82f6', '#60a5fa', '#93c5fd', '#00f0ff']}
            duration={4}
            direction="right"
            ease="linear"
          >
            Simulations
          </GradientText>
        </h1>
        <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
          Interactive simulations and computational models built with Python, C++, and modern web technologies
        </p>
      </motion.div>

      {/* Simulations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {simulations.map((sim, index) => (
          <motion.div
            key={sim.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="glass-strong rounded-xl overflow-hidden border border-cyber-blue/30"
          >
            <div className="h-48 bg-gradient-to-br from-cyber-blue/20 to-cyber-purple/20 relative">
              <div className="absolute inset-0 cyber-grid-bg opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-cyber-blue/50">{sim.category}</span>
              </div>
            </div>
            <div className="p-6">
              <span className="text-sm text-cyber-blue font-semibold">{sim.category}</span>
              <h3 className="text-2xl font-bold mb-2 mt-2">{sim.title}</h3>
              <p className="text-foreground/60 mb-4 text-sm">{sim.description}</p>
              <div className="flex gap-2">
                <Button variant="default" size="sm" onClick={() => setSelectedSim(sim.id)}>
                  <Play className="w-4 h-4 mr-2" />
                  Run
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Simulation Viewer Placeholder */}
      {selectedSim && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedSim(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong rounded-xl p-8 max-w-4xl w-full border border-cyber-blue/30"
          >
            <h2 className="text-3xl font-bold mb-4">
              {simulations.find(s => s.id === selectedSim)?.title}
            </h2>
            <div className="aspect-video bg-gradient-to-br from-cyber-blue/20 to-cyber-purple/20 rounded-lg mb-4 flex items-center justify-center">
              <p className="text-foreground/60">Simulation canvas will be rendered here</p>
            </div>
            <div className="flex gap-2">
              <Button variant="default">Start Simulation</Button>
              <Button variant="outline" onClick={() => setSelectedSim(null)}>Close</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

