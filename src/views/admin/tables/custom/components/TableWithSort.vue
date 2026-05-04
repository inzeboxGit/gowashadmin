<template>
  <BCard no-body>
    <BCardHeader>
      <BCardTitle as="h4">Custom Table with Sort</BCardTitle>
    </BCardHeader>

    <BCardHeader class="border-light justify-content-between">
      <div class="d-flex gap-2">
        <div class="app-search">
          <input v-model="searchQuery" type="search" class="form-control" placeholder="Search product name..." />
          <Icon icon="search" class="app-search-icon text-muted" />
        </div>

        <BButton v-if="selected.length" variant="danger" @click="handleDeleteSelected"> Delete </BButton>
      </div>

      <div class="d-flex align-items-center gap-2">
        <span class="me-2 fw-semibold">Filter By:</span>

        <div class="app-search">
          <select v-model="selectedCategory" class="form-select form-control my-1 my-md-0">
            <option value="All">Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home">Home</option>
            <option value="Sports">Sports</option>
            <option value="Beauty">Beauty</option>
          </select>
          <Icon icon="tag" size="18" class="app-search-icon text-muted" />
        </div>

        <div class="app-search">
          <select v-model="selectedStatus" class="form-select form-control my-1 my-md-0">
            <option value="">Status</option>
            <option value="published">Published</option>
            <option value="pending">Pending</option>
            <option value="out of stock">Out of Stock</option>
          </select>
          <Icon icon="box" class="app-search-icon text-muted" />
        </div>

        <div class="app-search">
          <select v-model="selectedPriceRange" class="form-select form-control my-1 my-md-0">
            <option value="">Price Range</option>
            <option value="0-50">$0 - $50</option>
            <option value="51-150">$51 - $150</option>
            <option value="151-500">$151 - $500</option>
            <option value="500+">$500+</option>
          </select>
          <Icon icon="dollar-sign" class="app-search-icon text-muted" />
        </div>

        <div>
          <BFormSelect v-model="perPage" :options="perPageOptions" class="form-control my-1 my-md-0" />
        </div>
      </div>
    </BCardHeader>

    <BTable show-empty empty-text="Nothing found." v-model:selected-rows="selected" :fields="fields" :items="paginatedProducts" thead-class="bg-light align-middle bg-opacity-25 thead-sm" hover responsive class="table table-custom table-nowrap table-centered mb-0 w-100">
      <template #head()="data">
        <span class="text-uppercase fs-xxs">{{ data.label }}</span>
      </template>

      <template #head(id)>
        <input class="form-check-input form-check-input-light fs-14 mt-0" type="checkbox" id="select-all-products" :checked="allSelected" :indeterminate="isIndeterminate" @change="toggleSelectAll" />
      </template>

      <template #head(action)>
        <span class="text-uppercase d-flex justify-content-center fs-xxs">Actions</span>
      </template>

      <template #cell(id)="data">
        <input class="form-check-input form-check-input-light fs-14 product-item-check mt-0" type="checkbox" :value="data.item" :checked="selected.includes(data.item)" @change="onToggleRow(data.item, $event)" />
      </template>

      <template #cell(name)="{ item }">
        <div class="d-flex">
          <div class="avatar-md me-3">
            <img :src="item.product.image" alt="Product" class="img-fluid rounded" />
          </div>
          <div>
            <h5 class="mb-1">
              <RouterLink :to="`/products/${item.product.name}`" class="link-reset">{{ item.product.name }}</RouterLink>
            </h5>
            <p class="text-muted mb-0 fs-xxs">by: {{ item.product.manufacturer }}</p>
          </div>
        </div>
      </template>

      <template #cell(sku)="{ item }"> {{ item.sku }} </template>

      <template #cell(stock)="{ item }">
        <h5 class="fs-base mb-0 fw-medium">{{ item.stock }}</h5>
      </template>

      <template #cell(price)="{ item }">{{ item.price }} </template>

      <template #cell(orders)="{ item }"> {{ item.orders }} </template>

      <template #cell(rating)="{ item }">
        <Rating :rating="item.rating" class="d-inline-flex align-items-center gap-1" />
        <span class="ms-1">
          <RouterLink to="/reviews" class="link-reset fw-semibold">({{ item.reviews }})</RouterLink>
        </span>
      </template>

      <template #cell(status)="{ item }">
        <span class="badge fs-xxs" :class="item.status === 'published' ? 'badge-soft-success' : item.status === 'pending' ? 'badge-soft-warning' : 'badge-soft-danger'">
          {{ toPascalCase(item.status) }}
        </span>
      </template>

      <template #cell(publish)="{ item }">
        {{ item.date }} <small class="text-muted">{{ item.time }}</small>
      </template>

      <template #cell(action)="{ item }">
        <div class="d-flex justify-content-center gap-1">
          <button class="btn btn-light btn-icon btn-sm rounded-circle">
            <Icon icon="eye" class="fs-lg" />
          </button>
          <button class="btn btn-light btn-icon btn-sm rounded-circle">
            <Icon icon="square-pen" class="fs-lg" />
          </button>
          <button class="btn btn-danger btn-icon btn-sm rounded-circle" @click="handleDeleteItem(item)">
            <Icon icon="trash-2" class="fs-lg" />
          </button>
        </div>
      </template>
    </BTable>

    <BCardFooter class="border-0">
      <TablePagination v-model:currentPage="currentPage" :per-page="perPage" :total-items="filteredProducts.length" label="products" />
    </BCardFooter>
  </BCard>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import type { TableFieldRaw } from 'bootstrap-vue-next'
