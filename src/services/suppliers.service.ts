import { collection, deleteDoc, doc, getDocs, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '~/lib/firebase/firestore'
import type { Supplier, SupplierShipping } from '~/types/supplier'

const SUPPLIERS_COLLECTION = 'suppliers'

export type SaveSupplierInput = {
  name: string
  shipping_threshold: number
  shipping: SupplierShipping
}

export type UpdateSupplierInput = SaveSupplierInput & {
  id: string
}

const getDateValue = (value?: Supplier['createdAt']) => {
  if (!value) return 0
  if (typeof value === 'string') return new Date(value).getTime()
  if (value instanceof Date) return value.getTime()
  if (typeof value === 'object' && 'toDate' in value && typeof value.toDate === 'function') {
    return value.toDate().getTime()
  }

  return 0
}

export const getSuppliers = async () => {
  const snapshot = await getDocs(collection(db, SUPPLIERS_COLLECTION))

  return snapshot.docs
    .map((supplierDoc) => {
      const data = supplierDoc.data() as Omit<Supplier, 'id'> & { id?: string }

      return {
        ...data,
        id: data.id || supplierDoc.id,
      } as Supplier
    })
    .sort((a, b) => getDateValue(b.updatedAt || b.createdAt) - getDateValue(a.updatedAt || a.createdAt))
}

export const createSupplier = async (input: SaveSupplierInput) => {
  const supplierRef = doc(collection(db, SUPPLIERS_COLLECTION))

  const payload: Supplier = {
    id: supplierRef.id,
    name: input.name,
    shipping_threshold: input.shipping_threshold,
    shipping: input.shipping,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }

  await setDoc(supplierRef, payload)

  return payload
}

export const updateSupplier = async (input: UpdateSupplierInput) => {
  const supplierRef = doc(db, SUPPLIERS_COLLECTION, input.id)

  const payload: Partial<Supplier> = {
    name: input.name,
    shipping_threshold: input.shipping_threshold,
    shipping: input.shipping,
    updatedAt: serverTimestamp(),
  }

  await updateDoc(supplierRef, payload)

  return {
    id: input.id,
    ...payload,
  }
}

export const deleteSupplier = async (id: string) => {
  await deleteDoc(doc(db, SUPPLIERS_COLLECTION, id))
}
