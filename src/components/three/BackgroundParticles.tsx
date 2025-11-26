'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { particleConfig, createParticles } from '@/lib/three/particles'

export default function BackgroundParticles() {
  const meshRef = useRef<THREE.Points>(null)

  const geometry = useMemo(() => createParticles(), [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
      
      // React to scroll
      const scrollY = window.scrollY
      meshRef.current.position.y = scrollY * 0.001
    }
  })

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={particleConfig.size}
        color={particleConfig.color}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