import { computed, ref } from 'vue'
import Rating from '~/components/Rating.vue'
import TablePagination from '~/components/TablePagination.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { useTableActions } from '~/composables/useTableActions'
import { toPascalCase } from '~/utils/helpers'
import { customTableData, type CustomTableType } from './data'

const fields: Exclude<TableFieldRaw<CustomTableType>, string>[] = [
  { key: 'id', label: 'Id' },
  { key: 'name', label: 'Product', sortable: true },
  { key: 'sku', label: 'Sku' },
  { key: 'category', label: 'Category' },
  { key: 'stock', label: 'Stock' },
  { key: 'price', label: 'Price' },
  { key: 'orders', label: 'Orders' },
  { key: 'rating', label: 'Rating', sortable: true },
  { key: 'status', label: 'Status' },
  { key: 'publish', label: 'Publish' },
  { key: 'action', label: 'Action' },
]

const searchQuery = ref('')
const selectedCategory = ref('All')
const selectedStatus = ref('')
const selectedPriceRange = ref('')
const perPageOptions = [5, 10, 20, 50]
const currentPage = ref(1)
const perPage = ref(5)
const productsData = ref<CustomTableType[]>(customTableData)

const filteredProducts = computed(() => {
  return productsData.value.filter((product) => {
    const matchesSearch = product.product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategory.value === 'All' || product.category === selectedCategory.value
    const matchesStatus = !selectedStatus.value || product.status.toLowerCase() === selectedStatus.value.toLowerCase()

    const [min, max] = selectedPriceRange.value === '500+' ? [500, Infinity] : selectedPriceRange.value ? selectedPriceRange.value.split('-').map(Number) : [0, Infinity]

    const matchesPrice = parseFloat(product.price.replace('$', '')) >= min! && parseFloat(product.price.replace('$', '')) <= max!

    return matchesSearch && matchesCategory && matchesStatus && matchesPrice
  })
})

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  const end = start + perPage.value
  return filteredProducts.value.slice(start, end)
})

function adjustPage() {
  const totalPages = Math.ceil(filteredProducts.value.length / perPage.value)
  if (currentPage.value > totalPages) currentPage.value = totalPages || 1
}

function handleDeleteItem(item: CustomTableType) {
  deleteItem(item)
  adjustPage()
}

function handleDeleteSelected() {
  deleteSelected()
  adjustPage()
}

const { selected, toggleSelectAll, onToggleRow, deleteSelected, deleteItem, allSelected, isIndeterminate } = useTableActions(productsData)
</script>
