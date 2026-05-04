<template>
  <PageBreadcrumb title="Reviews" subtitle="Ecommerce" />

  <BRow class="justify-content-center">
    <BCol xs="12">
      <BCard no-body>
        <BCardHeader class="p-0 d-block">
          <BRow class="g-0 align-items-center">
            <BCol xl="6" class="border-end border-dashed">
              <BRow class="align-items-center g-0">
                <BCol xl="7">
                  <div class="d-flex align-items-center gap-4 p-4">
                    <img src="/images/ratings.svg" alt="Product" height="80" />
                    <div>
                      <h3 class="d-flex align-items-center gap-2 mb-2 fw-bold">
                        4.92
                        <Icon icon="star" class="text-warning" />
                      </h3>
                      <p class="mb-2">Based on 245 verified reviews</p>
                      <p class="pe-2 h6 text-muted mb-2 lh-base">Feedback collected from real customers who purchased our templates</p>
                      <span class="badge badge-label badge-soft-success">+12 new this week</span>
                    </div>
                  </div>
                </BCol>
                <BCol xl="5">
                  <div class="p-3">
                    <div v-for="(rating, idx) in ratings" :key="idx" class="d-flex align-items-center gap-2" :class="{ 'mb-2': idx != ratings.length - 1 }">
                      <div class="flex-shrink-0" style="width: 50px">
                        {{ rating.label }}
                      </div>

                      <BProgress class="w-100 bg-label-primary" height="8px">
                        <BProgressBar :value="rating.value" variant="primary" role="progressbar" :aria-valuenow="rating.value" aria-valuemin="0" aria-valuemax="100" />
                      </BProgress>

                      <div class="flex-shrink-0 text-end" style="width: 30px">
                        <span class="badge text-bg-light">{{ rating.count }}</span>
                      </div>
                    </div>
                  </div>
                </BCol>
              </BRow>
            </BCol>
            <BCol xl="6">
              <div class="pe-3 ps-1">
                <ApexChart :get-options="getReviewChartOptions" :series="getReviewChartOptions().series" />
              </div>
            </BCol>
          </BRow>
        </BCardHeader>

        <BCardHeader class="border-light d-flex align-items-center justify-content-between flex-wrap gap-2">
          <div class="d-flex gap-2">
            <div class="app-search">
              <BFormInput v-model="searchQuery" type="search" placeholder="Search reviews..." />
              <Icon icon="search" class="app-search-icon text-muted" />
            </div>
            <BButton v-if="selected.length" variant="danger" @click="handleDeleteSelected"> Delete </BButton>
          </div>

          <div class="d-flex align-items-center gap-2">
            <div>
              <BFormSelect v-model="perPage" :options="perPageOptions" class="form-control my-1 my-md-0" />
            </div>

            <BDropdown toggle-class="btn btn-default drop-arrow-none">
              <template #button-content>
                <Icon icon="download" class="me-1" /> Export
                <Icon icon="chevron-down" class="align-middle ms-1" />
              </template>
              <BDropdownItem>Export as PDF</BDropdownItem>
              <BDropdownItem>Export as CSV</BDropdownItem>
              <BDropdownItem>Export as Excel</BDropdownItem>
            </BDropdown>

            <BDropdown toggle-class="btn btn-default drop-arrow-none">
              <template #button-content>
                View All
                <Icon icon="chevron-down" class="align-middle ms-1" />
              </template>
              <BDropdownItem>All</BDropdownItem>
              <BDropdownItem>Pending</BDropdownItem>
              <BDropdownItem>Approved</BDropdownItem>
              <BDropdownItem>Disabled</BDropdownItem>
            </BDropdown>
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
          :items="products"
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
          <template #head(review)>
            <span class="text-uppercase fs-xxs">Review</span>
          </template>
          <template #cell(id)="data">
            <input class="form-check-input form-check-input-light fs-14 product-item-check mt-0" type="checkbox" :value="data.item" :checked="selected.includes(data.item)" @change="onToggleRow(data.item, $event)" />
          </template>
          <template #cell(name)="{ item }">
            <div class="d-flex align-items-center">
              <div class="avatar-lg me-3">
                <img :src="item.product.image" alt="Product" class="img-fluid rounded" />
              </div>
              <div>
                <h5 class="mb-0">
                  <RouterLink to="/apps/ecommerce/products" class="link-reset">{{ item.product.name }}</RouterLink>
                </h5>
              </div>
            </div>
          </template>
          <template #cell(reviewer)="{ item }">
            <div class="d-flex justify-content-start align-items-center gap-2">
              <div class="avatar avatar-sm">
                <img :src="item.user.image" alt="avatar-8" class="img-fluid rounded-circle" />
              </div>
              <div>
                <h5 data-sort="reviewer" class="text-nowrap fs-sm mb-0 lh-base">{{ item.user.name }}</h5>
                <p class="text-muted fs-xs mb-0">{{ item.user.email }}</p>
              </div>
            </div>
          </template>
          <template #cell(review)="{ item }">
            <div style="max-width: 18rem">
              <Rating :rating="item.rating" class="d-inline-flex align-items-center gap-1" />
              <h5 class="mt-2 text-wrap">{{ item.message }}</h5>
              <p class="text-muted text-wrap fst-italic mb-0">"{{ item.description }}"</p>
            </div>
          </template>
          <template #cell(date)="{ item }">
            {{ item.date }} <small class="text-muted">{{ item.time }}</small>
          </template>
          <template #cell(status)="{ item }">
            <span class="badge fs-xxs" :class="item.status === 'published' ? 'badge-soft-success' : 'badge-soft-warning'">{{ toPascalCase(item.status) }}</span>
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
          <TablePagination v-model:currentPage="currentPage" :per-page="perPage" :total-items="totalRows" label="reviews" />
        </BCardFooter>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { BButton, BCard, BCardFooter, BCardHeader, BCol, BDropdown, BDropdownItem, BFormSelect, BProgress, BProgressBar, BRow, BTable, type TableFieldRaw } from 'bootstrap-vue-next'
