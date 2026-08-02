<template>
  <PageBreadcrumb title="Gestion transport" subtitle="Market Place" />

  <BRow>
    <BCol xs="12">
      <BCard no-body>
        <BCardHeader class="border-light justify-content-between">
          <div class="d-flex gap-2">
            <div class="app-search">
              <BFormInput v-model="searchQuery" type="search" placeholder="Rechercher un fournisseur..." />
              <Icon icon="search" class="app-search-icon text-muted" />
            </div>
          </div>

          <div class="d-flex align-items-center gap-1">
            <BFormSelect v-model="perPage" :options="perPageOptions" class="form-control my-1 my-md-0" />

            <BButton variant="primary" class="ms-1" @click="openCreateModal">
              <Icon icon="plus" class="fs-sm me-2" />
              Ajouter fournisseur
            </BButton>
          </div>
        </BCardHeader>

        <BAlert v-if="error" variant="danger" show class="m-3 mb-0">{{ error }}</BAlert>

        <BTable
          show-empty
          :busy="loading"
          empty-text="Aucun fournisseur trouve."
          thead-class="bg-light align-middle bg-opacity-25 thead-sm"
          hover
          :fields="fields"
          :items="filteredSuppliers"
          :per-page="perPage"
          :current-page="currentPage"
          responsive
          class="table table-custom table-nowrap table-centered mb-0 w-100"
        >
          <template #table-busy>
            <div class="text-center text-muted my-4">
              <BSpinner small class="me-2" />
              Chargement des fournisseurs...
            </div>
          </template>

          <template #head()="data">
            <span class="text-uppercase fs-xxs">{{ data.label }}</span>
          </template>

          <template #head(action)>
            <span class="text-uppercase d-flex justify-content-center fs-xxs">Actions</span>
          </template>

          <template #cell(name)="{ item }">
            <div>
              <h5 class="mb-0">{{ item.name }}</h5>
              <p class="text-muted mb-0 fs-xxs">{{ item.id }}</p>
            </div>
          </template>

          <template #cell(type)="{ item }">
            <span class="badge badge-soft-info fs-xxs">{{ item.typeLabel }}</span>
          </template>

          <template #cell(pricing)="{ item }">
            <div class="d-flex flex-column gap-1">
              <span v-if="item.shipping.type === 'fixed'" class="fw-semibold text-dark">
                {{ formatAmount(item.shipping.price) }}
              </span>
              <span v-for="(range, index) in item.ranges" v-else :key="index" class="text-muted fs-xs">
                {{ formatRangeLimit(range.min, item.shipping.type) }} - {{ formatRangeLimit(range.max, item.shipping.type) }} :
                <span class="fw-semibold text-dark">{{ formatAmount(range.price) }}</span>
              </span>
            </div>
          </template>

          <template #cell(updatedAt)="{ item }">
            {{ item.updatedDate }}
            <small class="text-muted">{{ item.updatedTime }}</small>
          </template>

          <template #cell(action)="{ item }">
            <div class="d-flex justify-content-center gap-1">
              <BButton size="sm" class="btn-default btn-icon rounded-circle" @click="openEditModal(item)">
                <Icon icon="square-pen" class="fs-lg" />
              </BButton>
            </div>
          </template>
        </BTable>

        <BCardFooter class="border-0">
          <TablePagination v-model:currentPage="currentPage" :per-page="perPage" :total-items="totalRows" label="fournisseurs" />
        </BCardFooter>
      </BCard>
    </BCol>
  </BRow>

  <BModal v-model="showSupplierModal" centered size="lg" :title="modalTitle" :ok-title="modalOkTitle" cancel-variant="light" :ok-disabled="supplierLoading" @ok="handleSubmitSupplier">
    <BAlert v-if="supplierError" variant="danger" show>{{ supplierError }}</BAlert>

    <BRow class="g-3">
      <BCol md="12">
        <BFormGroup label="Nom du fournisseur" label-for="supplierName" label-class="form-label">
          <BFormInput id="supplierName" v-model="supplierForm.name" class="form-control" placeholder="Fournisseur B" required />
        </BFormGroup>
      </BCol>

      <BCol md="12">
        <BFormGroup label="Mode de calcul des frais de transport" label-for="shippingType" label-class="form-label">
          <BFormSelect id="shippingType" v-model="supplierForm.shippingType" :options="shippingTypeOptions" class="form-select" />
        </BFormGroup>
      </BCol>

      <BCol v-if="supplierForm.shippingType === 'fixed'" md="6">
        <BFormGroup label="Tarif fixe" label-for="fixedShippingPrice" label-class="form-label">
          <BFormInput id="fixedShippingPrice" v-model.number="supplierForm.fixedPrice" type="number" min="0" step="0.01" />
        </BFormGroup>
      </BCol>

      <BCol v-else md="12">
        <div class="d-flex align-items-center justify-content-between mb-2">
          <label class="form-label mb-0">{{ rangesTitle }}</label>
          <span class="badge badge-soft-info">shipping.type: {{ supplierForm.shippingType }}</span>
        </div>

        <div class="table-responsive">
          <table class="table table-sm table-bordered align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th>{{ rangeMinLabel }}</th>
                <th>{{ rangeMaxLabel }}</th>
                <th>Prix transport</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(range, index) in supplierForm.ranges" :key="index">
                <td>
                  <BFormInput v-model.number="range.min" type="number" min="0" step="0.01" />
                </td>
                <td>
                  <BFormInput v-model.number="range.max" type="number" min="0" step="0.01" />
                </td>
                <td>
                  <BFormInput v-model.number="range.price" type="number" min="0" step="0.01" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </BCol>
    </BRow>
  </BModal>
