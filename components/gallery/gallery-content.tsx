'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'
import { GradientText } from '@/components/ui/gradient-text'
import { Avatar } from '@/components/ui/avatar'

const categories = ['All', 'Photos', 'Avatars', 'Certificates', 'Awards', 'Work Samples']

// Mix of photos and avatars
const galleryItems = [
  {
    id: 1,
    title: 'Portrait Photo 1',
    category: 'Photos',
    image: '/images/mehtab images/mehtab1.PNG',
    type: 'photo',
  },
  {
    id: 2,
    title: 'Portrait Photo 2',
    category: 'Photos',
    image: '/images/mehtab images/mehtab2.PNG',
    type: 'photo',
  },
  {
    id: 3,
    title: 'Portrait Photo 3',
    category: 'Photos',
    image: '/images/mehtab images/mehtab3.PNG',
    type: 'photo',
  },
  {
    id: 4,
    title: 'Avatar 1',
    category: 'Avatars',
    image: '/avatars/IMG_9781.PNG',
    type: 'avatar',
  },
  {
    id: 5,
    title: 'Avatar 2',
    category: 'Avatars',
    image: '/avatars/IMG_9783.PNG',
    type: 'avatar',
  },
  {
    id: 6,
    title: 'Avatar 3',
    category: 'Avatars',
    image: '/avatars/IMG_9784.PNG',
    type: 'avatar',
  },
  {
    id: 7,
    title: 'Avatar 4',
    category: 'Avatars',
    image: '/avatars/IMG_9787.PNG',
    type: 'avatar',
  },
  {
    id: 8,
    title: 'Avatar 5',
    category: 'Avatars',
    image: '/avatars/IMG_9788.PNG',
    type: 'avatar',
  },
  {
    id: 9,
    title: 'Avatar 6',
    category: 'Avatars',
    image: '/avatars/IMG_9789.PNG',
    type: 'avatar',
  },
  {
    id: 10,
    title: 'Avatar 7',
    category: 'Avatars',
    image: '/avatars/IMG_9792.PNG',
    type: 'avatar',
  },
  {
    id: 11,
    title: 'Avatar 8',
    category: 'Avatars',
    image: '/avatars/IMG_9793.PNG',
    type: 'avatar',
  },
  {
    id: 12,
    title: 'Avatar 9',
    category: 'Avatars',
    image: '/avatars/IMG_9795.PNG',
    type: 'avatar',
  },
  {
    id: 13,
    title: 'Avatar 10',
    category: 'Avatars',
    image: '/avatars/IMG_9796.PNG',
    type: 'avatar',
  },
]

export function GalleryContent() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const filteredItems = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory)

  return (
    <div className="container mx-auto px-4 py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-6xl lg:text-8xl font-heading font-bold mb-6">
          <GradientText 
            gradientColors={['#00f0ff', '#d946ef', '#ec4899', '#f472b6', '#00f0ff']}
            duration={6.5}
            direction="right"
            ease="linear"
          >
            Gallery
          </GradientText>
        </h1>
        <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto">
          A collection of photos, avatars, certificates, and work samples
        </p>
      </motion.div>

      {/* Category Filters */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-12"
      >
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-all duration-200 font-medium ${
                selectedCategory === category
                  ? 'bg-cyber-gold text-black cyber-glow shadow-lg shadow-cyber-gold/50'
                  : 'glass border border-cyber-gold/30 text-foreground hover:bg-cyber-gold/20 hover:border-cyber-gold/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Masonry Grid Gallery */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ scale: 1.05, y: -5 }}
            onClick={() => setSelectedImage(item.image)}
            className="glass-strong rounded-xl overflow-hidden border border-cyber-gold/30 cursor-pointer group mb-4 break-inside-avoid"
          >
            <div className="relative aspect-square overflow-hidden">
              {item.type === 'avatar' ? (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyber-gold/20 to-cyber-purple/20">
                  <Avatar
                    src={item.image}
                    alt={item.title}
                    size="xl"
                    variant="circle"
                    glow
                    animated
                  />
                </div>
              ) : (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="text-xs text-white/70">{item.category}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-cyber-gold transition-colors z-10"
              >
                <X className="w-8 h-8" />
              </button>
              <div className="glass-strong rounded-xl overflow-hidden border border-cyber-gold/30">
                <div className="relative aspect-video max-h-[80vh]">
                  <Image
                    src={selectedImage}
                    alt="Full size"
                    fill
                    className="object-contain"
                    sizes="90vw"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
