import type { FieldValue, Timestamp } from 'firebase/firestore'

export type Brand = {
  id: string
  name: string
  slug: string
  logo: string
  description: string
  isActive: boolean
  createdAt?: string | Date | Timestamp | FieldValue
  updatedAt?: string | Date | Timestamp | FieldValue
}
