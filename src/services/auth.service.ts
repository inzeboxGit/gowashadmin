import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth'
import type { FirebaseError } from 'firebase/app'
import { auth } from '~/lib/firebase/auth'
import { createUserProfile } from './users.service'
import type { AuthUser } from '~/types/user'

export const mapFirebaseUser = (user: User): AuthUser => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
})

export const loginWithEmail = async (email: string, password: string) => {
  const credential = await signInWithEmailAndPassword(auth, email, password)

  return mapFirebaseUser(credential.user)
}

export const registerWithEmail = async (name: string, email: string, password: string) => {
  const credential = await createUserWithEmailAndPassword(auth, email, password)

  await updateProfile(credential.user, { displayName: name })
  const user = mapFirebaseUser(credential.user)
  await createUserProfile(user)

  return user
}

export const logoutFromFirebase = () => signOut(auth)

export const resetPassword = (email: string) => sendPasswordResetEmail(auth, email)

export const subscribeToAuthChanges = (callback: (user: AuthUser | null) => void) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user ? mapFirebaseUser(user) : null)
  })
}

export const getAuthErrorMessage = (error: unknown) => {
  const code = (error as FirebaseError).code

  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Email ou mot de passe incorrect.'
    case 'auth/email-already-in-use':
      return 'Cet email est deja utilise.'
    case 'auth/weak-password':
      return 'Le mot de passe doit contenir au moins 6 caracteres.'
    case 'auth/invalid-email':
      return 'Adresse email invalide.'
    case 'auth/too-many-requests':
      return 'Trop de tentatives. Reessayez plus tard.'
    default:
      return error instanceof Error ? error.message : 'Une erreur est survenue.'
  }
}
