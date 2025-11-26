'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import MainLayout from '@/components/layout/MainLayout'
import { getServices, getSkills } from '@/lib/firebase/firestore'
import { Service } from '@/types/admin'
import { Skill } from '@/types/skill'
import { staggerReveal } from '@/lib/three/animations'

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [skills, setSkills] = useState<Skill[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const [servicesData, skillsData] = await Promise.all([
          getServices(),
          getSkills(),
        ])
        setServices(servicesData)
        setSkills(skillsData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (services.length > 0) {
      staggerReveal('.service-card', 0.1).catch(console.error)
    }
  }, [services])

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-black">
          Dịch Vụ
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
          Những gì tôi có thể giúp bạn
        </p>
      </motion.div>

      {/* Services List */}
      {services.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="service-card bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-black transition-all duration-300 h-full"
            >
              {service.icon && (
                <div className="text-4xl mb-4">{service.icon}</div>
              )}
              <h2 className="text-2xl font-bold mb-3 text-black">{service.name}</h2>
              <p className="text-base text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Process */}
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-black">Quy trình làm việc</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Khám phá', desc: 'Tìm hiểu nhu cầu và mục tiêu của bạn' },
            { step: '02', title: 'Lập kế hoạch', desc: 'Tạo roadmap và timeline chi tiết' },
            { step: '03', title: 'Phát triển', desc: 'Xây dựng giải pháp của bạn' },
            { step: '04', title: 'Giao hàng', desc: 'Launch và hỗ trợ' },
          ].map((item, index) => (
            <div key={index} className="bg-white border-2 border-black rounded-xl p-6 text-center">
              <div className="text-5xl md:text-6xl font-bold text-gray-200 mb-4">{item.step}</div>
              <h3 className="text-xl font-bold mb-2 text-black">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      {skills.length > 0 && (
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">Công nghệ tôi sử dụng</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="bg-white border-2 border-gray-200 rounded-lg p-4 text-center hover:border-black transition-colors"
              >
                {skill.icon && <div className="text-2xl mb-2">{skill.icon}</div>}
                <div className="font-medium text-gray-700 text-sm">{skill.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </MainLayout>
  )
}

