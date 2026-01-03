'use client'

import { useState, useEffect, ChangeEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Command } from 'lucide-react'

interface SearchBarProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    className?: string
}

export function SearchBar({
    value,
    onChange,
    placeholder = 'Search papers, articles, and case studies...',
    className = ''
}: SearchBarProps) {
    const [isFocused, setIsFocused] = useState(false)
    const [debouncedValue, setDebouncedValue] = useState(value)

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            onChange(debouncedValue)
        }, 300)

        return () => clearTimeout(timer)
    }, [debouncedValue, onChange])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDebouncedValue(e.target.value)
    }

    const handleClear = () => {
        setDebouncedValue('')
        onChange('')
    }

    // Keyboard shortcut: Cmd/Ctrl + K to focus
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault()
                document.getElementById('resource-search')?.focus()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    return (
        <motion.div
            className={`relative w-full ${className}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="relative">
                {/* Glassmorphic container */}
                <div
                    className={`
            relative overflow-hidden rounded-2xl backdrop-blur-xl
            bg-gradient-to-br from-white/5 to-white/[0.02]
            border transition-all duration-300
            ${isFocused
                            ? 'border-primary/50 shadow-[0_0_30px_rgba(79,70,229,0.3)]'
                            : 'border-white/10 shadow-lg'
                        }
          `}
                >
                    {/* Animated background glow */}
                    <motion.div
                        className="absolute inset-0 opacity-0"
                        animate={{
                            opacity: isFocused ? 0.15 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 blur-xl"
                            style={{
                                animation: 'pulse 3s ease-in-out infinite',
                            }}
                        />
                    </motion.div>

                    {/* Input container */}
                    <div className="relative flex items-center gap-3 px-5 py-4">
                        {/* Search icon with pulse animation */}
                        <motion.div
                            animate={{
                                scale: isFocused ? [1, 1.1, 1] : 1,
                            }}
                            transition={{
                                duration: 2,
                                repeat: isFocused ? Infinity : 0,
                                ease: 'easeInOut',
                            }}
                        >
                            <Search
                                className={`w-5 h-5 transition-colors duration-300 ${isFocused ? 'text-primary' : 'text-muted-foreground/50'
                                    }`}
                            />
                        </motion.div>

                        {/* Input field */}
                        <input
                            id="resource-search"
                            type="text"
                            value={debouncedValue}
                            onChange={handleChange}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholder={placeholder}
                            className="
                flex-1 bg-transparent border-none outline-none
                text-foreground placeholder:text-muted-foreground/40
                text-sm md:text-base font-medium
              "
                            aria-label="Search resources"
                        />

                        {/* Clear button */}
                        <AnimatePresence>
                            {debouncedValue && (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    onClick={handleClear}
                                    className="
                    p-1.5 rounded-lg
                    bg-white/5 hover:bg-white/10
                    border border-white/10 hover:border-white/20
                    transition-all duration-200
                    group
                  "
                                    aria-label="Clear search"
                                >
                                    <X className="w-4 h-4 text-muted-foreground/60 group-hover:text-foreground transition-colors" />
                                </motion.button>
                            )}
                        </AnimatePresence>

                        {/* Keyboard shortcut hint */}
                        {!isFocused && !debouncedValue && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="hidden md:flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 border border-white/10"
                            >
                                <Command className="w-3 h-3 text-muted-foreground/40" />
                                <span className="text-xs text-muted-foreground/40 font-mono">K</span>
                            </motion.div>
                        )}
                    </div>

                    {/* Bottom edge glow on focus */}
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{
                            opacity: isFocused ? 1 : 0,
                            scaleX: isFocused ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>

            {/* Floating particles effect on focus */}
            <AnimatePresence>
                {isFocused && (
                    <>
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 rounded-full bg-primary/30"
                                initial={{
                                    x: Math.random() * 100 - 50,
                                    y: 0,
                                    opacity: 0
                                }}
                                animate={{
                                    x: Math.random() * 100 - 50,
                                    y: -50,
                                    opacity: [0, 1, 0],
                                }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                    ease: 'easeOut',
                                }}
                                style={{
                                    left: `${20 + Math.random() * 60}%`,
                                    bottom: 0,
                                }}
                            />
                        ))}
                    </>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
