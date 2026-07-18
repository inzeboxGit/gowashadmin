<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <PageBreadcrumb title="Commandes" subtitle="Gestion de la plateforme" />

  <BRow class="row-cols-xxl-5 row-cols-md-3 row-cols-1 align-items-center g-1">
    <BCol v-for="(item, idx) in orderStatData" :key="idx">
      <OrderStatisticWidget :item="item" />
    </BCol>
  </BRow>

  <BRow>
    <BCol xs="12">
      <BCard no-body>
        <BCardHeader class="border-light justify-content-between">
          <div class="d-flex gap-2">
            <div class="app-search">
              <BFormInput v-model="searchQuery" type="search" class="form-control" placeholder="Search order..." />
              <Icon icon="search" class="app-search-icon text-muted" />
            </div>

            <BButton v-if="selected.length" variant="danger" @click="handleDeleteSelected"> Delete </BButton>
          </div>

          <div class="d-flex align-items-center gap-2">
            <span class="me-2 fw-semibold">Filtrer par:</span>

            <div class="app-search">
              <BFormSelect v-model="status" class="form-control my-1 my-md-0">
                <option value="All">Statut de la réservation</option>
                <option value="completed">Complétée</option>
                <option value="pending">En attente</option>
                <option value="accepted">En cours (Accepté)</option>
                <option value="rejected">Rejeté</option>
                <option value="cancelled">Annulé</option>
              </BFormSelect>
              <Icon icon="credit-card" class="app-search-icon text-muted" />
            </div>

            <!-- <div class="app-search">
              <BFormSelect v-model="deliveryStatus" class="form-control my-1 my-md-0">
                <option value="All">Delivery Status</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </BFormSelect>
              <Icon icon="truck" class="app-search-icon text-muted" />
            </div> -->

            <div class="app-search">
              <BFormSelect v-model="dateRange" class="form-control my-1 my-md-0">
                <option value="All">Date</option>
                <option value="Today">Aujourd'hui</option>
                <option value="Last 7 Days">Dernier 7 jours</option>
                <option value="Last 30 Days">Dernier 30 jours</option>
                <option value="This Year">Cette année</option>
              </BFormSelect>
              <Icon icon="calendar" class="app-search-icon text-muted" />
            </div>

            <div>
              <BFormSelect v-model="perPage" :options="perPageOptions" class="form-control my-1 my-md-0" />
            </div>
          </div>

          <!-- <div class="d-flex gap-1">
            <RouterLink to="/apps/ecommerce/order-add" class="btn btn-danger ms-1"> <Icon icon="plus" class="fs-sm me-2" /> Add Order </RouterLink>
          </div> -->
        </BCardHeader>

        <BTable
          show-empty
          :filter="searchQuery"
          empty-text="Aucune réservation trouvée."
          v-model:selected-rows="selected"
          thead-class="bg-light align-middle bg-opacity-25 thead-sm"
          hover
          :fields="fields"
          :items="filteredReservations"
          :per-page="perPage"
          :current-page="currentPage"
          @filtered="onFiltered"
          responsive
          class="table table-custom table-nowrap table-centered mb-0 w-100"
        >
          <template #head()="data">
            <span class="text-uppercase fs-xxs">{{ data.label }}</span>
          </template>
          <template #head(checkbox)>
            <input class="form-check-input form-check-input-light fs-14 mt-0" type="checkbox" id="select-all-products" value="option" :checked="allSelected" :indeterminate="isIndeterminate" @change="toggleSelectAll" />
          </template>
          <template #head(action)>
            <span class="text-uppercase d-flex justify-content-center fs-xxs">Actions</span>
          </template>
          <template #cell(checkbox)="data">
            <input class="form-check-input form-check-input-light fs-14 product-item-check mt-0" type="checkbox" :value="data.item" :checked="selected.includes(data.item)" @change="onToggleRow(data.item, $event)" />
          </template>
          <template #cell(referenceCode)="{ item }">
            <h5 class="fs-sm mb-0 fw-medium">
              <RouterLink to="/apps/ecommerce/order-details" class="link-reset">{{ item.referenceCode || '#' + item.id.substring(0, 6) }}</RouterLink>
            </h5>
          </template>
          <template #cell(date)="{ item }">
            {{ formatDate(item.scheduledAt || item.createdAt) }} <small class="text-muted">{{ formatTime(item.scheduledAt || item.createdAt) }}</small>
          </template>
          <template #cell(customer)="{ item }">
            <div class="d-flex justify-content-start align-items-center gap-2">
              <div class="avatar avatar-sm">
                <div class="avatar-title bg-primary-subtle text-primary rounded-circle">
                  {{ item.clientSnapshot?.fullName?.charAt(0) || 'C' }}
                </div>
              </div>
              <div>
                <h5 class="text-nowrap fs-base mb-0 lh-base">{{ item.clientSnapshot?.fullName || 'Client' }}</h5>
                <p class="text-muted fs-xs mb-0">{{ item.clientSnapshot?.email || item.clientSnapshot?.phoneNumber || '' }}</p>
              </div>
            </div>
          </template>
          <template #cell(amount)="{ item }">
            <span class="fw-bold">{{ item.totalPrice || item.serviceSnapshot?.totalPrice || item.serviceSnapshot?.price || 0 }} MAD</span>
          </template>
          <template #cell(paymentStatus)="{ item }">
            <span class="fw-semibold text-success">
              <Icon icon="circle" class="fs-sm" /> Paid
            </span>
          </template>
          <template #cell(orderStatus)="{ item }">
            <span class="badge fs-xxs" :class="getStatusBadgeClass(item.serviceSnapshot?.status || item.status)">{{
              toPascalCase(item.serviceSnapshot?.status || item.status || 'En cours')
            }}</span>
          </template>
          <template #cell(paymentMethod)="{ item }">
            <div class="d-flex align-items-center">
              <img :src="getPaymentImage(item.paymentMethodTitle)" alt="card" class="me-2" height="28" />
              {{ item.paymentMethodTitle || 'Carte' }}
            </div>
          </template>
          <template #cell(action)="{ item }">
            <div class="d-flex justify-content-center gap-1">
              <button class="btn btn-default btn-icon btn-sm rounded-circle">
                <Icon icon="eye" class="fs-lg" />
              </button>
              <button class="btn btn-default btn-icon btn-sm rounded-circle">
                <Icon icon="square-pen" class="fs-lg" />
              </button>
              <button class="btn btn-default btn-icon btn-sm rounded-circle">
                <Icon icon="trash-2" class="fs-lg" @click="handleDeleteItem(item)" />
              </button>
            </div>
          </template>
        </BTable>

        <BCardFooter class="border-0">
          <TablePagination v-model:currentPage="currentPage" :per-page="perPage" :total-items="totalRows" label="orders" />
        </BCardFooter>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { BCard, BCardFooter, BCardHeader, BCol, BRow, type TableFieldRaw } from 'bootstrap-vue-next'
