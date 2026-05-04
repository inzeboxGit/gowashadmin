import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAnalytics, isSupported } from 'firebase/analytics'
import { firebaseConfig } from './config'

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig)

export const getFirebaseAnalytics = async () => {
  if (!firebaseConfig.measurementId || typeof window === 'undefined') {
    return null
  }

  return (await isSupported()) ? getAnalytics(firebaseApp) : null
}
