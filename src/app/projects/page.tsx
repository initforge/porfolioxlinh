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
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-black max-w-4xl">
          <span className="text-accent-600">Tất cả</span><br />
          Dự án
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl leading-relaxed mb-8">
          Tuyển tập các dự án gần đây của tôi. Mỗi dự án là một minh chứng cho sự <span className="text-accent-600 font-semibold">đam mê</span>, <span className="text-accent-600 font-semibold">kỹ năng</span> và <span className="text-accent-600 font-semibold">cam kết</span> tạo ra những sản phẩm xuất sắc.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <a
            href="/contact"
            className="inline-block px-6 py-3 border-2 border-black text-black rounded-lg font-medium hover:bg-black hover:text-white transition-colors duration-300"
          >
            Có dự án muốn làm? Liên hệ ngay →
          </a>
        </motion.div>
      </motion.div>

      {loading ? (
        <LoadingSpinner />
      ) : projects.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-600 text-lg">Không tìm thấy dự án nào.</p>
        </div>
      ) : (
        <ProjectGrid projects={projects} />
      )}
    </MainLayout>
  )
}

