import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  Timestamp,
} from 'firebase/firestore'
import { db } from './config'
import { Project } from '@/types/project'
import { Skill } from '@/types/skill'
import { SocialLink, PersonalInfo, Service, HomeConfig } from '@/types/admin'

// Projects
export async function getProjects(): Promise<Project[]> {
  const projectsRef = collection(db, 'projects')
  const q = query(projectsRef, orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt,
    updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || doc.data().updatedAt,
  })) as Project[]
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projectsRef = collection(db, 'projects')
  const q = query(projectsRef, where('slug', '==', slug))
  const snapshot = await getDocs(q)
  if (snapshot.empty) return null
  const doc = snapshot.docs[0]
  return {
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt,
    updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || doc.data().updatedAt,
  } as Project
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projectsRef = collection(db, 'projects')
  const q = query(projectsRef, where('featured', '==', true), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt,
    updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || doc.data().updatedAt,
  })) as Project[]
}

export async function createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const projectsRef = collection(db, 'projects')
  const docRef = await addDoc(projectsRef, {
    ...project,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  })
  return docRef.id
}

export async function updateProject(id: string, project: Partial<Project>): Promise<void> {
  const projectRef = doc(db, 'projects', id)
  await updateDoc(projectRef, {
    ...project,
    updatedAt: Timestamp.now(),
  })
}

export async function deleteProject(id: string): Promise<void> {
  const projectRef = doc(db, 'projects', id)
  await deleteDoc(projectRef)
}

// Skills
export async function getSkills(): Promise<Skill[]> {
  const skillsRef = collection(db, 'skills')
  const q = query(skillsRef, orderBy('order', 'asc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Skill[]
}

export async function createSkill(skill: Omit<Skill, 'id'>): Promise<string> {
  const skillsRef = collection(db, 'skills')
  const docRef = await addDoc(skillsRef, skill)
  return docRef.id
}

export async function updateSkill(id: string, skill: Partial<Skill>): Promise<void> {
  const skillRef = doc(db, 'skills', id)
  await updateDoc(skillRef, skill)
}

export async function deleteSkill(id: string): Promise<void> {
  const skillRef = doc(db, 'skills', id)
  await deleteDoc(skillRef)
}

// Social Links
export async function getSocialLinks(): Promise<SocialLink[]> {
  const linksRef = collection(db, 'socialLinks')
  const snapshot = await getDocs(linksRef)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as SocialLink[]
}

export async function createSocialLink(link: Omit<SocialLink, 'id'>): Promise<string> {
  const linksRef = collection(db, 'socialLinks')
  const docRef = await addDoc(linksRef, link)
  return docRef.id
}

export async function updateSocialLink(id: string, link: Partial<SocialLink>): Promise<void> {
  const linkRef = doc(db, 'socialLinks', id)
  await updateDoc(linkRef, link)
}

export async function deleteSocialLink(id: string): Promise<void> {
  const linkRef = doc(db, 'socialLinks', id)
  await deleteDoc(linkRef)
}

// Personal Info
export async function getPersonalInfo(): Promise<PersonalInfo | null> {
  const infoRef = doc(db, 'personalInfo', 'info')
  const snapshot = await getDoc(infoRef)
  if (!snapshot.exists()) return null
  return snapshot.data() as PersonalInfo
}

export async function updatePersonalInfo(info: PersonalInfo): Promise<void> {
  const infoRef = doc(db, 'personalInfo', 'info')
  await updateDoc(infoRef, info as any)
}

// Services
export async function getServices(): Promise<Service[]> {
  const servicesRef = collection(db, 'services')
  const q = query(servicesRef, orderBy('order', 'asc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Service[]
}

export async function createService(service: Omit<Service, 'id'>): Promise<string> {
  const servicesRef = collection(db, 'services')
  const docRef = await addDoc(servicesRef, service)
  return docRef.id
}

export async function updateService(id: string, service: Partial<Service>): Promise<void> {
  const serviceRef = doc(db, 'services', id)
  await updateDoc(serviceRef, service)
}

export async function deleteService(id: string): Promise<void> {
  const serviceRef = doc(db, 'services', id)
  await deleteDoc(serviceRef)
}

// Home Config
export async function getHomeConfig(): Promise<HomeConfig | null> {
  const configRef = doc(db, 'homeConfig', 'config')
  const snapshot = await getDoc(configRef)
  if (!snapshot.exists()) return null
  return snapshot.data() as HomeConfig
}

export async function updateHomeConfig(config: HomeConfig): Promise<void> {
  const configRef = doc(db, 'homeConfig', 'config')
  await updateDoc(configRef, config as any)
}
