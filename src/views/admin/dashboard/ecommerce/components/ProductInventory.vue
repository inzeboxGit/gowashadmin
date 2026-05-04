<template>
  <BCard no-body>
    <div class="card-header justify-content-between align-items-center border-dashed">
      <h4 class="card-title mb-0">Product Inventory</h4>
      <div class="d-flex gap-2">
        <RouterLink to="/apps/ecommerce/products/product-add" class="btn btn-sm btn-soft-secondary"> <IconifyIcon icon="tabler:plus" class="me-1" /> Add Product </RouterLink>
        <RouterLink to="/apps/ecommerce/products" class="btn btn-sm btn-primary"> <IconifyIcon icon="tabler:packages" class="me-1" /> Products </RouterLink>
      </div>
    </div>

    <BAlert v-if="error" variant="danger" show class="m-3 mb-0">{{ error }}</BAlert>

    <BCardBody class="p-0">
      <BTable small hover :busy="loading" show-empty empty-text="No products found." :fields="fields" :items="products" :per-page="perPage" :current-page="currentPage" responsive thead-class="d-none" class="table table-centered table-custom table-nowrap mb-0">
        <template #cell(imagenamecategoryurl)="data">
          <div class="d-flex align-items-center">
            <img :src="data.item.image" alt="" class="avatar-sm rounded-circle me-2" />
            <div>
              <span class="text-muted fs-xs">{{ data.item.category }}</span>
              <h5 class="fs-base mb-0">
                <RouterLink to="/apps/ecommerce/products" class="text-body">{{ data.item.name }}</RouterLink>
              </h5>
            </div>
          </div>
        </template>

        <template #cell(stock)="data">
          <span class="text-muted fs-xs">Stock</span>
          <h5 class="fs-base fw-normal mb-0">{{ data.item.stock }} units</h5>
        </template>

        <template #cell(price)="data">
          <span class="text-muted fs-xs">Price</span>
          <h5 class="fs-base fw-normal mb-0">{{ formatPrice(data.item.price) }}</h5>
        </template>

        <template #cell(updatedAt)="data">
          <span class="text-muted fs-xs">Updated</span>
          <h5 class="fs-base fw-normal mb-0">{{ formatDate(data.item.updatedAt) }}</h5>
        </template>

        <template #cell(statusvariant)="{ item }">
          <span class="text-muted fs-xs">Status</span>
          <h5 class="fs-base fw-normal mb-0">
            <IconifyIcon icon="tabler:circle-filled" :class="['fs-xs', getStatus(item).className]" />
            {{ getStatus(item).label }}
          </h5>
        </template>

        <template #cell(actions)>
          <BDropdown :variant="null" placement="bottom-end" no-caret toggle-class="text-muted drop-arrow-none card-drop p-0">
            <template #button-content>
              <IconifyIcon icon="tabler:dots-vertical" class="fs-lg" />
            </template>
            <BDropdownItem>Edit Product</BDropdownItem>
            <BDropdownItem>Remove</BDropdownItem>
          </BDropdown>
        </template>
      </BTable>
    </BCardBody>
    <div class="card-footer">
      <TablePagination v-model:currentPage="currentPage" :per-page="perPage" :total-items="totalRows" label="products" />
    </div>
  </BCard>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { Icon as IconifyIcon } from '@iconify/vue'
import { BAlert, BCardBody, BDropdown, BDropdownItem } from 'bootstrap-vue-next'
import { computed, onMounted, ref } from 'vue'
import TablePagination from '~/components/TablePagination.vue'
import { getLatestProductStocks, type DashboardInventoryProduct } from '~/services/dashboard.service'

const fields = [
  { key: 'imagenamecategoryurl', label: 'Product' },
  { key: 'stock', label: 'Stock' },
  { key: 'price', label: 'Price' },
  { key: 'updatedAt', label: 'Updated' },
  { key: 'statusvariant', label: 'Status' },
  { key: 'actions', label: 'Actions' },
]

const currentPage = ref(1)
const perPage = ref(7)
const products = ref<DashboardInventoryProduct[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const totalRows = computed(() => products.value.length)

const formatPrice = (value: number) => {
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

const getStatus = (item: DashboardInventoryProduct) => {
  if (item.stock <= 0) return { label: 'Out of stock', className: 'text-danger' }
  if (item.stock <= 5) return { label: 'Low stock', className: 'text-warning' }
  if (item.published) return { label: 'Active', className: 'text-success' }

  return { label: 'Pending', className: 'text-warning' }
}

const loadProductStocks = async () => {
  try {
    loading.value = true
    error.value = null
    products.value = await getLatestProductStocks(perPage.value)
  } catch (err) {
    console.error('[dashboard] Failed to load product inventory', err)
    error.value = err instanceof Error ? err.message : 'Impossible de charger le stock des produits.'
  } finally {
    loading.value = false
  }
}

onMounted(loadProductStocks)
</script>
