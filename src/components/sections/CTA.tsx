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
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-400 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-200 rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-3xl relative z-10">
        <TextReveal>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-black">
            Có dự án <span className="text-accent-600">trong đầu?</span>
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
              <span className="w-2 h-2 bg-accent-500 rounded-full shadow-sm shadow-accent-500/50"></span>
              Phản hồi trong 24h
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-accent-500 rounded-full shadow-sm shadow-accent-500/50"></span>
              Tư vấn miễn phí
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-accent-500 rounded-full shadow-sm shadow-accent-500/50"></span>
              Bảo hành dài hạn
            </span>
          </div>
        </TextReveal>
        <TextReveal delay={0.4}>
          <Button
            variant="accent"
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

