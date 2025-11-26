'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, FolderKanban, Wrench, User, Mail } from 'lucide-react'
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
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md rounded-full px-3 py-2 border-2 border-black shadow-lg">
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
                className={`p-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:text-black hover:bg-gray-100'
                }`}
              >
                <Icon size={18} />
              </motion.div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
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

