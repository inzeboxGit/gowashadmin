<template>
  <BCard no-body>
    <BCardHeader class="border-light justify-content-between">
      <div class="d-flex gap-2 flex-wrap">
        <div class="app-search">
          <BFormInput v-model="searchQuery" type="search" placeholder="Search leads..." />
          <Icon icon="search" class="app-search-icon text-muted" />
        </div>

        <BButton variant="primary" @click="showAddLead = true"> <Icon icon="plus" class="me-1" /> New Leads </BButton>

        <BButton v-if="selected.length" variant="danger" @click="deleteSelected">Delete</BButton>
      </div>

      <div class="d-flex align-items-center gap-2 flex-wrap">
        <span class="me-2 fw-semibold">Filter By:</span>

        <div class="app-search">
          <BFormSelect v-model="filterStatus" class="form-control">
            <option value="">Status</option>
            <option value="In Progress">In Progress</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Follow Up">Follow Up</option>
            <option value="Pending">Pending</option>
            <option value="Negotiation">Negotiation</option>
            <option value="Rejected">Rejected</option>
          </BFormSelect>
          <Icon icon="shuffle" class="app-search-icon text-muted" />
        </div>

        <div class="app-search">
          <BFormSelect v-model="filterRange" class="form-control">
            <option value="">Amount Range</option>
            <option value="0-100000">$0 - $100000</option>
            <option value="100001-250000">$100001 - $250000</option>
            <option value="250001-500000">$250001 - $500000</option>
            <option value="500000+">$500000+</option>
          </BFormSelect>
          <Icon icon="dollar-sign" class="app-search-icon text-muted" />
        </div>

        <div>
          <BFormSelect v-model="perPage" :options="perPageOptions" class="form-control" />
        </div>
      </div>
    </BCardHeader>

    <BTable hover responsive show-empty empty-text="No leads found." :items="paginatedData" :fields="fields" class="table-custom table-centered table-select mb-0 w-100" thead-class="bg-light align-middle bg-opacity-25 thead-sm text-nowrap">
      <template #head()="item">
        <span class="text-uppercase fs-xxs">{{ item.label }}</span>
      </template>

      <template #head(select)>
        <input type="checkbox" class="form-check-input form-check-input-light fs-14 mt-0" :checked="allSelected" :indeterminate="isIndeterminate" @change="toggleSelectAll" />
      </template>

      <template #cell(select)="{ item }">
        <input type="checkbox" class="form-check-input form-check-input-light fs-14 mt-0" :checked="selected.includes(item)" @change="(e) => onToggleRow(item, e)" />
      </template>

      <template #cell(company)="{ item }">
        <div class="d-flex align-items-center">
          <div class="avatar-sm border flex-shrink-0 border-dashed rounded-circle me-2 d-flex justify-content-center align-items-center">
            <img :src="item.image" alt="Logo" height="20" />
          </div>
          <RouterLink to="#!" class="link-reset">{{ item.company }}</RouterLink>
        </div>
      </template>

      <template #cell(amount)="{ item }">{{ item.amount.toLocaleString() }} </template>

      <template #cell(tag)="{ item }">
        <span :class="`badge badge-label bg-${item.tag.className}-subtle text-${item.tag.className}`">
          {{ item.tag.label }}
        </span>
      </template>

      <template #cell(assigned)="{ item }">
        <img :src="item.assigned.image" class="avatar-xs rounded-circle" :alt="item.assigned.name" :title="item.assigned.name" />
      </template>

      <template #cell(status)="{ item }">
        <span :class="statusBadge(item.status)">
          {{ formatStatus(item.status) }}
        </span>
      </template>

      <template #head(actions)>
        <span class="text-uppercase d-flex justify-content-center fs-xxs">Actions</span>
      </template>

      <template #cell(actions)="{ item }">
        <div class="d-flex align-items-center justify-content-center gap-1">
          <BButton size="sm" class="btn-default btn-icon rounded-circle">
            <Icon icon="eye" class="fs-lg" />
          </BButton>
          <BButton size="sm" class="btn-default btn-icon rounded-circle">
            <Icon icon="square-pen" class="fs-lg" />
          </BButton>
          <BButton size="sm" class="btn-default btn-icon rounded-circle" @click="deleteItem(item)">
            <Icon icon="trash-2" class="fs-lg" />
          </BButton>
        </div>
      </template>
    </BTable>

    <BCardFooter>
      <TablePagination v-model:currentPage="currentPage" :total-items="filteredData.length" :per-page="perPage" label="Leads" />
    </BCardFooter>
  </BCard>

  <BModal v-model="showAddLead" title="Add New Lead" size="lg" hide-footer ok-title="Save Lead" cancel-variant="light">
    <form @submit.prevent="saveLead">
      <BRow class="g-3">
        <BCol md="6">
          <label class="form-label">Lead Name</label>
          <BFormInput v-model="form.leadName" type="text" placeholder="Enter lead name" required />
        </BCol>

        <BCol md="6">
          <label class="form-label">Company</label>
          <BFormInput v-model="form.company" type="text" placeholder="Enter company name" required />
        </BCol>

        <BCol md="6">
          <label class="form-label">Email</label>
          <BFormInput v-model="form.email" type="email" placeholder="Enter email" required />
        </BCol>

        <BCol md="6">
          <label class="form-label">Phone</label>
          <BFormInput v-model="form.phone" type="tel" placeholder="+1 234-567-8910" />
        </BCol>

        <BCol md="6">
          <label class="form-label">Amount (USD)</label>
          <BFormInput v-model.number="form.amount" type="number" placeholder="e.g. 50000" />
        </BCol>

        <BCol md="6">
          <label class="form-label">Status</label>
          <BFormSelect v-model="form.status">
            <option value="">Select status</option>
            <option>In Progress</option>
            <option>Proposal Sent</option>
            <option>Follow Up</option>
            <option>Pending</option>
            <option>Negotiation</option>
            <option>Rejected</option>
          </BFormSelect>
        </BCol>

        <BCol md="6">
          <label class="form-label">Assign To</label>
          <BFormSelect v-model="form.assignedTo">
            <option value="">Select user</option>
            <option value="1">Emily Carter</option>
            <option value="2">Rohan Iyer</option>
            <option value="3">Sara Kim</option>
            <option value="4">Kevin Nguyen</option>
          </BFormSelect>
        </BCol>
      </BRow>
    </form>
  </BModal>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { BButton, BCard, BCardFooter, BCardHeader, BCol, BFormSelect, BRow, BTable } from 'bootstrap-vue-next'
