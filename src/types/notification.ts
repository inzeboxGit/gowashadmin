export type DashboardNotification = {
  id: string
  icon: string
  badge: {
    icon: string
    className: string
  }
  action: string
  context: string
  time: string
  createdAt: number
}
