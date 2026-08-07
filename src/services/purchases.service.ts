import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '~/lib/firebase/firestore'
import type { Purchase } from '~/types/purchase'

const PURCHASES_COLLECTION = 'purchases'

export const getPurchases = async (): Promise<Purchase[]> => {
  const snapshot = await getDocs(query(collection(db, PURCHASES_COLLECTION), orderBy('createdAt', 'desc')))

  return snapshot.docs.map((purchaseDoc) => {
    const data = purchaseDoc.data() as Omit<Purchase, 'id'> & { id?: string }

    return {
      ...data,
      id: data.id || purchaseDoc.id,
    }
  })
}
