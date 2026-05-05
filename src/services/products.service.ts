import { collection, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc, writeBatch } from 'firebase/firestore'
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage'
import { db } from '~/lib/firebase/firestore'
import { storage } from '~/lib/firebase/storage'
import type { CreateProductInput, Product, UpdateProductInput } from '~/types/product'

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

export const getProductById = async (id: string): Promise<Product | null> => {
  const productDoc = await getDoc(doc(db, PRODUCTS_COLLECTION, id))

  if (!productDoc.exists()) return null

  const data = productDoc.data() as Product

  return { ...data, id: data.id || productDoc.id }
}

export const createProduct = async (input: CreateProductInput) => {
  const requestedId = input.id ? sanitizeProductId(input.id) : ''
  const productRef = requestedId ? doc(db, PRODUCTS_COLLECTION, requestedId) : doc(collection(db, PRODUCTS_COLLECTION))
  const imageUrl = await uploadProductImage(productRef.id, input.imageFile)
  const now = new Date().toISOString()

  const payload: Product = {
    brandName: input.brandName,
    category: input.category,
    ...(input.condition !== undefined && { condition: input.condition }),
    createdAt: now,
    description: input.description,
    discount: input.discount,
    id: productRef.id,
    imageUrl,
    laveurId: input.laveurId,
    oldPrice: input.oldPrice,
    price: input.price,
    ...(input.productUrl !== undefined && { productUrl: input.productUrl }),
    published: input.published,
    ...(input.reference !== undefined && { reference: input.reference }),
    ...(input.size !== undefined && { size: input.size }),
    stock: input.stock,
    title: input.title,
    updatedAt: now,
  }

  await setDoc(productRef, payload)

  return payload
}

export const updateProduct = async (id: string, input: UpdateProductInput) => {
  const productRef = doc(db, PRODUCTS_COLLECTION, id)
  const imageUrl = input.imageFile ? await uploadProductImage(id, input.imageFile) : input.imageUrl
  const now = new Date().toISOString()

  const fields: Partial<Product> & { updatedAt: string } = {
    brandName: input.brandName,
    category: input.category,
    ...(input.condition !== undefined && { condition: input.condition }),
    description: input.description,
    discount: input.discount,
    imageUrl,
    oldPrice: input.oldPrice,
    price: input.price,
    ...(input.productUrl !== undefined && { productUrl: input.productUrl }),
    published: input.published,
    ...(input.reference !== undefined && { reference: input.reference }),
    ...(input.size !== undefined && { size: input.size }),
    stock: input.stock,
    title: input.title,
    updatedAt: now,
  }

  await updateDoc(productRef, fields)

  return fields
}

export const setProductPublished = async (id: string, published: boolean) => {
  await updateDoc(doc(db, PRODUCTS_COLLECTION, id), { published, updatedAt: new Date().toISOString() })
}

export const bulkImportProducts = async (seeds: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>[]) => {
  const now = new Date().toISOString()
  const BATCH_SIZE = 500
  const results: Product[] = []

  for (let i = 0; i < seeds.length; i += BATCH_SIZE) {
    const batch = writeBatch(db)
    const chunk = seeds.slice(i, i + BATCH_SIZE)

    for (const seed of chunk) {
      const productRef = doc(collection(db, PRODUCTS_COLLECTION))
      const payload: Product = {
        ...seed,
        id: productRef.id,
        createdAt: now,
        updatedAt: now,
      }
      batch.set(productRef, payload)
      results.push(payload)
    }

    await batch.commit()
  }

  return results
}
