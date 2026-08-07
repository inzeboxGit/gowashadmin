<template>
  <PageBreadcrumb title="Parametres" subtitle="Administration" />

  <BCard no-body class="settings-card">
    <BCardHeader class="bg-white border-bottom">
      <div class="d-flex flex-wrap align-items-center justify-content-between gap-3">
        <div>
          <h5 class="mb-1">Parametres GoWASH</h5>
          <p class="text-muted mb-0">Contenu, versions et integrations des applications.</p>
        </div>
      </div>
    </BCardHeader>

    <BCardBody class="p-0">
      <BAlert v-if="successMessage" variant="success" class="rounded-0 border-0 mb-0" show>{{ successMessage }}</BAlert>
      <BAlert v-if="errorMessage" variant="danger" class="rounded-0 border-0 mb-0" show>{{ errorMessage }}</BAlert>
      <div v-if="isLoading" class="py-5 text-center">
        <BSpinner small class="me-2" /> Chargement des parametres...
      </div>

      <BTabs v-else nav-wrapper-class="settings-tabs px-3 pt-3" content-class="p-4">
        <BTab title="Banniere" active>
          <section class="form-section">
            <header class="section-heading">
              <div class="section-icon bg-primary-subtle text-primary">
                <Icon icon="panel-top" />
              </div>
              <div>
                <h5 class="mb-1">Banniere promotionnelle</h5>
                <p class="text-muted mb-0">Message affiche aux utilisateurs.</p>
              </div>
            </header>
            <BFormGroup label="Texte de la banniere" label-for="banner-text">
              <BFormTextarea id="banner-text" v-model="bannerText" rows="3" />
            </BFormGroup>
            <BFormGroup label="Image de bannière" label-for="shop-offer-background-image" class="mt-3">
              <BFormFile id="shop-offer-background-image" v-model="shopOfferBackgroundImageFile" class="form-control" accept="image/*" />
              <BAlert v-if="shopOfferBackgroundImageFile && shopOfferBackgroundImageUrl" variant="info" show class="mt-3 mb-0">
                L’image actuelle sera remplacée après sauvegarde.
              </BAlert>
              <div v-if="shopOfferBackgroundImageUrl" class="mt-3">
                <img :src="shopOfferBackgroundImageUrl" alt="Image de bannière" class="banner-image-preview" />
                <p class="text-muted fs-xs mb-0 mt-2 text-break">{{ shopOfferBackgroundImageUrl }}</p>
              </div>
            </BFormGroup>
            <div class="mt-4 text-end">
              <BButton variant="primary" :disabled="isLoading || savingSection !== null" @click="saveTab('banner')">
                <Icon icon="save" class="me-1" />
                {{ savingSection === 'banner' ? 'Sauvegarde...' : 'Sauvegarder' }}
              </BButton>
            </div>
          </section>
        </BTab>

        <BTab title="Versioning GoWASH">
          <section class="form-section">
            <header class="section-heading">
              <div class="section-icon bg-info-subtle text-info">
                <Icon icon="smartphone" />
              </div>
              <div>
                <h5 class="mb-1">Mises a jour des applications</h5>
                <p class="text-muted mb-0">Versions minimales et message de mise a jour pour Pro et Client.</p>
              </div>
            </header>

            <BRow class="g-4 mb-4">
              <!-- Colonne Pro -->
              <BCol md="6">
                <div class="p-3 border rounded bg-light-subtle h-100">
                  <h6 class="fw-semibold text-primary mb-3 d-flex align-items-center">
                    <Icon icon="briefcase" class="me-2 fs-md" /> GoWASH Pro
                  </h6>
                  <BRow class="g-3">
                    <BCol cols="12">
                      <BFormGroup label="Version Android Pro">
                        <BFormInput v-model="versioning.androidVersionPro" placeholder="1.0.0" />
                      </BFormGroup>
                    </BCol>
                    <BCol cols="12">
                      <BFormGroup label="Code Android Pro">
                        <BFormInput v-model.number="versioning.androidCodePro" type="number" min="1" />
                      </BFormGroup>
                    </BCol>
                    <BCol cols="12">
                      <BFormGroup label="Version iOS Pro">
                        <BFormInput v-model="versioning.appleVersionPro" placeholder="1.0.0" />
                      </BFormGroup>
                    </BCol>
                    <BCol cols="12">
                      <BFormGroup label="Lien Google Play Pro">
                        <BFormInput v-model="versioning.android_store_urlPro" type="url" placeholder="https://play.google.com/..." />
                      </BFormGroup>
                    </BCol>
                    <BCol cols="12">
                      <BFormGroup label="Lien App Store Pro">
                        <BFormInput v-model="versioning.ios_store_urlPro" type="url" placeholder="https://apps.apple.com/..." />
                      </BFormGroup>
                    </BCol>
                  </BRow>
                </div>
              </BCol>

              <!-- Colonne Client -->
              <BCol md="6">
                <div class="p-3 border rounded bg-light-subtle h-100">
                  <h6 class="fw-semibold text-info mb-3 d-flex align-items-center">
                    <Icon icon="user" class="me-2 fs-md" /> GoWASH Client
                  </h6>
                  <BRow class="g-3">
                    <BCol cols="12">
                      <BFormGroup label="Version Android Client">
                        <BFormInput v-model="versioning.androidVersionClient" placeholder="1.0.0" />
                      </BFormGroup>
                    </BCol>
                    <BCol cols="12">
                      <BFormGroup label="Code Android Client">
                        <BFormInput v-model.number="versioning.androidCodeClient" type="number" min="1" />
                      </BFormGroup>
                    </BCol>
                    <BCol cols="12">
                      <BFormGroup label="Version iOS Client">
                        <BFormInput v-model="versioning.appleVersionClient" placeholder="1.0.0" />
                      </BFormGroup>
                    </BCol>
                    <BCol cols="12">
                      <BFormGroup label="Lien Google Play Client">
                        <BFormInput v-model="versioning.android_store_url" type="url" placeholder="https://play.google.com/..." />
                      </BFormGroup>
                    </BCol>
                    <BCol cols="12">
                      <BFormGroup label="Lien App Store Client">
                        <BFormInput v-model="versioning.ios_store_url" type="url" placeholder="https://apps.apple.com/..." />
                      </BFormGroup>
                    </BCol>
                  </BRow>
                </div>
              </BCol>
            </BRow>

            <h6 class="fw-semibold text-secondary mb-3">Parametres generaux</h6>
            <BRow class="g-3">
              <BCol md="6">
                <BFormGroup label="Titre de la mise a jour">
                  <BFormInput v-model="versioning.title" />
                </BFormGroup>
              </BCol>
              <BCol md="6" class="d-flex align-items-end pb-2">
                <BFormCheckbox v-model="versioning.needUpdate" switch>Forcer la mise a jour</BFormCheckbox>
              </BCol>
              <BCol cols="12">
                <BFormGroup label="Message">
                  <BFormTextarea v-model="versioning.message" rows="3" />
                </BFormGroup>
              </BCol>
            </BRow>
            <div class="mt-4 text-end">
              <BButton variant="primary" :disabled="isLoading || savingSection !== null" @click="saveTab('versioning')">
                <Icon icon="save" class="me-1" />
                {{ savingSection === 'versioning' ? 'Sauvegarde...' : 'Sauvegarder' }}
              </BButton>
            </div>
          </section>
        </BTab>

        <BTab title="Notifications Pro">
          <NotificationFields
            v-model="proNotifications"
            title="Notifications GoWASH Pro"
            :is-loading="isLoading"
            :is-saving="savingSection === 'proNotif'"
            @save="saveTab('proNotif')"
          />
        </BTab>
        <BTab title="Notifications Client">
          <NotificationFields
            v-model="clientNotifications"
            title="Notifications GoWASH Client"
            :is-loading="isLoading"
            :is-saving="savingSection === 'clientNotif'"
            @save="saveTab('clientNotif')"
          />
        </BTab>

        <BTab title="Configuration GoWASH">
          <section class="form-section">
            <header class="section-heading">
              <div class="section-icon bg-warning-subtle text-warning">
                <Icon icon="settings-2" />
              </div>
              <div>
                <h5 class="mb-1">Configuration generale</h5>
                <p class="text-muted mb-0">Regles et options disponibles dans les applications.</p>
              </div>
            </header>
            <BRow class="g-3">
              <BCol md="6">
                <BFormGroup label="Nom de l'application">
                  <BFormInput v-model="gowash.appName" />
                </BFormGroup>
              </BCol>
              <BCol md="6">
                <BFormGroup label="Devise">
                  <BFormInput v-model="gowash.devise" maxlength="3" />
                </BFormGroup>
              </BCol>
              <BCol md="6">
                <BFormGroup label="Lien de paiement">
                  <BFormInput v-model="gowash.paymentLink" type="url" />
                </BFormGroup>
              </BCol>
              <BCol md="6">
                <BFormGroup label="Lien de paiement alternatif">
                  <BFormInput v-model="gowash.linkPayment" type="url" />
                </BFormGroup>
              </BCol>
              <BCol cols="12">
                <BFormGroup label="Categories de vehicules" description="Separez les categories par une virgule.">
                  <BFormInput v-model="vehicleCategoriesText" />
                </BFormGroup>
              </BCol>
              <BCol md="4">
                <BFormCheckbox v-model="gowash.enableVerification" switch>Activer la verification</BFormCheckbox>
              </BCol>
              <BCol md="4">
                <BFormCheckbox v-model="gowash.isMaintenance" switch>Mode maintenance</BFormCheckbox>
              </BCol>
              <BCol md="4">
                <BFormCheckbox v-model="gowash.liveLocationUseDistanceThreshold" switch>Seuil de distance en direct
                </BFormCheckbox>
              </BCol>
              <BCol md="4">
                <BFormGroup label="Visibilite Pro">
                  <BFormInput v-model.number="gowash.allowVisiblePro" type="number" min="0" />
                </BFormGroup>
              </BCol>
            </BRow>
            <div class="mt-4 text-end">
              <BButton variant="primary" :disabled="isLoading || savingSection !== null" @click="saveTab('gowash')">
                <Icon icon="save" class="me-1" />
                {{ savingSection === 'gowash' ? 'Sauvegarde...' : 'Sauvegarder' }}
              </BButton>
            </div>
          </section>
        </BTab>

        <BTab title="Textes Application">
          <TextsSettings />
        </BTab>
      </BTabs>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { BAlert, BButton, BCard, BCardBody, BCardHeader, BCol, BFormCheckbox, BFormFile, BFormGroup, BFormInput, BFormTextarea, BRow, BSpinner, BTab, BTabs } from 'bootstrap-vue-next'
