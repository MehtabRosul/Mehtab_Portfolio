'use client'

import { useRef, useEffect, useState, useMemo, useCallback, memo } from 'react'
import { motion, useAnimation, useInView, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { GradientText } from '@/components/ui/gradient-text'
import Image from 'next/image'

// Skill data structure
interface SkillData {
  id: string
  title: string
  description: string
  skills: string[]
  colors: {
    primary: string
    secondary: string
    accent: string
  }
  microInteraction?: {
    type: 'tooltip' | 'token-flow' | 'wavefunction'
    content?: string
  }
  avatar?: string
}

const skillsData: SkillData[] = [
  {
    id: 'ai-ml',
    title: 'AI / ML Engineering',
    description: 'Deep expertise in designing, training, evaluating, and deploying intelligent systems.',
    skills: [
      'Machine Learning',
      'Deep Learning',
      'Neural Networks',
      'Model Evaluation & Validation',
      'Interpretability & Explainability',
      'Research-oriented AI design',
    ],
    colors: {
      primary: '#00d9ff',
      secondary: '#0099ff',
      accent: '#5b9aff',
    },
    microInteraction: {
      type: 'tooltip',
      content: 'Models must be correct before they are impressive.',
    },
    avatar: '/avatars/IMG_9781.PNG',
  },
  {
    id: 'llm',
    title: 'LLM Engineering',
    description: 'Building scalable, production-ready large language model systems beyond prompt demos.',
    skills: [
      'Prompt Engineering',
      'Agent Architectures',
      'Tool-calling Systems',
      'Retrieval-Augmented Generation (RAG)',
      'Memory Architectures',
      'LLM Evaluation Strategies',
    ],
    colors: {
      primary: '#a855f7',
      secondary: '#d946ef',
      accent: '#c084fc',
    },
    microInteraction: {
      type: 'token-flow',
    },
    avatar: '/avatars/IMG_9795.PNG',
  },
  {
    id: 'algorithms',
    title: 'Algorithms & Simulations',
    description: 'Using mathematics and logic to model, simulate, and optimize complex systems.',
    skills: [
      'Algorithm Design',
      'Optimization Techniques',
      'Mathematical Modeling',
      'Physics-based Simulations',
      'Computational Logic',
      'Performance Analysis',
    ],
    colors: {
      primary: '#00e6a0',
      secondary: '#00b894',
      accent: '#2dd4bf',
    },
    avatar: '/avatars/IMG_9788.PNG',
  },
  {
    id: 'quantum',
    title: 'Quantum Computing',
    description: 'Actively researching quantum computation as a future computational paradigm.',
    skills: [
      'Quantum Algorithms',
      'Linear Algebra',
      'Quantum Gates & Circuits',
      'Computational Complexity',
      'Physics-grounded Computation',
    ],
    colors: {
      primary: '#ffd700',
      secondary: '#fbbf24',
      accent: '#fcd34d',
    },
    microInteraction: {
      type: 'wavefunction',
    },
    avatar: '/avatars/IMG_9789.PNG',
  },
  {
    id: 'fullstack',
    title: 'Full-Stack & Systems Engineering',
    description: 'End-to-end system building from simulation engines to modern web interfaces.',
    skills: [
      'Python (AI, backend, simulations)',
      'C / C++ (engines, performance systems)',
      'React.js',
      'Next.js',
      'Web-based Visual Systems',
      'Performance Optimization',
    ],
    colors: {
      primary: '#06b6d4',
      secondary: '#6366f1',
      accent: '#14b8a6',
    },
    avatar: '/avatars/IMG_9793.PNG',
  },
]

// Abstract Visual Components
const NeuralNetworkVisual = memo(function NeuralNetworkVisual({ colors, isVisible }: { colors: SkillData['colors']; isVisible: boolean }) {
  const nodes = useMemo(() => {
    const layers = [3, 4, 3, 2]
    const nodePositions: Array<{ x: number; y: number; layer: number; id: number }> = []
    let nodeId = 0
    // Use more vertical space: 15-85% for better size
    const verticalPadding = 15 // Top padding
    const verticalRange = 70 // Range (85% - 15% = 70%)
    layers.forEach((count, layerIndex) => {
      for (let i = 0; i < count; i++) {
        nodePositions.push({
          x: (layerIndex / (layers.length - 1)) * 100,
          y: verticalPadding + (i / (count - 1 || 1)) * verticalRange,
          layer: layerIndex,
          id: nodeId++,
        })
      }
    })
    return nodePositions
  }, [])

  // Signal propagation state
  const [activeSignalPath, setActiveSignalPath] = useState<number[]>([])
  const [activeEdges, setActiveEdges] = useState<Set<string>>(new Set())

  // Generate signal paths with many random combinations
  const generateSignalPath = useCallback(() => {
    if (!isVisible) return

    // More random cluster sizes: 1-4 nodes
    const inputNodes = nodes.filter((n) => n.layer === 0)
    const clusterSize = Math.floor(Math.random() * 4) + 1 // 1-4 nodes for more variety
    const selectedInputs = inputNodes
      .sort(() => Math.random() - 0.5)
      .slice(0, clusterSize)
      .map((n) => n.id)

    // Build multiple propagation paths with random variations
    const path: number[] = []
    const edges: Set<string> = new Set()

    selectedInputs.forEach((startNodeId) => {
      let currentNode = nodes.find((n) => n.id === startNodeId)!
      path.push(currentNode.id)

      // Random propagation depth (sometimes skip layers, sometimes go through all)
      const maxDepth = Math.random() > 0.3 ? 3 : Math.floor(Math.random() * 2) + 2
      
      // Propagate through layers with random variations
      for (let layer = 0; layer < maxDepth; layer++) {
        const nextLayerNodes = nodes.filter((n) => n.layer === currentNode.layer + 1)
        if (nextLayerNodes.length === 0) break

        // Random selection: sometimes pick closest, sometimes random, sometimes multiple targets
        let target
        if (Math.random() > 0.7 && nextLayerNodes.length > 1) {
          // 30% chance to branch to multiple targets
          const targets = nextLayerNodes
            .sort(() => Math.random() - 0.5)
            .slice(0, Math.floor(Math.random() * 2) + 1)
          targets.forEach((t) => {
            edges.add(`${currentNode.id}-${t.id}`)
            path.push(t.id)
          })
          target = targets[0]
        } else {
          // Random target selection
          target = nextLayerNodes[Math.floor(Math.random() * nextLayerNodes.length)]
          edges.add(`${currentNode.id}-${target.id}`)
          path.push(target.id)
        }
        currentNode = target
      }
    })

    setActiveSignalPath(path)
    setActiveEdges(edges)

    // Variable burst duration for more randomness
    const burstDuration = 300 + Math.random() * 200 // 300-500ms
    setTimeout(() => {
      setActiveSignalPath([])
      setActiveEdges(new Set())
    }, burstDuration)
  }, [isVisible, nodes])

  // Trigger signal propagation with pauses
  useEffect(() => {
    if (!isVisible) {
      setActiveSignalPath([])
      setActiveEdges(new Set())
      return
    }

    let interval: NodeJS.Timeout | null = null

    // Initial delay
    const initialTimeout = setTimeout(() => {
      generateSignalPath()

      // Set up interval with variable pauses for more randomness
      interval = setInterval(() => {
        generateSignalPath()
      }, 1000 + Math.random() * 2000) // 1-3s pause (more variation)
    }, 500)

    return () => {
      clearTimeout(initialTimeout)
      if (interval) clearInterval(interval)
    }
  }, [isVisible, generateSignalPath])

  return (
    <div className="relative w-full h-full opacity-40" style={{ willChange: isVisible ? 'contents' : 'auto' }}>
      <svg viewBox="0 0 200 200" className="w-full h-full" style={{ willChange: isVisible ? 'transform' : 'auto' }}>
        {/* Static connections */}
        {nodes.map((node) => {
          const nextLayerNodes = nodes.filter((n) => n.layer === node.layer + 1)
          return nextLayerNodes.map((target) => {
            const edgeKey = `${node.id}-${target.id}`
            const isActive = activeEdges.has(edgeKey)
            return (
              <motion.line
                key={edgeKey}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${target.x}%`}
                y2={`${target.y}%`}
                stroke={isActive ? colors.primary : colors.primary}
                strokeWidth={isActive ? '1' : '0.5'}
                opacity={isActive ? '0.8' : '0.2'}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isVisible ? { pathLength: 1, opacity: isActive ? 0.8 : 0.2 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: isActive ? 0.3 : 1.5, ease: isActive ? 'easeOut' : 'easeInOut' }}
              />
            )
          })
        })}
        {/* Nodes with signal propagation */}
        {nodes.map((node) => {
          const isActive = activeSignalPath.includes(node.id)
          return (
            <motion.circle
              key={node.id}
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={isActive ? '4' : '3'}
              fill={colors.primary}
              initial={{ scale: 0, opacity: 0 }}
              animate={
                isVisible
                  ? {
                      scale: isActive ? [1, 1.3, 1] : 1,
                      opacity: isActive ? [0.8, 1, 0.8] : 0.4,
                    }
                  : { scale: 0, opacity: 0 }
              }
              transition={{
                duration: isActive ? 0.3 : 0.5,
                delay: isActive ? 0 : 0,
                ease: isActive ? 'easeOut' : 'easeInOut',
              }}
            />
          )
        })}
      </svg>
    </div>
  )
})

// Particle component for continuous animation
function Particle({ 
  id, 
  path, 
  duration, 
  speed, 
  color, 
  pipelineStages, 
  branchIndex,
  onComplete
}: { 
  id: number
  path: 'raw-processing' | number
  duration: number
  speed: number
  color: string
  pipelineStages: Array<{ x: number; y: number; width: number; height: number }>
  branchIndex?: number
  onComplete?: () => void
}) {
  const progress = useMotionValue(0)
  const glowIntensity = useMotionValue(0.6)

  // Calculate position based on progress
  const getPosition = (p: number) => {
    if (path === 'raw-processing') {
      const startX = pipelineStages[0].x + pipelineStages[0].width
      const endX = pipelineStages[1].x
      const y = pipelineStages[0].y + pipelineStages[0].height / 2
      return {
        x: startX + (endX - startX) * p,
        y,
      }
    } else {
      const branchStage = pipelineStages[2 + path]
      const startX = pipelineStages[1].x + pipelineStages[1].width
      const endX = branchStage.x
      const y = branchStage.y + branchStage.height / 2
      return {
        x: startX + (endX - startX) * p,
        y,
      }
    }
  }

  const x = useTransform(progress, (p) => {
    const pos = getPosition(p)
    return `${pos.x}%`
  })

  const y = useTransform(progress, (p) => {
    const pos = getPosition(p)
    return `${pos.y}%`
  })

  const glowOpacity = useTransform(glowIntensity, (g) => g)
  const glowOuterOpacity = useTransform(glowIntensity, (g) => g * 0.3)

  useEffect(() => {
    // Animation logic
    const animate = () => {
      progress.set(0)
      glowIntensity.set(0.6)

      const startTime = Date.now()
      let hasCalledOnComplete = false
      
      const update = () => {
        const elapsed = Date.now() - startTime
        const normalizedProgress = (elapsed / duration) % 1

        if (normalizedProgress < 1) {
          progress.set(normalizedProgress * speed)
          
          // Glow intensifies at stage boundaries (0.5 progress = middle of path)
          const distanceToBoundary = Math.abs(normalizedProgress - 0.5)
          const glow = 0.6 + (1 - distanceToBoundary * 2) * 0.4
          glowIntensity.set(Math.max(0.6, Math.min(1, glow)))
          
          requestAnimationFrame(update)
        } else {
          // Path completed
          if (path === 'raw-processing' && onComplete && !hasCalledOnComplete) {
            // For Raw Data → Processing path, call onComplete to trigger split
            hasCalledOnComplete = true
            onComplete()
          } else if (path !== 'raw-processing') {
            // For branch paths, loop continuously
            requestAnimationFrame(animate)
          }
        }
      }
      requestAnimationFrame(update)
    }
    animate()
  }, [duration, speed, progress, glowIntensity, path, onComplete])

  return (
    <motion.g filter="url(#glow)">
      {/* Outer glow layer */}
      <motion.circle
        cx={x}
        cy={y}
        r="5"
        fill={color}
        opacity={glowOuterOpacity}
      />
      {/* Core particle */}
      <motion.circle
        cx={x}
        cy={y}
        r="3"
        fill={color}
        opacity={glowOpacity}
        style={{
          filter: `drop-shadow(0 0 6px ${color})`,
        }}
      />
    </motion.g>
  )
}

const TokenFlowVisual = memo(function TokenFlowVisual({ colors, isVisible, isActive }: { colors: SkillData['colors']; isVisible: boolean; isActive: boolean }) {
  // ML Pipeline stages - ALL REQUIRED
  const pipelineStages = useMemo(() => {
    return [
      { name: 'Raw Data', x: 10, y: 50, width: 25, height: 10 },
      { name: 'Processing', x: 40, y: 50, width: 30, height: 10 },
      // Parallel branches
      { name: 'Clustering', x: 75, y: 25, width: 25, height: 10, branchColor: '#8b5cf6' },
      { name: 'Training', x: 75, y: 40, width: 25, height: 10, branchColor: '#ec4899' },
      { name: 'Evaluation', x: 75, y: 55, width: 25, height: 10, branchColor: '#a78bfa' },
      { name: 'Inference', x: 75, y: 70, width: 25, height: 10, branchColor: '#f472b6' },
    ]
  }, [])

  // Branch colors for parallel processing
  const branchColors = ['#8b5cf6', '#ec4899', '#a78bfa', '#f472b6']

  return (
    <div className="relative w-full h-full opacity-40" style={{ willChange: isVisible ? 'contents' : 'auto' }}>
      <svg viewBox="0 0 200 200" className="w-full h-full" style={{ willChange: isVisible ? 'transform' : 'auto' }}>
        {/* SVG filter for glow effect */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Pipeline stages with constant glowing animation */}
        {pipelineStages.map((stage, i) => {
          const stageColor = stage.branchColor || colors.primary
          return (
            <motion.g key={stage.name}>
              {/* Glowing box with constant pulse animation */}
              <motion.rect
                x={`${stage.x}%`}
                y={`${stage.y}%`}
                width={`${stage.width}%`}
                height={`${stage.height}%`}
                fill="none"
                stroke={stageColor}
                strokeWidth="2"
                rx="3"
                initial={{ opacity: 0 }}
                animate={
                  isVisible
                    ? {
                        opacity: [0.4, 0.8, 0.4],
                        filter: [
                          `drop-shadow(0 0 4px ${stageColor})`,
                          `drop-shadow(0 0 12px ${stageColor})`,
                          `drop-shadow(0 0 4px ${stageColor})`,
                        ],
                      }
                    : { opacity: 0 }
                }
                transition={{
                  duration: 2 + i * 0.3, // Different duration for each box
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.2,
                }}
              />
              {/* Text label */}
              <motion.text
                x={`${stage.x + stage.width / 2}%`}
                y={`${stage.y + stage.height / 2}%`}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={stageColor}
                fontSize="8"
                fontFamily="monospace"
                fontWeight="600"
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 0.9 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 + 0.3 }}
              >
                {stage.name}
              </motion.text>
            </motion.g>
          )
        })}

        {/* Static connection lines: Raw Data → Processing */}
        <motion.line
          x1={`${pipelineStages[0].x + pipelineStages[0].width}%`}
          y1={`${pipelineStages[0].y + pipelineStages[0].height / 2}%`}
          x2={`${pipelineStages[1].x}%`}
          y2={`${pipelineStages[1].y + pipelineStages[1].height / 2}%`}
          stroke={colors.primary}
          strokeWidth="1.5"
          opacity="0.5"
          markerEnd="url(#arrowhead-right)"
          initial={{ pathLength: 0 }}
          animate={isVisible ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        />

        {/* Static parallel branches: Processing → Clustering/Training/Evaluation/Inference */}
        {pipelineStages.slice(2).map((branch, i) => (
          <motion.g key={`branch-${i}`}>
            <motion.line
              x1={`${pipelineStages[1].x + pipelineStages[1].width}%`}
              y1={`${pipelineStages[1].y + pipelineStages[1].height / 2}%`}
              x2={`${branch.x}%`}
              y2={`${branch.y + branch.height / 2}%`}
              stroke={branch.branchColor || colors.primary}
              strokeWidth="1.5"
              opacity="0.5"
              markerEnd="url(#arrowhead-right)"
              initial={{ pathLength: 0 }}
              animate={isVisible ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
            />
          </motion.g>
        ))}

        {/* Arrow marker */}
        <defs>
          <marker
            id="arrowhead-right"
            markerWidth="8"
            markerHeight="8"
            refX="4"
            refY="4"
            orient="auto"
          >
            <polygon points="0,0 8,4 0,8" fill={colors.primary} opacity="0.6" />
          </marker>
        </defs>
      </svg>
    </div>
  )
})

const GraphVisual = memo(function GraphVisual({ colors, isVisible }: { colors: SkillData['colors']; isVisible: boolean }) {
  const nodes = useMemo(() => {
    // Expand the grid to use more space: wider spacing and more vertical range
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: 10 + (i % 4) * 28, // Increased from 20 + 25 to 10 + 28 (wider spread)
      y: 10 + Math.floor(i / 4) * 35, // Increased from 20 + 30 to 10 + 35 (taller spread)
      connections: [i + 1, i + 4].filter((id) => id < 12),
    }))
  }, [])

  // Define many possible paths through the grid for more combinations
  const paths = useMemo(() => {
    return [
      // Horizontal paths
      [0, 1, 5, 9],
      [1, 2, 6, 10],
      [2, 3, 7, 11],
      // Vertical paths
      [0, 4, 8, 9],
      [1, 5, 9, 10],
      [2, 6, 10, 11],
      // Diagonal paths
      [0, 1, 2, 6, 10],
      [0, 4, 5, 6, 10],
      [1, 5, 6, 7, 11],
      [2, 1, 0, 4, 8],
      // Zigzag paths
      [0, 1, 5, 4, 8],
      [3, 2, 6, 5, 9],
      [0, 4, 5, 1, 2],
      [3, 7, 6, 10, 9],
      // Long paths
      [0, 1, 2, 3, 7, 11],
      [0, 4, 8, 9, 10, 11],
      [3, 2, 1, 0, 4, 8],
      // Short paths
      [0, 1, 5],
      [2, 6, 10],
      [3, 7, 11],
      [0, 4, 8],
      // Complex paths
      [0, 1, 5, 9, 10, 6, 2],
      [3, 7, 6, 2, 1, 5, 9],
      [0, 4, 5, 1, 2, 6, 10],
    ]
  }, [])

  const [activePath, setActivePath] = useState<number[]>([])
  const [activeNodeIndex, setActiveNodeIndex] = useState(0)
  const [isRollback, setIsRollback] = useState(false)
  const currentPathRef = useRef<number[]>([])

  useEffect(() => {
    if (!isVisible) {
      setActivePath([])
      setActiveNodeIndex(0)
      setIsRollback(false)
      currentPathRef.current = []
      return
    }

    // Select a random path
    const selectedPath = paths[Math.floor(Math.random() * paths.length)]
    setActivePath(selectedPath)
    currentPathRef.current = selectedPath
    setActiveNodeIndex(0)
    setIsRollback(false)

    // Step-based activation with discrete timing (no smooth waves)
    const stepInterval = setInterval(() => {
      setActiveNodeIndex((prev) => {
        const currentPath = currentPathRef.current
        if (isRollback) {
          if (prev <= 0) {
            setIsRollback(false)
            // Switch to new path randomly
            const newPath = paths[Math.floor(Math.random() * paths.length)]
            setActivePath(newPath)
            currentPathRef.current = newPath
            return 0
          }
          // Discrete step backward (no interpolation)
          return prev - 1
        } else {
          if (prev >= currentPath.length - 1) {
            // Decision point: rollback, jump, or new path
            const randomAction = Math.random()
            if (randomAction < 0.3) {
              // Rollback (optimization behavior)
              setIsRollback(true)
              return prev
            } else if (randomAction < 0.5) {
              // Jump to random position (exploration)
              return Math.floor(Math.random() * currentPath.length)
            } else {
              // Switch to new path (new exploration)
              const newPath = paths[Math.floor(Math.random() * paths.length)]
              setActivePath(newPath)
              currentPathRef.current = newPath
              return 0
            }
          }
          // Discrete step forward (no smooth interpolation)
          return prev + 1
        }
      })
    }, 400) // Slower discrete step delay

    // Switch paths at random intervals for more variety
    const pathSwitchInterval = setInterval(() => {
      const newPath = paths[Math.floor(Math.random() * paths.length)]
      setActivePath(newPath)
      currentPathRef.current = newPath
      setActiveNodeIndex(Math.floor(Math.random() * newPath.length)) // Random starting position
      setIsRollback(false)
    }, 6000 + Math.random() * 4000) // 6-10 seconds (slower variation)

    return () => {
      clearInterval(stepInterval)
      clearInterval(pathSwitchInterval)
    }
  }, [isVisible, paths, isRollback])

  return (
    <div className="relative w-full h-full opacity-40" style={{ willChange: isVisible ? 'contents' : 'auto' }}>
      <svg viewBox="0 0 200 200" className="w-full h-full" style={{ willChange: isVisible ? 'transform' : 'auto' }}>
        {/* Static connections */}
        {nodes.map((node) =>
          node.connections.map((targetId) => {
            const target = nodes[targetId]
            if (!target) return null
            const isInPath =
              activePath.length > 0 &&
              activePath.includes(node.id) &&
              activePath.includes(targetId) &&
              Math.abs(activePath.indexOf(node.id) - activePath.indexOf(targetId)) === 1

            return (
              <motion.line
                key={`${node.id}-${targetId}`}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${target.x}%`}
                y2={`${target.y}%`}
                stroke={isInPath ? colors.primary : colors.primary}
                strokeWidth={isInPath ? '1.5' : '0.5'}
                opacity={isInPath ? '0.6' : '0.2'}
                initial={{ pathLength: 0 }}
                animate={isVisible ? { pathLength: 1, opacity: isInPath ? 0.6 : 0.2 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />
            )
          })
        )}
        {/* Nodes with step-based activation */}
        {nodes.map((node) => {
          const isActive = activePath.length > 0 && activePath[activeNodeIndex] === node.id
          const isInPath = activePath.includes(node.id)
          const pathIndex = activePath.indexOf(node.id)

          return (
            <motion.g key={node.id}>
              <motion.circle
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r={isActive ? '5' : isInPath ? '4' : '3'}
                fill={isActive ? colors.primary : isInPath ? colors.secondary : colors.primary}
                initial={{ scale: 0, opacity: 0 }}
                animate={
                  isVisible
                    ? {
                        scale: isActive ? [1, 1.2, 1] : isInPath ? 1 : 0.8,
                        opacity: isActive ? [0.8, 1, 0.8] : isInPath ? 0.6 : 0.3,
                      }
                    : { scale: 0, opacity: 0 }
                }
                transition={{
                  duration: isActive ? 0.4 : 0.3, // Slower animation
                  delay: isActive ? 0 : 0, // No staggered delays for discrete steps
                  ease: 'easeOut',
                }}
              />
            </motion.g>
          )
        })}
      </svg>
    </div>
  )
})

const QuantumCircuitVisual = memo(function QuantumCircuitVisual({ colors, isVisible, isActive }: { colors: SkillData['colors']; isVisible: boolean; isActive: boolean }) {
  // Quantum circuit: 3 qubits with gates
  const qubits = useMemo(() => {
    return [
      { id: 0, y: 30, label: '|0⟩' },
      { id: 1, y: 50, label: '|0⟩' },
      { id: 2, y: 70, label: '|0⟩' },
    ]
  }, [])

  // Gates on circuit: H (Hadamard) on first qubit, then CNOT, then measurement
  const gates = useMemo(() => {
    return [
      { type: 'H', qubit: 0, x: 25, label: 'H' }, // Hadamard on qubit 0
      { type: 'X', qubit: 1, x: 25, label: 'X' }, // X gate on qubit 1
      { type: 'CNOT', qubit: 0, x: 50, controlQubit: 1, label: '⊕' }, // CNOT: control=0, target=1
      { type: 'M', qubit: 0, x: 75, label: 'M' }, // Measurement
      { type: 'M', qubit: 1, x: 75, label: 'M' }, // Measurement
      { type: 'M', qubit: 2, x: 75, label: 'M' }, // Measurement
    ]
  }, [])

  // Always-on superposition: each qubit has 2-4 ghost states continuously
  const [ghostStates, setGhostStates] = useState<Array<{ 
    qubit: number
    id: number
    state: number
    phase: number // For out-of-phase interference
    offsetX: number
    offsetY: number
    baseOpacity: number
  }>>([])

  const [isCollapsed, setIsCollapsed] = useState(false)

  // Initialize ghost states for all qubits (always-on)
  useEffect(() => {
    if (!isVisible) {
      setGhostStates([])
      setIsCollapsed(false)
      return
    }

    // Initialize: each qubit gets 2-4 ghost states
    const initialStates: typeof ghostStates = []
    qubits.forEach((qubit) => {
      const numStates = 2 + Math.floor(Math.random() * 3) // 2-4 states
      for (let i = 0; i < numStates; i++) {
        initialStates.push({
          qubit: qubit.id,
          id: qubit.id * 10 + i,
          state: Math.floor(Math.random() * 2), // 0 or 1
          phase: Math.random() * Math.PI * 2, // Random phase for interference
          offsetX: (Math.random() - 0.5) * 8, // Slight position offset
          offsetY: (Math.random() - 0.5) * 4,
          baseOpacity: 0.2 + Math.random() * 0.3, // Different base opacity
        })
      }
    })
    setGhostStates(initialStates)
  }, [isVisible, qubits])

  // Random state evolution every 2-4 seconds (truly non-deterministic)
  useEffect(() => {
    if (!isVisible || isCollapsed) return

    const evolutionInterval = setInterval(() => {
      // Use Date.now() as seed for true randomness, different per qubit
      const timeSeed = Date.now()
      
      setGhostStates((prev) => {
        // Group states by qubit for independent evolution
        const statesByQubit = new Map<number, typeof prev>()
        prev.forEach((state) => {
          if (!statesByQubit.has(state.qubit)) {
            statesByQubit.set(state.qubit, [])
          }
          statesByQubit.get(state.qubit)!.push(state)
        })

        const newStates: typeof prev = []
        
        // Evolve each qubit independently with different randomness
        qubits.forEach((qubit) => {
          const qubitStates = statesByQubit.get(qubit.id) || []
          // Randomly change number of states (2-4 per qubit)
          const numStates = 2 + Math.floor((timeSeed + qubit.id * 1000) % 3)
          
          // Regenerate states with new random properties
          for (let i = 0; i < numStates; i++) {
            const seed = timeSeed + qubit.id * 1000 + i * 100
            // Use seed-based pseudo-random for reproducibility within frame, but seed changes each evolution
            const r1 = ((seed * 9301 + 49297) % 233280) / 233280
            const r2 = ((seed * 9301 + 49297 + 1) % 233280) / 233280
            const r3 = ((seed * 9301 + 49297 + 2) % 233280) / 233280
            const r4 = ((seed * 9301 + 49297 + 3) % 233280) / 233280
            
            newStates.push({
              qubit: qubit.id,
              id: qubit.id * 100 + i + timeSeed, // Unique ID with time seed
              state: Math.floor(r1 * 2), // 0 or 1
              phase: r2 * Math.PI * 2, // Random phase (0 to 2π)
              offsetX: (r3 - 0.5) * 8, // Slight position offset
              offsetY: (r4 - 0.5) * 4,
              baseOpacity: 0.2 + r1 * 0.3, // Different base opacity
            })
          }
        })
        
        return newStates
      })
    }, 2000 + Math.random() * 2000) // 2-4 seconds (non-deterministic interval)

    return () => clearInterval(evolutionInterval)
  }, [isVisible, isCollapsed, qubits])

  // Interference effect: opacity oscillates out of phase (never synchronized)
  useEffect(() => {
    if (!isVisible || isCollapsed) return

    const interferenceInterval = setInterval(() => {
      const time = Date.now() / 1000 // Time in seconds
      setGhostStates((prev) =>
        prev.map((state) => {
          // Each state has different frequency for true interference
          // Use state.id as seed for frequency variation
          const frequency = 1.5 + (state.id % 10) * 0.3 // Different frequency per state (1.5-4.5 Hz)
          // Out-of-phase oscillation using sine waves with different phases and frequencies
          const interference = Math.sin(time * frequency + state.phase) * 0.2
          // Some states cancel, others reinforce (based on phase relationships)
          const cancellation = Math.sin(time * frequency * 2 + state.phase * 2) * 0.1
          return {
            ...state,
            baseOpacity: Math.max(0.1, Math.min(0.6, 0.2 + interference + cancellation)),
          }
        })
      )
    }, 16) // ~60fps for smooth interference

    return () => clearInterval(interferenceInterval)
  }, [isVisible, isCollapsed])

  // Spontaneous collapse every 10-15s (irregular intervals, non-deterministic)
  useEffect(() => {
    if (!isVisible) return

    const scheduleCollapse = () => {
      const delay = 10000 + Math.random() * 5000 // 10-15 seconds (irregular)
      const timeoutId = setTimeout(() => {
        setIsCollapsed(true)
        // After 1s, resume superposition with new random states
        setTimeout(() => {
          setIsCollapsed(false)
          // Reinitialize ghost states with new random properties
          const timeSeed = Date.now()
          const newStates: typeof ghostStates = []
          qubits.forEach((qubit) => {
            const numStates = 2 + Math.floor(Math.random() * 3) // 2-4 states
            for (let i = 0; i < numStates; i++) {
              const seed = timeSeed + qubit.id * 1000 + i * 100
              const r1 = ((seed * 9301 + 49297) % 233280) / 233280
              const r2 = ((seed * 9301 + 49297 + 1) % 233280) / 233280
              const r3 = ((seed * 9301 + 49297 + 2) % 233280) / 233280
              const r4 = ((seed * 9301 + 49297 + 3) % 233280) / 233280
              
              newStates.push({
                qubit: qubit.id,
                id: qubit.id * 100 + i + timeSeed, // Unique ID
                state: Math.floor(r1 * 2),
                phase: r2 * Math.PI * 2,
                offsetX: (r3 - 0.5) * 8,
                offsetY: (r4 - 0.5) * 4,
                baseOpacity: 0.2 + r1 * 0.3,
              })
            }
          })
          setGhostStates(newStates)
          // Schedule next collapse (irregular interval)
          scheduleCollapse()
        }, 1000)
      }, delay)
      
      return timeoutId
    }

    const timeoutId = scheduleCollapse()
    return () => clearTimeout(timeoutId)
  }, [isVisible, qubits])

  return (
    <div className="relative w-full h-full opacity-40" style={{ willChange: isVisible ? 'contents' : 'auto' }}>
      <svg viewBox="0 0 200 200" className="w-full h-full" style={{ willChange: isVisible ? 'transform' : 'auto' }}>
        {/* Qubit wires (horizontal lines) */}
        {qubits.map((qubit) => (
          <motion.g key={qubit.id}>
            <motion.line
              x1="10%"
              y1={`${qubit.y}%`}
              x2="90%"
              y2={`${qubit.y}%`}
              stroke={colors.primary}
              strokeWidth="1.5"
              opacity="0.4"
              initial={{ pathLength: 0 }}
              animate={isVisible ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.8, delay: qubit.id * 0.15 }}
            />
            {/* Qubit label */}
            <motion.text
              x="5%"
              y={`${qubit.y}%`}
              dominantBaseline="middle"
              fill={colors.secondary}
              fontSize="10"
              fontFamily="monospace"
              fontWeight="600"
              opacity="0.8"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 0.8 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: qubit.id * 0.15 + 0.3 }}
            >
              {qubit.label}
            </motion.text>
          </motion.g>
        ))}

        {/* Gates */}
        {gates.map((gate, idx) => {
          const qubitY = qubits[gate.qubit].y
          const isMeasurement = gate.type === 'M'
          const isCNOT = gate.type === 'CNOT'

          return (
            <motion.g key={`gate-${idx}`}>
              {isCNOT ? (
                // CNOT gate: control (filled) + target (X)
                <>
                  <motion.circle
                    cx={`${gate.x}%`}
                    cy={`${qubits[gate.controlQubit || 0].y}%`}
                    r="4"
                    fill={colors.primary}
                    stroke={colors.primary}
                    strokeWidth="1.5"
                    opacity="0.8"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isVisible ? { scale: 1, opacity: 0.8 } : { scale: 0, opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + idx * 0.1 }}
                  />
                  <motion.line
                    x1={`${gate.x}%`}
                    y1={`${qubits[gate.controlQubit || 0].y}%`}
                    x2={`${gate.x}%`}
                    y2={`${qubitY}%`}
                    stroke={colors.primary}
                    strokeWidth="1.5"
                    opacity="0.6"
                    initial={{ pathLength: 0 }}
                    animate={isVisible ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 + idx * 0.1 }}
                  />
                  <motion.circle
                    cx={`${gate.x}%`}
                    cy={`${qubitY}%`}
                    r="6"
                    fill="none"
                    stroke={colors.primary}
                    strokeWidth="2"
                    opacity="0.8"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isVisible ? { scale: 1, opacity: 0.8 } : { scale: 0, opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 + idx * 0.1 }}
                  />
                  <motion.line
                    x1={`${gate.x - 3}%`}
                    y1={`${qubitY - 3}%`}
                    x2={`${gate.x + 3}%`}
                    y2={`${qubitY + 3}%`}
                    stroke={colors.primary}
                    strokeWidth="1.5"
                    opacity="0.9"
                    initial={{ pathLength: 0 }}
                    animate={isVisible ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 0.2, delay: 0.8 + idx * 0.1 }}
                  />
                  <motion.line
                    x1={`${gate.x - 3}%`}
                    y1={`${qubitY + 3}%`}
                    x2={`${gate.x + 3}%`}
                    y2={`${qubitY - 3}%`}
                    stroke={colors.primary}
                    strokeWidth="1.5"
                    opacity="0.9"
                    initial={{ pathLength: 0 }}
                    animate={isVisible ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 0.2, delay: 0.85 + idx * 0.1 }}
                  />
                </>
              ) : isMeasurement ? (
                // Measurement gate
                <motion.g>
                  <motion.rect
                    x={`${gate.x - 4}%`}
                    y={`${qubitY - 6}%`}
                    width="8"
                    height="12"
                    fill="none"
                    stroke={colors.accent}
                    strokeWidth="2"
                    rx="2"
                    opacity="0.8"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isVisible ? { scale: 1, opacity: 0.8 } : { scale: 0, opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + idx * 0.1 }}
                  />
                  <motion.line
                    x1={`${gate.x}%`}
                    y1={`${qubitY - 6}%`}
                    x2={`${gate.x}%`}
                    y2={`${qubitY + 6}%`}
                    stroke={colors.accent}
                    strokeWidth="1.5"
                    opacity="0.9"
                    initial={{ pathLength: 0 }}
                    animate={isVisible ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 + idx * 0.1 }}
                  />
                </motion.g>
              ) : (
                // Standard gate (H, X)
                <motion.rect
                  x={`${gate.x - 5}%`}
                  y={`${qubitY - 5}%`}
                  width="10"
                  height="10"
                  fill="none"
                  stroke={colors.primary}
                  strokeWidth="2"
                  rx="2"
                  opacity="0.8"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isVisible ? { scale: 1, opacity: 0.8 } : { scale: 0, opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + idx * 0.1 }}
                />
              )}

              {/* Gate label */}
              <motion.text
                x={`${gate.x}%`}
                y={`${qubitY}%`}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={colors.secondary}
                fontSize="9"
                fontFamily="monospace"
                fontWeight="700"
                opacity="0.9"
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 0.9 } : { opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.6 + idx * 0.1 }}
              >
                {gate.label}
              </motion.text>
            </motion.g>
          )
        })}

        {/* Always-on ghost states (superposition) */}
        {!isCollapsed &&
          ghostStates.map((ghost) => {
            const qubitY = qubits[ghost.qubit].y
            const gateX = gates.find((g) => g.type === 'H' && g.qubit === ghost.qubit)?.x || 25
            const x = gateX + 15 + ghost.state * 10 + ghost.offsetX
            const y = qubitY + ghost.offsetY

            return (
              <motion.circle
                key={`ghost-${ghost.id}`}
                cx={`${x}%`}
                cy={`${y}%`}
                r="3"
                fill={colors.primary}
                opacity={ghost.baseOpacity}
                animate={{
                  opacity: ghost.baseOpacity,
                  scale: [0.8, 1.1, 0.8],
                }}
                transition={{
                  duration: 1 + Math.random() * 0.5, // Non-deterministic
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
                style={{
                  filter: `drop-shadow(0 0 4px ${colors.primary})`,
                }}
              />
            )
          })}

        {/* Spontaneous collapse: all ghost states fade into one */}
        {isCollapsed && (
          <motion.g>
            {qubits.map((qubit) => {
              const measurementX = gates.find((g) => g.type === 'M' && g.qubit === qubit.id)?.x || 75
              const collapsedState = Math.floor(Math.random() * 2) // Random collapse result
              return (
                <motion.g key={`collapsed-${qubit.id}`}>
                  <motion.circle
                    cx={`${measurementX + 5}%`}
                    cy={`${qubit.y}%`}
                    r="4"
                    fill={colors.accent}
                    opacity="1"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 1.3, 1],
                      opacity: [0, 1, 1],
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 200,
                      damping: 15,
                    }}
                    style={{
                      filter: `drop-shadow(0 0 6px ${colors.accent})`,
                    }}
                  />
                  <motion.text
                    x={`${measurementX + 5}%`}
                    y={`${qubit.y + 8}%`}
                    textAnchor="middle"
                    fill={colors.accent}
                    fontSize="8"
                    fontFamily="monospace"
                    fontWeight="700"
                    opacity="0.9"
                  >
                    |{collapsedState}⟩
                  </motion.text>
                </motion.g>
              )
            })}
          </motion.g>
        )}
      </svg>
    </div>
  )
})

