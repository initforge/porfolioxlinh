'use client'

import { useEffect, useState } from 'react'
import Container from '@/components/layout/Container'
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
    <div className="pt-32 pb-20">
      <Container>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">Dự án</h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-16 max-w-3xl leading-relaxed">
          Tuyển tập các dự án gần đây của tôi
        </p>

        {loading ? (
          <LoadingSpinner />
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Không tìm thấy dự án nào.</p>
          </div>
        ) : (
          <ProjectGrid projects={projects} />
        )}
      </Container>
    </div>
  )
}

