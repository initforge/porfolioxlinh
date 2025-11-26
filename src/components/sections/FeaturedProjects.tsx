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
    <section id="projects" className="py-24 md:py-40 bg-gray-50 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-black rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-black rounded-full blur-3xl" />
      </div>
      
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">Dự án nổi bật</h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl leading-relaxed">
            Một số dự án gần đây thể hiện khả năng phát triển web hiện đại và sáng tạo
          </p>
        </motion.div>
        <ProjectGrid projects={projects} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <a
            href="/projects"
            className="text-black font-medium hover:text-gray-700 transition-colors text-lg underline underline-offset-4 inline-flex items-center group"
          >
            Xem tất cả dự án
            <motion.span
              className="ml-2 inline-block"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              →
            </motion.span>
          </a>
        </motion.div>
      </Container>
    </section>
  )
}

