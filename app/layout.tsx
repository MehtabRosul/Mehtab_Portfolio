import type { Metadata } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { KonamiCode } from '@/components/easter-eggs/konami-code'
import { Particles } from '@/components/particles/particles'
import { CustomCursor } from '@/components/custom-cursor'
import { SmoothScroll } from '@/components/smooth-scroll'
import { TopHeader } from '@/components/navigation/top-header'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['400', '500', '600', '700'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Mehtab Aftabur Rosul | AI/ML Engineer & LLM Specialist',
  description: 'Portfolio of Mehtab Aftabur Rosul - AI/ML Engineer, LLM Engineer, Full-Stack Developer, and Quantum Computing Enthusiast',
  keywords: ['AI', 'Machine Learning', 'LLM', 'Quantum Computing', 'Full Stack Developer', 'Portfolio'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <SmoothScroll>
            <TopHeader />
            <CustomCursor />
            <Particles />
            {children}
            <KonamiCode />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}

