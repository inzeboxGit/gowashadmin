export type ClientLocation = {
  lat: number
  lng: number
}

export type ClientSnapshot = {
  email: string
  fullName: string
  id: string
  phoneNumber: string
}

export type ServiceFeature = string

export type ServiceSnapshot = {
  features: ServiceFeature[]
  id: string
  name: string
  price: number
  status: string
  totalPrice: number
  updatedAt: string | Date | unknown
  userId: string
  vehicleCategory: string
  washerId: string
  washerName: string
  washerPhoneNumber: string
}

export type WasherSnapshot = {
  clientLocation: ClientLocation
  id: string
  imageAsset: string
  imageUrl: string
  name: string
  subtitle: string
}

export type Reservation = {
  id: string
  acceptedAt?: string
  addonIds?: string[]
  addonNames?: string[]
  clientId?: string
  clientLocation?: ClientLocation
  clientSnapshot?: ClientSnapshot
  createdAt?: unknown // Firebase Timestamp or string
  customerId?: string
  laveurId?: string
  packageId?: string
  packageName?: string
  paymentMethodId?: string
  paymentMethodSubtitle?: string
  paymentMethodTitle?: string
  progress?: number
  progressLabel?: string
  referenceCode?: string
  scheduledAt?: string
  selectedAddons?: unknown[]
  serviceSnapshot?: ServiceSnapshot
  washerSnapshot?: WasherSnapshot
}
