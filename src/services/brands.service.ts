import { collection, doc, getDocs, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage'
import { db } from '~/lib/firebase/firestore'
import { storage } from '~/lib/firebase/storage'
import type { Brand } from '~/types/brand'

const BRANDS_COLLECTION = 'brands'

export type CreateBrandInput = {
  name: string
  slug: string
  description: string
  isActive: boolean
  logoFile?: File | null
}

export type UpdateBrandInput = CreateBrandInput & {
  id: string
  currentLogo?: string
}

const getDateValue = (value?: Brand['createdAt']) => {
  if (!value) return 0
  if (typeof value === 'string') return new Date(value).getTime()
  if (value instanceof Date) return value.getTime()
  if (typeof value === 'object' && 'toDate' in value && typeof value.toDate === 'function') {
    return value.toDate().getTime()
  }

  return 0
}

const uploadBrandLogo = async (brandId: string, logoFile?: File | null) => {
  if (!logoFile) return ''

  const extension = logoFile.name.split('.').pop()
  const filename = `${Date.now()}${extension ? `.${extension}` : ''}`
  const logoRef = storageRef(storage, `brands/${brandId}/logo/${filename}`)

  await uploadBytes(logoRef, logoFile)

  return getDownloadURL(logoRef)
}

export const getBrands = async () => {
  const snapshot = await getDocs(collection(db, BRANDS_COLLECTION))

  return snapshot.docs
    .map((brandDoc) => {
      const data = brandDoc.data() as Omit<Brand, 'id'> & { id?: string }

      return {
        ...data,
        id: data.id || brandDoc.id,
      } as Brand
    })
    .sort((a, b) => getDateValue(b.updatedAt || b.createdAt) - getDateValue(a.updatedAt || a.createdAt))
}

export const createBrand = async (input: CreateBrandInput) => {
  const brandRef = doc(collection(db, BRANDS_COLLECTION))
  const logo = await uploadBrandLogo(brandRef.id, input.logoFile)

  const payload: Brand = {
    id: brandRef.id,
    name: input.name,
    slug: input.slug,
    logo,
    description: input.description,
    isActive: input.isActive,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }

  await setDoc(brandRef, payload)

  return payload
}

export const updateBrand = async (input: UpdateBrandInput) => {
  const brandRef = doc(db, BRANDS_COLLECTION, input.id)
  const logo = input.logoFile ? await uploadBrandLogo(input.id, input.logoFile) : input.currentLogo || ''

  const payload: Partial<Brand> = {
    name: input.name,
    slug: input.slug,
    logo,
    description: input.description,
    isActive: input.isActive,
    updatedAt: serverTimestamp(),
  }

  await updateDoc(brandRef, payload)

  return {
    id: input.id,
    ...payload,
  }
}
