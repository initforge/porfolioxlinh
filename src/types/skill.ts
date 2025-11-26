export type SkillCategory = 'frontend' | 'backend' | 'tools' | 'other'

export interface Skill {
  id: string
  name: string
  category: SkillCategory
  icon?: string
  order: number
}

