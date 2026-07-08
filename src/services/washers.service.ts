import { collection, doc, getDoc, getDocs, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore'
import { db } from '~/lib/firebase/firestore'
import type { Washer, WasherReview, WasherAddon, WasherService } from '~/types/washer'

const WASHERS_COLLECTION = 'laveurs'

const getDateValue = (value?: unknown) => {
  if (!value) return 0
  if (typeof value === 'string') return new Date(value).getTime()
  if (value instanceof Date) return value.getTime()
  if (typeof value === 'object' && 'toDate' in value && typeof value.toDate === 'function') {
    return value.toDate().getTime()
  }
  return 0
}

export const getWashers = async () => {
  const snapshot = await getDocs(collection(db, WASHERS_COLLECTION))

  return snapshot.docs
    .map((washerDoc) => {
      const data = washerDoc.data() as Omit<Washer, 'id'> & { id?: string }
      return {
        ...data,
        id: data.id || washerDoc.id,
      } as Washer
    })
    .sort((a, b) => getDateValue(b.createdAt) - getDateValue(a.createdAt))
}

export const subscribeToWashers = (callback: (washers: Washer[]) => void) => {
  return onSnapshot(collection(db, WASHERS_COLLECTION), (snapshot) => {
    const washers = snapshot.docs
      .map((washerDoc) => {
        const data = washerDoc.data() as Omit<Washer, 'id'> & { id?: string }
        return {
          ...data,
          id: data.id || washerDoc.id,
        } as Washer
      })
      .sort((a, b) => getDateValue(b.createdAt) - getDateValue(a.createdAt))

    callback(washers)
  }, (error) => {
    console.error("Error fetching real-time washers:", error)
  })
}

export const getWasherById = async (id: string) => {
  const docRef = doc(db, WASHERS_COLLECTION, id)
  const snapshot = await getDoc(docRef)

  if (!snapshot.exists()) return null

  const data = snapshot.data() as Omit<Washer, 'id'> & { id?: string }
  return {
    ...data,
    id: data.id || snapshot.id,
  } as Washer
}

export const getWasherReviews = async (washerId: string) => {
  const snapshot = await getDocs(collection(db, WASHERS_COLLECTION, washerId, 'reviews'))
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as WasherReview))
}

export const getWasherAddons = async (washerId: string) => {
  const snapshot = await getDocs(collection(db, WASHERS_COLLECTION, washerId, 'addons'))
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as WasherAddon))
}

export const getWasherServices = async (washerId: string) => {
  const snapshot = await getDocs(collection(db, WASHERS_COLLECTION, washerId, 'services'))
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as WasherService))
}

export const updateWasher = async (id: string, payload: Partial<Washer>) => {
  const docRef = doc(db, WASHERS_COLLECTION, id)
  await updateDoc(docRef, payload)
  
  // Update asynchronously in pub_laveurs collection
  const pubDocRef = doc(db, 'pub_laveurs', id)
  updateDoc(pubDocRef, payload).catch(e => console.warn('Document pub_laveurs update skipped/failed:', e))

  return { id, ...payload }
}

export const deleteWasher = async (id: string) => {
  const docRef = doc(db, WASHERS_COLLECTION, id)
  await deleteDoc(docRef)
  
  // Delete asynchronously in pub_laveurs collection
  const pubDocRef = doc(db, 'pub_laveurs', id)
  deleteDoc(pubDocRef).catch(e => console.warn('Document pub_laveurs delete skipped/failed:', e))

  return id
}

export const deleteWasherAddon = async (washerId: string, addonId: string) => {
  await deleteDoc(doc(db, WASHERS_COLLECTION, washerId, 'addons', addonId))
}

export const deleteWasherService = async (washerId: string, serviceId: string) => {
  await deleteDoc(doc(db, WASHERS_COLLECTION, washerId, 'services', serviceId))
}

export const updateWasherReview = async (washerId: string, reviewId: string, payload: Partial<WasherReview>) => {
  await updateDoc(doc(db, WASHERS_COLLECTION, washerId, 'reviews', reviewId), payload)
}

export const deleteWasherReview = async (washerId: string, reviewId: string) => {
  await deleteDoc(doc(db, WASHERS_COLLECTION, washerId, 'reviews', reviewId))
}
