'use client'

import { useEffect, useRef, useState, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import { animateOnScroll } from '@/lib/three/animations'

// Lazy load Three.js components
const Scene = lazy(() => import('@/components/three/Scene'))
const BackgroundParticles = lazy(() => import('@/components/three/BackgroundParticles'))

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const [showThreeJS, setShowThreeJS] = useState(false)

  useEffect(() => {
    // Delay Three.js loading để page load nhanh hơn
    const timer = setTimeout(() => {
      setShowThreeJS(true)
    }, 500)

    if (heroRef.current) {
      animateOnScroll(heroRef.current, { y: 50, opacity: 0, duration: 1 }).catch(console.error)
    }

    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Three.js Background - Lazy loaded */}
      {showThreeJS && (
        <div className="absolute inset-0 z-0 opacity-30">
          <Suspense fallback={null}>
            <Scene>
              <BackgroundParticles />
            </Scene>
          </Suspense>
        </div>
      )}

      {/* Content */}
      <Container className="relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
        >
          Freelance Web Developer
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto"
        >
          Building digital experiences with modern web technologies
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={() => {
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
            size="lg"
          >
            View My Work
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              window.location.href = '/contact'
            }}
          >
            Get in Touch
          </Button>
        </motion.div>
      </Container>
    </section>
  )
}

