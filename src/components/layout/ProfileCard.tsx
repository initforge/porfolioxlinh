'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { getPersonalInfo, getSocialLinks } from '@/lib/firebase/firestore'
import { PersonalInfo, SocialLink } from '@/types/admin'
import { Home, FolderKanban, Wrench, User, Mail } from 'lucide-react'
import { Globe, Twitter, Instagram, Github, Linkedin } from 'lucide-react'
import { motion } from 'framer-motion'

const navItems = [
  { href: '/', label: 'Trang chủ', icon: Home },
  { href: '/projects', label: 'Dự án', icon: FolderKanban },
  { href: '/services', label: 'Dịch vụ', icon: Wrench },
  { href: '/about', label: 'Giới thiệu', icon: User },
  { href: '/contact', label: 'Liên hệ', icon: Mail },
]

export default function ProfileCard() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null)
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])
  const pathname = usePathname()

  useEffect(() => {
    async function fetchData() {
      try {
        const [info, links] = await Promise.all([
          getPersonalInfo(),
          getSocialLinks(),
        ])
        setPersonalInfo(info)
        setSocialLinks(links)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  const getIcon = (platform: string) => {
    const lowerPlatform = platform.toLowerCase()
    if (lowerPlatform.includes('twitter') || lowerPlatform.includes('x')) return <Twitter size={20} />
    if (lowerPlatform.includes('instagram')) return <Instagram size={20} />
    if (lowerPlatform.includes('github')) return <Github size={20} />
    if (lowerPlatform.includes('linkedin')) return <Linkedin size={20} />
    if (lowerPlatform.includes('email') || lowerPlatform.includes('mail')) return <Mail size={20} />
    return <Globe size={20} />
  }

  return (
    <div className="bg-white border-2 border-black rounded-2xl p-6 md:p-8 h-fit sticky top-8">
      {/* Navigation Icons - Inside Profile Card */}
      <div className="flex items-center justify-center gap-2 mb-8 pb-6 border-b-2 border-black">
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
            </Link>
          )
        })}
      </div>

      {/* Avatar */}
      {personalInfo?.avatar && (
        <div className="relative w-32 h-32 md:w-36 md:h-36 mx-auto mb-6 rounded-full overflow-hidden border-4 border-black">
          <Image
            src={personalInfo.avatar}
            alt={personalInfo.name || 'Profile'}
            fill
            className="object-cover"
          />
        </div>
      )}
      
      {/* Name & Info */}
      <div className="text-center mb-6">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-3">
          {personalInfo?.name || 'Tên của bạn'}
        </h2>
        <p className="text-gray-700 text-base md:text-lg mb-2 font-medium">
          {personalInfo?.tagline || 'Freelance Web Developer'}
        </p>
        {personalInfo?.email && (
          <p className="text-gray-500 text-sm">
            {personalInfo.email}
          </p>
        )}
      </div>

      {/* Social Links */}
      {socialLinks.length > 0 && (
        <div className="flex justify-center gap-4 pt-6 border-t-2 border-black">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black transition-colors"
              aria-label={link.platform}
            >
              {link.icon ? (
                <span className="text-xl">{link.icon}</span>
              ) : (
                getIcon(link.platform)
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

