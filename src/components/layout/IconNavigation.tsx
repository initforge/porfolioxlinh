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
    <nav className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center gap-1 bg-white rounded-full px-2 py-1.5 border-2 border-black">
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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-md transition-all ${
                  isActive
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                <Icon size={20} />
              </motion.div>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

