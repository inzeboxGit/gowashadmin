export type Payment = {
  id: string
  laveurId: string
  amount: number
  captureStatus: 'captured' | 'canceled' | 'pending_capture'
}
