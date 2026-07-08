<template>
  <BCard no-body>
    <BCardHeader class="border-light justify-content-between">
      <div class="d-flex gap-2">
        <div class="app-search">
          <BFormInput v-model="searchQuery" type="search" placeholder="Rechercher un laveur..." />
          <Icon icon="search" class="app-search-icon text-muted" />
        </div>
        <BButton v-if="selectedRows.length" variant="danger" @click="deleteSelected">Supprimer</BButton>
      </div>

      <div class="d-flex align-items-center gap-2">
        <span class="me-2 fw-semibold">Filtrer par:</span>

        <div class="app-search">
          <BFormSelect v-model="filterAvailable" class="form-control my-1 my-md-0">
            <option value="">Disponibilité</option>
            <option value="On">Disponible</option>
            <option value="Off">Indisponible</option>
          </BFormSelect>
          <Icon icon="wifi" class="app-search-icon text-muted" />
        </div>

        <div class="app-search">
          <BFormSelect v-model="filterVerified" class="form-control my-1 my-md-0">
            <option value="">Statut</option>
            <option value="verified">Vérifié</option>
            <option value="not-verified">Non vérifié</option>
          </BFormSelect>
          <Icon icon="shield-check" class="app-search-icon text-muted" />
        </div>

        <div class="app-search">
          <BFormSelect v-model="filterPlatform" class="form-control my-1 my-md-0">
            <option value="">Plateforme</option>
            <option value="pro">Pro</option>
            <option value="standard">Standard</option>
          </BFormSelect>
          <Icon icon="layers" class="app-search-icon text-muted" />
        </div>

        <div>
          <BFormSelect v-model="perPage" :options="perPageOptions" class="form-control my-1 my-md-0" />
        </div>
      </div>
    </BCardHeader>

    <BTable
      hover
      responsive
      show-empty
      empty-text="Aucun laveur trouvé."
      :items="filteredWashers"
      :fields="fields"
      v-model:selected-rows="selectedRows"
      :current-page="currentPage"
      :per-page="perPage"
      class="table table-custom table-centered table-select table-hover w-100 mb-0"
      thead-class="bg-light bg-opacity-25 thead-sm"
      thead-tr-class="text-uppercase fs-xxs"
    >
      <template #head()="data">
        <span class="text-uppercase fs-xxs">{{ data.label }}</span>
      </template>

      <template #head(select)>
        <input class="form-check-input fs-14" type="checkbox" :checked="allSelected" :indeterminate="isIndeterminate" @change="toggleSelectAll" />
      </template>

      <template #cell(select)="{ item }">
        <input class="form-check-input fs-14" type="checkbox" :checked="selectedRows.includes(item)" @change="() => toggleRow(item)" />
      </template>

      <!-- Name + Logo -->
      <template #cell(name)="{ item }">
        <div class="d-flex align-items-center gap-2">
          <div class="washer-avatar">
            <img v-if="item.laveurProfile?.logoUrl" :src="item.laveurProfile.logoUrl" class="rounded-circle avatar-sm object-fit-cover" alt="logo" />
            <div v-else class="avatar avatar-sm">
              <div class="avatar-title bg-primary-subtle text-primary rounded-circle">
                {{ item.fullName?.charAt(0) || 'L' }}
              </div>
            </div>
          </div>
          <div>
            <h5 class="mb-0 lh-base fs-base">{{ item.laveurProfile?.businessName || item.fullName || '—' }}</h5>
            <p class="text-muted fs-xs mb-0">{{ item.email || '—' }}</p>
          </div>
        </div>
      </template>

      <!-- Phone -->
      <template #cell(phone)="{ item }">
        <span>{{ item.phoneNumber || '—' }}</span>
      </template>

      <!-- Location -->
      <template #cell(location)="{ item }">
        <span v-if="item.location?.address" class="d-flex align-items-center gap-1 text-muted fs-xs">
          <Icon icon="map-pin" class="fs-xs text-danger" />
          {{ item.location.address }}
        </span>
        <span v-else class="text-muted">—</span>
      </template>

      <!-- Rating -->
      <template #cell(rating)="{ item }">
        <div class="d-flex align-items-center gap-1">
          <Icon icon="star" class="fs-xs text-warning" />
          <span class="fw-semibold">{{ item.laveurData?.rating?.toFixed(1) || '0.0' }}</span>
          <span class="text-muted fs-xs">({{ item.laveurData?.completedJobs || 0 }} jobs)</span>
        </div>
      </template>

      <!-- Availability -->
      <template #cell(availability)="{ item }">
        <span
          class="badge"
          :class="item.laveurData?.isAvailable === 'On' ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'"
        >
          <span class="availability-dot me-1" :class="item.laveurData?.isAvailable === 'On' ? 'dot-on' : 'dot-off'"></span>
          {{ item.laveurData?.isAvailable === 'On' ? 'Disponible' : 'Indisponible' }}
        </span>
      </template>

      <!-- Platform -->
      <template #cell(platform)="{ item }">
        <span class="badge" :class="item.platform === 'pro' ? 'bg-primary-subtle text-primary' : 'bg-light text-dark'">
          {{ item.platform || '—' }}
        </span>
      </template>

      <!-- Status (verified / banned) -->
      <template #cell(status)="{ item }">
        <span v-if="item.isBanned" class="badge bg-danger-subtle text-danger badge-label">
          <Icon icon="ban" class="fs-xs me-1" /> Banni
        </span>
        <span v-else-if="item.isVerified" class="badge bg-success-subtle text-success badge-label">
          <Icon icon="circle-check" class="fs-xs me-1" /> Vérifié
        </span>
        <span v-else class="badge bg-warning-subtle text-warning badge-label">
          <Icon icon="clock" class="fs-xs me-1" /> En attente
        </span>
      </template>

      <!-- Services count -->
      <template #cell(services)="{ item }">
        <span class="badge bg-info-subtle text-info">{{ item.laveurData?.services?.length || 0 }} services</span>
      </template>

      <!-- Actions -->
      <template #cell(actions)="{ item }">
        <div class="d-flex align-items-center justify-content-center gap-1">
          <RouterLink :to="`/apps/crm/washers/${item.id}`" class="btn btn-default btn-icon btn-sm rounded-circle">
            <Icon icon="eye" class="fs-lg" />
          </RouterLink>
          <BButton size="sm" class="btn-default btn-icon rounded-circle">
            <Icon icon="square-pen" class="fs-lg" />
          </BButton>
          <BButton size="sm" class="btn-default btn-icon rounded-circle" @click="deleteRow(item)">
            <Icon icon="trash-2" class="fs-lg" />
          </BButton>
        </div>
      </template>
    </BTable>

    <BCardFooter class="border-0">
      <TablePagination v-model:currentPage="currentPage" :per-page="perPage" :total-items="filteredWashers.length" label="laveurs" />
    </BCardFooter>
  </BCard>
