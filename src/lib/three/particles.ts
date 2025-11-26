import * as THREE from 'three'

export const particleConfig = {
  count: 1000,
  size: 0.02,
  color: 0x000000,
  speed: 0.5,
}

export function createParticles(): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(particleConfig.count * 3)

  for (let i = 0; i < particleConfig.count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  return geometry
}

