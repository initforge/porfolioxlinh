'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Container from '@/components/layout/Container'
import ProjectGrid from '@/components/work/ProjectGrid'
import Button from '@/components/ui/Button'
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
    <section id="projects" className="py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-accent-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-accent-300 rounded-full blur-3xl"></div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16 relative z-10"
      >
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-black">
          Dự án <span className="text-accent-600">Gần Đây</span>
        </h2>
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl leading-relaxed mb-8">
          Một số dự án gần đây thể hiện khả năng phát triển web hiện đại và sáng tạo. Mỗi dự án là một câu chuyện về sự đổi mới, chất lượng và đam mê.
        </p>
      </motion.div>
      <div className="relative z-10">
        <ProjectGrid projects={projects} />
      </div>
      
      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-16 flex flex-col sm:flex-row gap-4 justify-center items-center"
      >
        <Button
          variant="accent"
          onClick={() => window.location.href = '/projects'}
          size="lg"
          className="text-lg px-8 py-4"
        >
          Xem tất cả dự án →
        </Button>
        <Button
          variant="outline"
          onClick={() => window.location.href = '/contact'}
          size="lg"
          className="text-lg px-8 py-4"
        >
          Liên hệ để bắt đầu dự án
        </Button>
      </motion.div>
    </section>
  )
}

