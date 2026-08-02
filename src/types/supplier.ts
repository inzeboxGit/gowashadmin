import type { FieldValue, Timestamp } from 'firebase/firestore'

export type SupplierShippingRange = {
  min: number
  max: number
  price: number
}

export type SupplierShippingType = 'fixed' | 'amount' | 'weight'

export type FixedSupplierShipping = {
  type: 'fixed'
  price: number
}

export type RangedSupplierShipping = {
  type: 'amount' | 'weight'
  ranges: SupplierShippingRange[]
}

export type SupplierShipping = FixedSupplierShipping | RangedSupplierShipping

export type LegacySupplierShipping = {
  type: 'amount'
  ranges: SupplierShippingRange[]
}

export type Supplier = {
  id: string
  name: string
  shipping: SupplierShipping
  createdAt?: string | Date | Timestamp | FieldValue
  updatedAt?: string | Date | Timestamp | FieldValue
}
