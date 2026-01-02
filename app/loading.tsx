'use client'

import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        {/* Multi-Ring Animated Spinner */}
        <motion.div
          className="w-24 h-24 mx-auto mb-6 relative"
        >
          {/* Ring 1 - Outermost */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyber-blue"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
          {/* Ring 2 */}
          <motion.div
            className="absolute inset-2 rounded-full border-4 border-transparent border-r-cyber-purple"
            animate={{ rotate: -360 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
          />
          {/* Ring 3 */}
          <motion.div
            className="absolute inset-4 rounded-full border-4 border-transparent border-b-cyber-green"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
          {/* Ring 4 */}
          <motion.div
            className="absolute inset-6 rounded-full border-3 border-transparent border-l-cyber-blue"
            animate={{ rotate: -360 }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
          />
          {/* Ring 5 - Innermost */}
          <motion.div
            className="absolute inset-8 rounded-full border-2 border-transparent border-t-cyber-purple"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

        {/* Loading Text */}
        <motion.p
          className="text-lg font-medium bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-green bg-clip-text text-transparent"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          Loading...
        </motion.p>
      </div>
    </div>
  )
}
