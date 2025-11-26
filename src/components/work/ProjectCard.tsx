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
        <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-black transition-all duration-300 cursor-pointer h-full flex flex-col relative">
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300 z-10 pointer-events-none" />
          
          {project.thumbnail && (
            <div className="relative w-full h-80 md:h-96 overflow-hidden">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          )}
          <div className="p-8 flex-1 flex flex-col relative z-20">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-gray-700 transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-lg text-gray-600 mb-6 line-clamp-3 leading-relaxed flex-1 group-hover:text-gray-700 transition-colors duration-300">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.techStack.slice(0, 4).map((tech) => (
                <Badge key={tech} variant="outline" className="group-hover:border-black transition-colors">
                  {tech}
                </Badge>
              ))}
              {project.techStack.length > 4 && (
                <Badge variant="outline" className="group-hover:border-black transition-colors">
                  +{project.techStack.length - 4}
                </Badge>
              )}
            </div>
            <div className="text-base text-gray-500 font-medium group-hover:text-gray-700 transition-colors duration-300">
              {project.year}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

