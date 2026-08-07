import { collection, documentId, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '~/lib/firebase/firestore'
import type { Purchase } from '~/types/purchase'

const PURCHASES_COLLECTION = 'purchases'
const PAYMENTS_COLLECTION = 'payments'
const FIRESTORE_IN_LIMIT = 30

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

export const getExistingPaymentIds = async (paymentIds: string[]): Promise<Set<string>> => {
  const uniquePaymentIds = [...new Set(paymentIds.filter(Boolean))]
  const existingPaymentIds = new Set<string>()

  for (let index = 0; index < uniquePaymentIds.length; index += FIRESTORE_IN_LIMIT) {
    const chunk = uniquePaymentIds.slice(index, index + FIRESTORE_IN_LIMIT)
    const snapshot = await getDocs(query(collection(db, PAYMENTS_COLLECTION), where(documentId(), 'in', chunk)))

    snapshot.docs.forEach((paymentDoc) => existingPaymentIds.add(paymentDoc.id))
  }

  return existingPaymentIds
}
