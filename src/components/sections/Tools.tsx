'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Container from '@/components/layout/Container'
import { getSkills } from '@/lib/firebase/firestore'
import { Skill } from '@/types/skill'
import { staggerReveal } from '@/lib/three/animations'

export default function Tools() {
  const [skills, setSkills] = useState<Skill[]>([])

  useEffect(() => {
    async function fetchSkills() {
      try {
        const skillsData = await getSkills()
        setSkills(skillsData.slice(0, 12)) // Show top 12
      } catch (error) {
        console.error('Error fetching skills:', error)
      }
    }
    fetchSkills()
  }, [])

  useEffect(() => {
    if (skills.length > 0) {
      staggerReveal('.tool-item', 0.05).catch(console.error)
    }
  }, [skills])

  if (skills.length === 0) return null

  return (
    <section className="py-24 md:py-40 bg-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-gray-200 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gray-200 rounded-full blur-3xl" />
        </div>
      </div>
      
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            Công cụ & Kỹ năng
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl leading-relaxed">
            Những công nghệ và công cụ tôi sử dụng để tạo ra các sản phẩm chất lượng cao
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              whileHover={{ y: -8, scale: 1.05, rotate: 2 }}
              className="tool-item bg-gray-50 border-2 border-gray-200 rounded-lg p-6 text-center hover:border-black transition-all duration-300 cursor-pointer group relative overflow-hidden"
            >
              {/* Hover background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {skill.icon && (
                <div className="text-4xl md:text-5xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 relative z-10">
                  {skill.icon}
                </div>
              )}
              <div className="font-medium text-lg relative z-10 group-hover:text-black transition-colors duration-300">
                {skill.name}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

