'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import MainLayout from '@/components/layout/MainLayout'
import ProjectGrid from '@/components/work/ProjectGrid'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { getProjects } from '@/lib/firebase/firestore'
import { Project } from '@/types/project'
import { staggerReveal } from '@/lib/three/animations'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const allProjects = await getProjects()
        setProjects(allProjects)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  useEffect(() => {
    if (projects.length > 0) {
      staggerReveal('.project-card', 0.1).catch(console.error)
    }
  }, [projects])

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Tất cả <span className="text-purple-400">Dự án</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed">
          Tuyển tập các dự án gần đây của tôi
        </p>
      </motion.div>

      {loading ? (
        <LoadingSpinner />
      ) : projects.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">Không tìm thấy dự án nào.</p>
        </div>
      ) : (
        <ProjectGrid projects={projects} />
      )}
    </MainLayout>
  )
}

