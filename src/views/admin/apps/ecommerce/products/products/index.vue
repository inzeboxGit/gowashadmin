<template>
  <PageBreadcrumb title="Products" subtitle="Ecommerce" />

  <BAlert v-if="successMessage" variant="success" dismissible show @closed="successMessage = null">
    {{ successMessage }}
  </BAlert>

  <BRow>
    <BCol xs="12">
      <BCard no-body>
        <BCardHeader class="border-light justify-content-between">
          <div class="d-flex gap-2">
            <div class="app-search">
              <input type="search" class="form-control" placeholder="Search product name..." v-model="searchQuery" />
              <Icon icon="search" class="app-search-icon text-muted" />
            </div>

            <BButton v-if="selected.length" variant="danger" @click="handleDeleteSelected"> Delete </BButton>
          </div>

          <div class="d-flex align-items-center gap-2">
            <span class="me-2 fw-semibold">Filter By:</span>

            <div class="app-search">
              <BFormSelect v-model="category" class="form-control my-1 my-md-0">
                <option value="All">Category</option>
                <option v-for="item in categories" :key="item" :value="item">{{ item }}</option>
              </BFormSelect>
              <Icon icon="tag" class="app-search-icon text-muted" />
            </div>

            <div class="app-search">

              <BFormSelect v-model="status" class="form-control my-1 my-md-0">
                <option value="All">Status</option>
                <option value="Published">Published</option>
                <option value="Pending">Pending</option>
                <option value="Out Of Stock">Out of Stock</option>
              </BFormSelect>
              <Icon icon="activity" class="app-search-icon text-muted" />
            </div>

            <div class="app-search">
              <BFormSelect v-model="priceRange" class="form-control my-1 my-md-0">
                <option value="All">Price Range</option>
                <option value="0-50">0 - 50</option>
                <option value="51-150">51 - 150</option>
                <option value="151-500">151 - 500</option>
                <option value="500+">500+</option>
              </BFormSelect>
              <Icon icon="dollar-sign" class="app-search-icon text-muted" />
            </div>

            <div>
              <BFormSelect v-model="perPage" :options="perPageOptions" class="form-control my-1 my-md-0" />
            </div>
          </div>

          <div class="d-flex gap-1">
            <RouterLink to="/apps/ecommerce/products-grid" class="btn btn-soft-primary btn-icon">
              <Icon icon="layout-grid" class="fs-lg" />
            </RouterLink>
            <RouterLink to="/apps/products/list" class="btn btn-primary btn-icon">
              <Icon icon="list-check" class="fs-lg" />
            </RouterLink>
            <RouterLink to="/apps/ecommerce/product-add" class="btn btn-danger ms-1">
              <Icon icon="plus" class="fs-sm me-2" /> Add Product
            </RouterLink>
          </div>
        </BCardHeader>

        <BAlert v-if="error" variant="danger" show class="m-3 mb-0">{{ error }}</BAlert>

        <BTable show-empty :busy="loading" empty-text="No products found." v-model:selected-rows="selected"
          thead-class="bg-light align-middle bg-opacity-25 thead-sm" hover :fields="fields" :items="filteredProducts"
          :per-page="perPage" :current-page="currentPage" responsive
          class="table table-custom table-nowrap table-centered mb-0 w-100">
          <template #table-busy>
            <div class="text-center text-muted my-4">
              <BSpinner small class="me-2" />
              Chargement des produits...
            </div>
          </template>

          <template #head()="data">
            <span class="text-uppercase fs-xxs">{{ data.label }}</span>
          </template>
          <template #head(id)>
            <input class="form-check-input form-check-input-light fs-14 mt-0" type="checkbox" id="select-all-products"
              value="option" :checked="allSelected" :indeterminate="isIndeterminate" @change="toggleSelectAll" />
          </template>
          <template #head(action)>
            <span class="text-uppercase d-flex justify-content-center fs-xxs">Actions</span>
          </template>
          <template #cell(id)="data">
            <input class="form-check-input form-check-input-light fs-14 product-item-check mt-0" type="checkbox"
              :value="data.item" :checked="selected.includes(data.item)" @change="onToggleRow(data.item, $event)" />
          </template>
          <template #cell(name)="data">
            <div class="d-flex">
              <div class="avatar-md me-3">
                <img :src="data.item.image" alt="Product" class="img-fluid rounded" />
              </div>
              <div>
                <h5 class="mb-1">
                  <RouterLink to="/apps/ecommerce/product-details" class="link-reset">{{ data.item.name }} </RouterLink>
                </h5>
                <p class="text-muted mb-0 fs-xxs">by: {{ data.item.brand }}</p>
              </div>
            </div>
          </template>

          <template #cell(stock)="data">
            <h5 class="fs-base mb-0 fw-medium">{{ data.item.stock }}</h5>
          </template>

          <template #cell(price)="data"> {{ data.item.price }} </template>

          <template #cell(rating)="data">
            <Rating :rating="data.item.rating" class="d-inline-flex justify-content-start gap-1" />
            <RouterLink to="/apps/ecommerce/reviews" class="link-reset ms-1 fw-semibold"> ({{ data.item.reviews }})
            </RouterLink>
          </template>

          <template #cell(status)="data">
            <span class="badge fs-xxs"
              :class="data.item.status == 'published' ? 'badge-soft-success' : data.item.status == 'pending' ? 'badge-soft-warning' : 'badge-soft-danger'">{{
                toPascalCase(data.item.status) }}</span>
          </template>

          <template #cell(publishDate)="data">
            {{ data.item.date }} <small class="text-muted">{{ data.item.time }}</small>
          </template>

          <template #cell(action)="{ item }">
            <div class="d-flex justify-content-center gap-1">
              <BButton size="sm" class="btn-default btn-icon rounded-circle">
                <Icon icon="eye" class="fs-lg" />
              </BButton>
              <BButton size="sm" class="btn-default btn-icon rounded-circle">
                <Icon icon="square-pen" class="fs-lg" />
              </BButton>
              <BButton size="sm" class="btn-default btn-icon rounded-circle">
                <Icon icon="trash-2" class="fs-lg" @click="handleDeleteItem(item)" />
              </BButton>
            </div>
          </template>
        </BTable>

        <BCardFooter class="border-0">
          <TablePagination v-model:currentPage="currentPage" :per-page="perPage" :total-items="totalRows"
            label="products" />
        </BCardFooter>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { useRoute, useRouter } from 'vue-router'
