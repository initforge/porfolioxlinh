'use client'

import { useEffect, useRef, useState, lazy, Suspense } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import TextReveal from '@/components/ui/TextReveal'
import ParallaxSection from '@/components/ui/ParallaxSection'
import { animateOnScroll } from '@/lib/three/animations'
import { getPersonalInfo } from '@/lib/firebase/firestore'
import { PersonalInfo } from '@/types/admin'

// Lazy load Three.js components
const Scene = lazy(() => import('@/components/three/Scene'))
const BackgroundParticles = lazy(() => import('@/components/three/BackgroundParticles'))

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const [showThreeJS, setShowThreeJS] = useState(false)
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null)
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  useEffect(() => {
    // Delay Three.js loading để page load nhanh hơn
    const timer = setTimeout(() => {
      setShowThreeJS(true)
    }, 500)

    if (heroRef.current) {
      animateOnScroll(heroRef.current, { y: 50, opacity: 0, duration: 1 }).catch(console.error)
    }

    // Fetch personal info
    getPersonalInfo()
      .then((info) => setPersonalInfo(info))
      .catch(console.error)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white"
    >
      {/* Three.js Background - Lazy loaded */}
      {showThreeJS && (
        <div className="absolute inset-0 z-0 opacity-20">
          <Suspense fallback={null}>
            <Scene>
              <BackgroundParticles />
            </Scene>
          </Suspense>
        </div>
      )}

      {/* Content */}
      <motion.div style={{ opacity, scale }} className="relative z-10">
        <Container>
          <div className="max-w-5xl mx-auto">
            {/* Name & Role */}
            <TextReveal delay={0.2} className="mb-8">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-4 leading-tight">
                {personalInfo?.name || 'Tên của bạn'}
              </h1>
            </TextReveal>
            
            <TextReveal delay={0.3}>
              <p className="text-2xl md:text-3xl lg:text-4xl text-gray-600 font-medium">
                {personalInfo?.tagline || 'Freelance Web Developer'}
              </p>
            </TextReveal>
            
            {personalInfo?.intro && (
              <TextReveal delay={0.4}>
                <p className="text-lg md:text-xl text-gray-500 mt-6 max-w-3xl leading-relaxed">
                  {personalInfo.intro}
                </p>
              </TextReveal>
            )}

            {/* CTA Buttons */}
            <TextReveal delay={0.5}>
              <div className="flex flex-col sm:flex-row gap-4 mb-16 mt-12">
                <Button
                  onClick={() => {
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  size="lg"
                >
                  Xem dự án
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    window.location.href = '/contact'
                  }}
                >
                  Liên hệ
                </Button>
              </div>
            </TextReveal>
          </div>
        </Container>
      </motion.div>
    </section>
  )
}

