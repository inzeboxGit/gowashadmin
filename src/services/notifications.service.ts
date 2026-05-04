import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { db } from '~/lib/firebase/firestore'
import type { DashboardNotification } from '~/types/notification'
import type { Product } from '~/types/product'

type FirestoreDateLike = string | Date | { toDate: () => Date } | undefined

const LOW_STOCK_THRESHOLD = 5

const toDate = (value: FirestoreDateLike) => {
  if (!value) return null
  if (typeof value === 'string') {
    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? null : date
  }
  if (value instanceof Date) return value
  if (typeof value === 'object' && 'toDate' in value && typeof value.toDate === 'function') return value.toDate()

  return null
}

const formatRelativeTime = (value: FirestoreDateLike) => {
  const date = toDate(value)
  if (!date) return 'Date inconnue'

  const diffMs = Date.now() - date.getTime()
  const minutes = Math.max(0, Math.floor(diffMs / 60000))

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes} min ago`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} h ago`

  const days = Math.floor(hours / 24)
  return `${days} d ago`
}

const getDateTime = (value: FirestoreDateLike) => toDate(value)?.getTime() ?? 0

const createNotification = (notification: DashboardNotification) => notification

const getStockNotifications = async () => {
  const snapshot = await getDocs(query(collection(db, 'products'), where('stock', '<=', LOW_STOCK_THRESHOLD), limit(5)))

  return snapshot.docs.map((productDoc) => {
    const product = productDoc.data() as Product

    return createNotification({
      id: `stock-${productDoc.id}`,
      icon: 'package-x',
      badge: { icon: 'circle-alert', className: 'bg-danger' },
      action: `stock faible (${product.stock ?? 0}) pour`,
      context: product.title || productDoc.id,
      time: formatRelativeTime(product.updatedAt || product.createdAt),
      createdAt: getDateTime(product.updatedAt || product.createdAt),
    })
  })
}

const getWasherNotifications = async () => {
  const snapshot = await getDocs(query(collection(db, 'pub_laveurs'), orderBy('createdAt', 'desc'), limit(5)))

  return snapshot.docs.map((washerDoc) => {
    const washer = washerDoc.data() as { businessName?: string; fullName?: string; createdAt?: FirestoreDateLike }

    return createNotification({
      id: `washer-${washerDoc.id}`,
      icon: 'badge-check',
      badge: { icon: 'plus', className: 'bg-primary' },
      action: 'nouveau laveur ajoute',
      context: washer.businessName || washer.fullName || washerDoc.id,
      time: formatRelativeTime(washer.createdAt),
      createdAt: getDateTime(washer.createdAt),
    })
  })
}

const getClientNotifications = async () => {
  const snapshot = await getDocs(query(collection(db, 'users'), orderBy('createdAt', 'desc'), limit(5)))

  return snapshot.docs.map((userDoc) => {
    const user = userDoc.data() as { displayName?: string; fullName?: string; email?: string; createdAt?: FirestoreDateLike }

    return createNotification({
      id: `client-${userDoc.id}`,
      icon: 'user-plus',
      badge: { icon: 'plus', className: 'bg-success' },
      action: 'nouveau client inscrit',
      context: user.displayName || user.fullName || user.email || userDoc.id,
      time: formatRelativeTime(user.createdAt),
      createdAt: getDateTime(user.createdAt),
    })
  })
}

const getReservationNotifications = async () => {
  const snapshot = await getDocs(query(collection(db, 'reservations'), orderBy('createdAt', 'desc'), limit(5)))

  return snapshot.docs.map((reservationDoc) => {
    const reservation = reservationDoc.data() as {
      packageName?: string
      status?: string
      totalAmount?: number
      createdAt?: FirestoreDateLike
    }

    return createNotification({
      id: `reservation-${reservationDoc.id}`,
      icon: 'calendar-check',
      badge: { icon: 'shopping-cart', className: 'bg-info' },
      action: `commande ${reservation.status || 'cree'} pour`,
      context: reservation.packageName || `${reservation.totalAmount ?? 0}`,
      time: formatRelativeTime(reservation.createdAt),
      createdAt: getDateTime(reservation.createdAt),
    })
  })
}

export const getDashboardNotifications = async () => {
  const results = await Promise.all([
    getStockNotifications(),
    getWasherNotifications(),
    getClientNotifications(),
    getReservationNotifications(),
  ])

  return results
    .flat()
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 10)
}
