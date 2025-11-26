import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import Tools from '@/components/sections/Tools'
import Intro from '@/components/sections/Intro'
import CTA from '@/components/sections/CTA'

export default function Home() {
  // Stats data - có thể lấy từ Firebase sau
  const stats = [
    { value: 5, label: 'Năm kinh nghiệm', suffix: '+' },
    { value: 50, label: 'Dự án hoàn thành', suffix: '+' },
    { value: 30, label: 'Khách hàng hài lòng', suffix: '+' },
  ]

  return (
    <>
      <Hero />
      <Stats stats={stats} />
      <FeaturedProjects />
      <Tools />
      <Intro />
      <CTA />
    </>
  )
}

