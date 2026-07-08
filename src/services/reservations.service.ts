import { collection, doc, getDoc, getDocs, updateDoc, deleteDoc, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '~/lib/firebase/firestore'
import type { Reservation } from '~/types/reservation'

const RESERVATIONS_COLLECTION = 'reservations'

const getDateValue = (value?: unknown) => {
  if (!value) return 0
  if (typeof value === 'string') return new Date(value).getTime()
  if (value instanceof Date) return value.getTime()
  if (typeof value === 'object' && 'toDate' in value && typeof value.toDate === 'function') {
    return value.toDate().getTime()
  }

  return 0
}

export const getReservations = async () => {
  const snapshot = await getDocs(collection(db, RESERVATIONS_COLLECTION))

  return snapshot.docs
    .map((reservationDoc) => {
      const data = reservationDoc.data() as Omit<Reservation, 'id'> & { id?: string }

      return {
        ...data,
        id: data.id || reservationDoc.id,
      } as Reservation
    })
    .sort((a, b) => getDateValue(b.createdAt) - getDateValue(a.createdAt))
}

export const getReservationsByWasherId = async (washerId: string) => {
  const q = query(collection(db, RESERVATIONS_COLLECTION), where('laveurId', '==', washerId))
  const snapshot = await getDocs(q)

  return snapshot.docs
    .map((reservationDoc) => {
      const data = reservationDoc.data() as Omit<Reservation, 'id'> & { id?: string }
      return {
        ...data,
        id: data.id || reservationDoc.id,
      } as Reservation
    })
    .sort((a, b) => getDateValue(b.createdAt) - getDateValue(a.createdAt))
}

export const subscribeToReservations = (callback: (reservations: Reservation[]) => void) => {
  return onSnapshot(collection(db, RESERVATIONS_COLLECTION), (snapshot) => {
    const reservations = snapshot.docs
      .map((reservationDoc) => {
        const data = reservationDoc.data() as Omit<Reservation, 'id'> & { id?: string }
        return {
          ...data,
          id: data.id || reservationDoc.id,
        } as Reservation
      })
      .sort((a, b) => getDateValue(b.createdAt) - getDateValue(a.createdAt))

    callback(reservations)
  }, (error) => {
    console.error("Error fetching real-time reservations:", error)
  })
}

export const getReservationById = async (id: string) => {
  const docRef = doc(db, RESERVATIONS_COLLECTION, id)
  const snapshot = await getDoc(docRef)

  if (!snapshot.exists()) return null

  const data = snapshot.data() as Omit<Reservation, 'id'> & { id?: string }
  return {
    ...data,
    id: data.id || snapshot.id,
  } as Reservation
}

export const updateReservation = async (id: string, payload: Partial<Reservation>) => {
  const docRef = doc(db, RESERVATIONS_COLLECTION, id)
  await updateDoc(docRef, payload)
  return { id, ...payload }
}

export const deleteReservation = async (id: string) => {
  const docRef = doc(db, RESERVATIONS_COLLECTION, id)
  await deleteDoc(docRef)
  return id
}

export const getReservationsByUserId = async (userId: string) => {
  const q = query(collection(db, RESERVATIONS_COLLECTION), where('userId', '==', userId))
  const snapshot = await getDocs(q)

  let docs = snapshot.docs.map((d) => {
    const data = d.data() as Omit<Reservation, 'id'> & { id?: string }
    return {
      ...data,
      id: data.id || d.id,
    } as Reservation
  })

  if (docs.length === 0) {
    const q2 = query(collection(db, RESERVATIONS_COLLECTION), where('clientId', '==', userId))
    const snapshot2 = await getDocs(q2)
    docs = snapshot2.docs.map((d) => {
      const data = d.data() as Omit<Reservation, 'id'> & { id?: string }
      return {
        ...data,
        id: data.id || d.id,
      } as Reservation
    })
  }

  return docs.sort((a, b) => getDateValue(b.createdAt) - getDateValue(a.createdAt))
}
