'use client'

import { useState, useEffect } from 'react'
import { Project, ProjectCategory } from '@/types/project'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import ImageUpload from './ImageUpload'
import { slugify } from '@/lib/utils'

interface ProjectFormProps {
  project?: Project
  onSave: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  onCancel: () => void
}

export default function ProjectForm({ project, onSave, onCancel }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    slug: project?.slug || '',
    description: project?.description || '',
    longDescription: project?.longDescription || '',
    category: project?.category || 'web-app' as ProjectCategory,
    year: project?.year || new Date().getFullYear(),
    techStack: project?.techStack || [],
    links: {
      vercel: project?.links?.vercel || '',
      github: project?.links?.github || '',
      tiktok: project?.links?.tiktok || '',
    },
    thumbnail: project?.thumbnail || '',
    images: project?.images || [],
    featured: project?.featured || false,
  })
  const [techInput, setTechInput] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!project && formData.title) {
      setFormData((prev) => ({
        ...prev,
        slug: slugify(formData.title),
      }))
    }
  }, [formData.title, project])

  const handleAddTech = () => {
    if (techInput.trim() && !formData.techStack.includes(techInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        techStack: [...prev.techStack, techInput.trim()],
      }))
      setTechInput('')
    }
  }

  const handleRemoveTech = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((t) => t !== tech),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await onSave(formData)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />
      <Input
        label="Slug"
        value={formData.slug}
        onChange={(e) => setFormData({ ...formData, slug: slugify(e.target.value) })}
        required
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Long Description
        </label>
        <textarea
          value={formData.longDescription}
          onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
          rows={6}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value as ProjectCategory })}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
        >
          <option value="web-app">Web App</option>
          <option value="ecommerce">E-commerce</option>
          <option value="landing">Landing Page</option>
          <option value="custom">Custom</option>
        </select>
      </div>
      <Input
        label="Year"
        type="number"
        value={formData.year}
        onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
        required
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tech Stack
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTech())}
            className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
            placeholder="Add technology"
          />
          <Button type="button" onClick={handleAddTech} size="sm">
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.techStack.map((tech) => (
            <span
              key={tech}
              className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >
              {tech}
              <button
                type="button"
                onClick={() => handleRemoveTech(tech)}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="Vercel Link"
          type="url"
          value={formData.links.vercel}
          onChange={(e) =>
            setFormData({
              ...formData,
              links: { ...formData.links, vercel: e.target.value },
            })
          }
        />
        <Input
          label="GitHub Link"
          type="url"
          value={formData.links.github}
          onChange={(e) =>
            setFormData({
              ...formData,
              links: { ...formData.links, github: e.target.value },
            })
          }
        />
        <Input
          label="TikTok Link"
          type="url"
          value={formData.links.tiktok}
          onChange={(e) =>
            setFormData({
              ...formData,
              links: { ...formData.links, tiktok: e.target.value },
            })
          }
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Thumbnail
        </label>
        <ImageUpload
          onUploadComplete={(url) => setFormData({ ...formData, thumbnail: url })}
          currentImage={formData.thumbnail}
        />
      </div>
      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="w-4 h-4"
          />
          <span className="text-sm font-medium text-gray-700">Featured</span>
        </label>
      </div>
      <div className="flex gap-4">
        <Button type="submit" disabled={saving} size="lg">
          {saving ? 'Saving...' : 'Save Project'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} size="lg">
          Cancel
        </Button>
      </div>
    </form>
  )
}

