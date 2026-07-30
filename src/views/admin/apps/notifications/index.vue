<!-- eslint-disable -->
<template>
  <PageBreadcrumb title="Notifications" subtitle="Communication" />

  <BAlert v-if="successMessage" variant="success" dismissible show @closed="successMessage = null">
    {{ successMessage }}
  </BAlert>
  <BAlert v-if="errorMessage" variant="danger" dismissible show @closed="errorMessage = null">
    {{ errorMessage }}
  </BAlert>

  <!-- Send Notification Forms -->
  <BRow class="mb-4">
    <BCol lg="6" class="mb-3 mb-lg-0">
      <SendClientNotificationForm
        :recipients="clientOptions"
        @sent="handleNotificationSent"
        @error="handleNotificationError"
      />
    </BCol>
    <BCol lg="6">
      <SendProNotificationForm
        :recipients="proOptions"
        @sent="handleNotificationSent"
        @error="handleNotificationError"
      />
    </BCol>
  </BRow>

  <!-- Stats Cards -->
  <BRow class="mb-3">
    <BCol md="4">
      <BCard class="text-center bg-primary-subtle text-primary">
        <BCardBody>
          <h4 class="mb-1 text-primary">{{ totalNotifs }}</h4>
          <p class="mb-0 fw-semibold fs-14">Total envoyées</p>
        </BCardBody>
      </BCard>
    </BCol>
    <BCol md="4">
      <BCard class="text-center bg-success-subtle text-success">
        <BCardBody>
          <h4 class="mb-1 text-success">{{ viewedCount }}</h4>
          <p class="mb-0 fw-semibold fs-14">Vues</p>
        </BCardBody>
      </BCard>
    </BCol>
    <BCol md="4">
      <BCard class="text-center bg-warning-subtle text-warning">
        <BCardBody>
          <h4 class="mb-1 text-warning">{{ unviewedCount }}</h4>
          <p class="mb-0 fw-semibold fs-14">Non vues</p>
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>

  <!-- Notifications History -->
  <BRow>
    <BCol xs="12">
      <BCard no-body>
        <BCardHeader class="border-light justify-content-between">
          <h5 class="card-title mb-0">Historique des notifications</h5>
          <div class="d-flex gap-2">
            <div class="app-search">
              <input type="search" class="form-control" placeholder="Rechercher..." v-model="searchQuery" />
            </div>
            <BFormSelect v-model="filterAudience" class="form-control" style="width: auto">
              <option value="">Toutes</option>
              <option value="client">Clients</option>
              <option value="pro">Pros</option>
              <option value="all">Tout le monde</option>
            </BFormSelect>
          </div>
        </BCardHeader>

        <BTable show-empty :busy="loading" empty-text="Aucune notification envoyée."
          thead-class="bg-light align-middle bg-opacity-25 thead-sm" hover :fields="fields"
          :items="filteredNotifications" :per-page="perPage" :current-page="currentPage" responsive
          class="table table-custom table-nowrap table-centered mb-0 w-100">
          <template #table-busy>
            <div class="text-center text-muted my-4">
              <BSpinner small class="me-2" />
              Chargement...
            </div>
          </template>

          <template #cell(title)="data">
            <div>
              <h6 class="mb-0">{{ data.item.title }}</h6>
              <p class="text-muted fs-xs mb-0 text-truncate" style="max-width: 300px">
                {{ data.item.message }}
              </p>
            </div>
          </template>

          <template #cell(forUsers)="data">
            <BBadge :variant="audienceBadge(data.item.forUsers)" class="fs-12">
              {{ audienceLabel(data.item.forUsers) }}
            </BBadge>
          </template>

          <template #cell(isViewed)="data">
            <BBadge :variant="data.item.isViewed ? 'success' : 'warning'" class="fs-12">
              {{ data.item.isViewed ? 'Vue' : 'Non vue' }}
            </BBadge>
          </template>

          <template #cell(sentDate)="data">
            <span>{{ formatDate(data.item.sentDate) }}</span>
          </template>

          <template #cell(type)="data">
            <span class="badge bg-light text-dark fs-12">{{ data.item.type || 'général' }}</span>
          </template>
        </BTable>

        <BCardFooter v-if="filteredNotifications.length > perPage" class="border-0">
          <BPagination v-model="currentPage" :total-rows="filteredNotifications.length" :per-page="perPage"
            align="center" size="sm" />
        </BCardFooter>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { PushNotification } from '~/types/push-notification'