import { ref } from 'vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import TablePagination from '~/components/TablePagination.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { useTableActions } from '~/composables/useTableActions'
import { toPascalCase } from '~/utils/helpers'
import OrderStatisticWidget from './components/OrderStatisticWidget.vue'
import { orderData, type OrderStatType, type OrderType } from './components/data'
import { getReservations, subscribeToReservations } from '~/services/reservations.service'
import type { Reservation } from '~/types/reservation'
import { onMounted, onUnmounted, computed, watch } from 'vue'

import amex from '/images/cards/american-express.svg'
import bhim from '/images/cards/bhim.svg'
import discover from '/images/cards/discover-card.svg'
import googleWallet from '/images/cards/google-wallet.svg'
import mastercard from '/images/cards/mastercard.svg'
import payoneer from '/images/cards/payoneer.svg'
import paypal from '/images/cards/paypal.svg'
import stripe from '/images/cards/stripe.svg'
import unionpay from '/images/cards/unionpay.svg'
import visa from '/images/cards/visa.svg'

const getPaymentImage = (title?: string) => {
  const t = (title || '').toLowerCase()
  if (t.includes('visa')) return visa
  if (t.includes('mastercard')) return mastercard
  if (t.includes('paypal')) return paypal
  if (t.includes('stripe')) return stripe
  if (t.includes('american') || t.includes('amex')) return amex
  if (t.includes('discover')) return discover
  if (t.includes('union')) return unionpay
  if (t.includes('google')) return googleWallet
  return mastercard // default image
}

const reservationsList = ref<Reservation[]>([])
let unsubscribe: (() => void) | null = null

onMounted(() => {
  unsubscribe = subscribeToReservations((data) => {
    reservationsList.value = data
  })
})

onUnmounted(() => {
  if (unsubscribe) unsubscribe()
})

