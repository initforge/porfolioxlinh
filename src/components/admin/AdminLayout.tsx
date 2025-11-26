'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { LogOut, ArrowLeft } from 'lucide-react'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { isAuthenticated, loading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/admin/login')
    }
  }, [isAuthenticated, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white border-b-2 border-black sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/admin"
              className="text-xl font-bold text-black hover:text-gray-700 transition-colors"
            >
              Admin Dashboard
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-black transition-colors flex items-center gap-2"
              >
                <ArrowLeft size={18} />
                View Site
              </Link>
              <Button variant="outline" onClick={logout} size="sm">
                <LogOut size={18} className="mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}

