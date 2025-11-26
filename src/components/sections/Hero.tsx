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
      className="relative py-8 md:py-12 lg:py-16"
    >
      {/* Three.js Background - Lazy loaded */}
      {showThreeJS && (
        <div className="absolute inset-0 z-0 opacity-10">
          <Suspense fallback={null}>
            <Scene>
              <BackgroundParticles />
            </Scene>
          </Suspense>
        </div>
      )}

      {/* Content */}
      <motion.div style={{ opacity, scale }} className="relative z-10">
        <div className="max-w-5xl">
          {/* Headline - Reduced size */}
          <TextReveal delay={0.2}>
            <h1 className="text-[64px] md:text-[72px] font-bold mb-10 leading-[1.1] text-black tracking-[-0.02em]">
              Biến Ý Tưởng<br />Của Bạn<br />Thành Hiện<br />Thực
            </h1>
          </TextReveal>
          
          {/* Description - Reduced size */}
          <TextReveal delay={0.3}>
            <div className="space-y-2 mb-10">
              <p className="text-[18px] md:text-[20px] text-black leading-[1.6]">
                Đam mê tạo ra những trải nghiệm kỹ thuật số trực quan và hấp dẫn.
              </p>
              <p className="text-[18px] md:text-[20px] text-black leading-[1.6]">
                Chuyên biến ý tưởng thành những sản phẩm được chế tác đẹp mắt.
              </p>
            </div>
          </TextReveal>

          {/* CTA Buttons */}
          <TextReveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => {
                  window.location.href = '/contact'
                }}
                size="lg"
                className="text-lg px-8 py-4"
              >
                Liên hệ
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  window.location.href = '/projects'
                }}
                className="text-lg px-8 py-4"
              >
                Xem dự án →
              </Button>
            </div>
          </TextReveal>
        </div>
      </motion.div>
    </section>
  )
}

