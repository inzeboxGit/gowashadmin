import type { Timestamp } from 'firebase/firestore'

export type ProductCategory = {
  id: string
  categoryName?: string
  name?: string
  slug: string
  description?: string
  imageUrl?: string
  products?: number
  orders?: number | string
  earnings?: number | string
  status: 'active' | 'inactive'
  createdAt?: string | Date | Timestamp
  updatedAt?: string | Date | Timestamp
}

export type productCategory = ProductCategory
