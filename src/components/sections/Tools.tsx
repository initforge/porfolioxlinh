'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
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
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-300 to-transparent"></div>
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-accent-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent-300 rounded-full blur-3xl"></div>
      </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 relative z-10"
        >
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-black">
          Công cụ & <span className="text-accent-600">Kỹ năng</span>
        </h2>
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl leading-relaxed mb-8">
          Những công nghệ và công cụ tôi sử dụng để tạo ra các sản phẩm chất lượng cao. Từ frontend đến backend, từ design đến deployment - tôi luôn cập nhật và làm chủ các công nghệ mới nhất.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 relative z-10">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            whileHover={{ y: -4, scale: 1.05 }}
            className="tool-item bg-white border-2 border-gray-300 rounded-lg p-4 text-center hover:border-accent-400 hover:bg-gradient-to-br hover:from-accent-50 hover:to-white transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-md hover:shadow-accent/20"
          >
            {skill.icon && (
              <div className="text-3xl md:text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {skill.icon}
              </div>
            )}
            <div className="font-medium text-sm text-gray-700 group-hover:text-black transition-colors duration-300">
              {skill.name}
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-16 text-center"
      >
        <Button
          variant="outline"
          onClick={() => window.location.href = '/services'}
          size="lg"
          className="text-lg px-8 py-4"
        >
          Xem dịch vụ của tôi →
        </Button>
      </motion.div>
    </section>
  )
}

