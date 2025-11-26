'use client'

import { motion } from 'framer-motion'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import TextReveal from '@/components/ui/TextReveal'

const processSteps = [
  {
    step: '01',
    title: 'Khám phá & Phân tích',
    description: 'Tìm hiểu sâu về nhu cầu, mục tiêu và đối tượng khách hàng của bạn. Phân tích thị trường và đối thủ cạnh tranh để tạo ra giải pháp tối ưu nhất.',
    icon: '🔍',
  },
  {
    step: '02',
    title: 'Lập kế hoạch & Thiết kế',
    description: 'Xây dựng roadmap chi tiết, wireframes và mockups. Tạo ra một thiết kế không chỉ đẹp mắt mà còn tối ưu cho trải nghiệm người dùng.',
    icon: '📐',
  },
  {
    step: '03',
    title: 'Phát triển & Tối ưu',
    description: 'Xây dựng sản phẩm với code chất lượng cao, tối ưu hiệu suất và đảm bảo responsive trên mọi thiết bị. Testing kỹ lưỡng ở mọi giai đoạn.',
    icon: '⚡',
  },
  {
    step: '04',
    title: 'Launch & Hỗ trợ',
    description: 'Triển khai sản phẩm một cách mượt mà và cung cấp hỗ trợ liên tục. Bảo trì, cập nhật và cải thiện dựa trên phản hồi của người dùng.',
    icon: '🚀',
  },
]

export default function Process() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-300 to-transparent"></div>
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-accent-200 rounded-full blur-3xl"></div>
      </div>
      
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 relative z-10"
        >
          <TextReveal>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-black">
              Quy trình <span className="text-accent-600">làm việc</span>
            </h2>
          </TextReveal>
          <TextReveal delay={0.1}>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl leading-relaxed">
              Một quy trình được tinh chỉnh qua nhiều dự án, đảm bảo mọi bước đều được thực hiện một cách chuyên nghiệp và hiệu quả.
            </p>
          </TextReveal>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-16 relative z-10">
          {processSteps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white border-2 border-gray-300 rounded-xl p-6 md:p-8 hover:border-accent-400 hover:bg-gradient-to-br hover:from-accent-50 hover:to-white transition-all duration-300 relative group shadow-md hover:shadow-xl hover:shadow-accent/20"
            >
              {/* Step number - large and subtle */}
              <div className="absolute top-4 right-4 text-6xl md:text-7xl font-bold text-gray-100 group-hover:text-gray-200 transition-colors duration-300">
                {item.step}
              </div>
              
              {/* Icon */}
              <div className="text-4xl md:text-5xl mb-4 relative z-10">
                {item.icon}
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-black">
                  {item.title}
                </h3>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <Button
            variant="accent"
            onClick={() => window.location.href = '/contact'}
            size="lg"
            className="text-lg px-8 py-4"
          >
            Bắt đầu dự án ngay →
          </Button>
        </motion.div>
      </Container>
    </section>
  )
}

