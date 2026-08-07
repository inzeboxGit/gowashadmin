import type { FieldValue, Timestamp } from 'firebase/firestore'

export type FirestoreDateValue = string | Date | Timestamp | FieldValue | null | undefined

export type PurchaseAddress = {
  address?: string
  city?: string
  zipCode?: string
}

export type PurchaseItem = {
  category?: string
  lineTotal?: number
  productId?: string
  quantity?: number
  title?: string
  unitPrice?: number
}

export type PurchaseInvoiceLine = {
  amountHt?: number
  amountTtc?: number
  id?: string
  label?: string
  quantity?: number
  tvaAmount?: number
  tvaRate?: number
  unitPriceHt?: number
  vatAmount?: number
  vatRate?: number
}

export type PurchaseInvoiceSnapshot = {
  appliesVat?: boolean
  clientAddress?: PurchaseAddress
  clientName?: string
  factureNumber?: string
  id?: string
  invoiceNumber?: string
  issuedAt?: FirestoreDateValue
  laveurId?: string
  laveurName?: string
  lines?: PurchaseInvoiceLine[]
  paidAt?: FirestoreDateValue
  referenceCode?: string
  reservationId?: string
  showVatColumn?: boolean
  subtotalHt?: number
  totalHt?: number
  totalPaid?: number
  totalPaye?: number
  tvaAmount?: number
  tvaApplicable?: boolean
  tvaRate?: number
  vatAmount?: number
  vatRate?: number
  washerAddress?: string
  washerId?: string
  washerName?: string
  washerSiret?: string
}

export type Purchase = {
  id: string
  achatId?: string
  createdAt?: FirestoreDateValue
  currency?: string
  factureId?: string
  factureNumber?: string
  facturePdfPath?: string
  factureUrl?: string
  gowashReference?: string
  hostedCheckoutId?: string
  invoiceGeneratedAt?: FirestoreDateValue
  invoiceId?: string
  invoiceNumber?: string
  invoiceNumberAssignedAt?: FirestoreDateValue
  invoicePdfFontVersion?: string
  invoicePdfGeneratedAt?: FirestoreDateValue
  invoicePdfPath?: string
  invoiceReferenceAssignedAt?: FirestoreDateValue
  invoiceReferenceCode?: string
  invoiceSnapshot?: PurchaseInvoiceSnapshot
  invoiceUrl?: string
  items?: PurchaseItem[]
  itemsCount?: number
  laveurId?: string
  montant?: number
  paidAt?: FirestoreDateValue
  paymentId?: string
  paymentStatus?: string
  productsAmount?: number
  providerPaymentId?: string
  referenceCode?: string
  shippingAmount?: number
  status?: string
  updatedAt?: FirestoreDateValue
}
