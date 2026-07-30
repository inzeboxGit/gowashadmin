import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '~/lib/firebase/firestore'
import type { Promo } from '~/types/promo'

const PROMOS_COLLECTION = 'promo_codes'

export type CreatePromoInput = Omit<Promo, 'id' | 'createdAt' | 'updatedAt'>
export type UpdatePromoInput = CreatePromoInput & { id: string }

const getDateValue = (value?: unknown) => {
  if (!value) return 0
  if (typeof value === 'string') return new Date(value).getTime()
  if (value instanceof Date) return value.getTime()
  if (typeof value === 'object' && 'toDate' in value && typeof (value as any).toDate === 'function') {
    return (value as any).toDate().getTime()
  }
  return 0
}

export const getPromos = async () => {
  const snapshot = await getDocs(collection(db, PROMOS_COLLECTION))

  return snapshot.docs
    .map((promoDoc) => {
      const data = promoDoc.data() as Omit<Promo, 'id'> & { id?: string }
      return {
        ...data,
        id: data.id || promoDoc.id,
      } as Promo
    })
    .sort((a, b) => getDateValue(b.createdAt) - getDateValue(a.createdAt))
}

export const getPromoById = async (id: string) => {
  const docRef = doc(db, PROMOS_COLLECTION, id)
  const snapshot = await getDoc(docRef)

  if (!snapshot.exists()) return null

  const data = snapshot.data() as Omit<Promo, 'id'> & { id?: string }
  return {
    ...data,
    id: data.id || snapshot.id,
  } as Promo
}

export const createPromo = async (input: CreatePromoInput) => {
  const promoRef = doc(collection(db, PROMOS_COLLECTION))

  const payload: Promo = {
    id: promoRef.id,
    ...input,
    createdAt: serverTimestamp() as unknown as Date,
    updatedAt: serverTimestamp() as unknown as Date,
  }

  await setDoc(promoRef, payload)

  return payload
}

export const updatePromo = async (input: UpdatePromoInput) => {
  const promoRef = doc(db, PROMOS_COLLECTION, input.id)

  const payload: Partial<Promo> = {
    code: input.code,
    discountType: input.discountType,
    discountValue: input.discountValue,
    isActive: input.isActive,
    allowedUserId: input.allowedUserId,
    userMax: input.userMax,
    minimumOrderAmount: input.minimumOrderAmount,
    maximumDiscountAmount: input.maximumDiscountAmount,
    startsAt: input.startsAt,
    expiresAt: input.expiresAt,
    updatedAt: serverTimestamp() as unknown as Date,
  }

  await updateDoc(promoRef, payload)

  return { id: input.id, ...payload }
}

export const togglePromoStatus = async (id: string, isActive: boolean) => {
  const promoRef = doc(db, PROMOS_COLLECTION, id)
  await updateDoc(promoRef, { isActive, updatedAt: serverTimestamp() })
  return { id, isActive }
}

export const deletePromo = async (id: string) => {
  const promoRef = doc(db, PROMOS_COLLECTION, id)
  await deleteDoc(promoRef)
  return id
}
