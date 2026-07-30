<template>
  <PageBreadcrumb title="Modifier une Promo" subtitle="Ecommerce" />

  <BRow>
    <BCol xl="8" class="mx-auto">
      <BCard no-body>
        <BCardHeader class="border-light">
          <h4 class="card-title mb-0">Modifier le code promo</h4>
        </BCardHeader>
        <BCardBody>
          <div v-if="fetching" class="text-center my-4">
            <BSpinner class="me-2" />
            Chargement...
          </div>
          <BForm v-else @submit.prevent="handleSubmit">
            <BRow class="mb-3">
              <BCol md="6">
                <div class="mb-3">
                  <label class="form-label" for="promoCode">Code Promo <span class="text-danger">*</span></label>
                  <BFormInput id="promoCode" v-model="form.code" required />
                </div>
              </BCol>
              <BCol md="6">
                <div class="mb-3">
                  <label class="form-label">Statut</label>
                  <div class="form-check form-switch mt-2">
                    <input class="form-check-input" type="checkbox" id="isActive" v-model="form.isActive" />
                    <label class="form-check-label" for="isActive">Actif</label>
                  </div>
                </div>
              </BCol>
            </BRow>

            <BRow class="mb-3">
              <BCol md="6">
                <div class="mb-3">
                  <label class="form-label" for="discountType">Type de réduction <span class="text-danger">*</span></label>
                  <BFormSelect id="discountType" v-model="form.discountType" :options="discountOptions" required />
                </div>
              </BCol>
              <BCol md="6">
                <div class="mb-3">
                  <label class="form-label" for="discountValue">Valeur de la réduction <span class="text-danger">*</span></label>
                  <BFormInput id="discountValue" type="number" v-model="form.discountValue" required min="0" step="0.01" />
                </div>
              </BCol>
            </BRow>

            <BRow class="mb-3">
              <BCol md="6">
                <div class="mb-3">
                  <label class="form-label" for="minimumOrderAmount">Montant Minimum de Commande</label>
                  <BFormInput id="minimumOrderAmount" type="number" v-model="form.minimumOrderAmount" min="0" step="0.01" />
                </div>
              </BCol>
              <BCol md="6">
                <div class="mb-3">
                  <label class="form-label" for="maximumDiscountAmount">Montant Maximum de Réduction</label>
                  <BFormInput id="maximumDiscountAmount" type="number" v-model="form.maximumDiscountAmount" min="0" step="0.01" placeholder="Optionnel" />
                </div>
              </BCol>
            </BRow>

            <BRow class="mb-3">
              <BCol md="6">
                <div class="mb-3">
                  <label class="form-label" for="userMax">Utilisations Maximum (Total)</label>
                  <BFormInput id="userMax" type="number" v-model="form.userMax" min="0" />
                  <small class="text-muted">Laissez à 0 pour illimité</small>
                </div>
              </BCol>
              <BCol md="6">
                <div class="mb-3">
                  <label class="form-label" for="allowedUserId">Utilisateur Autorisé</label>
                  <Multiselect
                    v-model="selectedUser"
                    :options="userOptions"
                    track-by="value"
                    label="label"
                    placeholder="Rechercher par nom..."
                    :searchable="true"
                    :allow-empty="true"
                    select-label=""
                    deselect-label=""
                    selected-label="✓"
                    @update:modelValue="onUserSelect"
                  />
                  <small class="text-muted d-block mt-1">
                    Sélectionnez un utilisateur si ce code promo est réservé à une seule personne (Optionnel).
                  </small>
                </div>
              </BCol>
            </BRow>

            <BRow class="mb-3">
              <BCol md="6">
                <div class="mb-3">
                  <label class="form-label" for="startsAt">Date de Début</label>
                  <BFormInput id="startsAt" type="date" v-model="form.startsAt" />
                </div>
              </BCol>
              <BCol md="6">
                <div class="mb-3">
                  <label class="form-label" for="expiresAt">Date d'Expiration</label>
                  <BFormInput id="expiresAt" type="date" v-model="form.expiresAt" />
                </div>
              </BCol>
            </BRow>

            <div class="d-flex justify-content-end gap-2 mt-4">
              <RouterLink to="/apps/ecommerce/promos" class="btn btn-light">Annuler</RouterLink>
              <BButton type="submit" variant="primary" :disabled="loading">
                <BSpinner v-if="loading" small class="me-2" />
                Mettre à jour
              </BButton>
            </div>
          </BForm>
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Multiselect from 'vue-multiselect'
import { PromoDiscountType } from '~/types/promo'
import type { Promo } from '~/types/promo'
import { getClients } from '~/services/clients.service'
import { getPromoById, updatePromo } from '~/services/promos.service'

const router = useRouter()
const route = useRoute()
const loading = ref(false)
const fetching = ref(true)

const discountOptions = [
  { value: PromoDiscountType.percentage, text: 'Pourcentage (%)' },
  { value: PromoDiscountType.fixed, text: 'Montant Fixe (€)' }
]

const form = ref<Partial<Promo>>({
  code: '',
  discountType: PromoDiscountType.percentage,
  discountValue: 0,
  isActive: true,
  allowedUserId: null,
  userMax: 0,
  minimumOrderAmount: 0,
  maximumDiscountAmount: null,
  startsAt: null,
  expiresAt: null
})

const userOptions = ref<{value: string, label: string}[]>([])
const selectedUser = ref<{value: string, label: string} | null>(null)

onMounted(async () => {
  try {
    const clients = await getClients()
    userOptions.value = clients.map(c => ({
      value: c.id,
      label: c.fullName || c.email || c.id
    }))
  } catch (e) {
    console.error('Could not fetch users', e)
  }

  const id = route.params.id as string
  if (id) {
    try {
      const promo = await getPromoById(id)
      if (promo) {
        form.value = { ...promo }

        // Initialize selectedUser if a user was previously selected
        if (promo.allowedUserId) {
          selectedUser.value = userOptions.value.find(u => u.value === promo.allowedUserId) || null
        }
      }
    } catch (e) {
      console.error('Could not fetch promo', e)
    }
  }
  fetching.value = false
})

const onUserSelect = (option: {value: string, label: string} | null) => {
  form.value.allowedUserId = option ? option.value : null
}

const handleSubmit = async () => {
  loading.value = true
  const id = route.params.id as string
  try {
    await updatePromo({
      id,
      code: form.value.code!,
      discountType: form.value.discountType!,
      discountValue: Number(form.value.discountValue),
      isActive: form.value.isActive ?? true,
      allowedUserId: form.value.allowedUserId ?? null,
      userMax: Number(form.value.userMax) || 0,
      minimumOrderAmount: Number(form.value.minimumOrderAmount) || 0,
      maximumDiscountAmount: form.value.maximumDiscountAmount ? Number(form.value.maximumDiscountAmount) : null,
      startsAt: form.value.startsAt || null,
      expiresAt: form.value.expiresAt || null,
    })
    router.push('/apps/ecommerce/promos')
  } catch (err) {
    console.error('Error updating promo:', err)
  } finally {
    loading.value = false
  }
}
</script>
