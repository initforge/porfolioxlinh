import MainLayout from '@/components/layout/MainLayout'
import Hero from '@/components/sections/Hero'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import Tools from '@/components/sections/Tools'
import Process from '@/components/sections/Process'
import Intro from '@/components/sections/Intro'
import CTA from '@/components/sections/CTA'

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <FeaturedProjects />
      <Tools />
      <Process />
      <Intro />
      <CTA />
    </MainLayout>
  )
}

