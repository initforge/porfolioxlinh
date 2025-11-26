'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Container from '@/components/layout/Container'
import TextReveal from '@/components/ui/TextReveal'
import ParallaxSection from '@/components/ui/ParallaxSection'
import Button from '@/components/ui/Button'
import { animateOnScroll } from '@/lib/three/animations'
import { getPersonalInfo } from '@/lib/firebase/firestore'
import { PersonalInfo } from '@/types/admin'

export default function Intro() {
  const introRef = useRef<HTMLElement>(null)
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null)

  useEffect(() => {
    if (introRef.current) {
      animateOnScroll(introRef.current, { y: 50, opacity: 0, duration: 0.8 }).catch(console.error)
    }

    getPersonalInfo()
      .then((info) => setPersonalInfo(info))
      .catch(console.error)
  }, [])

  if (!personalInfo?.aboutStory) return null

  const paragraphs = personalInfo.aboutStory.split('\n\n').filter((p) => p.trim())

  return (
    <section ref={introRef} className="py-16 md:py-24 lg:py-32 bg-white relative">
      {/* Decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      <TextReveal>
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-12 text-black">
          <span className="text-accent-600">Về</span> Tôi
        </h2>
      </TextReveal>
      <div className="space-y-6">
        {paragraphs.map((paragraph, index) => (
          <ParallaxSection key={index} speed={0.3}>
            <TextReveal delay={index * 0.1}>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            </TextReveal>
          </ParallaxSection>
        ))}
        
        {/* CTA Button */}
        <div className="mt-12">
          <TextReveal delay={paragraphs.length * 0.1}>
            <Button
              variant="outline"
              onClick={() => window.location.href = '/about'}
              size="lg"
              className="text-lg px-8 py-4"
            >
              Tìm hiểu thêm về tôi →
            </Button>
          </TextReveal>
        </div>
      </div>
    </section>
  )
}

