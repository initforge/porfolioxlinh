'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getPersonalInfo, getSocialLinks } from '@/lib/firebase/firestore'
import { PersonalInfo, SocialLink } from '@/types/admin'
import { Globe, Twitter, Instagram, Github, Linkedin, Mail } from 'lucide-react'

export default function ProfileCard() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null)
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])

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
    if (lowerPlatform.includes('twitter') || lowerPlatform.includes('x')) return <Twitter size={24} />
    if (lowerPlatform.includes('instagram')) return <Instagram size={24} />
    if (lowerPlatform.includes('github')) return <Github size={24} />
    if (lowerPlatform.includes('linkedin')) return <Linkedin size={24} />
    if (lowerPlatform.includes('email') || lowerPlatform.includes('mail')) return <Mail size={24} />
    return <Globe size={24} />
  }

  return (
    <div className="bg-white border-2 border-black rounded-2xl p-8 h-fit sticky top-8">
      {/* Avatar - Always show, even if no image */}
      <div className="relative w-36 h-36 mx-auto mb-8 rounded-full overflow-hidden border-4 border-black bg-gray-100">
        {personalInfo?.avatar ? (
          <Image
            src={personalInfo.avatar}
            alt={personalInfo.name || 'Profile'}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl text-gray-400">
            {personalInfo?.name?.charAt(0) || '?'}
          </div>
        )}
      </div>
      
      {/* Name & Info */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-black mb-3 leading-tight">
          {personalInfo?.name || 'Tên của bạn'}
        </h2>
        <p className="text-lg text-black mb-2">
          {personalInfo?.tagline || 'Freelance Web Developer'}
        </p>
        {personalInfo?.email && (
          <p className="text-sm text-gray-600 mt-1">
            {personalInfo.email}
          </p>
        )}
      </div>

      {/* Social Links */}
      {socialLinks.length > 0 && (
        <div className="flex justify-center gap-5 pt-6 border-t-2 border-black">
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
                <span className="text-2xl">{link.icon}</span>
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

