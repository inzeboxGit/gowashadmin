import { collection, getAggregateFromServer, getCountFromServer, getDocs, limit, orderBy, query, sum, where, type QueryConstraint } from 'firebase/firestore'
import { db } from '~/lib/firebase/firestore'
import type { Product } from '~/types/product'

export type DashboardPeriod = 'day' | 'week' | 'month'

export type DashboardStats = {
  revenue: number
  completedOrders: number
  clients: number
  washers: number
  products: number
  categories: number
  brands: number
  paidPayments: number
}

export type DashboardInventoryProduct = {
  id: string
  image: string
  name: string
  category: string
  stock: number
  price: number
  published: boolean
  updatedAt: string
}

type FirestoreDateLike = string | Date | { toDate: () => Date } | undefined

export type DashboardRecentReservation = {
  id: string
  customerName: string
  packageName: string
  createdAt: string
  totalAmount: number
  status: string
}

type ReservationDocument = {
  clientName?: string
  customerName?: string
  fullName?: string
  name?: string
  packageName?: string
  serviceName?: string
  productName?: string
  totalAmount?: number
  amount?: number
  price?: number
  status?: string
  createdAt?: FirestoreDateLike
}

const toISOString = (value: FirestoreDateLike) => {
  if (!value) return ''

  if (typeof value === 'string') {
    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? value : date.toISOString()
  }

  if (value instanceof Date) return value.toISOString()
  if (typeof value === 'object' && 'toDate' in value && typeof value.toDate === 'function') return value.toDate().toISOString()

  return ''
}

// Return start of period as Date.
const getPeriodStartDate = (period: DashboardPeriod) => {
  const date = new Date()

  // Set start of day.
  if (period === 'day') {
    date.setHours(0, 0, 0, 0)
  }

  // Set start of week.
  if (period === 'week') {
    date.setDate(date.getDate() - 7)
    date.setHours(0, 0, 0, 0)
  }

  // Set start of month.
  if (period === 'month') {
    date.setMonth(date.getMonth() - 1)
    date.setHours(0, 0, 0, 0)
  }

  return date
}

// Filter collections that store createdAt as ISO string.
const createdAtPeriodFilter = (period: DashboardPeriod): QueryConstraint[] => {
  const periodStart = getPeriodStartDate(period).toISOString().replace('Z', '')

  console.debug('[dashboard] String period filter', { period, periodStart })

  return [where('createdAt', '>=', periodStart)]
}

// Filter collections that store createdAt as Firestore Timestamp.
const createdAtTimestampPeriodFilter = (period: DashboardPeriod): QueryConstraint[] => {
  const periodStart = getPeriodStartDate(period)

  console.debug('[dashboard] Timestamp period filter', { period, periodStart })

  return [where('createdAt', '>=', periodStart)]
}

// Get collection count with optional constraints.
const getCollectionCount = async (collectionName: string, constraints: QueryConstraint[] = []) => {
  console.debug(`[dashboard] Counting "${collectionName}"`, { constraintsCount: constraints.length })

  const snapshot = await getCountFromServer(query(collection(db, collectionName), ...constraints))

  const count = snapshot.data().count

  console.debug(`[dashboard] Count result "${collectionName}"`, { count })

  return count
}

// Get dashboard statistics with optional constraints.
export const getDashboardStats = async (period: DashboardPeriod): Promise<DashboardStats> => {
  const periodFilter = createdAtPeriodFilter(period)
  const timestampPeriodFilter = createdAtTimestampPeriodFilter(period)

  console.debug('[dashboard] Loading dashboard stats', { period })

  // Fetch all statistics in parallel.
  const [clients, washers, products, categories, brands, completedOrdersSnapshot, paidPaymentsSnapshot, paymentsSnapshot] = await Promise.all([
    // users
    getCollectionCount('users', periodFilter),

    // washers
    getCollectionCount('pub_laveurs', periodFilter),

    // products
    getCollectionCount('products', periodFilter),

    // categories
    getCollectionCount('productCategory', periodFilter),

    // brands
    getCollectionCount('brands', timestampPeriodFilter),

    // completed orders
    getCountFromServer(query(collection(db, 'reservations'), where('status', '==', 'completed'), ...periodFilter)),

    // paid payments count
    getCountFromServer(query(collection(db, 'payments'), where('status', '==', 'paid'), ...periodFilter)),

    // payments
    getAggregateFromServer(query(collection(db, 'payments'), where('status', '==', 'paid'), ...periodFilter), {
      revenue: sum('amount'),
    }),
  ])

  const revenue = paymentsSnapshot.data().revenue ?? 0
  const completedOrders = completedOrdersSnapshot.data().count
  const paidPayments = paidPaymentsSnapshot.data().count

  console.debug('[dashboard] Aggregate results', {
    clients,
    washers,
    products,
    categories,
    brands,
    completedOrders,
    paidPayments,
    revenue,
    rawPaymentsData: paymentsSnapshot.data(),
  })

  // Return statistics.
  const stats = {
    // Total revenue from completed reservations.
    revenue,
    // Total completed reservations.
    completedOrders,
    // Total users.
    clients,
    // Total washers.
    washers,
    // Total products.
    products,
    // Total categories.
    categories,
    // Total brands.
    brands,
    // Total paid payments.
    paidPayments,
  }

  console.debug('[dashboard] Final stats', stats)

  return stats
}

export const getLatestProductStocks = async (itemsLimit = 7): Promise<DashboardInventoryProduct[]> => {
  console.debug('[dashboard] Loading latest product stocks', { itemsLimit })

  const snapshot = await getDocs(query(collection(db, 'products'), orderBy('updatedAt', 'desc'), limit(itemsLimit)))

  const products = snapshot.docs.map((productDoc) => {
    const product = productDoc.data() as Product

    return {
      id: product.id || productDoc.id,
      image: product.imageUrl || '/images/products/1.png',
      name: product.title || productDoc.id,
      category: product.category || 'Produit',
      stock: product.stock ?? 0,
      price: product.price ?? 0,
      published: Boolean(product.published),
      updatedAt: product.updatedAt || product.createdAt || '',
    }
  })

  console.debug('[dashboard] Latest product stocks result', { count: products.length })

  return products
}

export const getLatestReservations = async (itemsLimit = 7): Promise<DashboardRecentReservation[]> => {
  console.debug('[dashboard] Loading latest reservations', { itemsLimit })

  const snapshot = await getDocs(query(collection(db, 'reservations'), orderBy('createdAt', 'desc'), limit(itemsLimit)))

  const reservations = snapshot.docs.map((reservationDoc) => {
    const reservation = reservationDoc.data() as ReservationDocument

    return {
      id: reservationDoc.id,
      customerName: reservation.customerName || reservation.clientName || reservation.fullName || reservation.name || 'Client',
      packageName: reservation.packageName || reservation.serviceName || reservation.productName || 'Reservation',
      createdAt: toISOString(reservation.createdAt),
      totalAmount: reservation.totalAmount ?? reservation.amount ?? reservation.price ?? 0,
      status: reservation.status || 'pending',
    }
  })

  console.debug('[dashboard] Latest reservations result', { count: reservations.length })

  return reservations
}
