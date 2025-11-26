export interface SocialLink {
  id: string
  platform: string
  url: string
  icon?: string
  displayName?: string
}

export interface PersonalInfo {
  name: string
  tagline: string
  intro: string
  aboutStory: string
  email: string
  responseTime?: string
  avatar?: string
}

export interface Service {
  id: string
  name: string
  description: string
  icon?: string
  order: number
}

export interface HomeConfig {
  featuredProjects: string[]
  heroContent: {
    title?: string
    tagline?: string
    intro?: string
  }
  ctaText?: string
}

