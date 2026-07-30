<template>
  <PageBreadcrumb title="Codes Promo" subtitle="Ecommerce" />

  <BAlert v-if="successMessage" variant="success" dismissible show @closed="successMessage = null">
    {{ successMessage }}
  </BAlert>

  <BRow class="mb-3">
    <BCol md="6">
      <BCard class="text-center bg-primary-subtle text-primary">
        <BCardBody>
          <h4 class="mb-1 text-primary">{{ activePromosCount }}</h4>
          <p class="mb-0 fw-semibold fs-14">Promos Actives</p>
        </BCardBody>
      </BCard>
    </BCol>
    <BCol md="6">
      <BCard class="text-center bg-danger-subtle text-danger">
        <BCardBody>
          <h4 class="mb-1 text-danger">{{ inactivePromosCount }}</h4>
          <p class="mb-0 fw-semibold fs-14">Promos Inactives</p>
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>

  <BRow>
    <BCol xs="12">
      <BCard no-body>
        <BCardHeader class="border-light justify-content-between">
          <div class="d-flex gap-2">
            <div class="app-search">
              <input type="search" class="form-control" placeholder="Rechercher un code..." v-model="searchQuery" />
            </div>
          </div>

          <div class="d-flex gap-1">
            <RouterLink to="/apps/ecommerce/promo-add" class="btn btn-primary">
              Ajouter Promo
            </RouterLink>
          </div>
        </BCardHeader>

        <BAlert v-if="error" variant="danger" show class="m-3 mb-0">{{ error }}</BAlert>

        <BTable
          show-empty
          :busy="loading"
          empty-text="Aucun code promo trouvé."
          thead-class="bg-light align-middle bg-opacity-25 thead-sm"
          hover
          :fields="fields"
          :items="filteredPromos"
          responsive
          class="table table-custom table-nowrap table-centered mb-0 w-100"
        >
          <template #table-busy>
            <div class="text-center text-muted my-4">
              <BSpinner small class="me-2" />
              Chargement des promos...
            </div>
          </template>

          <template #cell(code)="data">
            <div class="d-flex align-items-center">
              <h6 class="mb-0">{{ data.item.code }}</h6>
            </div>
          </template>

          <template #cell(discount)="data">
            <span v-if="data.item.discountType === 'percentage'">{{ data.item.discountValue }}%</span>
            <span v-else>{{ data.item.discountValue }} €</span>
          </template>

          <template #cell(isActive)="data">
            <BBadge :variant="data.item.isActive ? 'success' : 'danger'" class="fs-12">
              {{ data.item.isActive ? 'Actif' : 'Inactif' }}
            </BBadge>
          </template>

          <template #cell(expiresAt)="data">
            <span v-if="data.item.expiresAt">{{ formatDate(data.item.expiresAt) }}</span>
            <span v-else class="text-muted">Aucune expiration</span>
          </template>

          <template #cell(action)="data">
            <div class="d-flex gap-2 justify-content-center">
              <BButton
                :variant="data.item.isActive ? 'soft-warning' : 'soft-success'"
                size="sm"
                @click="toggleStatus(data.item)"
              >
                {{ data.item.isActive ? 'Désactiver' : 'Activer' }}
              </BButton>
              <RouterLink :to="`/apps/ecommerce/promo-edit/${data.item.id}`" class="btn btn-soft-primary btn-sm">
                Modifier
              </RouterLink>
              <BButton variant="soft-danger" size="sm" @click="handleDelete(data.item)">
                Supprimer
              </BButton>
            </div>
          </template>
        </BTable>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Promo } from '~/types/promo'
import { getPromos, togglePromoStatus, deletePromo } from '~/services/promos.service'

const promos = ref<Promo[]>([])

const loading = ref(false)
const error = ref<string | null>(null)
const successMessage = ref<string | null>(null)
const searchQuery = ref('')

const fields = [
  { key: 'code', label: 'Code', sortable: true },
  { key: 'discount', label: 'Réduction' },
  { key: 'isActive', label: 'Statut' },
  { key: 'userMax', label: 'Max Utilisations' },
  { key: 'minimumOrderAmount', label: 'Montant Min (€)' },
  { key: 'expiresAt', label: 'Expiration' },
  { key: 'action', label: 'Action', class: 'text-center' }
]

const activePromosCount = computed(() => promos.value.filter((p) => p.isActive).length)
const inactivePromosCount = computed(() => promos.value.filter((p) => !p.isActive).length)

const filteredPromos = computed(() => {
  if (!searchQuery.value) return promos.value
  return promos.value.filter((p) => p.code.toLowerCase().includes(searchQuery.value.toLowerCase()))
})

const formatDate = (dateString: string | Date) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const toggleStatus = async (promo: Promo) => {
  try {
    const newStatus = !promo.isActive
    await togglePromoStatus(promo.id!, newStatus)
    promo.isActive = newStatus
    successMessage.value = `Promo "${promo.code}" ${newStatus ? 'activée' : 'désactivée'} avec succès.`
  } catch (e) {
    error.value = 'Erreur lors du changement de statut.'
    console.error(e)
  } finally {
    setTimeout(() => {
      successMessage.value = null
      error.value = null
    }, 3000)
  }
}

const handleDelete = async (promo: Promo) => {
  if (!confirm(`Supprimer le code promo "${promo.code}" ?`)) return
  try {
    await deletePromo(promo.id!)
    promos.value = promos.value.filter(p => p.id !== promo.id)
    successMessage.value = `Promo "${promo.code}" supprimée.`
  } catch (e) {
    error.value = 'Erreur lors de la suppression.'
    console.error(e)
  } finally {
    setTimeout(() => {
      successMessage.value = null
      error.value = null
    }, 3000)
  }
}

onMounted(async () => {
  loading.value = true
  try {
    promos.value = await getPromos()
  } catch (e) {
    error.value = 'Impossible de charger les codes promo.'
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>
