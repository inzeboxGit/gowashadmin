<template>
  <PageBreadcrumb title="Sallers" subtitle="Ecommerce" />

  <BRow class="justify-content-center">
    <BCol xs="12">
      <BCard no-body>
        <BCardHeader class="border-light justify-content-between">
          <div class="d-flex gap-2">
            <div class="app-search">
              <BFormInput v-model="searchQuery" type="search" placeholder="Search seller..." />
              <Icon icon="search" class="app-search-icon text-muted" />
            </div>
            <BButton v-if="selected.length" variant="danger" @click="handleDeleteSelected"> Delete </BButton>
          </div>

          <div class="d-flex align-items-center gap-2">
            <span class="me-2 fw-semibold">Filter By:</span>

            <div class="app-search">
              <BFormSelect v-model="orders" class="form-control my-1 my-md-0">
                <option value="All">Orders</option>
                <option value="20000+">Top Orders</option>
                <option value="0-20000">Low Orders</option>
                <option value="0">No Orders</option>
              </BFormSelect>
              <Icon icon="shopping-cart" class="app-search-icon text-muted" />
            </div>

            <div class="app-search">
              <BFormSelect v-model="revenue" class="form-control my-1 my-md-0">
                <option value="All">Revenue</option>
                <option value="100k+">Top Revenue</option>
                <option value="50k-100k">Low Revenue</option>
                <option value="0">No Revenue</option>
              </BFormSelect>
              <Icon icon="dollar-sign" class="app-search-icon text-muted" />
            </div>

            <div class="app-search">
              <BFormSelect v-model="rating" class="form-control my-1 my-md-0">
                <option value="All">Ratings</option>
                <option value="4-5">Top Rated</option>
                <option value="1-3">Low Rated</option>
                <option value="0">No Ratings</option>
              </BFormSelect>
              <Icon icon="star" class="app-search-icon text-muted" />
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
          :items="sellers"
          :per-page="perPage"
          :current-page="currentPage"
          @filtered="onFiltered"
          responsive
          class="table table-custom table-nowrap table-centered mb-0 w-100"
          thead-tr-class="text-uppercase fs-xxs"
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
          <template #cell(seller)="{ item }">
            <div class="d-flex align-items-center">
              <div class="avatar-md me-3">
                <img :src="item.seller.image" :alt="item.seller.name" class="img-fluid rounded" />
              </div>
              <div>
                <h5 class="mb-1">
                  <RouterLink to="/apps/ecommerce/sellers" class="link-reset">{{ item.seller.name }}</RouterLink>
                </h5>
                <p class="text-muted mb-0 fs-xxs">Since {{ item.seller.since }}</p>
              </div>
            </div>
          </template>
          <template #cell(rating)="{ item }">
            <Rating :rating="item.rating" class="d-inline-flex align-items-center gap-1" />

            <span class="ms-1">
              <RouterLink to="/apps/ecommerce/reviews" class="link-reset fw-semibold">({{ item.rating }})</RouterLink>
            </span>
          </template>
          <template #cell(location)="{ item }">
            <span class="badge p-1 text-bg-light fs-sm">
              <img :src="item.country.flag" :alt="item.country.code" class="rounded-circle me-1" height="12" />
              {{ item.country.code }}
            </span>
          </template>
          <template #cell(balance)="{ item }"> {{ item.balance }}</template>
          <template #cell(rank)="{ item }"> {{ item.rank }} </template>
          <template #cell(report)="{ item }">
            <ApexChart :getOptions="item.reportChartOptions" :series="item.reportChartOptions().series" :height="30" style="max-width: 100px" />
          </template>
        </BTable>
        <BCardFooter class="border-0">
          <TablePagination v-model:currentPage="currentPage" :per-page="perPage" :total-items="totalRows" label="sellers" />
        </BCardFooter>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import type { TableFieldRaw } from 'bootstrap-vue-next'
import { ref } from 'vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import Rating from '~/components/Rating.vue'
import TablePagination from '~/components/TablePagination.vue'
import ApexChart from '~/components/wrappers/ApexChart.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { useTableActions } from '~/composables/useTableActions'
import { sellerData, type SellerType } from './components/data'

const orders = ref('All')
const revenue = ref('All')
const rating = ref('All')

const fields: Exclude<TableFieldRaw<SellerType>, string>[] = [
  { key: 'id', label: 'Id' },
  { key: 'seller', label: 'Seller', sortable: true },
  { key: 'products', label: 'Products', sortable: true },
  { key: 'orders', label: 'Orders', sortable: true },
  { key: 'rating', label: 'Rating', sortable: true },
  { key: 'location', label: 'Location', sortable: true },
  { key: 'balance', label: 'Balance', sortable: true },
  { key: 'rank', label: 'Rank', sortable: true },
  { key: 'report', label: 'Report' },
]

const searchQuery = ref('')

const perPageOptions = [5, 8, 10, 20, 50]

const currentPage = ref(1)
const perPage = ref(8)
const totalRows = ref(sellerData.length)
const sellers = ref<SellerType[]>(sellerData)

function onFiltered(filteredItems: SellerType[]) {
  totalRows.value = filteredItems.length
  currentPage.value = 1
}

function adjustPage() {
  const totalPages = Math.ceil(sellers.value.length / perPage.value)
  if (currentPage.value > totalPages) {
    currentPage.value = totalPages || 1
  }
}

function handleDeleteSelected() {
  deleteSelected()
  totalRows.value = sellers.value.length
  adjustPage()
}

const { selected, toggleSelectAll, onToggleRow, deleteSelected, allSelected, isIndeterminate } = useTableActions(sellers)
</script>

<style scoped></style>
