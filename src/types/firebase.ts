export type FirestoreDocument<T> = T & {
  id: string
}

export type CreatePayload<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>

export type UpdatePayload<T> = Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>
