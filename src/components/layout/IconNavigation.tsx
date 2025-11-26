'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, FolderKanban, Wrench, Building2, User, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

const navItems = [
  { href: '/', label: 'Trang chủ', icon: Home },
  { href: '/projects', label: 'Dự án', icon: FolderKanban },
  { href: '/services', label: 'Dịch vụ', icon: Wrench },
  { href: '/about', label: 'Giới thiệu', icon: User },
  { href: '/contact', label: 'Liên hệ', icon: Mail },
]

export default function IconNavigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 md:left-4 md:transform-none">
      <div className="flex items-center gap-2 bg-gray-900/90 backdrop-blur-md rounded-full px-2 py-2 border border-gray-800">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative group"
              aria-label={item.label}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-full transition-colors ${
                  isActive
                    ? 'bg-purple-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Icon size={20} />
              </motion.div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {item.label}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

