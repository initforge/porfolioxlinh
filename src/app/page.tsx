import MainLayout from '@/components/layout/MainLayout'
import Hero from '@/components/sections/Hero'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import Tools from '@/components/sections/Tools'
import Intro from '@/components/sections/Intro'

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <FeaturedProjects />
      <Tools />
      <Intro />
    </MainLayout>
  )
}

