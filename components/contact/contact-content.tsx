'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Linkedin, Github, FileText, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GradientText } from '@/components/ui/gradient-text'
import { Avatar } from '@/components/ui/avatar'
import Image from 'next/image'

export function ContactContent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Form submission logic will be implemented
    setTimeout(() => {
      setIsSubmitting(false)
      alert('Message sent! (This is a placeholder - form submission will be implemented)')
    }, 1000)
  }

  const socialLinks = [
    {
      icon: Linkedin,
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/rosulmehtab/',
      color: 'text-blue-400',
    },
    {
      icon: Github,
      label: 'GitHub',
      url: '#',
      color: 'text-foreground',
    },
    {
      icon: FileText,
      label: 'ResearchGate',
      url: 'https://www.researchgate.net/profile/Mehtab-Rosul',
      color: 'text-green-400',
    },
  ]

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
          <span className="text-white">Get In</span>{' '}
          <GradientText 
            gradientColors={['#00f0ff', '#00d4aa', '#00ffaa', '#7fffd4', '#00f0ff']}
            duration={5}
            direction="left"
            ease="linear"
          >
            Touch
          </GradientText>
        </h1>
        <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto">
          Let&apos;s collaborate on your next project or discuss opportunities in AI/ML, quantum computing, or full-stack development
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Form - Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-strong rounded-2xl p-8 border border-cyber-blue/30"
        >
          <h2 className="text-3xl font-bold mb-6">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 glass rounded-lg border border-cyber-blue/30 focus:border-cyber-blue focus:outline-none bg-background/50 backdrop-blur-sm"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 glass rounded-lg border border-cyber-blue/30 focus:border-cyber-blue focus:outline-none bg-background/50 backdrop-blur-sm"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-3 glass rounded-lg border border-cyber-blue/30 focus:border-cyber-blue focus:outline-none bg-background/50 backdrop-blur-sm"
                placeholder="What&apos;s this about?"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 glass rounded-lg border border-cyber-blue/30 focus:border-cyber-blue focus:outline-none resize-none bg-background/50 backdrop-blur-sm"
                placeholder="Tell me about your project or inquiry..."
              />
            </div>
            <Button
              type="submit"
              variant="neon"
              size="lg"
              className="w-full group"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                'Sending...'
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </motion.div>

        {/* Contact Info & Avatar - Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-6"
        >
          {/* Large Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/20 via-cyber-purple/20 to-cyber-green/20 rounded-2xl blur-2xl -z-10" />
            <div className="absolute inset-0 border-2 border-cyber-blue/30 rounded-2xl" />
            <Image
              src="/images/mehtab images/mehtab1.PNG"
              alt="Mehtab Aftabur Rosul"
              fill
              className="object-cover object-center rounded-2xl"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          {/* Contact Information */}
          <div className="glass-strong rounded-2xl p-8 border border-cyber-blue/30">
            <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-cyber-blue" />
                <div>
                  <p className="text-sm text-foreground/60">Email</p>
                  <a href="mailto:contact@example.com" className="text-cyber-blue hover:underline">
                    contact@example.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="glass-strong rounded-2xl p-8 border border-cyber-blue/30">
            <h2 className="text-3xl font-bold mb-6">Connect With Me</h2>
            <div className="space-y-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    whileHover={{ x: 5, scale: 1.02 }}
                    className="flex items-center gap-4 p-4 glass rounded-lg border border-cyber-blue/20 hover:border-cyber-blue/50 transition-colors group"
                  >
                    <Icon className={`w-6 h-6 ${social.color} group-hover:scale-110 transition-transform`} />
                    <span className="font-medium">{social.label}</span>
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Availability */}
          <div className="glass-strong rounded-2xl p-8 border border-cyber-blue/30">
            <h3 className="text-xl font-bold mb-4">Availability</h3>
            <p className="text-foreground/70 mb-4">
              I&apos;m currently available for:
            </p>
            <ul className="space-y-2 text-foreground/70">
              <li>• AI/ML Consulting</li>
              <li>• LLM Engineering Projects</li>
              <li>• Full-Stack Development</li>
              <li>• Research Collaborations</li>
              <li>• Quantum Computing Projects</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
