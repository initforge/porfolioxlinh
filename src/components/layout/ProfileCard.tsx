'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getPersonalInfo, getSocialLinks } from '@/lib/firebase/firestore'
import { PersonalInfo, SocialLink } from '@/types/admin'
import { Globe, Twitter, Instagram, Mail, Github, Linkedin } from 'lucide-react'

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
    if (lowerPlatform.includes('twitter') || lowerPlatform.includes('x')) return <Twitter size={20} />
    if (lowerPlatform.includes('instagram')) return <Instagram size={20} />
    if (lowerPlatform.includes('github')) return <Github size={20} />
    if (lowerPlatform.includes('linkedin')) return <Linkedin size={20} />
    if (lowerPlatform.includes('email') || lowerPlatform.includes('mail')) return <Mail size={20} />
    return <Globe size={20} />
  }

  return (
    <div className="bg-white border-2 border-black rounded-2xl p-6 md:p-8 h-fit sticky top-8">
      {personalInfo?.avatar && (
        <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-black">
          <Image
            src={personalInfo.avatar}
            alt={personalInfo.name || 'Profile'}
            fill
            className="object-cover"
          />
        </div>
      )}
      
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">
          {personalInfo?.name || 'Tên của bạn'}
        </h2>
        <p className="text-gray-600 text-sm md:text-base mb-2">
          {personalInfo?.tagline || 'Freelance Web Developer'}
        </p>
        {personalInfo?.email && (
          <p className="text-gray-500 text-xs md:text-sm">
            {personalInfo.email}
          </p>
        )}
      </div>

      {/* Social Links */}
      {socialLinks.length > 0 && (
        <div className="flex justify-center gap-4">
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

