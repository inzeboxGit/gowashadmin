import { collection, deleteDoc, doc, getDocs, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '~/lib/firebase/firestore'
import type { TaxRate } from '~/types/tax-rate'

const TAX_RATES_COLLECTION = 'taxRates'

export type SaveTaxRateInput = {
  name: string
  rate: number
  isActive: boolean
}

const getDateValue = (value?: TaxRate['createdAt']) => {
  if (!value) return 0
  if (typeof value === 'string') return new Date(value).getTime()
  if (value instanceof Date) return value.getTime()
  if (typeof value === 'object' && 'toDate' in value && typeof value.toDate === 'function') return value.toDate().getTime()

  return 0
}

export const getTaxRates = async () => {
  const snapshot = await getDocs(collection(db, TAX_RATES_COLLECTION))

  return snapshot.docs
    .map((taxRateDoc) => ({ ...taxRateDoc.data(), id: taxRateDoc.id }) as TaxRate)
    .sort((a, b) => getDateValue(b.updatedAt || b.createdAt) - getDateValue(a.updatedAt || a.createdAt))
}

export const createTaxRate = async (input: SaveTaxRateInput) => {
  const taxRateRef = doc(collection(db, TAX_RATES_COLLECTION))
  const payload: TaxRate = {
    id: taxRateRef.id,
    ...input,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }

  await setDoc(taxRateRef, payload)
  return payload
}

export const updateTaxRate = async (id: string, input: SaveTaxRateInput) => {
  await updateDoc(doc(db, TAX_RATES_COLLECTION, id), { ...input, updatedAt: serverTimestamp() })
}

export const deleteTaxRate = async (id: string) => {
  await deleteDoc(doc(db, TAX_RATES_COLLECTION, id))
}
