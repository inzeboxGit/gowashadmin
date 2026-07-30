import type { PushNotification } from '~/types/push-notification'
import {
  getNotificationById,
  getNotifications,
  saveNotification,
  splitRecipientIds,
  type SendNotificationInput,
} from '~/services/push-notifications-base.service'
import { sendClientPush } from '~/services/push-notifications-client.service'
import { sendProPush } from '~/services/push-notifications-pro.service'

export { getNotificationById, getNotifications }
export type { SendNotificationInput }
export { sendClientNotification } from '~/services/push-notifications-client.service'
export { sendProNotification } from '~/services/push-notifications-pro.service'

export const sendNotification = async (input: SendNotificationInput): Promise<PushNotification> => {
  let audience = input.forUsers || 'all'
  let clientIds: string[] = []
  let proIds: string[] = []

  if (input.sentTo && input.sentTo !== 'all') {
    const ids = splitRecipientIds(input.sentTo)

    if (input.recipientRoles) {
      for (const id of ids) {
        if (input.recipientRoles[id] === 'pro') {
          proIds.push(id)
        } else {
          clientIds.push(id)
        }
      }
    } else if (audience === 'pro') {
      proIds = ids
    } else {
      clientIds = ids
    }

    if (clientIds.length > 0 && proIds.length > 0) {
      audience = 'all'
    } else if (proIds.length > 0) {
      audience = 'pro'
    } else {
      audience = 'client'
    }
  }

  const pushPromises: Promise<unknown>[] = []

  if (input.sentTo === 'all') {
    if (audience === 'client' || audience === 'all') {
      pushPromises.push(sendClientPush({ ...input, sentTo: 'all', forUsers: 'client' }))
    }
    if (audience === 'pro' || audience === 'all') {
      pushPromises.push(sendProPush({ ...input, sentTo: 'all', forUsers: 'pro' }))
    }
  } else {
    if (clientIds.length > 0) {
      pushPromises.push(
        sendClientPush({ ...input, sentTo: clientIds.join(','), forUsers: 'client' }),
      )
    }
    if (proIds.length > 0) {
      pushPromises.push(sendProPush({ ...input, sentTo: proIds.join(','), forUsers: 'pro' }))
    }
  }

  if (pushPromises.length > 0) {
    await Promise.all(pushPromises)
  }

  return saveNotification(input, audience)
}
