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

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  // Fallback content when no data
  const defaultStory = `Tôi là một Freelance Web Developer đam mê tạo ra những trải nghiệm web tuyệt vời. Với nhiều năm kinh nghiệm trong việc phát triển các ứng dụng web hiện đại, tôi luôn cố gắng kết hợp giữa tính thẩm mỹ và chức năng để tạo ra những sản phẩm chất lượng cao.

Tôi chuyên về việc xây dựng các website responsive, tối ưu hiệu suất và tập trung vào trải nghiệm người dùng. Mỗi dự án là một cơ hội để học hỏi và phát triển, và tôi luôn đặt mục tiêu vượt qua kỳ vọng của khách hàng.`

  if (!personalInfo) {
    return (
      <MainLayout>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-black max-w-4xl">
            <span className="text-accent-600">Giới</span><br />
            Thiệu
          </h1>
        </motion.div>

        {/* Story - Fallback */}
        <div className="mb-16">
          <TextReveal>
            <h2 className="text-[64px] md:text-[72px] font-bold mb-10 leading-[1.1] text-black tracking-[-0.02em] max-w-5xl">
              Câu chuyện <span className="text-accent-600">của tôi</span>
            </h2>
          </TextReveal>
          <div className="prose max-w-none">
            {defaultStory.split('\n\n').map((paragraph, index) => (
              <TextReveal key={index} delay={index * 0.1}>
                <p className="text-[18px] md:text-[20px] text-gray-700 leading-[1.7] mb-6 max-w-5xl">
                  {paragraph}
                </p>
              </TextReveal>
            ))}
          </div>
        </div>

        {/* Skills - Fallback */}
        <div className="mb-16">
          <h2 className="text-[64px] md:text-[72px] font-bold mb-10 leading-[1.1] text-black tracking-[-0.02em] max-w-5xl">
            <span className="text-accent-600">Kỹ năng</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-gray-300 rounded-xl p-6 hover:border-accent-400 hover:bg-gradient-to-br hover:from-accent-50 hover:to-white transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-accent/20">
              <h3 className="text-xl font-bold mb-4 text-black">Frontend</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'].map((skill) => (
                  <div
                    key={skill}
                    className="skill-item bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 hover:text-black transition-colors duration-300"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white border-2 border-gray-300 rounded-xl p-6 hover:border-accent-400 hover:bg-gradient-to-br hover:from-accent-50 hover:to-white transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-accent/20">
              <h3 className="text-xl font-bold mb-4 text-black">Backend & Tools</h3>
              <div className="flex flex-wrap gap-2">
                {['Node.js', 'Firebase', 'MongoDB', 'Git', 'Vercel'].map((skill) => (
                  <div
                    key={skill}
                    className="skill-item bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 hover:text-black transition-colors duration-300"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Why Work With Me */}
        <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-300 p-8 md:p-10 rounded-xl hover:border-accent-400 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300">
          <h2 className="text-[64px] md:text-[72px] font-bold mb-10 leading-[1.1] text-black tracking-[-0.02em] max-w-5xl">
            Tại sao nên <span className="text-accent-600">làm việc</span> với tôi
          </h2>
          <ul className="space-y-4">
            {[
              'Giao tiếp rõ ràng trong suốt dự án',
              'Code chất lượng cao, dễ bảo trì',
              'Giao hàng đúng hạn và tôn trọng deadline',
              'Hỗ trợ và bảo trì liên tục',
            ].map((point, index) => (
              <li key={index} className="flex items-start">
                <span className="text-accent-600 font-bold mr-4 text-xl">✓</span>
                <span className="text-lg text-gray-700 leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h1 className="text-[64px] md:text-[72px] font-bold mb-10 leading-[1.1] text-black tracking-[-0.02em] max-w-5xl">
          <span className="text-accent-600">Giới</span> Thiệu
        </h1>
      </motion.div>

      {/* Story */}
      <div className="mb-16">
        <TextReveal>
          <h2 className="text-[64px] md:text-[72px] font-bold mb-10 leading-[1.1] text-black tracking-[-0.02em] max-w-5xl">
            Câu chuyện <span className="text-accent-600">của tôi</span>
          </h2>
        </TextReveal>
        <div className="prose max-w-none">
          {(personalInfo.aboutStory || defaultStory).split('\n\n').map((paragraph, index) => (
            <TextReveal key={index} delay={index * 0.1}>
              <p className="text-[18px] md:text-[20px] text-gray-700 leading-[1.7] mb-6 max-w-5xl">
                {paragraph}
              </p>
            </TextReveal>
          ))}
        </div>
      </div>

      {/* Skills */}
      {Object.keys(skillsByCategory).length > 0 && (
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-black max-w-4xl">
            <span className="text-accent-600">Kỹ năng</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <div key={category} className="bg-white border-2 border-gray-300 rounded-xl p-6 hover:border-accent-400 hover:bg-gradient-to-br hover:from-accent-50 hover:to-white transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-accent/20">
                <h3 className="text-xl font-bold mb-4 capitalize text-black">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="skill-item bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 hover:text-black transition-colors duration-300"
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
      <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-300 p-8 md:p-10 rounded-xl hover:border-accent-400 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300">
        <h2 className="text-[64px] md:text-[72px] font-bold mb-10 leading-[1.1] text-black tracking-[-0.02em] max-w-5xl">
          Tại sao nên <span className="text-accent-600">làm việc</span> với tôi
        </h2>
        <ul className="space-y-4">
          {[
            'Giao tiếp rõ ràng trong suốt dự án',
            'Code chất lượng cao, dễ bảo trì',
            'Giao hàng đúng hạn và tôn trọng deadline',
            'Hỗ trợ và bảo trì liên tục',
          ].map((point, index) => (
            <li key={index} className="flex items-start">
              <span className="text-accent-600 font-bold mr-4 text-xl">✓</span>
              <span className="text-lg text-gray-700 leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </MainLayout>
  )
}