import Icon from '~/components/wrappers/Icon.vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import NotificationFields from './NotificationFields.vue'
import TextsSettings from './TextsSettings.vue'

import { getBannerSettings, getGoWashSettings, getNotificationSettings, getVersioningSettings, saveBannerSettings, saveGoWashSettings, saveNotificationSettings, saveVersioningSettings, type GoWashConfig, type VersioningConfig } from '~/services/settings.service'
import type { OneSignalNotifConfig } from '~/types/notif-config'

const versioningDefaults: VersioningConfig = { androidCodeClient: 3, androidCodePro: 8, androidVersionClient: '1.0.0', androidVersionPro: '1.0.0', android_store_url: 'https://play.google.com/store/apps/details?id=com.gowash.client', android_store_urlPro: 'https://play.google.com/store/apps/details?id=com.gowash.pro', appleVersionClient: '1.0.0', appleVersionPro: '1.0.0', ios_store_url: 'https://applestore.com/', ios_store_urlPro: 'https://applestore.com/', message: 'Une nouvelle version de l’application est disponible.\nNous vous recommandons de mettre a jour maintenant pour profiter des dernieres ameliorations.', needUpdate: true, title: 'Mise a jour requise' }
const gowashDefaults: GoWashConfig = { allowVisiblePro: 0, appName: 'GoWash', devise: 'EUR', enableVerification: true, isMaintenance: false, linkPayment: 'https://go-wash.fr/', liveLocationUseDistanceThreshold: true, paymentLink: 'https://go-wash.fr/payment', vehicleCategories: ['Compact', 'Berline', 'Suv'] }
const notificationDefaults = (appId: string): OneSignalNotifConfig => ({ oneSignalAndroidIcon: 'ic_stat_onesignal_default', oneSignalAndroidSound: 'default', oneSignalApiKey: '', oneSignalAppId: appId, oneSignalBaseUrl: 'https://api.onesignal.com/notifications', oneSignalIosSound: 'default', oneSignalLogoLink1: '', oneSignalLogoLink2: '' })

