import { collection, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '~/lib/firebase/firestore'
import { storage } from '~/lib/firebase/storage'
import type { ProductCategory } from '~/types/category'
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage'

const CATEGORIES_COLLECTION = 'productCategory'

export type CreateProductCategoryInput = {
  categoryName: string
  slug: string
  description?: string
  status: ProductCategory['status']
  imageFile?: File | null
}

export type UpdateProductCategoryInput = CreateProductCategoryInput & {
  id: string
  currentImageUrl?: string
}

const getDateValue = (value?: ProductCategory['createdAt']) => {
  if (!value) return 0
  if (typeof value === 'string') return new Date(value).getTime()
  if (value instanceof Date) return value.getTime()
  if (typeof value === 'object' && 'toDate' in value && typeof value.toDate === 'function') {
    return value.toDate().getTime()
  }

  return 0
}

const uploadCategoryImage = async (categoryId: string, imageFile?: File | null) => {
  if (!imageFile) return ''

  const extension = imageFile.name.split('.').pop()
  const filename = `${Date.now()}${extension ? `.${extension}` : ''}`
  const imageRef = storageRef(storage, `productCategory/${categoryId}/image/${filename}`)

  await uploadBytes(imageRef, imageFile)

  return getDownloadURL(imageRef)
}

export const getCategories = async () => {
  const snapshot = await getDocs(collection(db, CATEGORIES_COLLECTION))

  return snapshot.docs
    .map((categoryDoc) => {
      const data = categoryDoc.data() as Omit<ProductCategory, 'id'> & { id?: string }

      return {
        ...data,
        id: data.id || categoryDoc.id,
      }
    })
    .sort((a, b) => {
      const dateA = getDateValue(a.updatedAt || a.createdAt)
      const dateB = getDateValue(b.updatedAt || b.createdAt)

      return (Number.isNaN(dateB) ? 0 : dateB) - (Number.isNaN(dateA) ? 0 : dateA)
    })
}

export const createProductCategory = async (input: CreateProductCategoryInput) => {
  const categoryRef = doc(collection(db, CATEGORIES_COLLECTION))
  const imageUrl = await uploadCategoryImage(categoryRef.id, input.imageFile)
  const now = new Date().toISOString()

  const payload: ProductCategory = {
    id: categoryRef.id,
    categoryName: input.categoryName,
    name: input.categoryName,
    slug: input.slug,
    description: input.description || '',
    imageUrl,
    products: 0,
    orders: 0,
    earnings: 0,
    status: input.status,
    createdAt: now,
    updatedAt: now,
  }

  await setDoc(categoryRef, payload)

  return payload
}

export const updateProductCategory = async (input: UpdateProductCategoryInput) => {
  const categoryRef = doc(db, CATEGORIES_COLLECTION, input.id)
  const imageUrl = input.imageFile ? await uploadCategoryImage(input.id, input.imageFile) : input.currentImageUrl || ''
  const now = new Date().toISOString()

  const payload: Partial<ProductCategory> = {
    categoryName: input.categoryName,
    name: input.categoryName,
    slug: input.slug,
    description: input.description || '',
    imageUrl,
    status: input.status,
    updatedAt: now,
  }

  await updateDoc(categoryRef, payload)

  return {
    id: input.id,
    ...payload,
  }
}
