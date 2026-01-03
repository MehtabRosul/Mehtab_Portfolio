"use client"

import * as React from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface SearchFilterProps {
    onSearch: (query: string) => void
    onFilterChange: (category: string | null) => void
    categories: string[]
}

export function SearchFilter({ onSearch, onFilterChange, categories }: SearchFilterProps) {
    const [query, setQuery] = React.useState("")
    const [activeCategory, setActiveCategory] = React.useState<string | null>(null)
    const [isFocused, setIsFocused] = React.useState(false)

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQuery(value)
        onSearch(value)
    }

    const handleCategoryClick = (cat: string) => {
        if (activeCategory === cat) {
            setActiveCategory(null)
            onFilterChange(null)
        } else {
            setActiveCategory(cat)
            onFilterChange(cat)
        }
    }

    return (
        <div className="w-full max-w-4xl mx-auto space-y-6">
            {/* Search Bar Container */}
            <div
                className={cn(
                    "relative group rounded-2xl transition-all duration-300",
                    isFocused ? "shadow-[0_0_40px_-10px_rgba(124,58,237,0.3)] scale-[1.01]" : "hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)]"
                )}
            >
                {/* Animated Border Gradient */}
                <div className={cn(
                    "absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-transparent via-purple-500/20 to-transparent transition-opacity duration-500",
                    isFocused ? "opacity-100" : "opacity-0"
                )} />

                <div className="relative flex items-center bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl px-4 h-14 overflow-hidden">
                    <Search className={cn(
                        "w-5 h-5 transition-colors duration-300 mr-3",
                        isFocused ? "text-purple-400" : "text-zinc-500"
                    )} />

                    <input
                        type="text"
                        value={query}
                        onChange={handleSearch}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Search certificates, skills, or issuers..."
                        className="flex-1 bg-transparent text-white placeholder-zinc-500 outline-none text-base font-medium"
                    />

                    <AnimatePresence>
                        {query && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={() => { setQuery(""); onSearch(""); }}
                                className="p-1 rounded-full hover:bg-white/10 mr-2"
                            >
                                <X className="w-4 h-4 text-zinc-400" />
                            </motion.button>
                        )}
                    </AnimatePresence>

                    <div className="w-[1px] h-6 bg-white/10 mx-2" />

                    <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono px-2">
                        <span className="hidden sm:inline-block">CMD + K</span>
                        <SlidersHorizontal className="w-4 h-4" />
                    </div>
                </div>
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => handleCategoryClick(cat)}
                        className={cn(
                            "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden",
                            activeCategory === cat
                                ? "text-white shadow-[0_0_15px_-3px_rgba(124,58,237,0.4)]"
                                : "text-zinc-400 hover:text-white hover:bg-white/5"
                        )}
                    >
                        {activeCategory === cat && (
                            <motion.div
                                layoutId="activeFilter"
                                className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600"
                                initial={false}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                            {cat}
                            {activeCategory === cat && <X className="w-3 h-3" />}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    )
}