// Continuous pulse component
function ContinuousPulse({
  id,
  type,
  duration,
  speed,
  startOffset,
  entities,
  colors,
  horizontalJitter,
}: {
  id: number
  type: 'request' | 'response'
  duration: number
  speed: number
  startOffset: number
  entities: Array<{ y: number; height: number }>
  colors: SkillData['colors']
  horizontalJitter: number
}) {
  const progress = useMotionValue(0)

  useEffect(() => {
    const startTime = Date.now() - startOffset
    const update = () => {
      const elapsed = Date.now() - startTime
      const normalizedProgress = (elapsed / duration) % 1 // Continuous loop with modulo
      progress.set(normalizedProgress * speed)
      requestAnimationFrame(update)
    }
    requestAnimationFrame(update)
  }, [duration, speed, startOffset, progress])

  const y = useTransform(progress, (p) => {
    if (type === 'request') {
      // Request flows downward: Frontend (0) → Database (3)
      const totalLayers = entities.length - 1
      const layerProgress = (p * totalLayers) % 1
      const currentLayer = Math.floor(p * totalLayers) % totalLayers
      const startY = entities[currentLayer].y + entities[currentLayer].height / 2
      const endY = entities[Math.min(currentLayer + 1, entities.length - 1)].y + entities[Math.min(currentLayer + 1, entities.length - 1)].height / 2
      return startY + (endY - startY) * layerProgress
    } else {
      // Response flows upward: Database (3) → Frontend (0)
      const totalLayers = entities.length - 1
      const layerProgress = (p * totalLayers) % 1
      const currentLayer = entities.length - 1 - (Math.floor(p * totalLayers) % totalLayers)
      const startY = entities[currentLayer].y + entities[currentLayer].height / 2
      const endY = entities[Math.max(currentLayer - 1, 0)].y + entities[Math.max(currentLayer - 1, 0)].height / 2
      return startY - (startY - endY) * layerProgress
    }
  })

  const x = useMotionValue(50)
  
  // Horizontal jitter for realism
  useEffect(() => {
    const jitterInterval = setInterval(() => {
      x.set(50 + (Math.random() - 0.5) * horizontalJitter)
    }, 100 + Math.random() * 200) // Update jitter every 100-300ms
    return () => clearInterval(jitterInterval)
  }, [x, horizontalJitter])

  const xPercent = useTransform(x, (v) => `${v}%`)
  const yPercent = useTransform(y, (v) => `${v}%`)

  return (
    <motion.rect
      x={xPercent}
      y={yPercent}
      width="8"
      height="4"
      rx="2"
      fill={type === 'request' ? colors.primary : colors.accent}
      opacity="0.9"
      style={{
        filter: `drop-shadow(0 0 6px ${type === 'request' ? colors.primary : colors.accent})`,
      }}
    />
  )
}

