<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <PageBreadcrumb title="Ventes en ligne" subtitle="Market Place" />

  <BRow class="row-cols-xxl-4 row-cols-md-2 row-cols-1 g-2 mb-3">
    <BCol>
      <BCard no-body class="mb-0">
        <BCardBody>
          <div class="d-flex align-items-center justify-content-between">
            <div>
              <p class="text-muted mb-1">Ventes payées</p>
              <h3 class="mb-0">{{ paidPurchasesCount }}</h3>
            </div>
            <div class="avatar-md">
              <span class="avatar-title bg-success-subtle text-success rounded-circle">
                <Icon icon="shopping-bag" class="fs-3" />
              </span>
            </div>
          </div>
        </BCardBody>
      </BCard>
    </BCol>

    <BCol>
      <BCard no-body class="mb-0">
        <BCardBody>
          <div class="d-flex align-items-center justify-content-between">
            <div>
              <p class="text-muted mb-1">Chiffre d'affaires</p>
              <h3 class="mb-0">{{ formatCurrency(totalAmount) }}</h3>
            </div>
            <div class="avatar-md">
              <span class="avatar-title bg-primary-subtle text-primary rounded-circle">
                <Icon icon="euro" class="fs-3" />
              </span>
            </div>
          </div>
        </BCardBody>
      </BCard>
    </BCol>

    <BCol>
      <BCard no-body class="mb-0">
        <BCardBody>
          <div class="d-flex align-items-center justify-content-between">
            <div>
              <p class="text-muted mb-1">Produits vendus</p>
              <h3 class="mb-0">{{ soldItemsCount }}</h3>
            </div>
            <div class="avatar-md">
              <span class="avatar-title bg-info-subtle text-info rounded-circle">
                <Icon icon="package-check" class="fs-3" />
              </span>
            </div>
          </div>
        </BCardBody>
      </BCard>
    </BCol>

    <BCol>
      <BCard no-body class="mb-0">
        <BCardBody>
          <div class="d-flex align-items-center justify-content-between">
            <div>
              <p class="text-muted mb-1">Livraison</p>
              <h3 class="mb-0">{{ formatCurrency(totalShipping) }}</h3>
            </div>
            <div class="avatar-md">
              <span class="avatar-title bg-warning-subtle text-warning rounded-circle">
                <Icon icon="truck" class="fs-3" />
              </span>
            </div>
          </div>
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
              <BFormInput v-model="searchQuery" type="search" placeholder="Rechercher vente, client, produit..." />
              <Icon icon="search" class="app-search-icon text-muted" />
            </div>
          </div>

          <div class="d-flex align-items-center gap-2">
            <div class="app-search">
              <BFormSelect v-model="statusFilter" class="form-control my-1 my-md-0">
                <option value="All">Tous les statuts</option>
                <option value="paid">Payé</option>
                <option value="pending">En attente</option>
                <option value="failed">Échec</option>
                <option value="cancelled">Annulé</option>
              </BFormSelect>
              <Icon icon="credit-card" class="app-search-icon text-muted" />
            </div>

            <BFormSelect v-model="perPage" :options="perPageOptions" class="form-control my-1 my-md-0" />

            <BButton variant="soft-secondary" :disabled="loading" @click="loadPurchases">
              <BSpinner v-if="loading" small class="me-1" />
              <Icon v-else icon="refresh-cw" class="fs-sm me-1" />
              Actualiser
            </BButton>
          </div>
        </BCardHeader>

        <BAlert v-if="error" variant="danger" show class="m-3 mb-0">{{ error }}</BAlert>

        <BTable
          show-empty
          :busy="loading"
          empty-text="Aucune vente trouvée."
          thead-class="bg-light align-middle bg-opacity-25 thead-sm"
          hover
          :fields="fields"
          :items="filteredPurchases"
          :per-page="perPage"
          :current-page="currentPage"
          responsive
          class="table table-custom table-nowrap table-centered mb-0 w-100"
        >
          <template #table-busy>
            <div class="text-center text-muted my-4">
              <BSpinner small class="me-2" />
              Chargement des ventes...
            </div>
          </template>

          <template #head()="data">
            <span class="text-uppercase fs-xxs">{{ data.label }}</span>
          </template>

          <template #cell(reference)="{ item }">
            <div>
              <h5 class="fs-sm mb-1 fw-semibold">{{ item.reference }}</h5>
              <p class="text-muted fs-xs mb-0">{{ item.purchaseId }}</p>
            </div>
          </template>

          <template #cell(date)="{ item }">
            {{ item.date }} <small class="text-muted">{{ item.time }}</small>
          </template>

          <template #cell(client)="{ item }">
            <div>
              <h5 class="fs-sm mb-1 fw-medium">{{ item.clientName }}</h5>
              <p class="text-muted fs-xs mb-0">{{ item.clientAddress }}</p>
            </div>
          </template>

          <template #cell(products)="{ item }">
            <div class="d-flex flex-column gap-1">
              <span v-for="product in item.products" :key="`${item.id}-${product.productId || product.title}`" class="text-wrap">
                <span class="fw-semibold">{{ product.quantity }}x</span>
                {{ product.title }}
                <span class="text-muted">({{ formatCurrency(product.lineTotal || 0, item.currency) }})</span>
              </span>
              <span v-if="!item.products.length" class="text-muted">-</span>
            </div>
          </template>

          <template #cell(amount)="{ item }">
            <div>
              <h5 class="fs-sm mb-1 fw-bold">{{ formatCurrency(item.amount, item.currency) }}</h5>
              <p class="text-muted fs-xs mb-0">
                Produits {{ formatCurrency(item.productsAmount, item.currency) }} · Livraison {{ formatCurrency(item.shippingAmount, item.currency) }}
              </p>
            </div>
          </template>

          <template #cell(status)="{ item }">
            <span class="badge fs-xxs" :class="getStatusBadgeClass(item.status)">
              {{ formatStatus(item.status) }}
            </span>
          </template>

          <template #cell(invoice)="{ item }">
            <div class="d-flex align-items-center gap-2">
              <span class="fw-semibold">{{ item.invoiceNumber }}</span>
              <a v-if="item.invoiceUrl" :href="item.invoiceUrl" target="_blank" rel="noopener noreferrer" class="btn btn-default btn-icon btn-sm rounded-circle" aria-label="Voir facture">
                <Icon icon="file-text" class="fs-lg" />
              </a>
            </div>
          </template>
        </BTable>

        <BCardFooter class="border-0">
          <TablePagination v-model:currentPage="currentPage" :per-page="perPage" :total-items="filteredPurchases.length" label="ventes" />
        </BCardFooter>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BAlert, BButton, BCard, BCardBody, BCardFooter, BCardHeader, BCol, BFormInput, BFormSelect, BRow, BSpinner, type TableFieldRaw } from 'bootstrap-vue-next'
