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
    <section ref={ctaRef} className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="max-w-3xl">
        <TextReveal>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-black">
            Có dự án trong đầu?
          </h2>
        </TextReveal>
        <TextReveal delay={0.2}>
          <p className="text-xl md:text-2xl text-gray-600 mb-6 leading-relaxed">
            Hãy cùng nhau biến ý tưởng của bạn thành hiện thực. Liên hệ ngay để thảo luận về dự án của bạn.
          </p>
        </TextReveal>
        <TextReveal delay={0.3}>
          <div className="flex flex-wrap gap-4 mb-10 text-sm md:text-base text-gray-500">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-black rounded-full"></span>
              Phản hồi trong 24h
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-black rounded-full"></span>
              Tư vấn miễn phí
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-black rounded-full"></span>
              Bảo hành dài hạn
            </span>
          </div>
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