import { ref } from 'vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import Rating from '~/components/Rating.vue'
import TablePagination from '~/components/TablePagination.vue'
import ApexChart from '~/components/wrappers/ApexChart.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { useTableActions } from '~/composables/useTableActions'
import { toPascalCase } from '~/utils/helpers'
import { getReviewChartOptions, productReviewData, type ProductReviewType } from './components/data'

const fields: Exclude<TableFieldRaw<ProductReviewType>, string>[] = [
  { key: 'id', label: 'Id' },
  { key: 'name', label: 'Product', sortable: true },
  { key: 'reviewer', label: 'Reviewer', sortable: true },
  { key: 'review', label: 'Review' },
  { key: 'date', label: 'Date', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'action', label: 'Action', sortable: false },
]

const searchQuery = ref('')

const perPageOptions = [5, 10, 20, 50]

const currentPage = ref(1)
const perPage = ref(5)
const totalRows = ref(productReviewData.length)
const products = ref<ProductReviewType[]>(productReviewData)

function onFiltered(filteredItems: ProductReviewType[]) {
  totalRows.value = filteredItems.length
  currentPage.value = 1
}

function adjustPage() {
  const totalPages = Math.ceil(products.value.length / perPage.value)
  if (currentPage.value > totalPages) {
    currentPage.value = totalPages || 1
  }
}

function handleDeleteItem(item: ProductReviewType) {
  deleteItem(item)
  totalRows.value = products.value.length
  adjustPage()
}

function handleDeleteSelected() {
  deleteSelected()
  totalRows.value = products.value.length
  adjustPage()
}

type RatingType = {
  label: string
  value: number
  count: number
}

const ratings: RatingType[] = [
  { label: '5 Star', value: 85, count: 128 },
  { label: '4 Star', value: 10, count: 37 },
  { label: '3 Star', value: 3, count: 15 },
  { label: '2 Star', value: 1, count: 7 },
  { label: '1 Star', value: 1, count: 2 },
]

const { selected, toggleSelectAll, onToggleRow, deleteSelected, deleteItem, allSelected, isIndeterminate } = useTableActions(products)
</script>

<style scoped></style>
