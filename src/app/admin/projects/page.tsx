'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Project } from '@/types/project'
import { getProjects, deleteProject } from '@/lib/firebase/firestore'
import Button from '@/components/ui/Button'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import Link from 'next/link'

export default function AdminProjectsPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const allProjects = await getProjects()
      setProjects(allProjects)
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return
    try {
      await deleteProject(id)
      fetchProjects()
    } catch (error) {
      console.error('Error deleting project:', error)
      alert('Failed to delete project')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-black">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Projects</h1>
          <Button onClick={() => router.push('/admin/projects/new')} size="lg">
            <Plus size={20} className="mr-2" />
            Add New Project
          </Button>
        </div>

        <div className="bg-white rounded-lg border-2 border-black overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase">
                  Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase">
                  Featured
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{project.title}</div>
                    <div className="text-sm text-gray-600">{project.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize text-black">
                    {project.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-black">{project.year}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {project.featured ? (
                      <span className="bg-black text-white px-2 py-1 rounded-full text-xs font-medium">
                        Featured
                      </span>
                    ) : (
                      <span className="text-gray-500">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/projects/${project.slug}`}
                        target="_blank"
                        className="text-black hover:text-gray-600"
                      >
                        <Eye size={18} />
                      </Link>
                      <button
                        onClick={() => router.push(`/admin/projects/${project.id}`)}
                        className="text-black hover:text-gray-600"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="text-black hover:text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

