'use client'

import { useEffect, useState } from 'react'
import Container from '@/components/layout/Container'
import ProjectGrid from '@/components/work/ProjectGrid'
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
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Projects</h1>
        <p className="text-xl text-gray-600 mb-12">
          A collection of my recent work
        </p>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-gray-500">Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">No projects found.</p>
          </div>
        ) : (
          <ProjectGrid projects={projects} />
        )}
      </Container>
    </div>
  )
}

