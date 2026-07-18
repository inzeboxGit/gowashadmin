import { ref, computed } from 'vue'
import { useAsyncState } from '@vueuse/core'
import { getPaymentsByWasherId } from '~/services/payments.service'
import { getReservationsByWasherId } from '~/services/reservations.service'
import type { Payment } from '~/types/payment'
import type { Reservation } from '~/types/reservation'

export function useWasherStats(washerId: string) {
  const { state: payments, isLoading: isLoadingPayments } = useAsyncState(
    () => getPaymentsByWasherId(washerId),
    [],
  )

  const { state: reservations, isLoading: isLoadingReservations } = useAsyncState(
    () => getReservationsByWasherId(washerId),
    [],
  )

  const totalRevenue = computed(() => {
    return (payments.value as Payment[]).reduce((total, payment) => total + payment.amount, 0)
  })

  const confirmedPayments = computed(() => {
    return (payments.value as Payment[])
      .filter((payment) => payment.captureStatus === 'captured')
      .reduce((total, payment) => total + payment.amount, 0)
  })

  const canceledPayments = computed(() => {
    return (payments.value as Payment[])
      .filter((payment) => payment.captureStatus === 'canceled')
      .reduce((total, payment) => total + payment.amount, 0)
  })

  const completedOrders = computed(() => {
    return (reservations.value as Reservation[]).filter((reservation) => reservation.status === 'completed').length
  })

  const isLoading = computed(() => isLoadingPayments.value || isLoadingReservations.value)

  return {
    totalRevenue,
    confirmedPayments,
    canceledPayments,
    completedOrders,
    isLoading,
  }
}
