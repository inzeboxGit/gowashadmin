<template>
  <BCard no-body>
    <BCardHeader class="border-light justify-content-between">
      <div class="d-flex gap-2">
        <div class="app-search">
          <BFormInput v-model="searchQuery" type="search" placeholder="Search customers..." />
          <Icon icon="search" class="app-search-icon text-muted" />
        </div>

        <BButton variant="primary" @click="showAddModal = true"> <Icon icon="plus" class="me-1" /> New Customer </BButton>

        <BButton v-if="selectedRows.length" variant="danger" @click="deleteSelected"> Delete </BButton>
      </div>

      <div class="d-flex align-items-center gap-2">
        <span class="me-2 fw-semibold">Filter By:</span>

        <div class="app-search">
          <BFormSelect v-model="filterCountry" class="form-control my-1 my-md-0">
            <option value="">Country</option>
            <option v-for="c in uniqueCountries" :key="c" :value="c">{{ c }}</option>
          </BFormSelect>
          <Icon icon="earth" class="app-search-icon text-muted" />
        </div>

        <div class="app-search">
          <BFormSelect v-model="filterStatus" class="form-control my-1 my-md-0">
            <option value="">Account Status</option>
            <option value="active">Active</option>
            <option value="verification-pending">Verification Pending</option>
            <option value="inactive">Inactive</option>
            <option value="blocked">Blocked</option>
          </BFormSelect>
          <Icon icon="shuffle" class="app-search-icon text-muted" />
        </div>

        <div>
          <BFormSelect v-model="perPage" :options="perPageOptions" class="form-control my-1 my-md-0" />
        </div>
      </div>
    </BCardHeader>

    <BTable
      hover
      responsive
      show-empty
      empty-text="No customers found."
      :items="filteredCustomers"
      :fields="fields"
      v-model:selected-rows="selectedRows"
      :current-page="currentPage"
      :per-page="perPage"
      class="table table-custom table-centered table-select table-hover w-100 mb-0"
      thead-class="bg-light bg-opacity-25 thead-sm"
      thead-tr-class="text-uppercase fs-xxs"
    >
      <template #head()="data">
        <span class="text-uppercase fs-xxs">{{ data.label }}</span>
      </template>

      <template #head(select)>
        <input class="form-check-input fs-14" type="checkbox" :checked="allSelected" :indeterminate="isIndeterminate" @change="toggleSelectAll" />
      </template>

      <template #cell(select)="{ item }">
        <input class="form-check-input fs-14" type="checkbox" :checked="selectedRows.includes(item)" @change="() => toggleRow(item)" />
      </template>

      <template #cell(name)="{ item }">
        <div class="d-flex align-items-center gap-2">
          <img :src="item.user.image" class="avatar-sm rounded-circle" />
          <div>
            <h5 class="mb-0 lh-base fs-base">
              <RouterLink to="/users/profile" class="link-reset">{{ item.user.name }}</RouterLink>
            </h5>
            <p class="text-muted fs-xs mb-0">{{ item.user.email }}</p>
          </div>
        </div>
      </template>
      <template #cell(phone)="{ item }">
        <span>
          {{ item.user.phone }}
        </span>
      </template>

      <template #cell(country)="{ item }">
        <span class="badge p-1 text-bg-light fs-sm">
          <img :src="item.country.flag" class="rounded-circle me-1" height="12" />
          {{ item.country.code }}
        </span>
      </template>

      <template #cell(status)="{ item }">
        <span :class="statusBadge(item.status)">
          {{ formatStatus(item.status) }}
        </span>
      </template>

      <template #cell(actions)="{ item }">
        <div class="d-flex align-items-center justify-content-center gap-1">
          <BButton size="sm" class="btn-default btn-icon rounded-circle">
            <Icon icon="eye" class="fs-lg" />
          </BButton>
          <BButton size="sm" class="btn-default btn-icon rounded-circle">
            <Icon icon="square-pen" class="fs-lg" />
          </BButton>
          <BButton size="sm" class="btn-default btn-icon rounded-circle" @click="deleteRow(item)">
            <Icon icon="trash-2" class="fs-lg" />
          </BButton>
        </div>
      </template>
    </BTable>

    <BCardFooter class="border-0">
      <TablePagination v-model:currentPage="currentPage" :per-page="perPage" :total-items="filteredCustomers.length" label="customers" />
    </BCardFooter>
  </BCard>

  <BModal v-model="showAddModal" title="Add New Customer" size="lg" ok-title="Add Customer" cancel-variant="light">
    <form @submit.prevent="addCustomer">
      <BRow class="g-3">
        <BCol md="6">
          <label class="form-label">Customer Name</label>
          <BFormInput v-model="newCustomer.user.name" type="text" placeholder="Enter full name" required />
        </BCol>

        <BCol md="6">
          <label class="form-label">Email Address</label>
          <BFormInput v-model="newCustomer.user.email" type="email" placeholder="Enter email" required />
        </BCol>

        <BCol md="6">
          <label class="form-label">Phone Number</label>
          <BFormInput v-model="newCustomer.user.phone" type="text" placeholder="e.g. +1 234 567 8900" required />
        </BCol>

        <BCol md="6">
          <label class="form-label">Company</label>
          <BFormInput v-model="newCustomer.company" type="text" placeholder="Company name" />
        </BCol>

        <BCol md="6">
          <label for="country" class="form-label">Country</label>
          <BFormSelect v-model="country" class="form-select" id="country" required>
            <option value="">Select country</option>
            <option value="US">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="IN">India</option>
            <option value="CA">Canada</option>
            <option value="DE">Germany</option>
            <option value="FR">France</option>
            <option value="JP">Japan</option>
            <option value="BR">Brazil</option>
            <option value="EG">Egypt</option>
          </BFormSelect>
        </BCol>

        <BCol md="6">
          <label for="customerType" class="form-label">Customer Type</label>
          <BFormSelect class="form-select" id="customerType" required>
            <option value="">Select type</option>
            <option value="Lead">Lead</option>
            <option value="Prospect">Prospect</option>
            <option value="Client">Client</option>
          </BFormSelect>
        </BCol>

        <BCol md="6">
          <label for="Accostatus" class="form-label">Account Status</label>
          <select class="form-select" id="Accostatus" required>
            <option value="">Select status</option>
            <option value="Active">Active</option>
            <option value="Verification Pending">Verification Pending</option>
            <option value="Inactive">Inactive</option>
            <option value="Blocked">Blocked</option>
          </select>
        </BCol>

        <BCol md="6">
          <label for="joinedDate" class="form-label">Joined Date</label>
          <FlatPickr v-model="joinDate" class="form-control" type="date" :config="{ dateFormat: 'd M, Y', defaultDate: 'today' }" />
        </BCol>
      </BRow>
    </form>
  </BModal>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { computed, ref } from 'vue'
