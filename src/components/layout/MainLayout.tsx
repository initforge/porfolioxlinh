'use client'

import { ReactNode } from 'react'
import ProfileCard from './ProfileCard'
import IconNavigation from './IconNavigation'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <IconNavigation />
      
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Profile Card */}
          <aside className="lg:col-span-1">
            <ProfileCard />
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

