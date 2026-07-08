<template>
  <BCard no-body>
    <BCardHeader class="border-light justify-content-between">
      <div class="d-flex gap-2">
        <div class="app-search">
          <BFormInput v-model="searchQuery" type="search" placeholder="Rechercher un client..." />
          <Icon icon="search" class="app-search-icon text-muted" />
        </div>

        <BButton v-if="selectedRows.length" variant="danger" @click="deleteSelected"> Supprimer </BButton>
      </div>

      <div class="d-flex align-items-center gap-2">
        <span class="me-2 fw-semibold">Filtrer par:</span>

        <div class="app-search">
          <BFormSelect v-model="filterCity" class="form-control my-1 my-md-0">
            <option value="">Ville</option>
            <option v-for="c in uniqueCities" :key="c" :value="c">{{ c }}</option>
          </BFormSelect>
          <Icon icon="map-pin" class="app-search-icon text-muted" />
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
          <BFormSelect v-model="filterGender" class="form-control my-1 my-md-0">
            <option value="">Genre</option>
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
          </BFormSelect>
          <Icon icon="users" class="app-search-icon text-muted" />
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
      empty-text="Aucun client trouvé."
      :items="filteredClients"
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

      <template #cell(name)="{ item }">
        <div class="d-flex align-items-center gap-2">
          <div class="avatar avatar-sm">
            <div class="avatar-title bg-primary-subtle text-primary rounded-circle">
              {{ item.name?.charAt(0) || 'C' }}
            </div>
          </div>
          <div>
            <h5 class="mb-0 lh-base fs-base">{{ item.fullName || '--' }}</h5>
            <p class="text-muted fs-xs mb-0">{{ item.email || '---' }}</p>
          </div>
        </div>
      </template>

      <template #cell(phone)="{ item }">
        <span>{{ item.phoneNumber || '-' }}</span>
      </template>

      <template #cell(city)="{ item }">
        <span class="badge p-1 text-bg-light fs-sm">
          <Icon icon="map-pin" class="me-1 fs-xs" />
          {{ item.city || '-' }}
        </span>
      </template>

      <template #cell(gender)="{ item }">
        <span class="badge" :class="item.gender === 'Homme' ? 'bg-info-subtle text-info' : 'bg-pink-subtle text-pink'">
          {{ item.gender || '-' }}
        </span>
      </template>

      <template #cell(joined)="{ item }">
        {{ formatDate(item.createdAt) }}
      </template>

      <template #cell(status)="{ item }">
        <span v-if="item.isVerified || item.emailVerified" class="badge bg-success-subtle text-success badge-label">
          <Icon icon="circle-check" class="fs-xs me-1" /> Vérifié
        </span>
        <span v-else class="badge bg-warning-subtle text-warning badge-label">
          <Icon icon="clock" class="fs-xs me-1" /> En attente
        </span>
      </template>

      <template #cell(lastLogin)="{ item }">
        <span class="text-muted fs-xs">{{ formatDate(item.lastLogin) }}</span>
      </template>

      <template #cell(actions)="{ item }">
        <div class="d-flex align-items-center justify-content-center gap-1">
          <BButton size="sm" class="btn-default btn-icon rounded-circle" @click="router.push(`/apps/crm/customers/${item.id}`)">
            <Icon icon="eye" class="fs-lg" />
          </BButton>
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
      <TablePagination v-model:currentPage="currentPage" :per-page="perPage" :total-items="filteredClients.length" label="clients" />
    </BCardFooter>
  </BCard>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import TablePagination from '~/components/TablePagination.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { subscribeToClients } from '~/services/clients.service'
import type { Client } from '~/types/client'

const router = useRouter()

const searchQuery = ref('')
const filterVerified = ref('')
const filterCity = ref('')
const filterGender = ref('')
const perPage = ref(8)
const perPageOptions = [5, 8, 10, 15, 20]

const currentPage = ref(1)
const selectedRows = ref<Client[]>([])
const clientsList = ref<Client[]>([])

let unsubscribe: (() => void) | null = null

onMounted(() => {
  unsubscribe = subscribeToClients((data) => {
    clientsList.value = data
  })
})

onUnmounted(() => {
  if (unsubscribe) unsubscribe()
})

const fields = [
  { key: 'select', label: '', thStyle: { width: '1%' } },
  { key: 'name', label: 'Nom du client', sortable: true },
  { key: 'phone', label: 'Téléphone', sortable: true },
  { key: 'city', label: 'Ville', sortable: true },
  { key: 'gender', label: 'Genre', sortable: true },
  { key: 'joined', label: 'Inscription', sortable: true },
  { key: 'status', label: 'Statut', sortable: true },
  { key: 'lastLogin', label: 'Dernière connexion', sortable: true },
  { key: 'actions', label: 'Actions', thClass: 'text-center' },
]

const uniqueCities = computed(() => {
  const cities = clientsList.value.map((c) => c.city).filter(Boolean) as string[]
  return [...new Set(cities)].sort()
})

const filteredClients = computed(() => {
  return clientsList.value.filter((item) => {
    const matchSearch =
      !searchQuery.value ||
      (item.name || '').toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (item.email || '').toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (item.phoneNumber || '').includes(searchQuery.value)

    const matchCity = !filterCity.value || item.city === filterCity.value

    const matchVerified =
      !filterVerified.value ||
      (filterVerified.value === 'verified' && (item.isVerified || item.emailVerified)) ||
      (filterVerified.value === 'not-verified' && !item.isVerified && !item.emailVerified)

    const matchGender = !filterGender.value || item.gender === filterGender.value

    return matchSearch && matchCity && matchVerified && matchGender
  })
})

const formatDate = (dateVal: unknown) => {
  if (!dateVal) return '-'
  let d: Date
  if (typeof dateVal === 'string') {
    d = new Date(dateVal)
  } else if (dateVal instanceof Date) {
    d = dateVal
  } else if (typeof dateVal === 'object' && 'toDate' in dateVal && typeof dateVal.toDate === 'function') {
    d = dateVal.toDate()
  } else {
    return '-'
  }
  return isNaN(d.getTime()) ? '-' : d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
}

const allSelected = computed(() => selectedRows.value.length === filteredClients.value.length && filteredClients.value.length > 0)
const isIndeterminate = computed(() => selectedRows.value.length > 0 && !allSelected.value)

const toggleRow = (row: Client) => {
  const exists = selectedRows.value.includes(row)
  if (exists) selectedRows.value = selectedRows.value.filter((r) => r !== row)
  else selectedRows.value.push(row)
}

const toggleSelectAll = () => {
  selectedRows.value = allSelected.value ? [] : [...filteredClients.value]
}

const deleteRow = (item: Client) => {
  clientsList.value = clientsList.value.filter((c) => c.id !== item.id)
}

const deleteSelected = () => {
  const selectedIds = new Set(selectedRows.value.map((r) => r.id))
  clientsList.value = clientsList.value.filter((c) => !selectedIds.has(c.id))
  selectedRows.value = []
}
</script>
