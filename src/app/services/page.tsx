'use client'

import { useEffect, useState } from 'react'
import Container from '@/components/layout/Container'
import { getServices, getSkills } from '@/lib/firebase/firestore'
import { Service } from '@/types/admin'
import { Skill } from '@/types/skill'
import { staggerReveal, animateOnScroll } from '@/lib/three/animations'

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
    animateOnScroll('.process-section', { y: 50, opacity: 0, duration: 0.8 }).catch(console.error)
  }, [services])

  return (
    <div className="pt-32 pb-20">
      <Container>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">Dịch vụ</h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-16 max-w-3xl leading-relaxed">
          Những gì tôi có thể giúp bạn
        </p>

        {/* Services List */}
        {services.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="service-card bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-black transition-all duration-300 h-full"
              >
                {service.icon && (
                  <div className="text-5xl mb-6">{service.icon}</div>
                )}
                <h2 className="text-3xl font-bold mb-4">{service.name}</h2>
                <p className="text-lg text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Process */}
        <div className="process-section mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 text-center">Quy trình làm việc</h2>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
              {[
                { step: '01', title: 'Khám phá', desc: 'Tìm hiểu nhu cầu và mục tiêu của bạn' },
                { step: '02', title: 'Lập kế hoạch', desc: 'Tạo roadmap và timeline chi tiết' },
                { step: '03', title: 'Phát triển', desc: 'Xây dựng giải pháp của bạn' },
                { step: '04', title: 'Giao hàng', desc: 'Launch và hỗ trợ' },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-7xl md:text-8xl font-bold text-gray-200 mb-6">{item.step}</div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{item.title}</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 text-center">Công nghệ tôi sử dụng</h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 text-center hover:border-black transition-colors"
                  >
                    {skill.icon && <div className="text-2xl mb-2">{skill.icon}</div>}
                    <div className="font-medium">{skill.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}

