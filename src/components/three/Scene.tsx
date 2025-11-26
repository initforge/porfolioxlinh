'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

interface SceneProps {
  children: React.ReactNode
  className?: string
}

export default function Scene({ children, className = '' }: SceneProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  )
}

