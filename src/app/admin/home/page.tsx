'use client'

import { useEffect, useState } from 'react'
import { HomeConfig } from '@/types/admin'
import { Project } from '@/types/project'
import { getHomeConfig, updateHomeConfig, getProjects } from '@/lib/firebase/firestore'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function AdminHomePage() {
  const [config, setConfig] = useState<HomeConfig>({
    featuredProjects: [],
    heroContent: {
      title: '',
      tagline: '',
      intro: '',
    },
    ctaText: '',
  })
  const [projects, setProjects] = useState<Project[]>([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [homeConfig, allProjects] = await Promise.all([
        getHomeConfig(),
        getProjects(),
      ])
      if (homeConfig) {
        setConfig(homeConfig)
      }
      setProjects(allProjects)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updateHomeConfig(config)
      alert('Home config updated successfully!')
    } catch (error) {
      console.error('Error updating home config:', error)
      alert('Failed to update home config')
    } finally {
      setSaving(false)
    }
  }

  const toggleFeaturedProject = (projectId: string) => {
    setConfig((prev) => ({
      ...prev,
      featuredProjects: prev.featuredProjects.includes(projectId)
        ? prev.featuredProjects.filter((id) => id !== projectId)
        : [...prev.featuredProjects, projectId],
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Home Page Configuration</h1>

        <div className="bg-white rounded-lg border-2 border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Hero Content</h2>
              <div className="space-y-4">
                <Input
                  label="Title"
                  value={config.heroContent?.title || ''}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      heroContent: { ...config.heroContent, title: e.target.value },
                    })
                  }
                />
                <Input
                  label="Tagline"
                  value={config.heroContent?.tagline || ''}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      heroContent: { ...config.heroContent, tagline: e.target.value },
                    })
                  }
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Intro
                  </label>
                  <textarea
                    value={config.heroContent?.intro || ''}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        heroContent: { ...config.heroContent, intro: e.target.value },
                      })
                    }
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Featured Projects</h2>
              <p className="text-sm text-gray-600 mb-4">
                Select up to 4 projects to feature on the home page
              </p>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {projects.map((project) => (
                  <label
                    key={project.id}
                    className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:border-black transition-colors cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={config.featuredProjects.includes(project.id)}
                      onChange={() => toggleFeaturedProject(project.id)}
                      className="w-4 h-4"
                    />
                    <div className="flex-1">
                      <div className="font-medium">{project.title}</div>
                      <div className="text-sm text-gray-500">{project.category}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">CTA Text</h2>
              <Input
                label="Call to Action Text"
                value={config.ctaText || ''}
                onChange={(e) => setConfig({ ...config, ctaText: e.target.value })}
              />
            </div>

            <Button type="submit" disabled={saving} size="lg">
              {saving ? 'Saving...' : 'Save Configuration'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

