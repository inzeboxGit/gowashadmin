<template>
  <BCard no-body>
    <BCardHeader class="border-light justify-content-between">
      <div class="d-flex gap-2">
        <div class="app-search">
          <BFormInput v-model="searchQuery" type="search" placeholder="Search deals..." />
          <Icon icon="search" class="app-search-icon text-muted" />
        </div>

        <BButton variant="primary" @click="showModal = true"> <Icon icon="plus" class="me-1" /> New Estimation </BButton>

        <BButton v-if="selected.length" variant="danger" @click="deleteSelected"> Delete </BButton>
      </div>

      <div class="d-flex align-items-center gap-2">
        <span class="fw-semibold me-2">Filter By:</span>

        <div class="app-search">
          <BFormSelect v-model="filterStatus" class="form-control">
            <option value="">Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="declined">Declined</option>
            <option value="sent">Sent</option>
            <option value="in-review">In Review</option>
          </BFormSelect>
          <Icon icon="shuffle" class="app-search-icon text-muted" />
        </div>

        <div class="app-search">
          <BFormSelect v-model="filterRange" class="form-control">
            <option value="">Value Range</option>
            <option value="0-5000">$0 - $5000</option>
            <option value="5001-10000">$5001 - $10000</option>
            <option value="10001-20000">$10001 - $20000</option>
            <option value="20001-50000">$20001 - $50000</option>
            <option value="50000+">$50000+</option>
          </BFormSelect>
          <Icon icon="dollar-sign" class="app-search-icon text-muted" />
        </div>

        <div>
          <BFormSelect v-model="perPage" :options="perPageOptions" class="form-control" />
        </div>
      </div>
    </BCardHeader>

    <BTable
      hover
      responsive
      show-empty
      v-model:selected-rows="selected"
      :items="filteredData"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
      empty-text="No estimations found."
      class="table table-custom table-centered table-select mb-0 w-100"
      thead-class="bg-light bg-opacity-25 thead-sm text-nowrap"
    >
      <template #head()="data">
        <span class="text-uppercase fs-xxs">{{ data.label }}</span>
      </template>

      <template #head(select)>
        <input type="checkbox" class="form-check-input" :checked="allSelected" :indeterminate="isIndeterminate" @change="toggleAll" />
      </template>

      <template #cell(select)="{ item }">
        <input type="checkbox" class="form-check-input" :checked="selected.includes(item)" @change="() => toggleRow(item)" />
      </template>

      <template #cell(client)="{ item }">
        <div class="d-flex align-items-center">
          <div class="avatar-sm border flex-shrink-0 border-dashed rounded-circle me-2 d-flex align-items-center justify-content-center">
            <img :src="item.client.image" alt="logo" height="20" />
          </div>
          <span>{{ item.client.name }}</span>
        </div>
      </template>

      <template #cell(estimatedBy)="{ item }">
        <div class="d-flex align-items-center gap-2">
          <img :src="item.estimatedBy.image" class="avatar-xs rounded-circle" />
          <span>{{ item.estimatedBy.name }}</span>
        </div>
      </template>

      <template #cell(createdDate)="{ item }">
        {{ item.createdDate }}
        <small class="text-muted">{{ item.createdTime }}</small>
      </template>

      <template #cell(closeDate)="{ item }">
        {{ item.closeDate }}
        <small class="text-muted">{{ item.closeTime }}</small>
      </template>

      <template #cell(status)="{ item }">
        <span class="badge badge-label fs-xs" :class="statusBadge(item.status)">{{ formatStatus(item.status) }}</span>
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

    <BCardFooter class="border-0">
      <TablePagination v-model:currentPage="currentPage" :per-page="perPage" :total-items="filteredData.length" label="estimations" />
    </BCardFooter>
  </BCard>

  <BModal v-model="showModal" title="Create New Estimation" no-footer size="lg">
    <form @submit.prevent="addNew">
      <BRow class="g-3">
        <BCol md="6"
          ><label>Project Name</label>
          <BFormInput v-model="form.project" placeholder="Enter project name" required />
        </BCol>
        <BCol md="6"
          ><label>Client</label>
          <BFormInput v-model="form.client" placeholder="Enter client name" required />
        </BCol>
        <BCol md="6"
          ><label>Estimated Value (USD)</label>
          <BFormInput placeholder="e.g. 25000" type="number" v-model="form.value" required />
        </BCol>
        <BCol md="6">
          <label>Estimated By</label>
          <BFormInput type="text" id="estimator" placeholder="Enter team member name" required />
        </BCol>
        <BCol md="6"
          ><label>Status</label>
          <BFormSelect v-model="form.status" required>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="declined">Declined</option>
            <option value="sent">Sent</option>
            <option value="in-review">In Review</option>
          </BFormSelect>
        </BCol>
        <BCol md="6">
          <label>Tags</label>
          <BFormInput type="text" id="estimationTags" placeholder="e.g. CRM, Mobile, API" />
        </BCol>

        <BCol md="6">
          <label for="createdDate" class="form-label">Created Date</label>
          <FlatPickr v-model="createdOn" class="form-control" type="date" :config="{ dateFormat: 'd M, Y', defaultDate: 'today' }" />
        </BCol>

        <BCol md="6">
          <label for="expectedCloseDate" class="form-label">Expected Close</label>
          <FlatPickr v-model="expectedCloseDate" class="form-control" type="date" :config="{ dateFormat: 'd M, Y', defaultDate: 'today' }" />
        </BCol>
      </BRow>
      <div class="text-end mt-3">
        <BButton variant="light" @click="showModal = false" class="me-1">Cancel</BButton>
        <BButton variant="primary" type="submit">Save</BButton>
      </div>
    </form>
  </BModal>
