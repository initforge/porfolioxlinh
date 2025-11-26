'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { getPersonalInfo, getSocialLinks } from '@/lib/firebase/firestore'
import { PersonalInfo, SocialLink } from '@/types/admin'
import { Globe, Twitter, Instagram, Github, Linkedin, Mail } from 'lucide-react'

export default function ProfileCard() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null)
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])
  const cardRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    // Dynamic sticky center positioning - Card luôn ở giữa viewport theo chiều dọc khi sticky
    const updateStickyPosition = () => {
      if (cardRef.current) {
        const card = cardRef.current
        const cardHeight = card.offsetHeight
        const viewportHeight = window.innerHeight
        
        // Tính toán để card ở giữa: khoảng cách từ top = (viewport height - card height) / 2
        // Đảm bảo khoảng cách trên và dưới card bằng nhau
        const topOffset = Math.max(0, (viewportHeight - cardHeight) / 2)
        
        card.style.setProperty('--sticky-top', `${topOffset}px`)
      }
    }

    // Update ngay khi component mount và khi data thay đổi
    // Sử dụng setTimeout để đảm bảo DOM đã render xong
    const timer = setTimeout(() => {
      updateStickyPosition()
    }, 100)
    
    // Update khi resize window
    window.addEventListener('resize', updateStickyPosition)
    
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', updateStickyPosition)
    }
  }, [personalInfo, socialLinks])

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
    <div 
      ref={cardRef}
      className="bg-white border-2 border-black rounded-2xl p-10 h-fit sticky mx-auto max-w-[320px]"
      style={{
        top: 'var(--sticky-top, calc(50vh - 50%))',
        marginLeft: '40px',
      }}
    >
      {/* Avatar - Always show, even if no image */}
      <div className="relative w-[160px] h-[160px] mx-auto mb-10 rounded-full overflow-hidden border-4 border-black bg-gray-100">
        {personalInfo?.avatar ? (
          <Image
            src={personalInfo.avatar}
            alt={personalInfo.name || 'Profile'}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl text-gray-400 font-bold">
            {personalInfo?.name?.charAt(0) || '?'}
          </div>
        )}
      </div>
      
      {/* Name & Info */}
      <div className="text-center mb-10">
        <h2 className="text-[36px] font-bold text-black mb-4 leading-[1.1] tracking-tight">
          {personalInfo?.name || 'Tên của bạn'}
        </h2>
        <p className="text-[18px] text-black mb-3 leading-relaxed">
          {personalInfo?.tagline || 'Freelance Web Developer'}
        </p>
        {personalInfo?.email && (
          <p className="text-[14px] text-gray-600 leading-relaxed">
            {personalInfo.email}
          </p>
        )}
      </div>

      {/* Social Links */}
      {socialLinks.length > 0 && (
        <div className="flex justify-center gap-6 pt-8 border-t-2 border-black">
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
                <span className="text-[24px]">{link.icon}</span>
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

