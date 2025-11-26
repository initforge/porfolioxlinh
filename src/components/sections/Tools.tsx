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
    <section className="py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
          Công cụ & <span className="text-purple-400">Kỹ năng</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed">
          Những công nghệ và công cụ tôi sử dụng để tạo ra các sản phẩm chất lượng cao
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            whileHover={{ y: -4, scale: 1.05 }}
            className="tool-item bg-gray-900 border border-gray-800 rounded-lg p-4 text-center hover:border-purple-500/50 transition-all duration-300 cursor-pointer group"
          >
            {skill.icon && (
              <div className="text-3xl md:text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {skill.icon}
              </div>
            )}
            <div className="font-medium text-sm text-gray-300 group-hover:text-purple-400 transition-colors duration-300">
              {skill.name}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

