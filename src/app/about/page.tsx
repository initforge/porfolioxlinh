'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import MainLayout from '@/components/layout/MainLayout'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import TextReveal from '@/components/ui/TextReveal'
import { getPersonalInfo, getSkills } from '@/lib/firebase/firestore'
import { PersonalInfo } from '@/types/admin'
import { Skill } from '@/types/skill'
import { staggerReveal } from '@/lib/three/animations'

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
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-12 text-black">
          Giới Thiệu
        </h1>
      </motion.div>

      {/* Story */}
      <div className="mb-16">
        <TextReveal>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-black">Câu chuyện của tôi</h2>
        </TextReveal>
        <div className="prose max-w-none">
          {personalInfo.aboutStory.split('\n\n').map((paragraph, index) => (
            <TextReveal key={index} delay={index * 0.1}>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6">
                {paragraph}
              </p>
            </TextReveal>
          ))}
        </div>
      </div>

      {/* Skills */}
      {Object.keys(skillsByCategory).length > 0 && (
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-black">Kỹ năng</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <div key={category} className="bg-white border-2 border-black rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 capitalize text-black">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="skill-item bg-gray-100 px-3 py-1.5 rounded-full text-sm font-medium text-gray-700"
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
      <div className="bg-white border-2 border-black p-8 md:p-10 rounded-xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">Tại sao nên làm việc với tôi</h2>
        <ul className="space-y-4">
          {[
            'Giao tiếp rõ ràng trong suốt dự án',
            'Code chất lượng cao, dễ bảo trì',
            'Giao hàng đúng hạn và tôn trọng deadline',
            'Hỗ trợ và bảo trì liên tục',
          ].map((point, index) => (
            <li key={index} className="flex items-start">
              <span className="text-black font-bold mr-4 text-xl">✓</span>
              <span className="text-lg text-gray-700 leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </MainLayout>
  )
}

