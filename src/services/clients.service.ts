import { collection, doc, getDoc, getDocs, updateDoc, deleteDoc, onSnapshot, collectionGroup, query, where } from 'firebase/firestore'
import { db } from '~/lib/firebase/firestore'
import type { Client } from '~/types/client'

const USERS_COLLECTION = 'users'

const getDateValue = (value?: unknown) => {
  if (!value) return 0
  if (typeof value === 'string') return new Date(value).getTime()
  if (value instanceof Date) return value.getTime()
  if (typeof value === 'object' && 'toDate' in value && typeof value.toDate === 'function') {
    return value.toDate().getTime()
  }

  return 0
}

export const getClients = async () => {
  const snapshot = await getDocs(collection(db, USERS_COLLECTION))

  return snapshot.docs
    .map((clientDoc) => {
      const data = clientDoc.data() as Omit<Client, 'id'> & { id?: string }

      return {
        ...data,
        id: data.id || clientDoc.id,
      } as Client
    })
    .sort((a, b) => getDateValue(b.createdAt) - getDateValue(a.createdAt))
}

export const subscribeToClients = (callback: (clients: Client[]) => void) => {
  return onSnapshot(collection(db, USERS_COLLECTION), (snapshot) => {
    const clients = snapshot.docs
      .map((clientDoc) => {
        const data = clientDoc.data() as Omit<Client, 'id'> & { id?: string }
        return {
          ...data,
          id: data.id || clientDoc.id,
        } as Client
      })
      .sort((a, b) => getDateValue(b.createdAt) - getDateValue(a.createdAt))

    callback(clients)
  }, (error) => {
    console.error("Error fetching real-time clients:", error)
  })
}

export const getClientById = async (id: string) => {
  const docRef = doc(db, USERS_COLLECTION, id)
  const snapshot = await getDoc(docRef)

  if (!snapshot.exists()) return null

  const data = snapshot.data() as Omit<Client, 'id'> & { id?: string }
  return {
    ...data,
    id: data.id || snapshot.id,
  } as Client
}

export const updateClient = async (id: string, payload: Partial<Client>) => {
  const docRef = doc(db, USERS_COLLECTION, id)
  await updateDoc(docRef, payload)
  return { id, ...payload }
}

export const deleteClient = async (id: string) => {
  const docRef = doc(db, USERS_COLLECTION, id)
  await deleteDoc(docRef)
  return id
}

export const getClientReviews = async (clientId: string) => {
  const q = query(collectionGroup(db, 'reviews'), where('clientId', '==', clientId))
  const snapshot = await getDocs(q)

  const reviews = await Promise.all(
    snapshot.docs.map(async (reviewDoc) => {
      const data = reviewDoc.data()
      const washerId = reviewDoc.ref.parent.parent?.id || ''
      let washerName = ''

      if (washerId) {
        try {
          const washerSnapshot = await getDoc(doc(db, 'washers', washerId))
          if (washerSnapshot.exists()) {
            const washerData = washerSnapshot.data()
            washerName = washerData.fullName || washerData.laveurProfile?.businessName || washerId
          }
        } catch (e) {
          console.warn('Could not fetch washer name for review:', e)
        }
      }

      return {
        ...data,
        id: reviewDoc.id,
        washerId,
        washerName: washerName || washerId,
      }
    })
  )

  return reviews
}
