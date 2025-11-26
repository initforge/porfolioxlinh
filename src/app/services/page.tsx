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
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Services</h1>
        <p className="text-xl text-gray-600 mb-12">
          What I can help you with
        </p>

        {/* Services List */}
        {services.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="service-card bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-black transition-all duration-300"
              >
                {service.icon && (
                  <div className="text-4xl mb-4">{service.icon}</div>
                )}
                <h2 className="text-2xl font-bold mb-3">{service.name}</h2>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Process */}
        <div className="process-section mb-20">
          <h2 className="text-4xl font-bold mb-8 text-center">My Process</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Discovery', desc: 'Understanding your needs and goals' },
                { step: '02', title: 'Planning', desc: 'Creating a roadmap and timeline' },
                { step: '03', title: 'Development', desc: 'Building your solution' },
                { step: '04', title: 'Delivery', desc: 'Launch and support' },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-6xl font-bold text-gray-200 mb-4">{item.step}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-4xl font-bold mb-8 text-center">Technologies I Work With</h2>
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