// Data packet component for continuous flow along paths
function DataPacket({
  id,
  path,
  duration,
  speed,
  startOffset,
  color,
}: {
  id: number
  path: { x1: number; y1: number; x2: number; y2: number }
  duration: number
  speed: number
  startOffset: number
  color: string
}) {
  const progress = useMotionValue(0)

  useEffect(() => {
    const startTime = Date.now() - startOffset
    const update = () => {
      const elapsed = Date.now() - startTime
      const normalizedProgress = (elapsed / duration) % 1 // Continuous loop
      progress.set(normalizedProgress * speed)
      requestAnimationFrame(update)
    }
    requestAnimationFrame(update)
  }, [duration, speed, startOffset, progress])

  const x = useTransform(progress, (p) => {
    return path.x1 + (path.x2 - path.x1) * p
  })

  const y = useTransform(progress, (p) => {
    return path.y1 + (path.y2 - path.y1) * p
  })

  const xPercent = useTransform(x, (v) => `${v}%`)
  const yPercent = useTransform(y, (v) => `${v}%`)

  return (
    <motion.circle
      cx={xPercent}
      cy={yPercent}
      r="2.5"
      fill={color}
      opacity="0.9"
      style={{
        filter: `drop-shadow(0 0 4px ${color})`,
      }}
    />
  )
}

