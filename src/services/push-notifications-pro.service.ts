import type { PushNotification } from '~/types/push-notification'
import { getProNotifConfig } from '~/services/notif-config.service'
import {
  resolvePlayerId,
  saveNotification,
  sendOneSignalPush,
  splitRecipientIds,
  type SendNotificationInput,
} from '~/services/push-notifications-base.service'

const WASHERS_COLLECTION = 'laveurs'
const PUBLIC_WASHERS_COLLECTION = 'pub_laveurs'

const resolveProPlayerIds = async (proIds: string[]) => {
  const ids = await Promise.all(
    proIds.map(async (id) => {
      return (
        (await resolvePlayerId(PUBLIC_WASHERS_COLLECTION, id)) ||
        (await resolvePlayerId(WASHERS_COLLECTION, id))
      )
    }),
  )
  return ids.filter((id): id is string => Boolean(id))
}

export const sendProPush = async (input: SendNotificationInput) => {
  const config = await getProNotifConfig()
  if (!config) {
    throw new Error('Configuration OneSignal pro introuvable.')
  }

  if (input.sentTo === 'all') {
    return sendOneSignalPush(config, { ...input, sentTo: 'all', forUsers: 'pro' })
  }

  const proIds = splitRecipientIds(input.sentTo)
  const playerIds = await resolveProPlayerIds(proIds)
  if (!playerIds.length) {
    throw new Error('Aucun playerId OneSignal trouvé pour les pros sélectionnés.')
  }

  return sendOneSignalPush(
    config,
    { ...input, sentTo: proIds.join(','), forUsers: 'pro' },
    playerIds,
  )
}

export const sendProNotification = async (
  input: SendNotificationInput,
): Promise<PushNotification> => {
  const sentTo = input.sentTo === 'all' ? 'all' : splitRecipientIds(input.sentTo).join(',')

  await sendProPush({ ...input, sentTo })
  return saveNotification({ ...input, sentTo, forUsers: 'pro' }, 'pro')
}
