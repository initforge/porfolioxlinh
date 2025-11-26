'use client'

import { ReactNode } from 'react'
import ProfileCard from './ProfileCard'
import IconNavigation from './IconNavigation'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-white text-black">
      <IconNavigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-16">
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