import { getNotifications } from '~/services/push-notifications.service'
import { getClients } from '~/services/clients.service'
import { getWashers } from '~/services/washers.service'
import SendClientNotificationForm from './components/SendClientNotificationForm.vue'
import SendProNotificationForm from './components/SendProNotificationForm.vue'

const loading = ref(false)
const successMessage = ref<string | null>(null)
const errorMessage = ref<string | null>(null)
const searchQuery = ref('')
const filterAudience = ref('')
const currentPage = ref(1)
const perPage = ref(10)

const notifications = ref<PushNotification[]>([])
const clientOptions = ref<{ value: string; label: string }[]>([])
const proOptions = ref<{ value: string; label: string }[]>([])

const fields = [
  { key: 'title', label: 'Titre / Message', sortable: true },
  { key: 'forUsers', label: 'Audience' },
  { key: 'type', label: 'Type' },
  { key: 'isViewed', label: 'Statut' },
  { key: 'sentDate', label: 'Date', sortable: true },
]

const totalNotifs = computed(() => notifications.value.length)
const viewedCount = computed(() => notifications.value.filter((n) => n.isViewed).length)
const unviewedCount = computed(() => notifications.value.filter((n) => !n.isViewed).length)

const filteredNotifications = computed(() => {
  return notifications.value.filter((n) => {
    const matchSearch =
      !searchQuery.value ||
      n.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      n.message.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchAudience = !filterAudience.value || n.forUsers === filterAudience.value

    return matchSearch && matchAudience
  })
})

const formatDate = (dateVal: unknown) => {
  if (!dateVal) return '-'
  let d: Date
  if (typeof dateVal === 'string') d = new Date(dateVal)
  else if (dateVal instanceof Date) d = dateVal
  else if (
    typeof dateVal === 'object' &&
    'toDate' in dateVal &&
    typeof (dateVal as any).toDate === 'function'
  )
    d = (dateVal as any).toDate()
  else return '-'
  return isNaN(d.getTime())
    ? '-'
    : d.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
}

const audienceLabel = (audience?: string) => {
  if (audience === 'client') return 'Clients'
  if (audience === 'pro') return 'Pros'
  return 'Tous'
}

const audienceBadge = (audience?: string) => {
  if (audience === 'client') return 'info'
  if (audience === 'pro') return 'primary'
  return 'dark'
}

const clearMessagesLater = () => {
  setTimeout(() => {
    successMessage.value = null
    errorMessage.value = null
  }, 4000)
}

const handleNotificationSent = async (message: string) => {
  errorMessage.value = null
  successMessage.value = message
  notifications.value = await getNotifications()
  clearMessagesLater()
}

const handleNotificationError = (message: string) => {
  successMessage.value = null
  errorMessage.value = message
  clearMessagesLater()
}

onMounted(async () => {
  loading.value = true
  try {
    const [notifs, clients, washers] = await Promise.all([
      getNotifications(),
      getClients(),
      getWashers(),
    ])
    notifications.value = notifs

    clientOptions.value = clients.map((c) => ({
      value: c.id,
      label: `${c.fullName || c.email || c.id} (Client)`,
    }))

    proOptions.value = washers
      .filter((w) => w.isVerified === true)
      .map((w) => ({
        value: w.id,
        label: `${w.fullName || w.laveurProfile?.businessName || w.id} (Laveur Pro)`,
      }))
  } catch (e) {
    errorMessage.value = 'Impossible de charger les notifications.'
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>
