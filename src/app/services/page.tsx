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
      <div className="pt-16 md:pt-24 lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
        <h1 className="text-[64px] md:text-[72px] font-bold mb-10 leading-[1.1] text-black tracking-[-0.02em] max-w-5xl">
          <span className="text-accent-600">Dịch Vụ</span>
        </h1>
        <div className="space-y-3 mb-10 max-w-5xl">
          <p className="text-[18px] md:text-[20px] text-gray-700 leading-[1.7]">
            Những gì tôi có thể giúp bạn
          </p>
        </div>
      </motion.div>

      {/* Services List */}
      {services.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="service-card bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-accent-400 hover:bg-gradient-to-br hover:from-accent-50 hover:to-white transition-all duration-300 h-full shadow-sm hover:shadow-md hover:shadow-accent/20"
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
      <div className="mb-16">
        <h2 className="text-[64px] md:text-[72px] font-bold mb-10 leading-[1.1] text-black tracking-[-0.02em] max-w-5xl">
          Quy trình <span className="text-accent-600">làm việc</span>
        </h2>
        <div className="space-y-3 mb-10 max-w-5xl">
          <p className="text-[18px] md:text-[20px] text-gray-700 leading-[1.7]">
            Một quy trình được tinh chỉnh qua nhiều dự án, đảm bảo mọi bước đều được thực hiện một cách chuyên nghiệp và hiệu quả.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {[
            { step: '01', title: 'Khám phá & Phân tích', desc: 'Tìm hiểu sâu về nhu cầu, mục tiêu và đối tượng khách hàng của bạn. Phân tích thị trường và đối thủ cạnh tranh để tạo ra giải pháp tối ưu nhất.', icon: '🔍' },
            { step: '02', title: 'Lập kế hoạch & Thiết kế', desc: 'Xây dựng roadmap chi tiết, wireframes và mockups. Tạo ra một thiết kế không chỉ đẹp mắt mà còn tối ưu cho trải nghiệm người dùng.', icon: '📐' },
            { step: '03', title: 'Phát triển & Tối ưu', desc: 'Xây dựng sản phẩm với code chất lượng cao, tối ưu hiệu suất và đảm bảo responsive trên mọi thiết bị. Testing kỹ lưỡng ở mọi giai đoạn.', icon: '⚡' },
            { step: '04', title: 'Launch & Hỗ trợ', desc: 'Triển khai sản phẩm một cách mượt mà và cung cấp hỗ trợ liên tục. Bảo trì, cập nhật và cải thiện dựa trên phản hồi của người dùng.', icon: '🚀' },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white border-2 border-gray-300 rounded-xl p-6 md:p-8 text-center hover:border-accent-400 hover:bg-gradient-to-br hover:from-accent-50 hover:to-white transition-all duration-300 relative group shadow-md hover:shadow-xl hover:shadow-accent/20"
            >
              <div className="absolute top-4 right-4 text-6xl font-bold text-gray-100 group-hover:text-gray-200 transition-colors duration-300">
                {item.step}
              </div>
              <div className="text-4xl mb-4 relative z-10">{item.icon}</div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-black relative z-10">{item.title}</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed relative z-10">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      {skills.length > 0 && (
        <div>
          <h2 className="text-[64px] md:text-[72px] font-bold mb-10 leading-[1.1] text-black tracking-[-0.02em] max-w-5xl">
            Công nghệ <span className="text-accent-600">tôi sử dụng</span>
          </h2>
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
      </div>
    </MainLayout>
  )
}

