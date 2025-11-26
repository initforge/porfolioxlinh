'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import TextReveal from '@/components/ui/TextReveal'
import { animateOnScroll } from '@/lib/three/animations'

export default function CTA() {
  const ctaRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (ctaRef.current) {
      animateOnScroll(ctaRef.current, { y: 50, opacity: 0, duration: 0.8 }).catch(console.error)
    }
  }, [])

  return (
    <section ref={ctaRef} className="py-12 md:py-20">
      <div className="max-w-3xl">
        <TextReveal>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-black">
            Có dự án trong đầu?
          </h2>
        </TextReveal>
        <TextReveal delay={0.2}>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
            Hãy cùng nhau biến ý tưởng của bạn thành hiện thực. Liên hệ ngay để thảo luận về dự án của bạn.
          </p>
        </TextReveal>
        <TextReveal delay={0.4}>
          <Button
            size="lg"
            onClick={() => {
              window.location.href = '/contact'
            }}
            className="text-lg px-8 py-4"
          >
            Liên hệ ngay
          </Button>
        </TextReveal>
      </div>
    </section>
  )
}

