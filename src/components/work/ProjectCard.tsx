'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Project } from '@/types/project'
import Badge from '@/components/ui/Badge'

interface ProjectCardProps {
  project: Project
  index?: number
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -12, scale: 1.02 }}
      className="group project-card"
    >
      <Link href={`/projects/${project.slug}`}>
        <div className="bg-white border-2 border-gray-300 rounded-xl overflow-hidden hover:border-accent-400 hover:bg-gradient-to-br hover:from-accent-50 hover:to-white transition-all duration-300 cursor-pointer h-full flex flex-col relative group shadow-md hover:shadow-xl hover:shadow-accent/20">
          {project.thumbnail && (
            <div className="relative w-full h-64 md:h-80 overflow-hidden">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
            </div>
          )}
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-black group-hover:text-gray-700 transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-base text-gray-600 mb-4 line-clamp-2 leading-relaxed flex-1">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.techStack.slice(0, 3).map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
              {project.techStack.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{project.techStack.length - 3}
                </Badge>
              )}
            </div>
            <div className="text-sm text-gray-500 font-medium">
              {project.year}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

