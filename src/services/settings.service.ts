import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { deleteObject, getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage'
import { db } from '~/lib/firebase/firestore'
import { storage } from '~/lib/firebase/storage'
import type { OneSignalNotifConfig } from '~/types/notif-config'
import type { AppConfigDocument, AppTextsConfig } from '~/types/app-config'

const SETTINGS_COLLECTION = 'appSettings'
const NOTIFICATION_COLLECTION = 'notificationConfigs'
const APP_CONFIGS_COLLECTION = 'appConfigs'
const APPS_DOC = 'apps'

type BannerSettings = {
  bannerText: string
  shopOfferBackgroundImageUrl?: string
}

export type SaveBannerSettingsInput = BannerSettings & {
  shopOfferBackgroundImageFile?: File | null
}

export const defaultAppTexts: AppTextsConfig = {
  aboutLabel: "À propos",
  acceptCta: "ACCEPTER",
  accountDetailsText: "Infos personnelles",
  addOnSeparator: ", ",
  addOptionButtonabel: "AJOUTER UNE OPTION",
  addServiceButtonLabel: "AJOUTER UNE FORMULE",
  addonSectionTitle: "3. OPTIONS",
  addressLabel: "Adresse",
  availabilityOff: "OFF",
  availabilityOn: "ON",
  bannerText: "10% de remise immédiate pour tout parrainage",
  bestOfferLabel: "Populaire",
  bestWasher: "Top Laveur",
  businessPageNameHint: "Nom de votre page",
  businessTypeLabel: "TYPE DE SERVICE",
  callClientCta: "APPELER LE CLIENT",
  cancelCta: "ANNULER",
  categorySectionTitle: "1. CHOISISSEZ VOTRE CATÉGORIE",
  completeCta: "TERMINER",
  completeDialogDescription: "Cette action clôture la réservation et marque la commande comme terminée.",
  completeDialogTitle: "Terminer",
  completeWashCta: "TERMINER",
  compteEtDonneesLabel: "Compte et données",
  confirmButton: "Confirmer",
  connectMessage: "Connectez-vous pour modifier votre profil.",
  constructionDescription: "Cette section arrive bientot. L'interface est prete, la logique sera branchée ensuite.",
  constructionTitle: "En construction",
  copyToCategoriesModalTitle: "Copier cette formule vers",
  dailyLabels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
  deleteAccountLabel: "Supprimer le compte",
  descriptionHint: "Décrivez votre activité, vos points forts et votre zone de service.",
  descriptionLabel: "DESCRIPTION",
  fallbackClientName: "Client",
  languageLabel: "Langue",
  logoutLabel: "Se déconnecter",
  modifyProfileButtonLabel: "MODIFIER MA PAGE",
  monthlyLabels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  newOrdersSectionTitle: "NOUVELLES COMMANDES",
  noAddonForCategory: 'Aucune option pour ce type de voiture, cliquer sur "Ajouter une option" pour en créer une.',
  noAddonsAvailable: "Aucune option associée à cette formule.",
  noClientPhoneAvailable: "Numéro de téléphone du client non disponible.",
  noDescriptionProvided: "Aucune description disponible",
  noPackageForCategory: 'Aucune formule pour ce type de voiture, cliquer sur "Ajouter une formule" pour en créer une.',
  noPackagesAvailable: "Aucune formule disponible pour cette catégorie.",
  noReservation: "Aucune réservation en cours",
  notAvailable: "-",
  orderClientAddress: "Adresse client",
  orderClientPhone: "Téléphone client",
  orderDate: "Date",
  orderOptions: "Options",
  orderPackage: "Formule",
  orderProgress: "Arrivée estimée",
  orderTotal: "Total",
  orderVehicle: "Véhicule",
  packageSectionTitle: "2. CHOISISSEZ VOTRE FORMULE",
  paymentLabel: "Paiements",
  photosLabel: "PHOTOS",
  photosSectionTitle: "PHOTOS",
  priceLabelProfil: "PRIX",
  priceSuffix: "€",
  proAccountAppbarTtitle: "Email",
  proAccountTitle: "Mon Compte Pro",
  profileNameLabel: "NOM",
  profileNamePlaceholder: "Nom de la Formule",
  profileTitle: "Mon Profil",
  progressDone: "Terminée",
  progressInProgress: "En cours",
  progressNotStarted: "Non démarrée",
  readMore: "... Plus",
  rejectCta: "REFUSER",
  reservationAcceptedError: "Erreur lors de l'acceptation.",
  reservationAcceptedSuccess: "Réservation acceptée.",
  reservationCompletedError: "Erreur lors de la finalisation.",
  reservationCompletedSuccess: "Réservation terminée.",
  reservationCreating: "Création réservation...",
  reservationRejectedError: "Erreur lors du refus.",
  reservationRejectedSuccess: "Réservation refusée.",
  reservationSimulatedSuccess: "Réservation client simulée avec succès.",
  reservationSimulationError: "Erreur lors de la simulation.",
  ressourcesText: "Ressources",
  revenuePeriodDaily: "JOUR",
  revenuePeriodMonthly: "MOIS",
  revenueTitle: "Chiffre d'affaires",
  revenueVsPreviousMonth: "vs mois dernier",
  reviewsCount: "Avis",
  saveProfileButton: "Enregistrer les modifications",
  servicesSectionTitle: "catégories",
  shopPageTitle: "Boutique",
  simulateReservationCta: "SIMULER UNE RÉSERVATION CLIENT",
  statAverageBasket: "Achats",
  statAverageRating: "Avis",
  statOrders: "Commandes",
  statProfileViews: "Vues du profil",
  statsSectionTitle: "STATISTIQUES",
  statusAccepted: "ACCEPTÉE",
  statusCancelled: "ANNULÉE",
  statusCompleted: "TERMINÉE",
  statusInProgress: "EN COURS",
  statusPending: "EN ATTENTE",
  statusRejected: "REFUSÉE",
  utilizeGoWashLabel: "Utiliser Go Wash",
  vehicleCompactImagePlaceholder: "assets/vehicules/confort.png",
  vehicleImagePlaceholder: "assets/vehicules/eco.png",
  vehicleSuvImagePlaceholder: "assets/vehicules/premium.png",
  yourNameHolder: "Votre nom",
}

export type VersioningConfig = {
  androidCodeClient: number
  androidCodePro: number
  androidVersionClient: string
  androidVersionPro: string
  android_store_url: string
  android_store_urlPro?: string
  appleVersionClient: string
  appleVersionPro: string
  ios_store_url: string
  ios_store_urlPro?: string
  message: string
  needUpdate: boolean
  title: string
}

export type GoWashConfig = {
  allowVisiblePro: number
  appName: string
  devise: string
  enableVerification: boolean
  isMaintenance: boolean
  linkPayment: string
  liveLocationUseDistanceThreshold: boolean
  paymentLink: string
  vehicleCategories: string[]
}

const getConfig = async <T>(collectionName: string, documentId: string, defaults: T): Promise<T> => {
  const snapshot = await getDoc(doc(db, collectionName, documentId))
  return snapshot.exists() ? ({ ...defaults, ...snapshot.data() } as T) : defaults
}

const saveConfig = async <T extends object>(collectionName: string, documentId: string, payload: T) => {
  await setDoc(doc(db, collectionName, documentId), { ...payload, updatedAt: serverTimestamp() }, { merge: true })
}

const uploadShopOfferBackgroundImage = async (imageFile?: File | null) => {
  if (!imageFile) return ''

  const extension = imageFile.name.split('.').pop()
  const filename = `${Date.now()}${extension ? `.${extension}` : ''}`
  const imageRef = storageRef(storage, `appConfigs/${APPS_DOC}/shopOfferBackgroundImage/${filename}`)

  await uploadBytes(imageRef, imageFile)

  return getDownloadURL(imageRef)
}

const deleteStorageFileFromUrl = async (fileUrl?: string) => {
  if (!fileUrl) return

  try {
    await deleteObject(storageRef(storage, fileUrl))
  } catch (error) {
    console.warn('[settings] Failed to delete previous banner image', error)
  }
}

export const getBannerSettings = async (defaults: BannerSettings): Promise<BannerSettings> => {
  const snapshot = await getDoc(doc(db, APP_CONFIGS_COLLECTION, APPS_DOC))
  if (snapshot.exists()) {
    const data = snapshot.data() as AppConfigDocument
    return {
      bannerText: data.texts?.bannerText ?? defaults.bannerText,
      shopOfferBackgroundImageUrl: data.shopOfferBackgroundImageUrl ?? defaults.shopOfferBackgroundImageUrl ?? '',
    }
  }
  return defaults
}

export const saveBannerSettings = async (payload: SaveBannerSettingsInput) => {
  const uploadedImageUrl = await uploadShopOfferBackgroundImage(payload.shopOfferBackgroundImageFile)
  const shopOfferBackgroundImageUrl = uploadedImageUrl || payload.shopOfferBackgroundImageUrl || ''

  await setDoc(
    doc(db, APP_CONFIGS_COLLECTION, APPS_DOC),
    {
      shopOfferBackgroundImageUrl,
      texts: {
        bannerText: payload.bannerText,
      },
    },
    { merge: true }
  )

  if (uploadedImageUrl && payload.shopOfferBackgroundImageUrl && payload.shopOfferBackgroundImageUrl !== uploadedImageUrl) {
    await deleteStorageFileFromUrl(payload.shopOfferBackgroundImageUrl)
  }

  return {
    bannerText: payload.bannerText,
    shopOfferBackgroundImageUrl,
  }
}

export const getAllAppTexts = async (): Promise<AppTextsConfig> => {
  const snapshot = await getDoc(doc(db, APP_CONFIGS_COLLECTION, APPS_DOC))
  if (snapshot.exists()) {
    const data = snapshot.data() as AppConfigDocument
    return { ...defaultAppTexts, ...(data.texts || {}) }
  }
  return { ...defaultAppTexts }
}

export const saveAppTextKey = async (key: string, value: any) => {
  await setDoc(
    doc(db, APP_CONFIGS_COLLECTION, APPS_DOC),
    {
      texts: {
        [key]: value,
      },
    },
    { merge: true }
  )
}

export const getAppConfigsDoc = async (): Promise<AppConfigDocument | null> => {
  const snapshot = await getDoc(doc(db, APP_CONFIGS_COLLECTION, APPS_DOC))
  return snapshot.exists() ? (snapshot.data() as AppConfigDocument) : null
}

export const saveAppConfigsDoc = async (payload: Partial<AppConfigDocument>) => {
  await setDoc(doc(db, APP_CONFIGS_COLLECTION, APPS_DOC), payload, { merge: true })
}

export const getVersioningSettings = (defaults: VersioningConfig) => getConfig(SETTINGS_COLLECTION, 'versioning', defaults)
export const saveVersioningSettings = (payload: VersioningConfig) => saveConfig(SETTINGS_COLLECTION, 'versioning', payload)

export const getGoWashSettings = (defaults: GoWashConfig) => getConfig(SETTINGS_COLLECTION, 'gowash', defaults)
export const saveGoWashSettings = (payload: GoWashConfig) => saveConfig(SETTINGS_COLLECTION, 'gowash', payload)

export const getNotificationSettings = (audience: 'pro' | 'client', defaults: OneSignalNotifConfig) => getConfig(NOTIFICATION_COLLECTION, audience, defaults)
export const saveNotificationSettings = (audience: 'pro' | 'client', payload: OneSignalNotifConfig) => saveConfig(NOTIFICATION_COLLECTION, audience, payload)