</template>

<script setup lang="ts">
import { BAlert, BButton, BCard, BCardFooter, BCardHeader, BCol, BFormGroup, BFormInput, BFormSelect, BModal, BRow, BSpinner, type TableFieldRaw } from 'bootstrap-vue-next'
import { computed, onMounted, ref, watch } from 'vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import TablePagination from '~/components/TablePagination.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { createSupplier, getSuppliers, updateSupplier } from '~/services/suppliers.service'
import type { Supplier, SupplierShipping, SupplierShippingRange, SupplierShippingType } from '~/types/supplier'

type SupplierTableItem = {
  id: string
  name: string
  typeLabel: string
  shipping: SupplierShipping
  ranges: SupplierShippingRange[]
  updatedDate: string
  updatedTime: string
}

const fields: Exclude<TableFieldRaw<SupplierTableItem>, string>[] = [
  { key: 'name', label: 'Fournisseur', sortable: true },
  { key: 'type', label: 'Mode de calcul', sortable: true },
  { key: 'pricing', label: 'Tarifs', sortable: false },
  { key: 'updatedAt', label: 'Date de modification', sortable: true },
  { key: 'action', label: 'Actions', sortable: false },
]

const shippingTypeOptions = [
  { value: 'fixed', text: 'Tarif fixe' },
  { value: 'amount', text: 'Tarif par montant du panier' },
  { value: 'weight', text: 'Tarif par poids du panier' },
]

const defaultAmountRanges = (): SupplierShippingRange[] => [
  { min: 0, max: 99.99, price: 8 },
  { min: 100, max: 199.99, price: 12 },
  { min: 200, max: 999999, price: 18 },
]

const defaultWeightRanges = (): SupplierShippingRange[] => [
  { min: 0, max: 4.99, price: 6 },
  { min: 5, max: 9.99, price: 10 },
  { min: 10, max: 999999, price: 18 },
]

const getDefaultRanges = (type: SupplierShippingType) => (type === 'weight' ? defaultWeightRanges() : defaultAmountRanges())

const searchQuery = ref('')
const perPageOptions = [5, 8, 10, 20, 50]
const currentPage = ref(1)
const perPage = ref(8)
const totalRows = ref(0)
const suppliers = ref<SupplierTableItem[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const showSupplierModal = ref(false)
const supplierLoading = ref(false)
const supplierError = ref<string | null>(null)
const editingSupplierId = ref<string | null>(null)
const supplierForm = ref({
  name: '',
  shippingType: 'fixed' as SupplierShippingType,
  fixedPrice: 8,
  ranges: defaultAmountRanges(),
})

const modalTitle = computed(() => (editingSupplierId.value ? 'Modifier le fournisseur' : 'Ajouter un fournisseur'))
const modalOkTitle = computed(() => (editingSupplierId.value ? 'Mettre a jour' : 'Ajouter'))
const rangesTitle = computed(() => (supplierForm.value.shippingType === 'weight' ? 'Tarifs par poids du panier' : 'Tarifs par montant du panier'))
const rangeMinLabel = computed(() => (supplierForm.value.shippingType === 'weight' ? 'Poids min (kg)' : 'Montant min'))
const rangeMaxLabel = computed(() => (supplierForm.value.shippingType === 'weight' ? 'Poids max (kg)' : 'Montant max'))

const filteredSuppliers = computed(() => {
  const normalizedSearch = searchQuery.value.trim().toLowerCase()

  return suppliers.value.filter((supplier) => !normalizedSearch || supplier.name.toLowerCase().includes(normalizedSearch) || supplier.id.toLowerCase().includes(normalizedSearch))
})

const formatAmount = (amount: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount)
const formatNumber = (amount: number) => new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 }).format(amount)
const formatRangeLimit = (value: number, type: SupplierShippingType) => (type === 'weight' ? `${formatNumber(value)} kg` : formatAmount(value))
const getShippingTypeLabel = (type: SupplierShippingType) => {
  if (type === 'fixed') return 'Tarif fixe'
  if (type === 'weight') return 'Par poids du panier'
  return 'Par montant du panier'
}

