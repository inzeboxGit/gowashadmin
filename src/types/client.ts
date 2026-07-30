export type ClientLocation = {
  lat: number
  lng: number
}

export type ClientAddress = {
  address?: string
  city?: string
  zipCode?: string
}

export type Client = {
  id: string
  city?: string
  clientAddress?: ClientAddress
  createdAt?: unknown
  email?: string
  emailVerified?: boolean
  emailVerifiedAt?: string
  gender?: string
  fullName?: string
  isVerified?: boolean
  lastLocationUpdate?: unknown
  lastLogin?: unknown    // legacy
  lastLoginAt?: unknown  // Firestore field
  location?: ClientLocation
  locationSource?: string
  name?: string
  oneSignalLinkedAt?: unknown
  oneSignalSubscriptionId?: string
  phoneNumber?: string
  phoneVerified?: boolean
  phoneVerifiedAt?: string
  playerId?: string
  role?: string
  updatedAt?: unknown
}
