export type Product = {
  brandName: string
  category: string
  createdAt: string
  description: string
  discount: number
  id: string
  imageUrl: string
  laveurId: string
  oldPrice: number
  price: number
  published: boolean
  stock?: number
  title: string
  updatedAt: string
}

export type CreateProductInput = {
  brandName: string
  category: string
  description: string
  discount: number
  id?: string
  imageFile?: File | null
  laveurId: string
  oldPrice: number
  price: number
  published: boolean
  stock: number
  title: string
}
