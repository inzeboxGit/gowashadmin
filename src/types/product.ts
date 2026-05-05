export type Product = {
  brandName: string
  category: string
  condition?: string
  createdAt: string
  description: string
  discount: number
  id: string
  imageUrl: string
  laveurId: string
  oldPrice: number
  price: number
  productUrl?: string
  published: boolean
  reference?: string
  size?: string
  stock?: number
  title: string
  updatedAt: string
}

export type CreateProductInput = {
  brandName: string
  category: string
  condition?: string
  description: string
  discount: number
  id?: string
  imageFile?: File | null
  laveurId: string
  oldPrice: number
  price: number
  productUrl?: string
  published: boolean
  reference?: string
  size?: string
  stock: number
  title: string
}

export type UpdateProductInput = {
  brandName: string
  category: string
  condition?: string
  description: string
  discount: number
  imageFile?: File | null
  imageUrl: string
  oldPrice: number
  price: number
  productUrl?: string
  published: boolean
  reference?: string
  size?: string
  stock: number
  title: string
}
