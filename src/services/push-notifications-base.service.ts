import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import { db } from '~/lib/firebase/firestore'
import type { OneSignalNotifConfig } from '~/types/notif-config'
import type { NotificationAudience, PushNotification } from '~/types/push-notification'

const NOTIFICATIONS_COLLECTION = 'notifications'

export type SendNotificationInput = {
  title: string
  message: string
  sentBy: string
  sentTo: string
  type?: string
  imageUrl?: string
  forUsers?: NotificationAudience
  recipientRoles?: Record<string, 'client' | 'pro'>
}

export const getNotifications = async (): Promise<PushNotification[]> => {
  const q = query(collection(db, NOTIFICATIONS_COLLECTION), orderBy('sentDate', 'desc'))
  const snapshot = await getDocs(q)

  return snapshot.docs.map((notifDoc) => {
    const data = notifDoc.data() as Omit<PushNotification, 'id'> & { id?: string }
    return {
      ...data,
      id: data.id || notifDoc.id,
    } as PushNotification
  })
}

export const getNotificationById = async (id: string): Promise<PushNotification | null> => {
  const docRef = doc(db, NOTIFICATIONS_COLLECTION, id)
  const snapshot = await getDoc(docRef)

  if (!snapshot.exists()) return null

  const data = snapshot.data() as Omit<PushNotification, 'id'> & { id?: string }
  return { ...data, id: data.id || snapshot.id } as PushNotification
}

export const saveNotification = async (
  input: SendNotificationInput,
  audience: NotificationAudience,
): Promise<PushNotification> => {
  const notifRef = doc(collection(db, NOTIFICATIONS_COLLECTION))

  const payload: PushNotification = {
    id: notifRef.id,
    title: input.title,
    message: input.message,
    sentBy: input.sentBy,
    sentTo: input.sentTo,
    sentDate: serverTimestamp() as unknown,
    type: input.type || '',
    isViewed: false,
    forUsers: audience,
  }

  if (input.imageUrl) {
    payload.imageUrl = input.imageUrl
  }

  await setDoc(notifRef, payload)

  return payload
}

export const sendOneSignalPush = async (
  config: OneSignalNotifConfig,
  input: SendNotificationInput,
  playerIds?: string[],
  externalUserIds?: string[],
) => {
  console.log('[OneSignal Debug] Preparing to send push notification')
  console.log('[OneSignal Debug] Base URL:', config.oneSignalBaseUrl)
  console.log('[OneSignal Debug] App ID:', config.oneSignalAppId)
  console.log(
    '[OneSignal Debug] API Key (Secret):',
    config.oneSignalApiKey ? `${config.oneSignalApiKey.substring(0, 15)}...` : 'undefined',
  )

  const body: Record<string, unknown> = {
    app_id: config.oneSignalAppId,
    headings: { en: input.title },
    contents: { en: input.message },
    target_channel: 'push',
    ios_badgeType: 'Increase',
    ios_badgeCount: 1,
    large_icon: config.oneSignalLogoLink1,
    big_picture: input.imageUrl || config.oneSignalLogoLink2,
    android_sound: config.oneSignalAndroidSound,
    ios_sound: config.oneSignalIosSound,
    android_icon: config.oneSignalAndroidIcon,
    ...(input.imageUrl ? { ios_attachments: { image: input.imageUrl } } : {}),
  }

  Object.keys(body).forEach((key) => {
    const value = body[key]
    if (value === null || value === undefined || value === '') {
      delete body[key]
    }
  })

  if (playerIds && playerIds.length > 0) {
    body.include_subscription_ids = playerIds
    console.log('[OneSignal Debug] Target: Specific Subscription IDs', playerIds)
  } else if (externalUserIds && externalUserIds.length > 0) {
    body.include_aliases = { external_id: externalUserIds }
    console.log('[OneSignal Debug] Target: Specific External User IDs', externalUserIds)
  } else {
    body.included_segments = ['All Subscribers']
    console.log('[OneSignal Debug] Target: Segment "All Subscribers"')
  }

  console.log('[OneSignal Debug] Body Payload:', JSON.stringify(body, null, 2))

  try {
    const response = await fetch(config.oneSignalBaseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Key ${config.oneSignalApiKey}`,
      },
      body: JSON.stringify(body),
    })

    console.log('[OneSignal Debug] Response Status:', response.status)

    if (!response.ok) {
      const err = await response.text()
      console.error('[OneSignal Debug] API Error Response:', err)
      throw new Error(`OneSignal push failed: ${response.status} - ${err}`)
    }

    const resJson = await response.json()
    console.log('[OneSignal Debug] Success Response:', JSON.stringify(resJson, null, 2))
    return resJson
  } catch (error: unknown) {
    console.error('[OneSignal Debug] Request Exception:', error)
    throw error
  }
}

export const splitRecipientIds = (sentTo: string) => {
  return sentTo
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean)
}

const readString = (value: unknown) => {
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : null
}

export const resolvePlayerId = async (collectionName: string, userId: string) => {
  const snapshot = await getDoc(doc(db, collectionName, userId))
  if (!snapshot.exists()) return null

  const data = snapshot.data()
  return readString(data.playerId) || readString(data.oneSignalSubscriptionId)
}
