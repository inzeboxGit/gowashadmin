import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db } from '~/lib/firebase/firestore'
import type { FirestoreDocument } from '~/types/firebase'

export type Project = {
  name: string
  status: 'active' | 'paused' | 'completed'
  description?: string
  createdAt?: unknown
  updatedAt?: unknown
}

const PROJECTS_COLLECTION = 'projects'

export const getProjects = async () => {
  const snapshot = await getDocs(query(collection(db, PROJECTS_COLLECTION), orderBy('createdAt', 'desc')))

  return snapshot.docs.map((projectDoc) => ({
    id: projectDoc.id,
    ...projectDoc.data(),
  })) as FirestoreDocument<Project>[]
}

export const getProject = async (id: string) => {
  const snapshot = await getDoc(doc(db, PROJECTS_COLLECTION, id))

  return snapshot.exists() ? ({ id: snapshot.id, ...snapshot.data() } as FirestoreDocument<Project>) : null
}

export const createProject = async (payload: Omit<Project, 'createdAt' | 'updatedAt'>) => {
  const result = await addDoc(collection(db, PROJECTS_COLLECTION), {
    ...payload,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  return result.id
}

export const updateProject = async (id: string, payload: Partial<Omit<Project, 'createdAt' | 'updatedAt'>>) => {
  await updateDoc(doc(db, PROJECTS_COLLECTION, id), {
    ...payload,
    updatedAt: serverTimestamp(),
  })
}

export const deleteProject = async (id: string) => {
  await deleteDoc(doc(db, PROJECTS_COLLECTION, id))
}
