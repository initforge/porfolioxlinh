'use client'

import { useEffect, useRef } from 'react'
import Container from '@/components/layout/Container'
import { animateOnScroll } from '@/lib/three/animations'

export default function Intro() {
  const introRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (introRef.current) {
      animateOnScroll(introRef.current, { y: 50, opacity: 0, duration: 0.8 }).catch(console.error)
    }
  }, [])

  return (
    <section ref={introRef} className="py-20 md:py-32 bg-gray-50">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">About Me</h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            I&apos;m a freelance web developer passionate about creating beautiful, functional,
            and user-friendly digital experiences. With expertise in modern web technologies,
            I help businesses bring their ideas to life through code.
          </p>
        </div>
      </Container>
    </section>
  )
}