const normalizeDateValue = (value?: Supplier['createdAt']) => {
  if (!value) return null
  if (typeof value === 'string') return value
  if (value instanceof Date) return value
  if (typeof value === 'object' && 'toDate' in value && typeof value.toDate === 'function') return value.toDate()

  return String(value)
}

const formatDateParts = (value?: Supplier['createdAt']) => {
  const normalizedValue = normalizeDateValue(value)
  if (!normalizedValue) return { date: '-', time: '' }

  const date = normalizedValue instanceof Date ? normalizedValue : new Date(normalizedValue)
  if (Number.isNaN(date.getTime())) {
    const fallbackValue = String(normalizedValue)
    return { date: fallbackValue.split('T')[0] || fallbackValue, time: '' }
  }

  return {
    date: date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }),
    time: date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
  }
}

const mapSupplierToTableItem = (supplier: Supplier): SupplierTableItem => {
  const updatedAt = formatDateParts(supplier.updatedAt || supplier.createdAt)
  const shipping = supplier.shipping || { type: 'amount', ranges: [] }

  return {
    id: supplier.id,
    name: supplier.name,
    typeLabel: getShippingTypeLabel(shipping.type),
    shipping,
    ranges: shipping.type === 'fixed' ? [] : shipping.ranges || [],
    updatedDate: updatedAt.date,
    updatedTime: updatedAt.time,
  }
}

const loadSuppliers = async () => {
  try {
    loading.value = true
    error.value = null
    suppliers.value = (await getSuppliers()).map(mapSupplierToTableItem)
    totalRows.value = filteredSuppliers.value.length
  } catch (err) {
    console.error('[suppliers] Failed to load suppliers', err)
    error.value = err instanceof Error ? err.message : 'Impossible de charger les fournisseurs.'
  } finally {
    loading.value = false
  }
}

const resetSupplierForm = () => {
  supplierForm.value = {
    name: '',
    shippingType: 'fixed',
    fixedPrice: 8,
    ranges: defaultAmountRanges(),
  }
  editingSupplierId.value = null
  supplierError.value = null
}

const openCreateModal = () => {
  resetSupplierForm()
  showSupplierModal.value = true
}

const openEditModal = (item: SupplierTableItem) => {
  editingSupplierId.value = item.id
  supplierForm.value = {
    name: item.name,
    shippingType: item.shipping.type,
    fixedPrice: item.shipping.type === 'fixed' ? item.shipping.price : 8,
    ranges: item.shipping.type === 'fixed' ? defaultAmountRanges() : item.shipping.ranges.map((range) => ({ ...range })),
  }
  supplierError.value = null
  showSupplierModal.value = true
}

const validateRanges = (ranges: SupplierShippingRange[]) => {
  if (ranges.length !== 3) return 'Les 3 tranches de tarifs sont obligatoires.'

  for (const range of ranges) {
    if (range.min < 0 || range.max <= range.min || range.price < 0) {
      return 'Chaque tranche doit avoir min >= 0, max > min et prix >= 0.'
    }
  }

  return null
}

const buildShippingPayload = (): SupplierShipping | null => {
  if (supplierForm.value.shippingType === 'fixed') {
    const price = Number(supplierForm.value.fixedPrice)
    if (Number.isNaN(price) || price < 0) {
      supplierError.value = 'Le tarif fixe doit etre superieur ou egal a 0.'
      return null
    }

    return { type: 'fixed', price }
  }

  const ranges = supplierForm.value.ranges.map((range) => ({
    min: Number(range.min),
    max: Number(range.max),
    price: Number(range.price),
  }))
  const rangeError = validateRanges(ranges)

  if (rangeError) {
    supplierError.value = rangeError
    return null
  }

  return {
    type: supplierForm.value.shippingType,
    ranges,
  }
}

const handleSubmitSupplier = async (event: Event) => {
  event.preventDefault()

  try {
    supplierLoading.value = true
    supplierError.value = null

    const name = supplierForm.value.name.trim()

    if (!name) {
      supplierError.value = 'Le nom du fournisseur est obligatoire.'
      return
    }

    const shipping = buildShippingPayload()
    if (!shipping) return

    if (editingSupplierId.value) {
      await updateSupplier({ id: editingSupplierId.value, name, shipping })
    } else {
      await createSupplier({ name, shipping })
    }

    resetSupplierForm()
    showSupplierModal.value = false
    await loadSuppliers()
  } catch (err) {
    console.error('[suppliers] Failed to save supplier', err)
    supplierError.value = err instanceof Error ? err.message : 'Impossible d enregistrer le fournisseur.'
  } finally {
    supplierLoading.value = false
  }
}

watch(() => supplierForm.value.shippingType, (type) => {
  if (type !== 'fixed') supplierForm.value.ranges = getDefaultRanges(type)
})

watch([filteredSuppliers, perPage], () => {
  totalRows.value = filteredSuppliers.value.length
  currentPage.value = 1
})

onMounted(loadSuppliers)
</script>
