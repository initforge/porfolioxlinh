'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Skill } from '@/types/skill'
import { getSkills, createSkill, updateSkill, deleteSkill } from '@/lib/firebase/firestore'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Plus, Edit, Trash2 } from 'lucide-react'

export default function AdminSkillsPage() {
  const router = useRouter()
  const [skills, setSkills] = useState<Skill[]>([])
  const [editing, setEditing] = useState<Skill | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    category: 'frontend' as Skill['category'],
    icon: '',
    order: 0,
  })

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const allSkills = await getSkills()
      setSkills(allSkills)
    } catch (error) {
      console.error('Error fetching skills:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editing) {
        await updateSkill(editing.id, formData)
      } else {
        await createSkill(formData)
      }
      setEditing(null)
      setFormData({ name: '', category: 'frontend', icon: '', order: 0 })
      fetchSkills()
    } catch (error) {
      console.error('Error saving skill:', error)
      alert('Failed to save skill')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return
    try {
      await deleteSkill(id)
      fetchSkills()
    } catch (error) {
      console.error('Error deleting skill:', error)
      alert('Failed to delete skill')
    }
  }

  const handleEdit = (skill: Skill) => {
    setEditing(skill)
    setFormData({
      name: skill.name,
      category: skill.category,
      icon: skill.icon || '',
      order: skill.order,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Skills</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
              <h2 className="text-2xl font-bold mb-4">
                {editing ? 'Edit Skill' : 'Add New Skill'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value as Skill['category'] })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
                  >
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="tools">Tools</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <Input
                  label="Icon (emoji or text)"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                />
                <Input
                  label="Order"
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData({ ...formData, order: parseInt(e.target.value) || 0 })
                  }
                />
                <div className="flex gap-2">
                  <Button type="submit" size="lg" className="flex-1">
                    {editing ? 'Update' : 'Add'} Skill
                  </Button>
                  {editing && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setEditing(null)
                        setFormData({ name: '', category: 'frontend', icon: '', order: 0 })
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
                <h2 className="text-2xl font-bold">All Skills</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {skills.map((skill) => (
                  <div key={skill.id} className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {skill.icon && <span className="text-2xl">{skill.icon}</span>}
                      <div>
                        <div className="font-medium">{skill.name}</div>
                        <div className="text-sm text-gray-500 capitalize">{skill.category}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(skill)}
                        className="text-gray-600 hover:text-black"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(skill.id)}
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