import { computed, ref } from 'vue'
import TablePagination from '~/components/TablePagination.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { useTableActions } from '~/composables/useTableActions'
import { leadsData } from './data'

// state
const showAddLead = ref(false)
const searchQuery = ref('')
const filterStatus = ref('')
const filterRange = ref('')
const perPage = ref(8)
const perPageOptions = [5, 8, 10, 15, 20]
const currentPage = ref(1)
const items = ref([...leadsData])

// Define status type
type LeadStatus = 'in-progress' | 'proposal-sent' | 'follow-up' | 'pending' | 'rejected' | 'negotiation'

// Convert readable → slug with type safety
const normalizeStatus = (status: string): LeadStatus => {
  const normalized = status.toLowerCase().replace(/ /g, '-')
  // Ensure the normalized status is one of the allowed values
  const validStatuses: LeadStatus[] = ['in-progress', 'proposal-sent', 'follow-up', 'pending', 'rejected', 'negotiation']
  return validStatuses.includes(normalized as LeadStatus) ? (normalized as LeadStatus) : 'pending'
}

// NEW unified status mapping
const statusLabels: Record<string, string> = {
  'in-progress': 'In Progress',
  'proposal-sent': 'Proposal Sent',
  'follow-up': 'Follow Up',
  pending: 'Pending',
  negotiation: 'Negotiation',
  rejected: 'Rejected',
}

// Badge mapping
const statusBadge = (status: string) => {
  const s = normalizeStatus(status)
  return {
    'badge bg-success-subtle text-success': s === 'in-progress',
    'badge bg-primary-subtle text-primary': s === 'proposal-sent',
    'badge bg-info-subtle text-info': s === 'follow-up',
    'badge bg-warning-subtle text-warning': s === 'pending',
    'badge bg-secondary-subtle text-secondary': s === 'negotiation',
    'badge bg-danger-subtle text-danger': s === 'rejected',
  }
}

const formatStatus = (status: string) => statusLabels[normalizeStatus(status)]

// form
const form = ref({
  leadName: '',
  company: '',
  email: '',
  phone: '',
  amount: '',
  status: '',
  assignedTo: '',
})

// SAVE LEAD FIXED
const saveLead = () => {
  items.value.unshift({
    id: String(items.value.length + 1),
    customer: form.value.leadName,
    company: form.value.company,
    image: '/images/logos/placeholder-logo.svg',
    email: form.value.email,
    phone: form.value.phone,
    amount: form.value.amount ?? 0,
    status: normalizeStatus(form.value.status),
    assigned: { image: '/placeholder.png', name: 'NA' },
    tag: { label: 'New', className: 'info' },
    createdDate: new Date().toLocaleDateString(),
  })

  showAddLead.value = false
  form.value = { leadName: '', company: '', email: '', phone: '', amount: '', status: '', assignedTo: '' }
}

// table selection composable
const { selected, allSelected, isIndeterminate, toggleSelectAll, deleteSelected, deleteItem, onToggleRow } = useTableActions(items)

// fields
const fields = [
  { key: 'select' },
  { key: 'id', label: 'Lead ID' },
  { key: 'customer', label: 'Customer' },
  { key: 'company', label: 'Company' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'amount', label: 'Amount (USD)' },
  { key: 'tag', label: 'Tags' },
  { key: 'assigned', label: 'Assigned' },
  { key: 'status', label: 'Status' },
  { key: 'createdDate', label: 'Created' },
  { key: 'actions' },
]

// FILTERING FIXED
const filteredData = computed(() => {
  let data = [...items.value]

  // Status filter supports readable text
  if (filterStatus.value) {
    const slug = normalizeStatus(filterStatus.value)
    data = data.filter((item) => normalizeStatus(item.status) === slug)
  }

  // Range filter
  if (filterRange.value) {
    let min = 0
    let max = Infinity

    if (filterRange.value.includes('+')) {
      min = Number(filterRange.value.replace('+', '')) || 0
    } else {
      const parts = filterRange.value.split('-')
      min = Number(parts[0]) || 0
      max = Number(parts[1]) || Infinity
    }

    data = data.filter((item) => Number(item.amount) >= min && Number(item.amount) <= max)
  }

  return data
})

// pagination
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  return filteredData.value.slice(start, start + perPage.value)
})
</script>
