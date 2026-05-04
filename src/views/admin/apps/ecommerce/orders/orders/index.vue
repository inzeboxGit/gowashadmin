<template>
  <PageBreadcrumb title="Orders" subtitle="Ecommerce" />

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
            <span class="me-2 fw-semibold">Filter By:</span>

            <div class="app-search">
              <BFormSelect v-model="status" class="form-control my-1 my-md-0">
                <option value="All">Payment Status</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
                <option value="Refunded">Refunded</option>
              </BFormSelect>
              <Icon icon="credit-card" class="app-search-icon text-muted" />
            </div>

            <div class="app-search">
              <BFormSelect v-model="deliveryStatus" class="form-control my-1 my-md-0">
                <option value="All">Delivery Status</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </BFormSelect>
              <Icon icon="truck" class="app-search-icon text-muted" />
            </div>

            <div class="app-search">
              <BFormSelect v-model="dateRange" class="form-control my-1 my-md-0">
                <option value="All">Date Range</option>
                <option value="Today">Today</option>
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="This Year">This Year</option>
              </BFormSelect>
              <Icon icon="calendar" class="app-search-icon text-muted" />
            </div>

            <div>
              <BFormSelect v-model="perPage" :options="perPageOptions" class="form-control my-1 my-md-0" />
            </div>
          </div>

          <div class="d-flex gap-1">
            <RouterLink to="/apps/ecommerce/order-add" class="btn btn-danger ms-1"> <Icon icon="plus" class="fs-sm me-2" /> Add Order </RouterLink>
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
          :items="orders"
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
          <template #cell(id)="{ item }">
            <h5 class="fs-sm mb-0 fw-medium">
              <RouterLink to="/apps/ecommerce/order-details" class="link-reset">#{{ item.id }}</RouterLink>
            </h5>
          </template>
          <template #cell(date)="{ item }">
            {{ item.date }} <small class="text-muted">{{ item.time }}</small>
          </template>
          <template #cell(customer)="{ item }">
            <div class="d-flex justify-content-start align-items-center gap-2">
              <div class="avatar avatar-sm">
                <img :src="item.customer.image" alt="avatar-2" class="img-fluid rounded-circle" />
              </div>
              <div>
                <h5 class="text-nowrap fs-base mb-0 lh-base">{{ item.customer.name }}</h5>
                <p class="text-muted fs-xs mb-0">{{ item.customer.email }}</p>
              </div>
            </div>
          </template>
          <template #cell(amount)="{ item }"> {{ item.amount }} </template>
          <template #cell(paymentStatus)="{ item }">
            <span class="fw-semibold" :class="item.paymentStatus === 'paid' ? 'text-success' : item.paymentStatus === 'pending' ? 'text-warning' : 'text-danger'"> <Icon icon="circle" class="fs-sm" /> {{ toPascalCase(item.paymentStatus) }} </span>
          </template>
          <template #cell(orderStatus)="{ item }">
            <span class="badge fs-xxs" :class="item.orderStatus === 'cancelled' ? 'badge-soft-danger' : item.orderStatus === 'processing' ? 'badge-soft-warning' : item.orderStatus === 'shipped' ? 'badge-soft-info' : 'badge-soft-success'">{{
              toPascalCase(item.orderStatus)
            }}</span>
          </template>
          <template #cell(paymentMethod)="{ item }">
            <img :src="item.paymentMethod.image" alt="" class="me-2" height="28" />
            {{ item.paymentMethod.type === 'card' ? item.paymentMethod.cardNumber : item.paymentMethod.type === 'upi' ? item.paymentMethod.upiId : item.paymentMethod.email }}
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
import { orderData, orderStatData, type OrderType } from './components/data'

const deliveryStatus = ref('All')
const status = ref('All')
const dateRange = ref('All')

const fields: Exclude<TableFieldRaw<OrderType>, string>[] = [
  { key: 'checkbox', label: '' },
  { key: 'id', label: 'Order Id', sortable: true },
  { key: 'date', label: 'Date', sortable: true },
  { key: 'customer', label: 'Customer', sortable: true },
  { key: 'amount', label: 'Amount', sortable: true },
  { key: 'paymentStatus', label: 'Payment Status', sortable: true },
  { key: 'orderStatus', label: 'Order Status', sortable: true },
  { key: 'paymentMethod', label: 'Payment Method' },
  { key: 'action', label: 'Action', sortable: false },
]

const searchQuery = ref('')

const perPageOptions = [5, 8, 10, 20, 50]

const currentPage = ref(1)
const perPage = ref(8)
const orders = ref<OrderType[]>(orderData)
const totalRows = ref(orders.value.length)

function onFiltered(filteredItems: OrderType[]) {
  totalRows.value = filteredItems.length
  currentPage.value = 1
}

function adjustPage() {
  const totalPages = Math.ceil(orders.value.length / perPage.value)
  if (currentPage.value > totalPages) {
    currentPage.value = totalPages || 1
  }
}

function handleDeleteItem(item: OrderType) {
  deleteItem(item)
  totalRows.value = orders.value.length
  adjustPage()
}

function handleDeleteSelected() {
  deleteSelected()
  totalRows.value = orders.value.length
  adjustPage()
}

const { selected, toggleSelectAll, onToggleRow, deleteSelected, deleteItem, allSelected, isIndeterminate } = useTableActions(orders)
</script>

<style scoped></style>
