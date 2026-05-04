import type { Timestamp } from 'firebase/firestore'

export type UserRole = 'super' | 'provider' | 'staff'

export type UserProfile = {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  role: UserRole
  disabled?: boolean
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

export type AuthUser = {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}