import FlatPickr from 'vue-flatpickr-component'
import TablePagination from '~/components/TablePagination.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { customerData, type CustomerType } from './data'

const searchQuery = ref('')
const filterStatus = ref('')
const filterCountry = ref('')
const country = ref('')
const perPage = ref(8)
const perPageOptions = [5, 8, 10, 15, 20]

const joinDate = ref('')
const currentPage = ref(1)
const selectedRows = ref<CustomerType[]>([])

// Table fields
const fields = [
  { key: 'select', label: '', thStyle: { width: '1%' } },
  { key: 'name', label: 'Customer Name', sortable: true },
  { key: 'phone', label: 'Phone', sortable: true },
  { key: 'country', label: 'Country', sortable: true },
  { key: 'joined', label: 'Joined', sortable: true },
  { key: 'type', label: 'Type', sortable: true },
  { key: 'company', label: 'Company', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'actions', label: 'Actions', thClass: 'text-center' },
]

// Unique country list
const uniqueCountries = [...new Set(customerData.map((c) => c.country.code))]

const filteredCustomers = computed(() => {
  return customerData.filter((item) => {
    return (
      (item.user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || item.user.email.toLowerCase().includes(searchQuery.value.toLowerCase())) &&
      (!filterStatus.value || item.status === filterStatus.value) &&
      (!filterCountry.value || item.country.code === filterCountry.value)
    )
  })
})

const allSelected = computed(() => selectedRows.value.length === filteredCustomers.value.length)
const isIndeterminate = computed(() => selectedRows.value.length > 0 && !allSelected.value)

const toggleRow = (row: CustomerType) => {
  const exists = selectedRows.value.includes(row)
  if (exists) selectedRows.value = selectedRows.value.filter((r) => r !== row)
  else selectedRows.value.push(row)
}

const toggleSelectAll = () => {
  selectedRows.value = allSelected.value ? [] : [...filteredCustomers.value]
}

const statusBadge = (status: string) => {
  return {
    'badge bg-success-subtle text-success badge-label': status === 'active',
    'badge bg-warning-subtle text-warning badge-label': status === 'verification-pending',
    'badge bg-secondary-subtle text-secondary badge-label': status === 'inactive',
    'badge bg-danger-subtle text-danger badge-label': status === 'blocked',
  }
}

const formatStatus = (status: string) =>
  ({
    active: 'Active',
    'verification-pending': 'Verification Pending',
    inactive: 'Inactive',
    blocked: 'Blocked',
  })[status]

// Delete functions
const deleteRow = (item: CustomerType) => {
  const index = customerData.indexOf(item)
  if (index !== -1) customerData.splice(index, 1)
}

const deleteSelected = () => {
  selectedRows.value.forEach((r) => deleteRow(r))
  selectedRows.value = []
}

// Add customer
const showAddModal = ref(false)
const newCustomer = ref<CustomerType>({
  user: {
    name: '',
    email: '',
    image: customerData[0]?.user.image ?? '/placeholder.png',
    phone: '',
  },
  country: {
    code: '',
    flag: '',
  },
  joined: new Date().toDateString(),
  type: 'Lead',
  company: '',
  status: 'active',
})

const addCustomer = () => {
  customerData.push({
    ...newCustomer.value,
    country: {
      code: newCustomer.value.country.code,
      flag: customerData.find((c) => c.country === newCustomer.value.country)?.country.flag || '',
    },
  })

  showAddModal.value = false
  Object.assign(newCustomer.value, {
    id: '',
    name: '',
    email: '',
    phone: '',
    company: '',
    country: {
      code: '',
      flag: '',
    },
    status: 'active',
  })
}
</script>
