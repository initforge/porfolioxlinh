'use client'

import { useRouter } from 'next/navigation'
import { createProject } from '@/lib/firebase/firestore'
import ProjectForm from '@/components/admin/ProjectForm'
import { Project } from '@/types/project'

export default function NewProjectPage() {
  const router = useRouter()

  const handleSave = async (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    await createProject(project)
    router.push('/admin/projects')
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">New Project</h1>
        <div className="bg-white rounded-lg border-2 border-gray-200 p-8">
          <ProjectForm onSave={handleSave} onCancel={() => router.push('/admin/projects')} />
        </div>
      </div>
    </div>
  )
}

