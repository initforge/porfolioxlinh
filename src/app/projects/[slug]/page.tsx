'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import VideoEmbed from '@/components/work/VideoEmbed'
import TechStack from '@/components/work/TechStack'
import { getProjectBySlug, getProjects } from '@/lib/firebase/firestore'
import { Project } from '@/types/project'
import { ExternalLink, Github, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { animateOnScroll } from '@/lib/three/animations'

export default function ProjectDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [project, setProject] = useState<Project | null>(null)
  const [allProjects, setAllProjects] = useState<Project[]>([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProject() {
      try {
        const projectData = await getProjectBySlug(slug)
        setProject(projectData)

        // Get all projects for navigation
        const projects = await getProjects()
        setAllProjects(projects)
        const index = projects.findIndex((p) => p.slug === slug)
        setCurrentIndex(index)
      } catch (error) {
        console.error('Error fetching project:', error)
      } finally {
        setLoading(false)
      }
    }
    if (slug) {
      fetchProject()
    }
  }, [slug])

  useEffect(() => {
    if (project) {
      animateOnScroll('.project-content', { y: 30, opacity: 0, duration: 0.8 }).catch(console.error)
    }
  }, [project])

  if (loading) {
    return (
      <div className="pt-32 pb-20">
        <Container>
          <div className="text-center">
            <p className="text-gray-500 text-lg">Đang tải dự án...</p>
          </div>
        </Container>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="pt-32 pb-20">
        <Container>
          <div className="text-center">
            <p className="text-gray-500 text-lg">Không tìm thấy dự án.</p>
            <Link href="/projects" className="text-black underline mt-4 inline-block text-lg">
              Quay lại danh sách dự án
            </Link>
          </div>
        </Container>
      </div>
    )
  }

  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null

  return (
    <div className="pt-32 pb-20">
      <Container>
        <Link
          href="/projects"
          className="inline-flex items-center text-gray-600 hover:text-black mb-8 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Quay lại danh sách dự án
        </Link>

        <div className="project-content">
          {/* Video */}
          {project.links?.tiktok && (
            <div className="mb-12">
              <VideoEmbed url={project.links.tiktok} type="tiktok" />
            </div>
          )}

          {/* Project Info */}
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">{project.title}</h1>
            <div className="flex items-center gap-4 mb-8 text-gray-600">
              <span>{project.year}</span>
              <span>•</span>
              <span className="capitalize">{project.category}</span>
            </div>

            <div className="prose max-w-none mb-12">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Tech Stack */}
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Công nghệ sử dụng</h2>
              <TechStack techs={project.techStack} />
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-4 mb-12">
              {project.links?.vercel && (
                <Button
                  variant="outline"
                  onClick={() => window.open(project.links?.vercel, '_blank')}
                >
                  <ExternalLink size={20} className="mr-2" />
                  Xem demo
                </Button>
              )}
              {project.links?.github && (
                <Button
                  variant="outline"
                  onClick={() => window.open(project.links?.github, '_blank')}
                >
                  <Github size={20} className="mr-2" />
                  GitHub
                </Button>
              )}
              {project.links?.tiktok && (
                <Button
                  variant="outline"
                  onClick={() => window.open(project.links?.tiktok, '_blank')}
                >
                  <ExternalLink size={20} className="mr-2" />
                  Video
                </Button>
              )}
            </div>

            {/* Screenshots */}
            {project.images && project.images.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Hình ảnh</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.images.map((image, index) => (
                    <div key={index} className="relative w-full aspect-video rounded-lg border-2 border-gray-200 overflow-hidden">
                      <Image
                        src={image}
                        alt={`${project.title} screenshot ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center pt-8 border-t border-gray-200">
              {prevProject ? (
                <Link
                  href={`/projects/${prevProject.slug}`}
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  ← Dự án trước
                </Link>
              ) : (
                <div />
              )}
              {nextProject ? (
                <Link
                  href={`/projects/${nextProject.slug}`}
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Dự án tiếp theo →
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

