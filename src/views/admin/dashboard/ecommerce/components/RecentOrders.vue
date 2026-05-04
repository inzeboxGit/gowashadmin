<template>
  <BCard no-body data-table data-table-rows-per-page="7">
    <div class="card-header justify-content-between align-items-center border-dashed">
      <h4 class="card-title mb-0">Recent Orders</h4>
      <div class="d-flex gap-2">
        <RouterLink to="/apps/ecommerce/order-add" class="btn btn-sm btn-soft-secondary"> <IconifyIcon icon="tabler:plus" class="me-1" /> Add Order </RouterLink>
        <RouterLink to="/apps/ecommerce/orders" class="btn btn-sm btn-primary"> <IconifyIcon icon="tabler:shopping-cart" class="me-1" /> Orders </RouterLink>
      </div>
    </div>

    <BAlert v-if="error" variant="danger" show class="m-3 mb-0">{{ error }}</BAlert>

    <BCardBody class="p-0">
      <BTable small hover :busy="loading" show-empty empty-text="No reservations found." :fields="fields" :items="orders" :per-page="perPage" :current-page="currentPage" responsive thead-class="d-none" class="table table-centered table-custom table-nowrap mb-0">
        <template #cell(id)="{ item }">
          <div class="d-flex align-items-center">
            <div class="avatar-sm rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center me-2">
              <IconifyIcon icon="tabler:user" class="fs-lg" />
            </div>
            <div>
              <span class="text-muted fs-xs">{{ item.customerName }}</span>
              <h5 class="fs-base mb-0">
                <RouterLink to="/apps/ecommerce/orders" class="text-body">#{{ item.id }}</RouterLink>
              </h5>
            </div>
          </div>
        </template>

        <template #cell(product)="data">
          <span class="text-muted fs-xs">Reservation</span>
          <h5 class="fs-base mb-0 fw-normal">{{ data.item.packageName }}</h5>
        </template>

        <template #cell(date)="data">
          <span class="text-muted fs-xs">Date</span>
          <h5 class="fs-base mb-0 fw-normal">{{ formatDate(data.item.createdAt) }}</h5>
        </template>

        <template #cell(amount)="data">
          <span class="text-muted fs-xs">Amount</span>
          <h5 class="fs-base mb-0 fw-normal">{{ formatAmount(data.item.totalAmount) }}</h5>
        </template>

        <template #cell(statusvariant)="{ item }">
          <span class="text-muted fs-xs">Status</span>
          <h5 class="fs-base mb-0 fw-normal">
            <IconifyIcon icon="tabler:circle-filled" :class="['fs-xs', getStatusClass(item.status)]" />
            {{ toTitleCase(item.status) }}
          </h5>
        </template>

        <template #cell(actions)>
          <BDropdown :variant="null" placement="bottom-end" no-caret toggle-class="text-muted card-drop border-0 p-0">
            <template #button-content>
              <IconifyIcon icon="tabler:dots-vertical" class="fs-lg" />
            </template>
            <BDropdownItem>View Details</BDropdownItem>
            <BDropdownItem>Cancel Order</BDropdownItem>
          </BDropdown>
        </template>
      </BTable>
    </BCardBody>

    <BCardFooter>
      <TablePagination v-model:currentPage="currentPage" :per-page="perPage" :total-items="totalItems" label="orders" />
    </BCardFooter>
  </BCard>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { Icon as IconifyIcon } from '@iconify/vue'
import { BAlert, BCard, BCardBody, BCardFooter } from 'bootstrap-vue-next'
import { computed, onMounted, ref } from 'vue'
import TablePagination from '~/components/TablePagination.vue'
import { getLatestReservations, type DashboardRecentReservation } from '~/services/dashboard.service'
import { toTitleCase } from '~/utils/helpers'

const fields = [
  { key: 'id', label: 'Id' },
  { key: 'product', label: 'Product' },
  { key: 'date', label: 'Date' },
  { key: 'amount', label: 'Amount' },
  { key: 'statusvariant', label: 'Status' },
  { key: 'actions', label: 'Actions' },
]

const currentPage = ref(1)
const perPage = ref(7)
const orders = ref<DashboardRecentReservation[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const totalItems = computed(() => orders.value.length)

const formatAmount = (value: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'MAD',
    maximumFractionDigits: 2,
  }).format(value)
}

const formatDate = (value: string) => {
  const date = new Date(value)

  if (!value || Number.isNaN(date.getTime())) return '-'

  return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
}

const getStatusClass = (status: string) => {
  if (status === 'pending') return 'text-warning'
  if (status === 'cancelled' || status === 'canceled') return 'text-danger'
  return 'text-success'
}

const loadRecentReservations = async () => {
  try {
    loading.value = true
    error.value = null
    orders.value = await getLatestReservations(perPage.value)
  } catch (err) {
    console.error('[dashboard] Failed to load recent reservations', err)
    error.value = err instanceof Error ? err.message : 'Impossible de charger les dernières réservations.'
  } finally {
    loading.value = false
  }
}

onMounted(loadRecentReservations)
</script>
