'use client'

import { useEffect, useState } from 'react'
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
    <section id="projects" className="py-20 md:py-32">
      <Container>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">Featured Projects</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          A selection of my recent work showcasing modern web development
        </p>
        <ProjectGrid projects={projects} />
        <div className="text-center mt-12">
          <a
            href="/projects"
            className="text-black font-medium hover:text-gray-700 transition-colors underline"
          >
            View All Projects →
          </a>
        </div>
      </Container>
    </section>
  )
}