type SectionKey = 'banner' | 'versioning' | 'proNotif' | 'clientNotif' | 'gowash'

const bannerText = ref('10% de remise immediate pour tout parrainage')
const shopOfferBackgroundImageUrl = ref('')
const shopOfferBackgroundImageFile = ref<File | null>(null)
const versioning = ref({ ...versioningDefaults })
const gowash = ref({ ...gowashDefaults })
const proNotifications = ref(notificationDefaults('c24ebb53-259b-487f-a8d6-62c3f8637c89'))
const clientNotifications = ref(notificationDefaults('e0e8e00e-670d-4232-8b29-5350cbe136c4'))
const isLoading = ref(true)
const savingSection = ref<SectionKey | null>(null)
const successMessage = ref('')
const errorMessage = ref('')
const vehicleCategoriesText = computed({ get: () => gowash.value.vehicleCategories.join(', '), set: (value: string) => { gowash.value.vehicleCategories = value.split(',').map((item) => item.trim()).filter(Boolean) } })

const loadSettings = async () => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const [banner, savedVersioning, savedGowash, pro, client] = await Promise.all([getBannerSettings({ bannerText: bannerText.value, shopOfferBackgroundImageUrl: shopOfferBackgroundImageUrl.value }), getVersioningSettings(versioningDefaults), getGoWashSettings(gowashDefaults), getNotificationSettings('pro', proNotifications.value), getNotificationSettings('client', clientNotifications.value)])
    bannerText.value = banner.bannerText
    shopOfferBackgroundImageUrl.value = banner.shopOfferBackgroundImageUrl || ''
    versioning.value = savedVersioning
    gowash.value = savedGowash
    proNotifications.value = pro
    clientNotifications.value = client
  } catch (error) {
    errorMessage.value = 'Impossible de charger les parametres Firestore.'
  } finally { isLoading.value = false }
}

