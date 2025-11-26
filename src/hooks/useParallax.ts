'use client'

import { useEffect, useRef } from 'react'
import { parallax } from '@/lib/three/animations'

export function useParallax(speed: number = 0.5) {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (elementRef.current) {
      parallax(elementRef.current, speed).catch(console.error)
    }
  }, [speed])

  return elementRef
}

