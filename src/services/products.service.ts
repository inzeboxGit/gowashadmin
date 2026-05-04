import { collection, doc, getDocs, orderBy, query, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage'
import { db } from '~/lib/firebase/firestore'
import { storage } from '~/lib/firebase/storage'
import type { CreateProductInput, Product } from '~/types/product'

const PRODUCTS_COLLECTION = 'products'

const sanitizeProductId = (value: string) => {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const uploadProductImage = async (productId: string, imageFile?: File | null) => {
  if (!imageFile) return ''

  const extension = imageFile.name.split('.').pop()
  const filename = `${Date.now()}${extension ? `.${extension}` : ''}`
  const imageRef = storageRef(storage, `products/${productId}/image/${filename}`)

  await uploadBytes(imageRef, imageFile)

  return getDownloadURL(imageRef)
}

export const getProducts = async () => {
  const snapshot = await getDocs(query(collection(db, PRODUCTS_COLLECTION), orderBy('createdAt', 'desc')))

  return snapshot.docs.map((productDoc) => {
    const data = productDoc.data() as Product

    return {
      ...data,
      id: data.id || productDoc.id,
    }
  })
}

export const createProduct = async (input: CreateProductInput) => {
  const requestedId = input.id ? sanitizeProductId(input.id) : ''
  const productRef = requestedId ? doc(db, PRODUCTS_COLLECTION, requestedId) : doc(collection(db, PRODUCTS_COLLECTION))
  const imageUrl = await uploadProductImage(productRef.id, input.imageFile)
  const now = new Date().toISOString()

  const payload: Product = {
    brandName: input.brandName,
    category: input.category,
    createdAt: now,
    description: input.description,
    discount: input.discount,
    id: productRef.id,
    imageUrl,
    laveurId: input.laveurId,
    oldPrice: input.oldPrice,
    price: input.price,
    published: input.published,
    stock: input.stock,
    title: input.title,
    updatedAt: now,
  }

  await setDoc(productRef, payload)

  return payload
}
