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
      whileHover={{ y: -8 }}
      className="group project-card"
    >
      <Link href={`/projects/${project.slug}`}>
        <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-black transition-all duration-300 cursor-pointer">
          {project.thumbnail && (
            <div className="relative w-full h-64 overflow-hidden">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-2 group-hover:text-gray-700 transition-colors">
              {project.title}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.techStack.slice(0, 3).map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
              {project.techStack.length > 3 && (
                <Badge variant="outline">+{project.techStack.length - 3}</Badge>
              )}
            </div>
            <div className="text-sm text-gray-500">{project.year}</div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

