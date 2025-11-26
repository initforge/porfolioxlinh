'use client'

import { useEffect, useState } from 'react'
import Container from '@/components/layout/Container'
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
    return (
      <div className="pt-32 pb-20">
        <Container>
          <div className="text-center">
            <p className="text-gray-500">Loading...</p>
          </div>
        </Container>
      </div>
    )
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
          <h1 className="text-5xl md:text-6xl font-bold mb-12 text-center">About Me</h1>

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
            <h2 className="text-3xl font-bold mb-6">My Story</h2>
            <div className="prose max-w-none">
              {personalInfo.aboutStory.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-lg text-gray-700 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Skills */}
          {Object.keys(skillsByCategory).length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8">Skills</h2>
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
          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-6">Why Work With Me</h2>
            <ul className="space-y-4">
              {[
                'Clear communication throughout the project',
                'High-quality, maintainable code',
                'Timely delivery and respect for deadlines',
                'Ongoing support and maintenance',
              ].map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-black font-bold mr-3">✓</span>
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </div>
  )
}