const orderStatData = computed<OrderStatType[]>(() => {
  let completed = 0
  let pending = 0
  let cancelled = 0
  let accepted = 0
  let rejected = 0

  reservationsList.value.forEach((r: any) => {
    const status = (r.serviceSnapshot?.status || r.status || '').toLowerCase()
    if (status === 'completed') completed++
    else if (status === 'pending') pending++
    else if (status === 'cancelled' || status === 'canceled') cancelled++
    else if (status === 'accepted') accepted++
    else if (status === 'rejected') rejected++
  })

  return [
    {
      title: 'Réservations terminées',
      value: completed,
      change: 0,
      icon: 'check',
      className: 'text-bg-success',
    },
    // {
    //   title: 'Réservations en attente',
    //   value: pending,
    //   change: 0,
    //   icon: 'hourglass',
    //   className: 'text-bg-warning',
    // },
    {
      title: 'Réservations annulées',
      value: cancelled,
      change: 0,
      icon: 'x',
      className: 'text-bg-danger',
    },
    {
      title: 'Réservations en cours',
      value: accepted,
      change: 0,
      icon: 'shopping-cart',
      className: 'text-bg-info',
    },
    {
      title: 'Réservations rejetées',
      value: rejected,
      change: 0,
      icon: 'slash',
      className: 'text-bg-primary',
    },
  ]
})

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
}

const formatTime = (dateStr: string) => {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return isNaN(d.getTime()) ? '' : d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

const getStatusBadgeClass = (status?: string) => {
  const s = (status || '').toLowerCase()
  if (s === 'completed') return 'badge-soft-success'
  if (s === 'cancelled' || s === 'canceled') return 'badge-soft-danger'
  if (s === 'pending') return 'badge-soft-warning'
  if (s === 'accepted') return 'badge-soft-info'
  if (s === 'rejected') return 'badge-soft-primary'
  return 'badge-soft-secondary'
}

const deliveryStatus = ref('All')
const status = ref('All')
const dateRange = ref('All')

const filteredReservations = computed(() => {
  let result = reservationsList.value

  if (dateRange.value !== 'All') {
    const now = new Date()
    result = result.filter(item => {
      const dateVal = item.scheduledAt || item.createdAt
      if (!dateVal) return false
      const d = new Date(dateVal)
      
      if (dateRange.value === 'Today') {
        return d.toDateString() === now.toDateString()
      } else if (dateRange.value === 'Last 7 Days') {
        const pastDate = new Date(now)
        pastDate.setDate(now.getDate() - 7)
        return d >= pastDate && d <= now
      } else if (dateRange.value === 'Last 30 Days') {
        const pastDate = new Date(now)
        pastDate.setDate(now.getDate() - 30)
        return d >= pastDate && d <= now
      } else if (dateRange.value === 'This Year') {
        return d.getFullYear() === now.getFullYear()
      }
      return true
    })
  }

  if (status.value !== 'All') {
    const sVal = status.value.toLowerCase()
    result = result.filter(item => {
      const s = (item.serviceSnapshot?.status || item.status || '').toLowerCase()
      return s === sVal
    })
  }

  return result
})

watch(filteredReservations, (newItems) => {
  if (!searchQuery.value) {
    totalRows.value = newItems.length
    currentPage.value = 1
  }
})

const fields: Exclude<TableFieldRaw<Reservation>, string>[] = [
  { key: 'checkbox', label: '' },
  { key: 'referenceCode', label: 'Reference', sortable: true },
  { key: 'date', label: 'Date', sortable: true },
  { key: 'customer', label: 'Client', sortable: true },
  { key: 'amount', label: 'Total', sortable: true },
  { key: 'paymentStatus', label: 'Paiement', sortable: true },
  { key: 'orderStatus', label: 'Order Status', sortable: true },
  { key: 'paymentMethod', label: 'Method de Paiement' },
  { key: 'action', label: 'Actions', sortable: false },
]

const searchQuery = ref('')
const perPageOptions = [5, 8, 10, 20, 50]
const currentPage = ref(1)
const perPage = ref(8)
const totalRows = ref(0)

function onFiltered(filteredItems: readonly Reservation[]) {
  totalRows.value = filteredItems.length
  currentPage.value = 1
}

function adjustPage() {
  const totalPages = Math.ceil(filteredReservations.value.length / perPage.value)
  if (currentPage.value > totalPages) {
    currentPage.value = totalPages || 1
  }
}

function handleDeleteItem(item: Reservation) {
  deleteItem(item)
  totalRows.value = filteredReservations.value.length
  adjustPage()
}

function handleDeleteSelected() {
  deleteSelected()
  totalRows.value = filteredReservations.value.length
  adjustPage()
}

const { selected, toggleSelectAll, onToggleRow, deleteSelected, deleteItem, allSelected, isIndeterminate } = useTableActions(reservationsList)
</script>

<style scoped></style>
