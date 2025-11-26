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
    <section ref={ctaRef} className="py-24 md:py-40 bg-black text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>
      
      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <TextReveal>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
              Có dự án trong đầu?
            </h2>
          </TextReveal>
          <TextReveal delay={0.2}>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
              Hãy cùng nhau biến ý tưởng của bạn thành hiện thực. Liên hệ ngay để thảo luận về dự án của bạn.
            </p>
          </TextReveal>
          <TextReveal delay={0.4}>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                window.location.href = '/contact'
              }}
            >
              Liên hệ ngay
            </Button>
          </TextReveal>
        </div>
      </Container>
    </section>
  )
}

