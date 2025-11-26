'use client'

import { useEffect, useState } from 'react'
import { PersonalInfo } from '@/types/admin'
import { getPersonalInfo, updatePersonalInfo } from '@/lib/firebase/firestore'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import ImageUpload from '@/components/admin/ImageUpload'

export default function AdminPersonalPage() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null)
  const [formData, setFormData] = useState<PersonalInfo>({
    name: '',
    tagline: '',
    intro: '',
    aboutStory: '',
    email: '',
    responseTime: '',
    avatar: '',
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchPersonalInfo()
  }, [])

  const fetchPersonalInfo = async () => {
    try {
      const info = await getPersonalInfo()
      if (info) {
        setPersonalInfo(info)
        setFormData(info)
      }
    } catch (error) {
      console.error('Error fetching personal info:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updatePersonalInfo(formData)
      alert('Personal info updated successfully!')
      fetchPersonalInfo()
    } catch (error) {
      console.error('Error updating personal info:', error)
      alert('Failed to update personal info')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Personal Information</h1>

        <div className="bg-white rounded-lg border-2 border-black p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <Input
              label="Tagline"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Intro (Short description)
              </label>
              <textarea
                value={formData.intro}
                onChange={(e) => setFormData({ ...formData, intro: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                About Story (Long description)
              </label>
              <textarea
                value={formData.aboutStory}
                onChange={(e) => setFormData({ ...formData, aboutStory: e.target.value })}
                rows={10}
                className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-colors"
                required
              />
            </div>
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <Input
              label="Response Time (e.g., 'I usually respond within 24 hours')"
              value={formData.responseTime || ''}
              onChange={(e) => setFormData({ ...formData, responseTime: e.target.value })}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Avatar
              </label>
              <ImageUpload
                onUploadComplete={(url) => setFormData({ ...formData, avatar: url })}
                currentImage={formData.avatar}
              />
            </div>
            <Button type="submit" disabled={saving} size="lg">
              {saving ? 'Saving...' : 'Save Personal Info'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

