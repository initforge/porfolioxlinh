'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getProjects, updateProject } from '@/lib/firebase/firestore'
import { Project } from '@/types/project'
import ProjectForm from '@/components/admin/ProjectForm'

export default function EditProjectPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProject() {
      try {
        const projects = await getProjects()
        const found = projects.find((p) => p.id === id)
        setProject(found || null)
      } catch (error) {
        console.error('Error fetching project:', error)
      } finally {
        setLoading(false)
      }
    }
    if (id) {
      fetchProject()
    }
  }, [id])

  const handleSave = async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    await updateProject(id, projectData)
    router.push('/admin/projects')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p>Project not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Edit Project</h1>
        <div className="bg-white rounded-lg border-2 border-gray-200 p-8">
          <ProjectForm
            project={project}
            onSave={handleSave}
            onCancel={() => router.push('/admin/projects')}
          />
        </div>
      </div>
    </div>
  )
}

