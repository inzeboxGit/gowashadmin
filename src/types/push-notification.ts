export type NotificationAudience = 'client' | 'pro' | 'all'

export interface PushNotification {
  id: string
  title: string
  message: string
  sentBy: string
  sentTo: string           // user ID or 'all'
  sentDate: unknown        // Firestore Timestamp
  type?: string
  imageUrl?: string
  isViewed?: boolean
  forUsers?: NotificationAudience
}
