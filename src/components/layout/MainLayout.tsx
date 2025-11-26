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
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Sidebar - Profile Card */}
          <aside className="lg:col-span-3 flex justify-center">
            <ProfileCard />
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

