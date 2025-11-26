'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Container from '@/components/layout/Container'
import TextReveal from '@/components/ui/TextReveal'
import ParallaxSection from '@/components/ui/ParallaxSection'
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
    <section ref={introRef} className="py-24 md:py-40 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-50" />
      
      <Container>
        <div className="max-w-4xl mx-auto relative z-10">
          <TextReveal>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-12">
              Về tôi
            </h2>
          </TextReveal>
          <div className="space-y-6">
            {paragraphs.map((paragraph, index) => (
              <ParallaxSection key={index} speed={0.3}>
                <TextReveal delay={index * 0.1}>
                  <p className="text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                </TextReveal>
              </ParallaxSection>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

