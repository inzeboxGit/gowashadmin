<template>
  <BCard no-body>
    <BCardHeader>
      <BCardTitle as="h4">Custom Table with Range Filters</BCardTitle>
    </BCardHeader>

    <BCardHeader class="border-light justify-content-between flex-wrap gap-2">
      <div class="d-flex gap-2 flex-wrap align-items-center">
        <div class="app-search">
          <input v-model="searchQuery" type="search" class="form-control" placeholder="Search product name..." />
          <Icon icon="search" class="app-search-icon text-muted" />
        </div>

        <BButton v-if="selected.length" variant="danger" @click="handleDeleteSelected"> Delete </BButton>
      </div>

      <div class="d-flex align-items-center gap-2 flex-wrap">
        <span class="fw-semibold">Filter By:</span>

        <div class="app-search">
          <select v-model="selectedPriceRange" class="form-select form-control my-1 my-md-0">
            <option value="">All Prices</option>
            <option value="0-50">$0 - $50</option>
            <option value="51-150">$51 - $150</option>
            <option value="151-500">$151 - $500</option>
            <option value="500+">$500+</option>
          </select>
          <span class="app-search-icon text-muted">
            <Icon icon="dollar-sign" />
          </span>
        </div>

        <div class="app-search">
          <select v-model="selectedDateRange" class="form-select form-control my-1 my-md-0">
            <option value="All">All Dates</option>
            <option value="Today">Today</option>
            <option value="Last7">Last 7 Days</option>
            <option value="Last30">Last 30 Days</option>
            <option value="ThisYear">This Year</option>
          </select>
          <span class="app-search-icon text-muted">
            <Icon icon="calendar" />
          </span>
        </div>

        <div>
          <BFormSelect v-model="perPage" :options="perPageOptions" class="form-control my-1 my-md-0" />
        </div>
      </div>
    </BCardHeader>

    <BTable
      show-empty
      :filter="searchQuery"
      empty-text="Nothing found."
      v-model:selected-rows="selected"
      thead-class="bg-light align-middle bg-opacity-25 thead-sm"
      hover
      :fields="fields"
      :items="filteredProducts"
      :per-page="perPage"
      :current-page="currentPage"
      responsive
      class="table table-custom table-nowrap table-centered mb-0 w-100"
    >
      <template #head()="data">
        <span class="text-uppercase fs-xxs">{{ data.label }}</span>
      </template>
      <template #head(id)>
        <input class="form-check-input form-check-input-light fs-14 mt-0" type="checkbox" id="select-all-products" value="option" :checked="allSelected" :indeterminate="isIndeterminate" @change="toggleSelectAll" />
      </template>
      <template #head(action)>
        <span class="text-uppercase d-flex justify-content-center fs-xxs">Actions</span>
      </template>
      <template #cell(id)="data">
        <input class="form-check-input form-check-input-light fs-14 product-item-check mt-0" type="checkbox" :value="data.item" :checked="selected.includes(data.item)" @change="onToggleRow(data.item, $event)" />
      </template>
      <template #cell(product)="{ item }">
        <div class="d-flex">
          <div class="avatar-md me-3">
            <img :src="item.product.image" alt="Product" class="img-fluid rounded" />
          </div>
          <div>
            <h5 class="mb-1">
              <RouterLink :to="`/products/${item}`" class="link-reset">{{ item.product.name }}</RouterLink>
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
        <span class="badge fs-xxs" :class="item.status === 'published' ? 'badge-soft-success' : item.status === 'pending' ? 'badge-soft-warning' : 'badge-soft-danger'">{{ toPascalCase(item.status) }}</span>
      </template>
      <template #cell(publish)="{ item }">
        {{ item.date }} <small class="text-muted">{{ item.time }}</small>
      </template>
      <template #cell(action)="{ item }">
        <div class="d-flex justify-content-center gap-1">
          <BButton size="sm" class="btn-light btn-icon rounded-circle">
            <Icon icon="eye" class="fs-lg" />
          </BButton>
          <BButton size="sm" class="btn-light btn-icon rounded-circle">
            <Icon icon="square-pen" class="fs-lg" />
          </BButton>
          <BButton size="sm" class="btn-danger btn-icon rounded-circle">
            <Icon icon="trash-2" class="fs-lg" @click="handleDeleteItem(item)" />
          </BButton>
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
import { format, isWithinInterval, startOfYear, subDays } from 'date-fns'
import { computed, ref } from 'vue'
import Rating from '~/components/Rating.vue'
import TablePagination from '~/components/TablePagination.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { useTableActions } from '~/composables/useTableActions'
import { toPascalCase } from '~/utils/helpers'
import { customTableData, type CustomTableType } from './data'

const fields: Exclude<TableFieldRaw<CustomTableType>, string>[] = [
  { key: 'id', label: 'Id' },
  { key: 'product', label: 'Product' },
  { key: 'category', label: 'Category' },
  { key: 'sku', label: 'Sku' },
  { key: 'stock', label: 'Stock' },
  { key: 'price', label: 'Price' },
  { key: 'orders', label: 'Orders' },
  { key: 'rating', label: 'Rating' },
  { key: 'status', label: 'Status' },
  { key: 'publish', label: 'Publish' },
  { key: 'action', label: 'Action' },
]

const searchQuery = ref('')
const selectedPriceRange = ref('')
const selectedDateRange = ref('All')
const currentPage = ref(1)
const perPage = ref(5)
const perPageOptions = [5, 10, 20, 50]
const productsData = ref<CustomTableType[]>(customTableData)

const filteredProducts = computed(() => {
  const now = new Date()
  return productsData.value.filter((product) => {
    const matchesSearch = product.product.name.toLowerCase().includes(searchQuery.value.toLowerCase())

    const price = Number(product.price)
    let matchesPrice = true
    if (selectedPriceRange.value) {
      if (selectedPriceRange.value === '0-50') matchesPrice = price >= 0 && price <= 50
      else if (selectedPriceRange.value === '51-150') matchesPrice = price >= 51 && price <= 150
      else if (selectedPriceRange.value === '151-500') matchesPrice = price >= 151 && price <= 500
      else if (selectedPriceRange.value === '500+') matchesPrice = price > 500
    }

    let matchesDate = true
    const productDate = new Date(product.date)
    if (selectedDateRange.value === 'Today') {
      matchesDate = format(productDate, 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd')
    } else if (selectedDateRange.value === 'Last7') {
      matchesDate = isWithinInterval(productDate, { start: subDays(now, 7), end: now })
    } else if (selectedDateRange.value === 'Last30') {
      matchesDate = isWithinInterval(productDate, { start: subDays(now, 30), end: now })
    } else if (selectedDateRange.value === 'ThisYear') {
      matchesDate = isWithinInterval(productDate, { start: startOfYear(now), end: now })
    }

    return matchesSearch && matchesPrice && matchesDate
  })
})

const { selected, toggleSelectAll, onToggleRow, allSelected, isIndeterminate, deleteItem, deleteSelected } = useTableActions(productsData)

function handleDeleteItem(item: CustomTableType) {
  deleteItem(item)
}

function handleDeleteSelected() {
  deleteSelected()
}
</script>