import { computed, onMounted, ref, watch } from 'vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import TablePagination from '~/components/TablePagination.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { getPurchases } from '~/services/purchases.service'
import type { FirestoreDateValue, Purchase, PurchaseItem } from '~/types/purchase'

type PurchaseTableItem = {
  id: string
  purchaseId: string
  reference: string
  date: string
  time: string
  clientName: string
  clientAddress: string
  products: PurchaseItem[]
  amount: number
  productsAmount: number
  shippingAmount: number
  status: string
  invoiceNumber: string
  invoiceUrl: string
  currency: string
}

const fields: Exclude<TableFieldRaw<PurchaseTableItem>, string>[] = [
  { key: 'reference', label: 'Référence', sortable: true },
  { key: 'date', label: 'Date', sortable: true },
  { key: 'client', label: 'Client', sortable: true },
  { key: 'products', label: 'Produits vendus' },
  { key: 'amount', label: 'Montant', sortable: true },
  { key: 'status', label: 'Statut', sortable: true },
  { key: 'invoice', label: 'Facture' },
]

const purchases = ref<PurchaseTableItem[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const searchQuery = ref('')
const statusFilter = ref('All')
const currentPage = ref(1)
const perPage = ref(8)
const perPageOptions = [5, 8, 10, 20, 50]

const toDate = (value?: FirestoreDateValue) => {
  if (!value) return null
  if (value instanceof Date) return value
  if (typeof value === 'string') {
    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? null : date
  }
  if (typeof value === 'object' && 'toDate' in value && typeof value.toDate === 'function') return value.toDate()
  return null
}

const formatDateParts = (value?: FirestoreDateValue) => {
  const date = toDate(value)

  if (!date) return { date: '-', time: '' }

  return {
    date: new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }).format(date),
    time: new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' }).format(date),
  }
}

