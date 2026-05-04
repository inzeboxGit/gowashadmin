<template>
  <BCard no-body>
    <BCardHeader>
      <BCardTitle as="h4">Custom table with delete buttons</BCardTitle>
    </BCardHeader>
    <BCardHeader class="border-light justify-content-between">
      <div class="d-flex gap-2">
        <div class="app-search">
          <input v-model="searchQuery" type="search" class="form-control" placeholder="Search product name..." />
          <Icon icon="search" class="app-search-icon text-muted" />
        </div>
        <BButton v-if="selected.length" variant="danger" @click="handleDeleteSelected"> Delete </BButton>
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
      :items="productsData"
      :per-page="perPage"
      :current-page="currentPage"
      @filtered="onFiltered"
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
      <template #cell(sku)="{ item }"> {{ item.sku }}</template>
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
          <BButton variant="light" class="btn btn-icon btn-sm rounded-circle">
            <Icon icon="eye" class="fs-lg" />
          </BButton>
          <BButton variant="light" class="btn btn-icon btn-sm rounded-circle">
            <Icon icon="square-pen" class="fs-lg" />
          </BButton>
          <BButton variant="danger" class="btn btn-icon btn-sm rounded-circle">
            <Icon icon="trash-2" class="fs-lg" @click="handleDeleteItem(item)" />
          </BButton>
        </div>
      </template>
    </BTable>
  </BCard>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import type { TableFieldRaw } from 'bootstrap-vue-next'
import { ref } from 'vue'
import Rating from '~/components/Rating.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { useTableActions } from '~/composables/useTableActions'
import { toPascalCase } from '~/utils/helpers'
import { customTableData, type CustomTableType } from './data'

const fields: Exclude<TableFieldRaw<CustomTableType>, string>[] = [
  { key: 'id', label: 'Id' },
  { key: 'name', label: 'Product' },
  { key: 'sku', label: 'Sku' },
  { key: 'category', label: 'Category' },
  { key: 'stock', label: 'Stock' },
  { key: 'price', label: 'Price' },
  { key: 'orders', label: 'Orders' },
  { key: 'rating', label: 'Rating' },
  { key: 'status', label: 'Status' },
  { key: 'publish', label: 'Publish' },
  { key: 'action', label: 'Action' },
]

const searchQuery = ref('')
const currentPage = ref(1)
const perPage = ref(5)
const totalRows = ref(customTableData.length)
const productsData = ref<CustomTableType[]>(customTableData)

function onFiltered(filteredItems: CustomTableType[]) {
  totalRows.value = filteredItems.length
  currentPage.value = 1
}

function adjustPage() {
  const totalPages = Math.ceil(productsData.value.length / perPage.value)
  if (currentPage.value > totalPages) {
    currentPage.value = totalPages || 1
  }
}

function handleDeleteItem(item: CustomTableType) {
  deleteItem(item)
  totalRows.value = productsData.value.length
  adjustPage()
}

function handleDeleteSelected() {
  deleteSelected()
  totalRows.value = productsData.value.length
  adjustPage()
}

const { selected, toggleSelectAll, onToggleRow, deleteSelected, deleteItem, allSelected, isIndeterminate } = useTableActions(productsData)
</script>
