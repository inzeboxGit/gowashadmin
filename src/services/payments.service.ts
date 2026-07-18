import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '~/lib/firebase/firestore'
import type { Payment } from '~/types/payment'

const PAYMENTS_COLLECTION = 'payments'

export const getPaymentsByWasherId = async (washerId: string) => {
  const q = query(collection(db, PAYMENTS_COLLECTION), where('laveurId', '==', washerId))
  const snapshot = await getDocs(q)

  return snapshot.docs.map((paymentDoc) => {
    const data = paymentDoc.data() as Omit<Payment, 'id'> & { id?: string }
    return {
      ...data,
      id: data.id || paymentDoc.id,
    } as Payment
  })
}