const formatCurrency = (amount: number, currency = 'EUR') => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency }).format(Number.isFinite(amount) ? amount : 0)
}

const getStatusBadgeClass = (status: string) => {
  const normalized = status.toLowerCase()
  if (normalized === 'paid') return 'badge-soft-success'
  if (normalized === 'pending') return 'badge-soft-warning'
  if (normalized === 'failed' || normalized === 'cancelled' || normalized === 'canceled') return 'badge-soft-danger'
  return 'badge-soft-secondary'
}

const formatStatus = (status: string) => {
  const labels: Record<string, string> = {
    paid: 'Payé',
    pending: 'En attente',
    failed: 'Échec',
    cancelled: 'Annulé',
    canceled: 'Annulé',
  }

  return labels[status.toLowerCase()] || status || '-'
}

const mapPurchaseToTableItem = (purchase: Purchase): PurchaseTableItem => {
  const dateParts = formatDateParts(purchase.createdAt || purchase.paidAt)
  const clientAddress = purchase.invoiceSnapshot?.clientAddress
  const address = [clientAddress?.address, clientAddress?.city, clientAddress?.zipCode].filter(Boolean).join(', ')

  return {
    id: purchase.id,
    purchaseId: purchase.achatId || purchase.id,
    reference: purchase.referenceCode || purchase.gowashReference || purchase.invoiceReferenceCode || '-',
    date: dateParts.date,
    time: dateParts.time,
    clientName: purchase.invoiceSnapshot?.clientName || 'Client',
    clientAddress: address || '-',
    products: purchase.items || [],
    amount: purchase.montant || purchase.invoiceSnapshot?.totalPaid || purchase.invoiceSnapshot?.totalPaye || 0,
    productsAmount: purchase.productsAmount || 0,
    shippingAmount: purchase.shippingAmount || 0,
    status: purchase.paymentStatus || purchase.status || '-',
    invoiceNumber: purchase.invoiceNumber || purchase.factureNumber || purchase.invoiceSnapshot?.invoiceNumber || '-',
    invoiceUrl: purchase.invoiceUrl || purchase.factureUrl || '',
    currency: purchase.currency || 'EUR',
  }
}

const filteredPurchases = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  const status = statusFilter.value.toLowerCase()

  return purchases.value.filter((purchase) => {
    const matchesStatus = statusFilter.value === 'All' || purchase.status.toLowerCase() === status
    const searchable = [
      purchase.reference,
      purchase.purchaseId,
      purchase.clientName,
      purchase.invoiceNumber,
      purchase.status,
      ...purchase.products.map((product) => `${product.title || ''} ${product.productId || ''}`),
    ].join(' ').toLowerCase()

    return matchesStatus && (!query || searchable.includes(query))
  })
})

const paidPurchasesCount = computed(() => purchases.value.filter((purchase) => purchase.status.toLowerCase() === 'paid').length)
const totalAmount = computed(() => purchases.value.reduce((sum, purchase) => sum + purchase.amount, 0))
const totalShipping = computed(() => purchases.value.reduce((sum, purchase) => sum + purchase.shippingAmount, 0))
const soldItemsCount = computed(() => purchases.value.reduce((sum, purchase) => {
  return sum + purchase.products.reduce((itemSum, product) => itemSum + (product.quantity || 0), 0)
}, 0))

const loadPurchases = async () => {
  loading.value = true
  error.value = null

  try {
    const purchaseItems = await getPurchases()
    purchases.value = purchaseItems.map(mapPurchaseToTableItem)
  } catch (err) {
    console.error('[purchases] Failed to load purchases', err)
    error.value = 'Impossible de charger les ventes en ligne.'
  } finally {
    loading.value = false
  }
}

watch([filteredPurchases, perPage], () => {
  const totalPages = Math.ceil(filteredPurchases.value.length / perPage.value)
  if (currentPage.value > totalPages) currentPage.value = totalPages || 1
})

onMounted(() => {
  loadPurchases()
})
</script>
