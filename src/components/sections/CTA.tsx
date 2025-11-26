'use client'

import { useEffect, useRef } from 'react'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import { animateOnScroll } from '@/lib/three/animations'

export default function CTA() {
  const ctaRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (ctaRef.current) {
      animateOnScroll(ctaRef.current, { y: 50, opacity: 0, duration: 0.8 }).catch(console.error)
    }
  }, [])

  return (
    <section ref={ctaRef} className="py-20 md:py-32 bg-black text-white">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Have a Project in Mind?</h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Let's work together to bring your vision to life. Get in touch and let's discuss your project.
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              window.location.href = '/contact'
            }}
          >
            Get in Touch
          </Button>
        </div>
      </Container>
    </section>
  )
}

