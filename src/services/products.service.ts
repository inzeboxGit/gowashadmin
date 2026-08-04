import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc, writeBatch } from 'firebase/firestore'
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage'
import { db } from '~/lib/firebase/firestore'
import { storage } from '~/lib/firebase/storage'
import type { CreateProductInput, Product, UpdateProductInput } from '~/types/product'

const PRODUCTS_COLLECTION = 'products'

const SUPPLIER_IDS_BY_BRAND: Record<string, string> = {
  de_witte: 'MEdUIudrIOaziQV1JLHr',
  starc: 'bVPMjrn5IM3PGlMdg3bK',
  virtus: '7z1C03BR55ZXoOaXW8Vb',
}

const sanitizeProductId = (value: string) => {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const normalizeBrandName = (value: string) => {
  return value.trim().toLowerCase().replace(/\s+/g, '_')
}

const uploadProductImage = async (productId: string, imageFile?: File | null) => {
  if (!imageFile) return ''

  const extension = imageFile.name.split('.').pop()
  const filename = `${Date.now()}${extension ? `.${extension}` : ''}`
  const imageRef = storageRef(storage, `products/${productId}/image/${filename}`)

  await uploadBytes(imageRef, imageFile)

  return getDownloadURL(imageRef)
}

const uploadProductGalleryImages = async (productId: string, files: File[] = []) => {
  return Promise.all(files.map(async (file) => {
    const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const filename = `${Date.now()}-${crypto.randomUUID()}.${extension}`
    const imageRef = storageRef(storage, `products/${productId}/gallery/${filename}`)

    await uploadBytes(imageRef, file)
    return getDownloadURL(imageRef)
  }))
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
  const galleryUrls = await uploadProductGalleryImages(productRef.id, input.galleryFiles)
  const now = new Date().toISOString()

  const payload: Product = {
    brandName: normalizeBrandName(input.brandName),
    ...(input.basePrice !== undefined && { basePrice: input.basePrice }),
    category: input.category,
    ...(input.color !== undefined && { color: input.color }),
    ...(input.condition !== undefined && { condition: input.condition }),
    createdAt: now,
    description: input.description,
    discount: input.discount,
    id: productRef.id,
    imageUrl,
    galleryUrls,
    laveurId: input.laveurId,
    oldPrice: input.oldPrice,
    price: input.price,
    ...(input.priceExcludingTax !== undefined && { priceExcludingTax: input.priceExcludingTax }),
    ...(input.productUrl !== undefined && { productUrl: input.productUrl }),
    published: input.published,
    ...(input.reference !== undefined && { reference: input.reference }),
    ...(input.size !== undefined && { size: input.size }),
    stock: input.stock,
    supplierId: input.supplierId,
    ...(input.taxAmount !== undefined && { taxAmount: input.taxAmount }),
    ...(input.taxRate !== undefined && { taxRate: input.taxRate }),
    ...(input.taxRateId !== undefined && { taxRateId: input.taxRateId }),
    ...(input.taxRateName !== undefined && { taxRateName: input.taxRateName }),
    title: input.title,
    ...(input.tvaRate !== undefined && { tvaRate: input.tvaRate }),
    ...(input.weightKg !== undefined && { weightKg: input.weightKg }),
    updatedAt: now,
  }

  await setDoc(productRef, payload)

  return payload
}

export const updateProduct = async (id: string, input: UpdateProductInput) => {
  const productRef = doc(db, PRODUCTS_COLLECTION, id)
  const imageUrl = input.imageFile ? await uploadProductImage(id, input.imageFile) : input.imageUrl
  const uploadedGalleryUrls = await uploadProductGalleryImages(id, input.galleryFiles)
  const galleryUrls = [...(input.galleryUrls || []), ...uploadedGalleryUrls]
  const now = new Date().toISOString()

  const fields: Partial<Product> & { updatedAt: string } = {
    brandName: normalizeBrandName(input.brandName),
    ...(input.basePrice !== undefined && { basePrice: input.basePrice }),
    category: input.category,
    ...(input.color !== undefined && { color: input.color }),
    ...(input.condition !== undefined && { condition: input.condition }),
    description: input.description,
    discount: input.discount,
    imageUrl,
    ...(input.galleryUrls !== undefined && { galleryUrls }),
    oldPrice: input.oldPrice,
    price: input.price,
    ...(input.priceExcludingTax !== undefined && { priceExcludingTax: input.priceExcludingTax }),
    ...(input.productUrl !== undefined && { productUrl: input.productUrl }),
    published: input.published,
    ...(input.reference !== undefined && { reference: input.reference }),
    ...(input.size !== undefined && { size: input.size }),
    stock: input.stock,
    supplierId: input.supplierId,
    ...(input.taxAmount !== undefined && { taxAmount: input.taxAmount }),
    ...(input.taxRate !== undefined && { taxRate: input.taxRate }),
    ...(input.taxRateId !== undefined && { taxRateId: input.taxRateId }),
    ...(input.taxRateName !== undefined && { taxRateName: input.taxRateName }),
    title: input.title,
    ...(input.tvaRate !== undefined && { tvaRate: input.tvaRate }),
    ...(input.weightKg !== undefined && { weightKg: input.weightKg }),
    updatedAt: now,
  }

  await updateDoc(productRef, fields)

  return fields
}

export const setProductPublished = async (id: string, published: boolean) => {
  await updateDoc(doc(db, PRODUCTS_COLLECTION, id), { published, updatedAt: new Date().toISOString() })
}

export const deleteProduct = async (id: string) => {
  await deleteDoc(doc(db, PRODUCTS_COLLECTION, id))
}

export const deleteProducts = async (ids: string[]) => {
  const BATCH_SIZE = 500

  for (let index = 0; index < ids.length; index += BATCH_SIZE) {
    const batch = writeBatch(db)
    for (const id of ids.slice(index, index + BATCH_SIZE)) batch.delete(doc(db, PRODUCTS_COLLECTION, id))
    await batch.commit()
  }
}

export const assignSuppliersByBrand = async () => {
  const snapshot = await getDocs(collection(db, PRODUCTS_COLLECTION))
  const updates = snapshot.docs.filter((productDoc) => {
    const product = productDoc.data() as Partial<Product>
    return Boolean(SUPPLIER_IDS_BY_BRAND[normalizeBrandName(product.brandName || '')])
  })
  const now = new Date().toISOString()
  const BATCH_SIZE = 500

  for (let index = 0; index < updates.length; index += BATCH_SIZE) {
    const batch = writeBatch(db)

    for (const productDoc of updates.slice(index, index + BATCH_SIZE)) {
      const product = productDoc.data() as Partial<Product>
      const supplierId = SUPPLIER_IDS_BY_BRAND[normalizeBrandName(product.brandName || '')]

      batch.update(productDoc.ref, { supplierId, updatedAt: now })
    }

    await batch.commit()
  }

  return updates.length
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
