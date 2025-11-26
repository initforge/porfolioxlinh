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
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 cursor-pointer h-full flex flex-col relative group">
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
          
          {project.thumbnail && (
            <div className="relative w-full h-64 md:h-80 overflow-hidden">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
            </div>
          )}
          <div className="p-6 flex-1 flex flex-col relative z-20">
            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-base text-gray-400 mb-4 line-clamp-2 leading-relaxed flex-1">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.techStack.slice(0, 3).map((tech) => (
                <Badge key={tech} variant="outline" className="border-gray-700 text-gray-300 text-xs">
                  {tech}
                </Badge>
              ))}
              {project.techStack.length > 3 && (
                <Badge variant="outline" className="border-gray-700 text-gray-300 text-xs">
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