</template>


<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import TablePagination from '~/components/TablePagination.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { subscribeToWashers } from '~/services/washers.service'
import type { Washer } from '~/types/washer'

const searchQuery = ref('')
const filterVerified = ref('')
const filterAvailable = ref('')
const filterPlatform = ref('')
const perPage = ref(8)
const perPageOptions = [5, 8, 10, 15, 20]
const currentPage = ref(1)
const selectedRows = ref<Washer[]>([])
const washersList = ref<Washer[]>([])

let unsubscribe: (() => void) | null = null

onMounted(() => {
  unsubscribe = subscribeToWashers((data) => {
    washersList.value = data
  })
})

onUnmounted(() => {
  if (unsubscribe) unsubscribe()
})

const fields = [
  { key: 'select', label: '', thStyle: { width: '1%' } },
  { key: 'name', label: 'Laveur', sortable: true },
  { key: 'phone', label: 'Téléphone' },
  // { key: 'location', label: 'Adresse' },
  { key: 'rating', label: 'Note', sortable: true },
  { key: 'availability', label: 'Disponibilité', sortable: true },
  { key: 'platform', label: 'Plateforme', sortable: true },
  { key: 'services', label: 'Services' },
  { key: 'status', label: 'Statut', sortable: true },
  { key: 'actions', label: 'Actions', thClass: 'text-center' },
]

const filteredWashers = computed(() => {
  return washersList.value.filter((item) => {
    const q = searchQuery.value.toLowerCase()
    const matchSearch =
      !q ||
      (item.fullName || '').toLowerCase().includes(q) ||
      (item.email || '').toLowerCase().includes(q) ||
      (item.laveurProfile?.businessName || '').toLowerCase().includes(q) ||
      (item.phoneNumber || '').includes(q)

    const matchAvailable =
      !filterAvailable.value || item.laveurData?.isAvailable === filterAvailable.value

    const matchVerified =
      !filterVerified.value ||
      (filterVerified.value === 'verified' && item.isVerified && !item.isBanned) ||
      (filterVerified.value === 'not-verified' && !item.isVerified)

    const matchPlatform =
      !filterPlatform.value || item.platform === filterPlatform.value

    return matchSearch && matchAvailable && matchVerified && matchPlatform
  })
})

const allSelected = computed(
  () => selectedRows.value.length === filteredWashers.value.length && filteredWashers.value.length > 0
)
const isIndeterminate = computed(() => selectedRows.value.length > 0 && !allSelected.value)

const toggleRow = (row: Washer) => {
  const exists = selectedRows.value.includes(row)
  if (exists) selectedRows.value = selectedRows.value.filter((r) => r !== row)
  else selectedRows.value.push(row)
}

const toggleSelectAll = () => {
  selectedRows.value = allSelected.value ? [] : [...filteredWashers.value]
}

const deleteRow = (item: Washer) => {
  washersList.value = washersList.value.filter((w) => w.id !== item.id)
}

const deleteSelected = () => {
  const selectedIds = new Set(selectedRows.value.map((r) => r.id))
  washersList.value = washersList.value.filter((w) => !selectedIds.has(w.id))
  selectedRows.value = []
}
</script>

<style scoped>
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
.gallery-item {
  height: 90px;
}
.availability-dot {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  vertical-align: middle;
}
.dot-on {
  background: #22c55e;
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.25);
  animation: pulse-green 1.5s infinite;
}
.dot-off {
  background: #94a3b8;
}
@keyframes pulse-green {
  0%, 100% { box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.25); }
  50% { box-shadow: 0 0 0 5px rgba(34, 197, 94, 0.1); }
}
</style>
