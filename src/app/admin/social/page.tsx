'use client'

import { useEffect, useState } from 'react'
import { SocialLink } from '@/types/admin'
import { getSocialLinks, createSocialLink, updateSocialLink, deleteSocialLink } from '@/lib/firebase/firestore'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Edit, Trash2 } from 'lucide-react'

export default function AdminSocialPage() {
  const [links, setLinks] = useState<SocialLink[]>([])
  const [editing, setEditing] = useState<SocialLink | null>(null)
  const [formData, setFormData] = useState({
    platform: '',
    url: '',
    icon: '',
    displayName: '',
  })

  useEffect(() => {
    fetchLinks()
  }, [])

  const fetchLinks = async () => {
    try {
      const allLinks = await getSocialLinks()
      setLinks(allLinks)
    } catch (error) {
      console.error('Error fetching links:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editing) {
        await updateSocialLink(editing.id, formData)
      } else {
        await createSocialLink(formData)
      }
      setEditing(null)
      setFormData({ platform: '', url: '', icon: '', displayName: '' })
      fetchLinks()
    } catch (error) {
      console.error('Error saving link:', error)
      alert('Failed to save link')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this link?')) return
    try {
      await deleteSocialLink(id)
      fetchLinks()
    } catch (error) {
      console.error('Error deleting link:', error)
      alert('Failed to delete link')
    }
  }

  const handleEdit = (link: SocialLink) => {
    setEditing(link)
    setFormData({
      platform: link.platform,
      url: link.url,
      icon: link.icon || '',
      displayName: link.displayName || '',
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Social Links</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
              <h2 className="text-2xl font-bold mb-4">
                {editing ? 'Edit Link' : 'Add New Link'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Platform"
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  required
                />
                <Input
                  label="URL"
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  required
                />
                <Input
                  label="Icon (emoji or text)"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                />
                <Input
                  label="Display Name"
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                />
                <div className="flex gap-2">
                  <Button type="submit" size="lg" className="flex-1">
                    {editing ? 'Update' : 'Add'} Link
                  </Button>
                  {editing && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setEditing(null)
                        setFormData({ platform: '', url: '', icon: '', displayName: '' })
                      }}
                      size="lg"
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold">All Links</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {links.map((link) => (
                  <div key={link.id} className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {link.icon && <span className="text-2xl">{link.icon}</span>}
                      <div>
                        <div className="font-medium">{link.displayName || link.platform}</div>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-500 hover:text-black"
                        >
                          {link.url}
                        </a>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(link)}
                        className="text-gray-600 hover:text-black"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(link.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

