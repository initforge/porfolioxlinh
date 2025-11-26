export type ProjectCategory = 'web-app' | 'ecommerce' | 'landing' | 'custom'

export interface Project {
  id: string
  slug: string
  title: string
  description: string
  longDescription?: string
  category: ProjectCategory
  year: number
  techStack: string[]
  links: {
    vercel?: string
    github?: string
    tiktok?: string
  }
  thumbnail?: string
  images?: string[]
  featured: boolean
  createdAt: string
  updatedAt: string
}

