'use client'

import { motion } from 'framer-motion'
import { FileText, BookOpen, Briefcase } from 'lucide-react'
import { ResourceType } from '@/lib/resources-data'

interface FilterPillsProps {
    activeType: ResourceType | 'all'
    onTypeChange: (type: ResourceType | 'all') => void
    typeCounts: Record<string, number>
    totalCount: number
}

const typeConfig: Record<ResourceType | 'all', { label: string; icon: typeof FileText; color: string }> = {
    'all': { label: 'All Resources', icon: BookOpen, color: '#8b5cf6' },
    'research-paper': { label: 'Research Papers', icon: FileText, color: '#00f0ff' },
    'article': { label: 'Articles', icon: BookOpen, color: '#f472b6' },
    'case-study': { label: 'Case Studies', icon: Briefcase, color: '#10b981' },
}

export function FilterPills({
    activeType,
    onTypeChange,
    typeCounts,
    totalCount,
}: FilterPillsProps) {
    return (
        <div className="space-y-6">
            {/* Resource Type Filters - Centered */}
            <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60 px-1 text-center">
                    Resource Type
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                    {(Object.keys(typeConfig) as Array<ResourceType | 'all'>).map((type) => {
                        const config = typeConfig[type]
                        const Icon = config.icon
                        const count = type === 'all' ? totalCount : (typeCounts[type] || 0)
                        const isActive = activeType === type

                        return (
                            <motion.button
                                key={type}
                                onClick={() => onTypeChange(type)}
                                className={`
                  relative px-4 py-2.5 rounded-xl text-sm font-medium
                  flex items-center gap-2 transition-all duration-300
                  border backdrop-blur-sm overflow-hidden group
                  ${isActive
                                        ? 'text-white border-white/20 shadow-lg'
                                        : 'text-muted-foreground border-white/10 hover:border-white/20 hover:text-white'
                                    }
                `}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {/* Active background with animated gradient */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTypePill"
                                        className="absolute inset-0 rounded-xl"
                                        style={{
                                            background: `linear-gradient(135deg, ${config.color}30, ${config.color}15)`,
                                        }}
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                    />
                                )}

                                {/* Hover glow effect */}
                                <div
                                    className={`
                    absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
                    ${!isActive ? 'bg-white/5' : ''}
                  `}
                                />

                                {/* Content */}
                                <div className="relative z-10 flex items-center gap-2">
                                    <Icon
                                        className="w-4 h-4"
                                        style={{
                                            color: isActive ? config.color : undefined
                                        }}
                                    />
                                    <span>{config.label}</span>
                                    <span
                                        className={`
                      text-xs px-2 py-0.5 rounded-full font-bold
                      ${isActive
                                                ? 'bg-white/20 text-white'
                                                : 'bg-white/5 text-muted-foreground/60'
                                            }
                    `}
                                    >
                                        {count}
                                    </span>
                                </div>

                                {/* Active indicator glow */}
                                {isActive && (
                                    <div
                                        className="absolute inset-0 rounded-xl blur-xl opacity-30"
                                        style={{
                                            background: config.color,
                                        }}
                                    />
                                )}
                            </motion.button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
