export type Product = {
  brandName: string
  basePrice?: number
  category: string
  color?: string
  condition?: string
  createdAt: string
  description: string
  discount: number | null
  id: string
  imageUrl: string
  galleryUrls?: string[]
  laveurId: string
  oldPrice: number | null
  price: number
  priceExcludingTax?: number
  productUrl?: string
  published: boolean | null
  reference?: string
  size?: string
  stock?: number | null
  taxAmount?: number
  taxRate?: number
  taxRateId?: string
  taxRateName?: string
  title: string
  tvaRate?: number
  updatedAt: string
}

export type CreateProductInput = {
  brandName: string
  basePrice?: number
  category: string
  color?: string
  condition?: string
  description: string
  discount: number
  id?: string
  imageFile?: File | null
  galleryFiles?: File[]
  laveurId: string
  oldPrice: number
  price: number
  priceExcludingTax?: number
  productUrl?: string
  published: boolean
  reference?: string
  size?: string
  stock: number
  taxAmount?: number
  taxRate?: number
  taxRateId?: string
  taxRateName?: string
  title: string
  tvaRate?: number
}

export type UpdateProductInput = {
  brandName: string
  basePrice?: number
  category: string
  color?: string
  condition?: string
  description: string
  discount: number
  imageFile?: File | null
  imageUrl: string
  galleryFiles?: File[]
  galleryUrls?: string[]
  oldPrice: number
  price: number
  priceExcludingTax?: number
  productUrl?: string
  published: boolean
  reference?: string
  size?: string
  stock: number
  taxAmount?: number
  taxRate?: number
  taxRateId?: string
  taxRateName?: string
  title: string
  tvaRate?: number
}
