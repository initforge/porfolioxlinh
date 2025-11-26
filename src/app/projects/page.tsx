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
        <h1 className="text-[64px] md:text-[72px] font-bold mb-10 leading-[1.1] text-black tracking-[-0.02em] max-w-5xl">
          <span className="text-accent-600">Tất cả</span> Dự án
        </h1>
        <div className="space-y-3 mb-10 max-w-5xl">
          <p className="text-[18px] md:text-[20px] text-gray-700 leading-[1.7]">
            Tuyển tập các dự án gần đây của tôi. Mỗi dự án là một minh chứng cho sự đam mê, kỹ năng và cam kết tạo ra những sản phẩm xuất sắc.
          </p>
        </div>
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

