import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '~/lib/firebase/firestore'
import type { AuthUser, UserProfile, UserRole } from '~/types/user'

const SUPERS_COLLECTION = 'supers'

export const getUserProfile = async (uid: string) => {
  const snapshot = await getDoc(doc(db, SUPERS_COLLECTION, uid))

  return snapshot.exists() ? (snapshot.data() as UserProfile) : null
}

export const createUserProfile = async (user: AuthUser, role: UserRole = 'staff') => {
  const profile: UserProfile = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    role,
  }

  await setDoc(doc(db, SUPERS_COLLECTION, user.uid), {
    ...profile,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  return profile
}

export const updateUserProfile = async (uid: string, payload: Partial<Omit<UserProfile, 'uid' | 'createdAt' | 'updatedAt'>>) => {
  await updateDoc(doc(db, SUPERS_COLLECTION, uid), {
    ...payload,
    updatedAt: serverTimestamp(),
  })
}
