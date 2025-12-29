'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Trophy, Gamepad2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GradientText } from '@/components/ui/gradient-text'

const games = [
  {
    id: 1,
    title: 'Space Invaders',
    description: 'Classic space shooter game with modern twists',
    highScore: 12500,
    image: '/images/game1.jpg',
  },
  {
    id: 2,
    title: 'Snake Game',
    description: 'Retro snake game with smooth controls',
    highScore: 8500,
    image: '/images/game2.jpg',
  },
  {
    id: 3,
    title: 'Puzzle Solver',
    description: 'Challenging puzzle game with multiple levels',
    highScore: 0,
    image: '/images/game3.jpg',
  },
]

export function GamesContent() {
  const [selectedGame, setSelectedGame] = useState<number | null>(null)

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
          <span className="text-white">2D</span>{' '}
          <GradientText 
            gradientColors={['#00f0ff', '#00e5e5', '#00ffff', '#40e0d0', '#00f0ff']}
            duration={4.5}
            direction="left"
            ease="easeInOut"
          >
            Games
          </GradientText>
        </h1>
        <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
          Playable 2D games built with Python and Pygame. Challenge yourself and beat the high scores!
        </p>
      </motion.div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {games.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="glass-strong rounded-xl overflow-hidden border border-cyber-purple/30"
          >
            <div className="h-48 bg-gradient-to-br from-cyber-purple/20 to-cyber-blue/20 relative">
              <div className="absolute inset-0 cyber-grid-bg opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Gamepad2 className="w-16 h-16 text-cyber-purple/50" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">{game.title}</h3>
              <p className="text-foreground/60 mb-4 text-sm">{game.description}</p>
              {game.highScore > 0 && (
                <div className="flex items-center gap-2 mb-4 text-cyber-gold">
                  <Trophy className="w-4 h-4" />
                  <span className="text-sm">High Score: {game.highScore.toLocaleString()}</span>
                </div>
              )}
              <Button variant="default" size="sm" className="w-full" onClick={() => setSelectedGame(game.id)}>
                <Play className="w-4 h-4 mr-2" />
                Play Game
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Game Player Modal */}
      {selectedGame && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedGame(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong rounded-xl p-8 max-w-5xl w-full border border-cyber-purple/30"
          >
            <h2 className="text-3xl font-bold mb-4">
              {games.find(g => g.id === selectedGame)?.title}
            </h2>
            <div className="aspect-video bg-gradient-to-br from-cyber-purple/20 to-cyber-blue/20 rounded-lg mb-4 flex items-center justify-center">
              <div className="text-center">
                <Gamepad2 className="w-16 h-16 text-cyber-purple/50 mx-auto mb-4" />
                <p className="text-foreground/60">Game canvas will be rendered here</p>
                <p className="text-sm text-foreground/40 mt-2">Python game integration coming soon</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="default">Start Game</Button>
              <Button variant="outline" onClick={() => setSelectedGame(null)}>Close</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