const ArchitectureVisual = memo(function ArchitectureVisual({ colors, isVisible }: { colors: SkillData['colors']; isVisible: boolean }) {
  // Simple layered stack visualization
  const layers = useMemo(() => {
    return [
      { name: 'Frontend', y: 20, height: 15, color: colors.primary },
      { name: 'API', y: 40, height: 15, color: colors.secondary },
      { name: 'Backend', y: 60, height: 15, color: colors.accent },
      { name: 'Database', y: 80, height: 15, color: colors.primary },
    ]
  }, [colors])


  return (
    <div className="relative w-full h-full opacity-50">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Layers */}
        {layers.map((layer, index) => (
          <motion.g key={layer.name}>
            {/* Layer background */}
            <motion.rect
              x="15%"
              y={`${layer.y}%`}
              width="70%"
              height={`${layer.height}%`}
              fill="none"
              stroke={layer.color}
              strokeWidth="2"
              rx="8"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={
                isVisible
                  ? {
                      opacity: [0.3, 0.6, 0.3],
                      scaleX: 1,
                    }
                  : { opacity: 0, scaleX: 0 }
              }
              transition={{
                opacity: {
                  duration: 2 + index * 0.3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.2,
                },
                scaleX: {
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
            />
            {/* Layer label */}
            <motion.text
              x="50%"
              y={`${layer.y + layer.height / 2}%`}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={layer.color}
              fontSize="10"
              fontFamily="monospace"
              fontWeight="600"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 0.9 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
            >
              {layer.name}
            </motion.text>
            {/* Connecting lines between layers */}
            {index < layers.length - 1 && (
              <motion.line
                x1="50%"
                y1={`${layer.y + layer.height}%`}
                x2="50%"
                y2={`${layers[index + 1].y}%`}
                stroke={layer.color}
                strokeWidth="1.5"
                opacity="0.4"
                initial={{ pathLength: 0 }}
                animate={isVisible ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
              />
            )}
          </motion.g>
        ))}
      </svg>
    </div>
  )
})

// Avatar Component
interface AvatarProps {
  src: string
  colors: SkillData['colors']
  isVisible: boolean
}

const SkillAvatar = memo(function SkillAvatar({ src, colors, isVisible }: AvatarProps) {
  const prefersReducedMotion = useReducedMotion()
  
  const animationVariants = useMemo(() => ({
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
  }), [])

  const transition = useMemo(() => ({
    duration: prefersReducedMotion ? 0 : 0.6,
    delay: prefersReducedMotion ? 0 : 0.2,
    ease: [0.22, 1, 0.36, 1] as const,
  }), [prefersReducedMotion])

  const hoverProps = useMemo(() => 
    prefersReducedMotion
      ? {}
      : {
          scale: 1.1,
          transition: { duration: 0.3 },
        },
  [prefersReducedMotion])

  return (
    <motion.div
      className="relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
      style={{ willChange: isVisible ? 'transform, opacity' : 'auto' }}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={animationVariants}
      transition={transition}
      whileHover={hoverProps}
    >
      <Image
        src={src}
        alt="Avatar"
        fill
        className="object-contain"
        sizes="(max-width: 768px) 64px, (max-width: 1024px) 80px, 96px"
        priority
        loading="eager"
        quality={90}
      />
    </motion.div>
  )
})

// Skill Block Component
interface SkillBlockProps {
  skill: SkillData
  index: number
  isInView: boolean
}

function SkillBlock({ skill, index, isInView }: SkillBlockProps) {
  const blockRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [tokenFlowActive, setTokenFlowActive] = useState(false)
  const [wavefunctionActive, setWavefunctionActive] = useState(false)
  const controls = useAnimation()
  const prefersReducedMotion = useReducedMotion()

  const isLeftAligned = index % 2 === 0

  // Mouse position for parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const x = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.5 })
  const y = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.5 })

  const rotateX = useTransform(y, [-0.5, 0.5], prefersReducedMotion ? ['0deg', '0deg'] : ['2deg', '-2deg'])
  const rotateY = useTransform(x, [-0.5, 0.5], prefersReducedMotion ? ['0deg', '0deg'] : ['-2deg', '2deg'])

  // Optimized mouse move handler using requestAnimationFrame
  const mouseMoveHandler = useCallback((e: MouseEvent) => {
    if (!blockRef.current || prefersReducedMotion) return
    
    requestAnimationFrame(() => {
      if (!blockRef.current) return
      const rect = blockRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      mouseX.set((e.clientX - centerX) / rect.width)
      mouseY.set((e.clientY - centerY) / rect.height)
    })
  }, [mouseX, mouseY, prefersReducedMotion])

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  useEffect(() => {
    const block = blockRef.current
    if (block && !prefersReducedMotion) {
      block.addEventListener('mousemove', mouseMoveHandler, { passive: true })
      return () => {
        block.removeEventListener('mousemove', mouseMoveHandler)
      }
    }
  }, [mouseMoveHandler, prefersReducedMotion])

  // Micro-interactions
  useEffect(() => {
    if (skill.microInteraction?.type === 'token-flow' && isHovered) {
      setTokenFlowActive(true)
      const timer = setTimeout(() => setTokenFlowActive(false), 3000)
      return () => clearTimeout(timer)
    } else {
      setTokenFlowActive(false)
    }
  }, [isHovered, skill.microInteraction])

  useEffect(() => {
    if (skill.microInteraction?.type === 'wavefunction' && isHovered) {
      setWavefunctionActive(true)
    } else {
      setWavefunctionActive(false)
    }
  }, [isHovered, skill.microInteraction])

  // Render appropriate visual - memoized for performance
  const renderVisual = useMemo(() => {
    const visualProps = { colors: skill.colors, isVisible: isInView }
    switch (skill.id) {
      case 'ai-ml':
        return <NeuralNetworkVisual {...visualProps} />
      case 'llm':
        return <TokenFlowVisual {...visualProps} isActive={tokenFlowActive} />
      case 'algorithms':
        return <GraphVisual {...visualProps} />
      case 'quantum':
        return <QuantumCircuitVisual {...visualProps} isActive={wavefunctionActive} />
      case 'fullstack':
        return <ArchitectureVisual {...visualProps} />
      default:
        return null
    }
  }, [skill.id, skill.colors, isInView, tokenFlowActive, wavefunctionActive])

  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  const handleMouseLeave = useCallback(() => setIsHovered(false), [])

  return (
    <motion.article
      ref={blockRef}
      className="relative min-h-[500px] md:min-h-[600px] flex items-center py-16 md:py-24 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: prefersReducedMotion ? 'flat' : 'preserve-3d',
        rotateX: prefersReducedMotion ? 0 : rotateX,
        rotateY: prefersReducedMotion ? 0 : rotateY,
        willChange: prefersReducedMotion ? 'auto' : 'transform',
      }}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: prefersReducedMotion ? 0 : 0.8,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      aria-label={`${skill.title} expertise section`}
    >
      {/* Gradient mesh background */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(ellipse at ${isLeftAligned ? '20%' : '80%'} 50%, ${skill.colors.primary}15, transparent 60%),
                      radial-gradient(ellipse at ${isLeftAligned ? '60%' : '40%'} 30%, ${skill.colors.accent}08, transparent 50%)`,
        }}
        animate={
          isHovered
            ? {
                background: [
                  `radial-gradient(ellipse at ${isLeftAligned ? '20%' : '80%'} 50%, ${skill.colors.primary}20, transparent 60%),
                   radial-gradient(ellipse at ${isLeftAligned ? '60%' : '40%'} 30%, ${skill.colors.accent}12, transparent 50%)`,
                  `radial-gradient(ellipse at ${isLeftAligned ? '30%' : '70%'} 50%, ${skill.colors.secondary}20, transparent 60%),
                   radial-gradient(ellipse at ${isLeftAligned ? '70%' : '30%'} 40%, ${skill.colors.accent}15, transparent 50%)`,
                  `radial-gradient(ellipse at ${isLeftAligned ? '25%' : '75%'} 45%, ${skill.colors.primary}18, transparent 60%),
                   radial-gradient(ellipse at ${isLeftAligned ? '65%' : '35%'} 35%, ${skill.colors.accent}10, transparent 50%)`,
                ],
              }
            : {}
        }
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Glassmorphism overlay */}
      <div
        className="absolute inset-0 -z-5"
        style={{
          background: `linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 100%)`,
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`flex flex-col ${isLeftAligned ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16`}
        >
          {/* Content Side */}
          <motion.div
            className={`flex-1 ${skill.id === 'llm' || skill.id === 'quantum' ? 'text-center md:text-right' : isLeftAligned ? 'md:text-left' : 'md:text-right'} text-center md:text-left`}
            variants={{
              hidden: { opacity: 0, x: isLeftAligned ? -50 : 50 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.8, delay: 0.2 },
              },
            }}
          >
            <motion.h3
              className={`text-3xl md:text-4xl lg:text-5xl font-heading font-black mb-4 flex items-center ${skill.id === 'llm' || skill.id === 'quantum' ? 'justify-center md:justify-end' : 'justify-center md:justify-start'} gap-2 md:gap-3`}
              variants={{
                hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: prefersReducedMotion ? 0 : 0.6,
                    delay: prefersReducedMotion ? 0 : 0.3,
                  },
                },
              }}
            >
              {skill.avatar && (
                <SkillAvatar src={skill.avatar} colors={skill.colors} isVisible={isInView} />
              )}
              <GradientText
                gradientColors={[skill.colors.primary, skill.colors.secondary, skill.colors.accent]}
                duration={5}
                direction="left"
                ease="linear"
                className="font-black"
              >
                {skill.title}
              </GradientText>
            </motion.h3>

            <motion.p
              className={`text-base md:text-lg text-foreground/70 mb-8 leading-relaxed ${skill.id === 'llm' || skill.id === 'quantum' ? 'text-center md:text-right' : 'text-center md:text-left'}`}
              variants={{
                hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: prefersReducedMotion ? 0 : 0.6,
                    delay: prefersReducedMotion ? 0 : 0.4,
                  },
                },
              }}
            >
              {skill.description}
            </motion.p>

            {/* Skills List */}
            <motion.ul
              className={`flex flex-wrap gap-3 ${skill.id === 'llm' || skill.id === 'quantum' ? 'justify-center md:justify-end' : isLeftAligned ? 'justify-start' : 'justify-end md:justify-start'} mb-6`}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.5,
                  },
                },
              }}
            >
              {skill.skills.map((skillItem, idx) => (
                <motion.li
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.8 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      transition: {
                        duration: prefersReducedMotion ? 0 : 0.4,
                      },
                    },
                  }}
                >
                  <motion.span
                    className="inline-block px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border"
                    style={{
                      background: `linear-gradient(135deg, ${skill.colors.primary}15, ${skill.colors.secondary}10)`,
                      borderColor: `${skill.colors.primary}40`,
                      color: skill.colors.primary,
                    }}
                    whileHover={
                      prefersReducedMotion
                        ? {}
                        : {
                            scale: 1.05,
                            background: `linear-gradient(135deg, ${skill.colors.primary}25, ${skill.colors.secondary}20)`,
                            borderColor: `${skill.colors.primary}60`,
                          }
                    }
                    transition={{ duration: 0.2 }}
                    aria-label={`Skill: ${skillItem}`}
                  >
                    {skillItem}
                  </motion.span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Visual Side */}
          <motion.div
            className={`flex-1 w-full relative ${
              skill.id === 'algorithms' 
                ? 'h-[400px] md:h-[500px]' // Larger for Algorithms & Simulations
                : skill.id === 'ai-ml'
                ? 'h-[350px] md:h-[450px]' // Increased height and size for AI/ML
                : 'h-[300px] md:h-[400px]' // Default size
            }`}
            variants={{
              hidden: { opacity: 0, x: prefersReducedMotion ? 0 : isLeftAligned ? 50 : -50 },
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  duration: prefersReducedMotion ? 0 : 0.8,
                  delay: prefersReducedMotion ? 0 : 0.3,
                },
              },
            }}
            aria-hidden="true"
          >
            {renderVisual}
          </motion.div>
        </div>
      </div>
    </motion.article>
  )
}

function SkillBlockWrapper({ skill, index }: { skill: SkillData, index: number }) {
  const blockRef = useRef<HTMLDivElement>(null)
  const isBlockInView = useInView(blockRef, { once: true, amount: 0.2 })

  return (
    <div ref={blockRef}>
      <SkillBlock skill={skill} index={index} isInView={isBlockInView} />
    </div>
  )
}

// Main Component
export function ExpertiseSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 })
  const headerControls = useAnimation()
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (isHeaderInView) {
      headerControls.start('visible')
    }
  }, [isHeaderInView, headerControls])

  return (
    <section
      ref={sectionRef}
      id="expertise"
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ perspective: prefersReducedMotion ? 'none' : '1000px' }}
      aria-label="Expertise and Technical Skills section"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background" />
        {/* Subtle animated particles background */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 15% 30%, rgba(6, 182, 212, 0.12) 0%, transparent 50%),
                             radial-gradient(circle at 75% 60%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 45% 80%, rgba(168, 85, 247, 0.08) 0%, transparent 50%),
                             radial-gradient(circle at 85% 20%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)`,
            willChange: 'background-position',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          className="text-center mb-20 md:mb-32"
          initial="hidden"
          animate={headerControls}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-6"
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.6, delay: 0.2 },
              },
            }}
          >
            <motion.div
              className="h-px w-16 bg-gradient-to-r from-transparent to-cyber-blue/50"
              variants={{
                hidden: { scaleX: 0 },
                visible: {
                  scaleX: 1,
                  transition: { duration: 0.8, delay: 0.4 },
                },
              }}
            />
            <span className="text-xs md:text-sm font-medium text-cyber-blue/80 tracking-[0.2em] uppercase">
              Technical Mastery
            </span>
            <motion.div
              className="h-px w-16 bg-gradient-to-l from-transparent to-cyber-blue/50"
              variants={{
                hidden: { scaleX: 0 },
                visible: {
                  scaleX: 1,
                  transition: { duration: 0.8, delay: 0.4 },
                },
              }}
            />
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-black mb-6"
            variants={{
              hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: prefersReducedMotion ? 0 : 0.8,
                  delay: prefersReducedMotion ? 0 : 0.3,
                },
              },
            }}
          >
            <span className="text-white">Expertise & </span>
            <GradientText
              gradientColors={['#007CF0', '#00DFD8', '#7F00FF', '#007CF0']}
              duration={15}
              direction="left"
              ease="linear"
              className="font-black"
            >
              Technical Skills
            </GradientText>
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-foreground/60 mb-4 font-light"
            variants={{
              hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: prefersReducedMotion ? 0 : 0.8,
                  delay: prefersReducedMotion ? 0 : 0.4,
                },
              },
            }}
          >
            What I Build, Engineer, and Master
          </motion.p>

          <motion.p
            className="text-sm md:text-base text-foreground/50 max-w-2xl mx-auto leading-relaxed"
            variants={{
              hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: prefersReducedMotion ? 0 : 0.8,
                  delay: prefersReducedMotion ? 0 : 0.5,
                },
              },
            }}
          >
            Research-grade skills developed through real systems, simulations, and production work.
          </motion.p>
        </motion.div>

        {/* Skill Blocks */}
        <div className="space-y-8 md:space-y-0">
          {skillsData.map((skill, index) => (
            <SkillBlockWrapper key={skill.id} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

