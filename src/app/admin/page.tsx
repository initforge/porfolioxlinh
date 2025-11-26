'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import Button from '@/components/ui/Button'
import { getProjects, getSkills, getServices, getSocialLinks } from '@/lib/firebase/firestore'
import { LogOut, FolderKanban, Code, Users, Settings, Home, Link as LinkIcon } from 'lucide-react'

export default function AdminDashboard() {
  const { logout } = useAuth()
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    services: 0,
    socialLinks: 0,
  })

  useEffect(() => {
    async function fetchStats() {
      try {
        const [projects, skills, services, socialLinks] = await Promise.all([
          getProjects(),
          getSkills(),
          getServices(),
          getSocialLinks(),
        ])
        setStats({
          projects: projects.length,
          skills: skills.length,
          services: services.length,
          socialLinks: socialLinks.length,
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }
    fetchStats()
  }, [])

  const menuItems = [
    { href: '/admin/projects', label: 'Projects', icon: FolderKanban, count: stats.projects },
    { href: '/admin/skills', label: 'Skills', icon: Code, count: stats.skills },
    { href: '/admin/services', label: 'Services', icon: Settings, count: stats.services },
    { href: '/admin/social', label: 'Social Links', icon: LinkIcon, count: stats.socialLinks },
    { href: '/admin/personal', label: 'Personal Info', icon: Users },
    { href: '/admin/home', label: 'Home Config', icon: Home },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={logout}>
            <LogOut size={20} className="mr-2" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-black transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center mb-2">
                      <Icon size={24} className="mr-3 text-gray-600" />
                      <h2 className="text-xl font-bold">{item.label}</h2>
                    </div>
                    {item.count !== undefined && (
                      <p className="text-gray-600">{item.count} items</p>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

