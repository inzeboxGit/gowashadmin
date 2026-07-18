export type WasherLocation = {
  address?: string
  latitude?: number
  longitude?: number
}

export type LaveurProfile = {
  bannerUrl?: string
  businessName?: string
  description?: string
  galleryUrls?: string[]
  logoUrl?: string
}

export type LaveurData = {
  businessTypes?: string[]
  completedJobs?: number
  isAvailable?: string
  profileViews?: number
  rating?: number
  serviceExist?: boolean
  services?: string[]
}

export type WasherReview = {
  id?: string
  clientId?: string
  clientName?: string
  clientPhoto?: string
  comment?: string
  createdAt?: any
  isVisible?: boolean
  jobId?: string
  rating?: number
}

export type WasherAddon = {
  id?: string
  basePrice?: number
  categoryPrices?: Record<string, number>
  createdAt?: string
  iconPath?: string
  laveurId?: string
  linkedId?: string | null
  name?: string
  position?: number
  published?: boolean
  updatedAt?: string
  vehicleCategory?: string
}

export type WasherService = {
  id?: string
  addonIds?: string[]
  createdAt?: string
  features?: string[]
  isBestOffer?: boolean
  laveurId?: string
  linkedId?: string | null
  name?: string
  position?: number
  prices?: Record<string, number>
  published?: boolean
  updatedAt?: string
}

export type WasherDocuments = {
  ID?: string
  RIB?: string
  SIRET?: string
  KABIS?: string
  approvedID?: boolean
  approvedRIB?: boolean
  approvedSIRET?: boolean
  approvedKABIS?: boolean
  motive?: string
}

export type VerificationStatus = 'pending' | 'approved' | 'rejected'

export type WasherVerification = {
  bankDetails?: {
    iban?: string
    provided?: boolean
    raison?: string
    ribFileName?: string
    ribFileType?: string
    ribStoragePath?: string
    ribUrl?: string
    status?: VerificationStatus | string
  }
  identityDocument?: {
    backFileName?: string
    backImageUrl?: string
    backStoragePath?: string
    frontFileName?: string
    frontImageUrl?: string
    frontStoragePath?: string
    provided?: boolean
    raison?: string
    status?: VerificationStatus | string
  }
  siret?: string
  siretRaison?: string
  siretStatus?: VerificationStatus | string
  status?: VerificationStatus | string
  submittedAt?: any
  vat?: {
    applicable?: boolean
    rate?: number
    status?: string
  }
}

export type Washer = {
  id: string
  createdAt?: string
  email?: string
  fullName?: string
  isBanned?: boolean
  isVerified?: boolean
  languageCode?: string | null
  laveurData?: LaveurData
  laveurProfile?: LaveurProfile
  documents?: WasherDocuments
  verification?: WasherVerification
  location?: WasherLocation
  phoneNumber?: string
  platform?: string
  updatedAt?: string
  // Sub-collections (loaded separately)
  reviews?: WasherReview[]
  addons?: WasherAddon[]
  services?: WasherService[]
}
