<template>
  <PageBreadcrumb title="Refunds" subtitle="Ecommerce" />

  <BRow class="row-cols-xxl-5 row-cols-md-3 row-cols-1 align-items-center g-1">
    <BCol v-for="(item, idx) in refundStatData" :key="idx">
      <RefundStatisticCard :item="item" />
    </BCol>
  </BRow>

  <BRow>
    <BCol cols="12">
      <BCard no-body>
        <BCardHeader class="border-light justify-content-between">
          <div class="d-flex gap-2">
            <div class="app-search">
              <BFormInput v-model="searchQuery" type="search" placeholder="Search refunds..." />
              <Icon icon="search" class="app-search-icon text-muted" />
            </div>

            <BButton v-if="selected.length" variant="danger" @click="handleDeleteSelected"> Delete </BButton>
          </div>

          <div class="d-flex align-items-center gap-2 flex-wrap">
            <span class="me-2 fw-semibold">Filter By:</span>

            <div class="app-search">
              <BFormSelect v-model="refundStatus" class="form-control my-1 my-md-0">
                <option value="All">Refund Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Refunded">Refunded</option>
              </BFormSelect>
              <Icon icon="banknote-arrow-down" class="app-search-icon text-muted" />
            </div>

            <div>
              <BFormSelect v-model="perPage" :options="perPageOptions" class="form-control my-1 my-md-0" />
            </div>
          </div>

          <div class="d-flex gap-1">
            <BButton variant="primary" class="ms-1" v-b-modal.createRefundModal> <Icon icon="plus" class="fs-sm me-2" /> Create Refund </BButton>
          </div>
        </BCardHeader>

        <BTable
          show-empty
          :filter="searchQuery"
          empty-text="No products found."
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
          <template #cell(id)="data">
            <input class="form-check-input form-check-input-light fs-14 product-item-check mt-0" type="checkbox" :value="data.item" :checked="selected.includes(data.item)" @change="onToggleRow(data.item, $event)" />
          </template>

          <template #cell(orderId)="{ item }">
            <h5 class="fs-sm mb-0">
              <RouterLink to="/apps/ecommerce/order-details" class="link-reset">{{ item.orderId }}</RouterLink>
            </h5>
          </template>
          <template #cell(product)="{ item }">
            <div class="d-flex align-items-center gap-2">
              <img :src="item.product.image" alt="" class="rounded" width="34" height="34" />
              <div>
                <div class="fw-medium">{{ item.product.name }}</div>
                <small class="text-muted">SKU: {{ item.product.sku }}</small>
              </div>
            </div>
          </template>
          <template #cell(customer)="{ item }">
            <div class="d-flex justify-content-start align-items-center gap-2">
              <div class="avatar avatar-sm">
                <img :src="item.customer.image" alt="avatar-5" class="img-fluid rounded-circle" />
              </div>
              <div>
                <h5 class="text-nowrap fs-base mb-0 lh-base">{{ item.customer.name }}</h5>
                <p class="text-muted fs-xs mb-0">{{ item.customer.email }}</p>
              </div>
            </div>
          </template>
          <template #cell(payment)="{ item }"> <img :src="item.payment.image" alt="" class="me-2" height="28" /> {{ item.payment.type === 'card' ? item.payment.number : item.payment.name }} </template>
          <template #cell(processedDate)="{ item }"> {{ item.processedDate ? item.processedDate : '-' }} </template>
          <template #cell(status)="{ item }">
            <span class="badge badge-label" :class="item.status === 'rejected' ? 'badge-soft-danger' : item.status === 'pending' ? 'badge-soft-warning' : item.status === 'refunded' ? 'badge-soft-secondary' : 'badge-soft-success'">
              {{ toPascalCase(item.status) }}
            </span>
          </template>

          <template #cell(action)="{ item }">
            <div class="d-flex justify-content-center gap-1">
              <button class="btn btn-default btn-icon btn-sm rounded-circle">
                <Icon icon="check" class="fs-lg" />
              </button>
              <button class="btn btn-default btn-icon btn-sm rounded-circle">
                <Icon icon="x" class="fs-lg" />
              </button>
              <button class="btn btn-default btn-icon btn-sm rounded-circle">
                <Icon icon="trash-2" class="fs-lg" @click="handleDeleteItem(item)" />
              </button>

              <BDropdown size="sm" toggle-class="btn-icon btn-default dropdown-toggle drop-arrow-none rounded-circle" end>
                <template #button-content>
                  <Icon icon="ellipsis-vertical" class="fs-lg" />
                </template>

                <BDropdownItem href="">View order</BDropdownItem>
                <BDropdownItem href="">Contact customer</BDropdownItem>
                <BDropdownDivider />
                <BDropdownItem href="">Add note</BDropdownItem>
              </BDropdown>
            </div>
          </template>
        </BTable>

        <BCardFooter class="border-0">
          <TablePagination v-model:currentPage="currentPage" :per-page="perPage" :total-items="totalRows" label="refunds" />
        </BCardFooter>
      </BCard>
    </BCol>
  </BRow>

  <AddRefundModal />
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { BButton, BFormSelect, BTable } from 'bootstrap-vue-next'
import { vBModal } from 'bootstrap-vue-next/directives/BModal'
import { ref } from 'vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import TablePagination from '~/components/TablePagination.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { useTableActions } from '~/composables/useTableActions'
import { toPascalCase } from '~/utils/helpers'
import AddRefundModal from './components/AddRefundModal.vue'
import { refundData, refundStatData, type RefundType } from './components/data'
import RefundStatisticCard from './components/RefundStatisticCard.vue'

const refundStatus = ref('All')

const fields = [
  { key: 'id', label: 'id' },
  { key: 'orderId', label: 'Order Id', sortable: true },
  { key: 'product', label: 'Product' },
  { key: 'customer', label: 'Customer' },
  { key: 'reason', label: 'Reason' },
  { key: 'payment', label: 'Payment', sortable: true },
  { key: 'amount', label: 'Amount', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'requestedDate', label: 'Requested' },
  { key: 'processedDate', label: 'Processed' },
  { key: 'action', label: 'Actions', sortable: false },
]

const searchQuery = ref('')
const perPageOptions = [5, 8, 10, 20, 50]
const currentPage = ref(1)
const perPage = ref(8)
const totalRows = ref(refundData.length)
const products = ref<RefundType[]>(refundData)

function onFiltered(filteredItems: RefundType[]) {
  totalRows.value = filteredItems.length
  currentPage.value = 1
}

function adjustPage() {
  const totalPages = Math.ceil(products.value.length / perPage.value)
  if (currentPage.value > totalPages) {
    currentPage.value = totalPages || 1
  }
}

function handleDeleteItem(item: RefundType) {
  deleteItem(item)
  totalRows.value = products.value.length
  adjustPage()
}

function handleDeleteSelected() {
  deleteSelected()
  totalRows.value = products.value.length
  adjustPage()
}

const { selected, toggleSelectAll, onToggleRow, deleteSelected, deleteItem, allSelected, isIndeterminate } = useTableActions(products)
</script>
<style scoped></style>
