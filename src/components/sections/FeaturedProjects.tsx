'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Container from '@/components/layout/Container'
import ProjectGrid from '@/components/work/ProjectGrid'
import { getFeaturedProjects } from '@/lib/firebase/firestore'
import { Project } from '@/types/project'
import { staggerReveal } from '@/lib/three/animations'

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    async function fetchProjects() {
      try {
        const featured = await getFeaturedProjects()
        setProjects(featured.slice(0, 3)) // Show top 3 featured
      } catch (error) {
        console.error('Error fetching projects:', error)
      }
    }
    fetchProjects()
  }, [])

  useEffect(() => {
    if (projects.length > 0) {
      staggerReveal('.project-card', 0.1).catch(console.error)
    }
  }, [projects])

  if (projects.length === 0) return null

  return (
    <section id="projects" className="py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Dự án <span className="text-purple-400">Gần Đây</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed">
          Một số dự án gần đây thể hiện khả năng phát triển web hiện đại và sáng tạo
        </p>
      </motion.div>
      <ProjectGrid projects={projects} />
    </section>
  )
}

