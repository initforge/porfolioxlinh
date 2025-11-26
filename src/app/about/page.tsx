'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Container from '@/components/layout/Container'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import TextReveal from '@/components/ui/TextReveal'
import { getPersonalInfo, getSkills } from '@/lib/firebase/firestore'
import { PersonalInfo } from '@/types/admin'
import { Skill } from '@/types/skill'
import { staggerReveal, animateOnScroll } from '@/lib/three/animations'
import Image from 'next/image'

export default function AboutPage() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null)
  const [skills, setSkills] = useState<Skill[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const [info, skillsData] = await Promise.all([
          getPersonalInfo(),
          getSkills(),
        ])
        setPersonalInfo(info)
        setSkills(skillsData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    animateOnScroll('.story-section', { y: 50, opacity: 0, duration: 0.8 }).catch(console.error)
    if (skills.length > 0) {
      staggerReveal('.skill-item', 0.05).catch(console.error)
    }
  }, [skills])

  if (!personalInfo) {
    return <LoadingSpinner />
  }

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <div className="pt-32 pb-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-12 text-center">Giới thiệu</h1>

          {/* Avatar */}
          {personalInfo.avatar && (
            <div className="mb-12 text-center">
              <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-black">
                <Image
                  src={personalInfo.avatar}
                  alt={personalInfo.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Story */}
          <div className="story-section mb-16">
            <TextReveal>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Câu chuyện của tôi</h2>
            </TextReveal>
            <div className="prose max-w-none">
              {personalInfo.aboutStory.split('\n\n').map((paragraph, index) => (
                <TextReveal key={index} delay={index * 0.1}>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                    {paragraph}
                  </p>
                </TextReveal>
              ))}
            </div>
          </div>

          {/* Skills */}
          {Object.keys(skillsByCategory).length > 0 && (
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Kỹ năng</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                  <div key={category}>
                    <h3 className="text-xl font-bold mb-4 capitalize">{category}</h3>
                    <div className="flex flex-wrap gap-3">
                      {categorySkills.map((skill) => (
                        <div
                          key={skill.id}
                          className="skill-item bg-gray-100 px-4 py-2 rounded-full text-sm font-medium"
                        >
                          {skill.icon && <span className="mr-2">{skill.icon}</span>}
                          {skill.name}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Why Work With Me */}
          <div className="bg-gray-50 p-10 md:p-12 rounded-lg">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Tại sao nên làm việc với tôi</h2>
            <ul className="space-y-6">
              {[
                'Giao tiếp rõ ràng trong suốt dự án',
                'Code chất lượng cao, dễ bảo trì',
                'Giao hàng đúng hạn và tôn trọng deadline',
                'Hỗ trợ và bảo trì liên tục',
              ].map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-black font-bold mr-4 text-xl">✓</span>
                  <span className="text-lg md:text-xl text-gray-700 leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </div>
  )
}

