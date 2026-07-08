export type GeoPoint = {
  latitude: number
  longitude: number
}

export type Client = {
  id: string
  city?: string
  createdAt?: unknown
  email?: string
  emailVerified?: boolean
  emailVerifiedAt?: unknown
  gender?: string
  isVerified?: boolean
  lastLocationUpdate?: unknown
  lastLogin?: unknown
  location?: GeoPoint
  locationAge?: string
  locationSource?: string
  name?: string
  fullName?: string
  phoneNumber?: string
  phoneVerified?: boolean
  phoneVerifiedAt?: unknown
  playerId?: string
}