import { BAlert, BButton, BCard, BCardHeader, BCol, BFormSelect, BRow, BSpinner, BTable } from 'bootstrap-vue-next'
import { computed, onMounted, ref, watch } from 'vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import Rating from '~/components/Rating.vue'
import TablePagination from '~/components/TablePagination.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { useTableActions } from '~/composables/useTableActions'
import { getProducts } from '~/services/products.service'
import { toPascalCase } from '~/utils/helpers'
import type { Product } from '~/types/product'

type ProductTableItem = {
  id: string
  image: string
  name: string
  brand: string
  sku: string
  category: string
  stock: number
  price: string
  numericPrice: number
  orders: number
  rating: number
  reviews: number
  status: 'published' | 'pending' | 'out-of-stock'
  date: string
  time: string
}

const category = ref('All')
const status = ref('All')
const priceRange = ref('All')

const fields = [
  { key: 'id', label: 'Id' },
  { key: 'name', label: 'Product', sortable: true },
  { key: 'sku', label: 'SKU' },
  { key: 'category', label: 'Category' },
  { key: 'stock', label: 'Stock', sortable: true },
  { key: 'price', label: 'Price', sortable: true },
  { key: 'orders', label: 'Orders', sortable: true },
  { key: 'rating', label: 'Rating', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'publishDate', label: 'Published', sortable: true },
  { key: 'action', label: 'Action', sortable: false },
]

const searchQuery = ref('')

const perPageOptions = [5, 8, 10, 20, 50]

const currentPage = ref(1)
const perPage = ref(8)
const totalRows = ref(0)
const products = ref<ProductTableItem[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const successMessage = ref<string | null>(null)
const route = useRoute()
const router = useRouter()

const categories = computed(() => {
  return [...new Set(products.value.map((product) => product.category).filter(Boolean))].sort()
})

const filteredProducts = computed(() => {
  const normalizedSearch = searchQuery.value.trim().toLowerCase()

  return products.value.filter((product) => {
    const matchesSearch =
      !normalizedSearch ||
      product.name.toLowerCase().includes(normalizedSearch) ||
      product.brand.toLowerCase().includes(normalizedSearch) ||
      product.category.toLowerCase().includes(normalizedSearch) ||
      product.id.toLowerCase().includes(normalizedSearch)

    const matchesCategory = category.value === 'All' || product.category === category.value
    const matchesStatus = status.value === 'All' || toPascalCase(product.status) === status.value
    const matchesPriceRange =
      priceRange.value === 'All' ||
      (priceRange.value === '0-50' && product.numericPrice <= 50) ||
      (priceRange.value === '51-150' && product.numericPrice >= 51 && product.numericPrice <= 150) ||
      (priceRange.value === '151-500' && product.numericPrice >= 151 && product.numericPrice <= 500) ||
      (priceRange.value === '500+' && product.numericPrice > 500)

    return matchesSearch && matchesCategory && matchesStatus && matchesPriceRange
  })
})

const formatDateParts = (value: string) => {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return {
      date: value.split('T')[0] || '-',
      time: '',
    }
  }

  return {
    date: date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }),
    time: date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
  }
}

const mapProductToTableItem = (product: Product): ProductTableItem => {
  const publishedDate = formatDateParts(product.createdAt)

  return {
    id: product.id,
    image: product.imageUrl || '/images/products/1.png',
    name: product.title,
    brand: product.brandName,
    sku: product.id,
    category: product.category,
    stock: product.stock ?? 0,
    price: `${product.price}`,
    numericPrice: product.price,
    orders: 0,
    rating: 0,
    reviews: 0,
    status: product.published ? 'published' : 'pending',
    date: publishedDate.date,
    time: publishedDate.time,
  }
}

const loadProducts = async () => {
  try {
    loading.value = true
    error.value = null
    products.value = (await getProducts()).map(mapProductToTableItem)
    totalRows.value = filteredProducts.value.length
  } catch (err) {
    console.error('[products] Failed to load products', err)
    error.value = err instanceof Error ? err.message : 'Impossible de charger les produits.'
  } finally {
    loading.value = false
  }
}

function adjustPage() {
  const totalPages = Math.ceil(filteredProducts.value.length / perPage.value)
  if (currentPage.value > totalPages) {
    currentPage.value = totalPages || 1
  }
}

function handleDeleteItem(item: ProductTableItem) {
  deleteItem(item)
  totalRows.value = filteredProducts.value.length
  adjustPage()
}

function handleDeleteSelected() {
  deleteSelected()
  totalRows.value = filteredProducts.value.length
  adjustPage()
}

const { selected, toggleSelectAll, onToggleRow, deleteSelected, deleteItem, allSelected, isIndeterminate } = useTableActions(products)

watch([filteredProducts, perPage], () => {
  totalRows.value = filteredProducts.value.length
  currentPage.value = 1
})

onMounted(() => {
  const success = route.query.success

  if (typeof success === 'string') {
    successMessage.value = success
    router.replace({ path: route.path, query: { ...route.query, success: undefined } })
  }

  loadProducts()
})
</script>

<style scoped></style>