const saveTab = async (section: SectionKey) => {
  savingSection.value = section
  successMessage.value = ''
  errorMessage.value = ''
  try {
    if (section === 'banner') {
      const savedBanner = await saveBannerSettings({
        bannerText: bannerText.value,
        shopOfferBackgroundImageUrl: shopOfferBackgroundImageUrl.value,
        shopOfferBackgroundImageFile: shopOfferBackgroundImageFile.value,
      })
      shopOfferBackgroundImageUrl.value = savedBanner.shopOfferBackgroundImageUrl || ''
      shopOfferBackgroundImageFile.value = null
      successMessage.value = 'Les parametres de la banniere ont ete sauvegardes.'
    } else if (section === 'versioning') {
      await saveVersioningSettings(versioning.value)
      successMessage.value = 'Les parametres de versioning ont ete sauvegardes.'
    } else if (section === 'proNotif') {
      await saveNotificationSettings('pro', proNotifications.value)
      successMessage.value = 'Les notifications GoWASH Pro ont ete sauvegardees.'
    } else if (section === 'clientNotif') {
      await saveNotificationSettings('client', clientNotifications.value)
      successMessage.value = 'Les notifications GoWASH Client ont ete sauvegardees.'
    } else if (section === 'gowash') {
      await saveGoWashSettings(gowash.value)
      successMessage.value = 'La configuration GoWASH a ete sauvegardee.'
    }
  } catch (error) {
    errorMessage.value = 'Impossible de sauvegarder les parametres. Verifiez vos droits Firestore.'
  } finally {
    savingSection.value = null
  }
}

onMounted(loadSettings)
</script>

<style scoped>
.settings-card {
  max-width: 1180px;
}

.settings-tabs :deep(.nav-link) {
  color: var(--bs-secondary-color);
  font-weight: 600;
  padding: .7rem 1rem;
}

.settings-tabs :deep(.nav-link.active) {
  color: var(--bs-primary);
}

.form-section {
  max-width: 980px;
}

.banner-image-preview {
  border-radius: 8px;
  max-height: 180px;
  max-width: 100%;
  object-fit: cover;
}

.section-heading {
  display: flex;
  align-items: center;
  gap: .875rem;
  margin-bottom: 1.75rem;
}

.section-icon {
  width: 2.5rem;
  height: 2.5rem;
  display: grid;
  place-items: center;
  border-radius: .375rem;
  font-size: 1.2rem;
}
</style>
