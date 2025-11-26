'use client'

import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

export function useThreeScene() {
  const { camera, scene } = useThree()
  const controlsRef = useRef<any>(null)

  useEffect(() => {
    // Setup lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(5, 5, 5)

    scene.add(ambientLight)
    scene.add(directionalLight)

    return () => {
      scene.remove(ambientLight)
      scene.remove(directionalLight)
    }
  }, [scene])

  return { camera, scene, controlsRef }
}

