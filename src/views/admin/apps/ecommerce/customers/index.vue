<template>
  <PageBreadcrumb title="Customers" subtitle="Ecommerce" />

  <BRow>
    <BCol xxl="12">
      <BCard no-body>
        <BCardHeader class="border-light d-flex align-items-center justify-content-between flex-wrap gap-2">
          <div class="d-flex gap-2">
            <div class="app-search">
              <BFormInput type="search" class="form-control" v-model="searchQuery" placeholder="Search customer..." />
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

            <BButton variant="primary" @click="customerModal = !customerModal"> <Icon icon="plus" class="fs-sm me-1" /> Add Customer </BButton>
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
          :items="customers"
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
            <div class="d-flex align-items-center gap-2">
              <div class="avatar avatar-sm">
                <img :src="item.customer.image" alt="avatar-7" class="img-fluid rounded-circle" />
              </div>
              <div>
                <h5 class="mb-0">
                  <RouterLink to="/pages/profile" class="link-reset">{{ item.customer.name }}</RouterLink>
                </h5>
              </div>
            </div>
          </template>
          <template #cell(country)="{ item }">
            <img :src="item.country.flag" alt="" class="rounded-circle me-1" height="16" />
            {{ item.country.name }}
          </template>
          <template #cell(joinedDate)="{ item }">
            {{ item.joinedDate }} <small class="text-muted">{{ item.joinedTime }}</small>
          </template>
          <template #cell(totalSpent)="{ item }"> {{ item.totalSpends }} </template>
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
          <TablePagination v-model:currentPage="currentPage" :per-page="perPage" :total-items="totalRows" label="customers" />
        </BCardFooter>
      </BCard>
    </BCol>
  </BRow>

  <BModal v-model="customerModal" size="lg" centered fade title="Add New Customer" cancel-variant="light" ok-title="Add Customer">
    <BForm id="addCustomerForm">
      <BRow>
        <BCol md="6">
          <BFormGroup label="Full Name" label-for="customerName">
            <BFormInput type="text" id="customerName" placeholder="e.g. Carlos Méndez" required />
          </BFormGroup>
        </BCol>
        <BCol md="6">
          <BFormGroup class="mb-3" label="Email" label-for="customerEmail">
            <BFormInput type="email" id="customerEmail" placeholder="e.g. carlos@domain.com" required />
          </BFormGroup>
        </BCol>
        <BCol md="6">
          <BFormGroup class="mb-3" label="Phone" label-for="customerPhone">
            <BFormInput type="tel" id="customerPhone" placeholder="+1 (415) 992-3412" required />
          </BFormGroup>
        </BCol>
        <BCol md="6">
          <BFormGroup class="mb-3" label="Country" label-for="customerCountry">
            <BFormSelect id="customerCountry" required>
              <option value="">Select Country</option>
              <option value="United States">🇺🇸 United States</option>
              <option value="Canada">🇨🇦 Canada</option>
              <option value="United Kingdom">🇬🇧 United Kingdom</option>
              <option value="India">🇮🇳 India</option>
            </BFormSelect>
          </BFormGroup>
        </BCol>
        <BCol md="6">
          <BFormGroup label="Avatar" label-for="customerAvatar">
            <BFormFile id="customerAvatar" accept="image/*" />
          </BFormGroup>
        </BCol>
        <BCol md="6">
          <BFormGroup label="Join Date" label-for="joinedDate">
            <FlatPickr v-model="joinedDate" :config="{ dateFormat: 'd M, Y', defaultDate: 'today' }" class="form-control" />
          </BFormGroup>
        </BCol>
      </BRow>
    </BForm>
  </BModal>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { BCard, BCardFooter, BCardHeader, BCol, BFormSelect, BRow, type TableFieldRaw } from 'bootstrap-vue-next'
import { ref } from 'vue'
import FlatPickr from 'vue-flatpickr-component'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import TablePagination from '~/components/TablePagination.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { useTableActions } from '~/composables/useTableActions'
import { customerData, type CustomerType } from './components/data'

const joinedDate = ref('')

const customerModal = ref(false)

const fields: Exclude<TableFieldRaw<CustomerType>, string>[] = [
  { key: 'id', label: 'Id' },
  { key: 'name', label: 'Client Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'phone', label: 'Phone', sortable: true },
  { key: 'country', label: 'Country', sortable: true },
  { key: 'joinedDate', label: 'Joined', sortable: true },
  { key: 'orders', label: 'Orders', sortable: true },
  { key: 'totalSpent', label: 'Total Spends', sortable: true },
  { key: 'action', label: 'Action', sortable: false },
]

const searchQuery = ref('')

const perPageOptions = [5, 8, 10, 20, 50]

const currentPage = ref(1)
const perPage = ref(8)
const totalRows = ref(customerData.length)
const customers = ref<CustomerType[]>(customerData)

function onFiltered(filteredItems: CustomerType[]) {
  totalRows.value = filteredItems.length
  currentPage.value = 1
}

function adjustPage() {
  const totalPages = Math.ceil(customers.value.length / perPage.value)
  if (currentPage.value > totalPages) {
    currentPage.value = totalPages || 1
  }
}

function handleDeleteItem(item: CustomerType) {
  deleteItem(item)
  totalRows.value = customers.value.length
  adjustPage()
}

function handleDeleteSelected() {
  deleteSelected()
  totalRows.value = customers.value.length
  adjustPage()
}

const { selected, toggleSelectAll, onToggleRow, deleteSelected, deleteItem, allSelected, isIndeterminate } = useTableActions(customers)
</script>

<style scoped></style>
