import type { PushNotification } from '~/types/push-notification'
import { getClientNotifConfig } from '~/services/notif-config.service'
import {
  resolvePlayerId,
  saveNotification,
  sendOneSignalPush,
  splitRecipientIds,
  type SendNotificationInput,
} from '~/services/push-notifications-base.service'

const USERS_COLLECTION = 'users'

const resolveClientPlayerIds = async (clientIds: string[]) => {
  const ids = await Promise.all(clientIds.map((id) => resolvePlayerId(USERS_COLLECTION, id)))
  return ids.filter((id): id is string => Boolean(id))
}

export const sendClientPush = async (input: SendNotificationInput) => {
  const config = await getClientNotifConfig()
  if (!config) {
    throw new Error('Configuration OneSignal client introuvable.')
  }

  if (input.sentTo === 'all') {
    return sendOneSignalPush(config, { ...input, sentTo: 'all', forUsers: 'client' })
  }

  const clientIds = splitRecipientIds(input.sentTo)
  const playerIds = await resolveClientPlayerIds(clientIds)

  return sendOneSignalPush(
    config,
    { ...input, sentTo: clientIds.join(','), forUsers: 'client' },
    playerIds,
    playerIds.length ? undefined : clientIds,
  )
}

export const sendClientNotification = async (
  input: SendNotificationInput,
): Promise<PushNotification> => {
  const sentTo = input.sentTo === 'all' ? 'all' : splitRecipientIds(input.sentTo).join(',')

  await sendClientPush({ ...input, sentTo })
  return saveNotification({ ...input, sentTo, forUsers: 'client' }, 'client')
}
