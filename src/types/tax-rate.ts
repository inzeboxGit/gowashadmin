import type { FieldValue, Timestamp } from 'firebase/firestore'

export type TaxRate = {
  id: string
  name: string
  rate: number
  isActive: boolean
  createdAt?: string | Date | Timestamp | FieldValue
  updatedAt?: string | Date | Timestamp | FieldValue
}
