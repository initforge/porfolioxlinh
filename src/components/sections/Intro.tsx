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
    <section ref={introRef} className="py-12 md:py-20">
      <TextReveal>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-black">
          Về Tôi
        </h2>
      </TextReveal>
      <div className="space-y-6">
        {paragraphs.map((paragraph, index) => (
          <ParallaxSection key={index} speed={0.3}>
            <TextReveal delay={index * 0.1}>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            </TextReveal>
          </ParallaxSection>
        ))}
      </div>
    </section>
  )
}