</template>

<script setup lang="ts">
import { BButton, BCard, BCardFooter, BCardHeader, BCol, BFormSelect, BModal, BRow, BTable } from 'bootstrap-vue-next'
import { computed, ref } from 'vue'
import TablePagination from '~/components/TablePagination.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { estimateData, type EstimateType } from './data'

const searchQuery = ref('')
const filterStatus = ref('')
const filterRange = ref('')
const perPage = ref(8)
const currentPage = ref(1)
const perPageOptions = [5, 8, 10, 15, 20]

const selected = ref<EstimateType[]>([])
const showModal = ref(false)
const createdOn = ref('')
const expectedCloseDate = ref('')
const form = ref({ project: '', client: '', value: '', status: 'pending' })

const fields = [
  { key: 'select', label: '' },
  { key: 'id', label: 'Estimate ID', sortable: true },
  { key: 'project', label: 'Project' },
  { key: 'client', label: 'Client' },
  { key: 'value', label: 'Estimated Value', sortable: true },
  { key: 'estimatedBy', label: 'Estimated By' },
  { key: 'createdDate', label: 'Created', sortable: true },
  { key: 'closeDate', label: 'Expected Close', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'actions', label: 'Actions', class: 'text-center' },
]

const filteredData = computed(() => {
  return estimateData
    .filter((item) => (searchQuery.value ? item.project.toLowerCase().includes(searchQuery.value.toLowerCase()) || item.id.toLowerCase().includes(searchQuery.value.toLowerCase()) : true))
    .filter((item) => (filterStatus.value ? item.status === filterStatus.value : true))
    .filter((item) => {
      if (!filterRange.value) return true

      const value = Number(item.value.replace(/\$|,/g, ''))
      const parts = filterRange.value.split('-')

      const min = Number(parts[0])
      const max = parts[1] ? Number(parts[1]) : Infinity

      return value >= min && value <= max
    })
})

const allSelected = computed(() => selected.value.length === filteredData.value.length)
const isIndeterminate = computed(() => selected.value.length > 0 && !allSelected.value)

function toggleAll() {
  selected.value = allSelected.value ? [] : [...filteredData.value]
}

function toggleRow(item: EstimateType) {
  if (selected.value.includes(item)) {
    selected.value = selected.value.filter((i) => i !== item)
  } else {
    selected.value.push(item)
  }
}

function deleteItem(item: EstimateType) {
  const index = estimateData.indexOf(item)
  if (index > -1) estimateData.splice(index, 1)
}

function deleteSelected() {
  selected.value.forEach(deleteItem)
  selected.value = []
}

function addNew() {
  estimateData.unshift({
    id: `#EST${Math.floor(Math.random() * 99999)}`,
    project: form.value.project,
    client: { name: form.value.client, image: '' },
    value: `$${form.value.value}`,
    estimatedBy: { name: 'New User', image: '' },
    createdDate: 'Today',
    createdTime: '--',
    closeDate: '--',
    closeTime: '--',
    status: form.value.status as EstimateType['status'],
  })

  showModal.value = false
}

// Badge class map
const statusBadge = (status: string) =>
  ({
    approved: 'badge bg-success-subtle text-success',
    pending: 'badge bg-warning-subtle text-warning',
    declined: 'badge bg-danger-subtle text-danger',
    sent: 'badge bg-primary-subtle text-primary',
    'in-review': 'badge bg-info-subtle text-info',
  })[status]

const formatStatus = (value: string) => value.replace('-', ' ').replace(/\b\w/g, (ch) => ch.toUpperCase())
</script>
