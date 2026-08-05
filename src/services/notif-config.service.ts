import type { OneSignalNotifConfig } from '~/types/notif-config'
import { getNotificationSettings } from './settings.service'

const DEFAULT_ONESIGNAL_CONFIG = {
  oneSignalBaseUrl: 'https://api.onesignal.com/notifications?c=push',
  oneSignalAndroidIcon: 'ic_stat_onesignal_default',
  oneSignalAndroidSound: 'default',
  oneSignalIosSound: 'default',
  oneSignalLogoLink1: '',
  oneSignalLogoLink2: '',
}

const PRO_NOTIF_CONFIG: OneSignalNotifConfig = {
  ...DEFAULT_ONESIGNAL_CONFIG,
  oneSignalAppId: '',
  oneSignalApiKey: '',
}

const CLIENT_NOTIF_CONFIG: OneSignalNotifConfig = {
  ...DEFAULT_ONESIGNAL_CONFIG,
  oneSignalAppId: '',
  oneSignalApiKey: '',
}

const isConfigured = (config: OneSignalNotifConfig) => {
  return (
    config.oneSignalAppId.trim().length > 0 &&
    config.oneSignalApiKey.trim().length > 0 &&
    !config.oneSignalAppId.startsWith('APP_ID_') &&
    !config.oneSignalApiKey.startsWith('SECRET_KEY_')
  )
}

/**
 * Config OneSignal client.
 * Remplacer APP_ID_CLIENT et SECRET_KEY_CLIENT par les vraies valeurs.
 */
export const getClientNotifConfig = async (): Promise<OneSignalNotifConfig | null> => {
  const config = await getNotificationSettings('client', CLIENT_NOTIF_CONFIG)
  return isConfigured(config) ? config : null
}

/**
 * Config OneSignal pro/laveur.
 * Remplacer APP_ID_PRO et SECRET_KEY_PRO par les vraies valeurs.
 */
export const getProNotifConfig = async (): Promise<OneSignalNotifConfig | null> => {
  const config = await getNotificationSettings('pro', PRO_NOTIF_CONFIG)
  return isConfigured(config) ? config : null
}

export const getNotifConfigByAudience = async (
  audience: 'client' | 'pro' | 'all',
): Promise<{ client: OneSignalNotifConfig | null; pro: OneSignalNotifConfig | null }> => {
  if (audience === 'client') {
    return { client: await getClientNotifConfig(), pro: null }
  }
  if (audience === 'pro') {
    return { client: null, pro: await getProNotifConfig() }
  }

  const [client, pro] = await Promise.all([getClientNotifConfig(), getProNotifConfig()])
  return { client, pro }
}
