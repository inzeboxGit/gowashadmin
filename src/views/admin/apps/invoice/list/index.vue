<template>
  <PageBreadcrumb title="Invoice" subtitle="Apps" />
  <BCard no-body>
    <BCardHeader class="border-light justify-content-between">
      <div class="d-flex gap-2">
        <div class="app-search">
          <BFormInput v-model="searchQuery" type="text" placeholder="Search invoices..." />
          <Icon icon="search" class="app-search-icon text-muted" />
        </div>

        <RouterLink to="/apps/invoice/create" class="btn btn-secondary rounded-circle btn-icon">
          <Icon icon="plus" class="fs-lg" />
        </RouterLink>

        <BButton v-if="selected.length" variant="danger" @click="handleDeleteSelected">Delete</BButton>
      </div>

      <div class="d-flex align-items-center gap-2">
        <span class="me-2 fw-semibold">Filter By:</span>

        <div class="app-search">
          <select v-model="statusFilter" class="form-select form-control my-1 my-md-0">
            <option value="All">Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
            <option value="Draft">Draft</option>
          </select>
          <Icon icon="circle-check" class="app-search-icon text-muted" />
        </div>

        <div>
          <select v-model="perPage" class="form-select form-control my-1 my-md-0">
            <option value="5">5</option>
            <option value="8">8</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
    </BCardHeader>

    <BTable
      show-empty
      :filter="searchQuery"
      empty-text="Nothing found."
      v-model:selected-rows="selected"
      :fields="fields"
      :items="filteredInvoices"
      :per-page="perPage"
      :current-page="currentPage"
      @filtered="onFiltered"
      responsive
      class="table table-custom table-nowrap table-centered mb-0 w-100"
      thead-class="bg-light align-middle bg-opacity-25 thead-sm"
      hover
    >
      <template #head()="data">
        <span class="text-uppercase fs-xxs">{{ data.label }}</span>
      </template>
      <template #head(select)>
        <input class="form-check-input form-check-input-light fs-14 mt-0" type="checkbox" :checked="allSelected" :indeterminate="isIndeterminate" @change="toggleSelectAll" />
      </template>

      <template #cell(select)="data">
        <input class="form-check-input form-check-input-light fs-14 mt-0" type="checkbox" :value="data.item" :checked="selected.includes(data.item)" @change="onToggleRow(data.item, $event)" />
      </template>

      <template #cell(id)="data">
        <h5 class="d-flex align-items-center gap-1">
          <Icon
            icon="receipt-text"
            class="fs-lg"
            :class="{
              'text-success': data.item.status === 'paid',
              'text-warning': data.item.status === 'pending',
              'text-danger': data.item.status === 'overdue',
              'text-info': data.item.status === 'draft',
            }"
          />
          <RouterLink to="/apps/invoice/details" class="link-reset fw-semibold">#{{ data.item.id }}</RouterLink>
        </h5>
      </template>

      <template #cell(date)="{ item }">{{ item.date }}</template>

      <template #cell(name)="{ item }">
        <div class="d-flex align-items-center gap-2">
          <div class="avatar-sm">
            <img v-if="item.user.image" :src="item.user.image" alt="avatar" class="img-fluid rounded-circle" />
            <span v-else class="avatar-title bg-secondary text-white fw-bold rounded-circle">
              {{ getInitials(item.user.name) }}
            </span>
          </div>
          <div>
            <h5 class="mb-0">
              <RouterLink to="/apps/invoice/details" class="link-reset">
                {{ item.user.name }}
              </RouterLink>
            </h5>
            <p class="text-muted mb-0 fs-xxs">{{ item.user.email }}</p>
          </div>
        </div>
      </template>

      <template #cell(purchase)="{ item }">{{ item.purchase }}</template>

      <template #cell(amount)="{ item }">{{ item.amount }} USD</template>

      <template #cell(status)="{ item }">
        <span
          class="badge badge-label"
          :class="{
            'bg-success-subtle text-success': item.status === 'paid',
            'bg-warning-subtle text-warning': item.status === 'pending',
            'bg-danger-subtle text-danger': item.status === 'overdue',
            'bg-info-subtle text-info': item.status === 'draft',
          }"
        >
          {{ toPascalCase(item.status) }}
        </span>
      </template>

      <template #cell(action)="{ item }">
        <div class="d-flex align-items-center justify-content-center gap-1">
          <RouterLink to="/apps/invoice/details" class="btn btn-default btn-icon btn-sm rounded-circle">
            <Icon icon="eye" class="fs-lg" />
          </RouterLink>
          <RouterLink to="" class="btn btn-default btn-icon btn-sm rounded-circle">
            <Icon icon="square-pen" class="fs-lg" />
          </RouterLink>
          <button @click="handleDeleteItem(item)" class="btn btn-default btn-icon btn-sm rounded-circle">
            <Icon icon="trash-2" class="fs-lg" />
          </button>
        </div>
      </template>
    </BTable>

    <BCardFooter class="border-0">
      <TablePagination v-model:currentPage="currentPage" :per-page="perPage" :total-items="filteredInvoices.length" label="products" />
    </BCardFooter>
  </BCard>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { computed, ref } from 'vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import TablePagination from '~/components/TablePagination.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { useTableActions } from '~/composables/useTableActions'
import { toPascalCase } from '~/utils/helpers'
import { invoiceData, type InvoiceType } from './components/data'

const fields = [
  { key: 'select', label: '' },
  { key: 'id', label: 'ID' },
  { key: 'date', label: 'Create & End Date' },
  { key: 'name', label: 'Clients Name', sortable: true },
  { key: 'purchase', label: 'Purchase', sortable: true },
  { key: 'amount', label: 'Amount', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'action', label: 'Actions' },
]

const searchQuery = ref('')
const statusFilter = ref('All')
const perPage = ref(8)
const currentPage = ref(1)
const totalRows = ref(invoiceData.length)
const invoicesData = ref<InvoiceType[]>(invoiceData)

const filteredInvoices = computed(() => {
  return invoicesData.value.filter((inv) => {
    const matchesSearch = inv.user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = statusFilter.value === 'All' || inv.status === statusFilter.value.toLowerCase()
    return matchesSearch && matchesStatus
  })
})

const onFiltered = (filteredItems: InvoiceType[]) => {
  totalRows.value = filteredItems.length
  currentPage.value = 1
}

const adjustPage = () => {
  const totalPages = Math.ceil(filteredInvoices.value.length / perPage.value)
  if (currentPage.value > totalPages) currentPage.value = totalPages || 1
}

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')

const { selected, toggleSelectAll, onToggleRow, deleteSelected, deleteItem, allSelected, isIndeterminate } = useTableActions(invoicesData)

const handleDeleteItem = (item: InvoiceType) => {
  deleteItem(item)
  adjustPage()
}

const handleDeleteSelected = () => {
  deleteSelected()
  adjustPage()
}
</script>
