<template>
  <BRow>
    <BCol cols="12">
      <BCard no-body>
        <BCardHeader class="border-light justify-content-between">
          <div class="d-flex gap-2">
            <div class="app-search">
              <BFormInput v-model="searchQuery" type="search" placeholder="Search proposal..." />
              <Icon icon="search" class="app-search-icon text-muted" />
            </div>

            <BButton variant="primary" @click="showCreateModal = true"> <Icon icon="plus" class="me-1" /> New Proposal </BButton>

            <BButton v-if="selected.length" variant="danger" @click="deleteSelected"> Delete </BButton>
          </div>

          <div class="d-flex align-items-center gap-2 flex-wrap">
            <span class="fw-semibold">Filter By:</span>

            <div class="app-search">
              <BFormSelect v-model="filterStatus" class="form-control my-1 my-md-0">
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
              <BFormSelect v-model="filterValueRange" class="form-control my-1 my-md-0">
                <option value="">Value Range</option>
                <option value="0-5000">$0 - $5,000</option>
                <option value="5001-10000">$5,001 - $10,000</option>
                <option value="10001-20000">$10,001 - $20,000</option>
                <option value="20001-50000">$20,001 - $50,000</option>
                <option value="50000+">$50,000+</option>
              </BFormSelect>
              <Icon icon="dollar-sign" class="app-search-icon text-muted" />
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
          empty-text="No proposals found."
          v-model:selected-rows="selected"
          :items="filteredProposals"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          class="table-custom table-centered table-select table-hover w-100 mb-0"
          thead-class="bg-light align-middle bg-opacity-25 thead-sm text-nowrap"
        >
          <template #head()="data">
            <span class="text-uppercase fs-xxs">{{ data.label }}</span>
          </template>

          <template #head(select)>
            <input type="checkbox" class="form-check-input fs-14" :checked="allSelected" :indeterminate="isIndeterminate" @change="toggleSelectAll" />
          </template>

          <template #cell(select)="{ item }">
            <input type="checkbox" class="form-check-input fs-14" :checked="selected.includes(item)" @change="() => toggleRow(item)" />
          </template>

          <template #cell(sendTo)="{ item }">
            <div class="d-flex align-items-center">
              <div class="avatar-sm border flex-shrink-0 border-dashed rounded-circle me-2 justify-content-center d-flex align-items-center">
                <img :src="item.sendTo.image" :height="item.sendTo.logoHeight || 20" />
              </div>
              <span>{{ item.sendTo.name }}</span>
            </div>
          </template>

          <template #cell(value)="{ item }">
            <span>{{ item.value }}</span>
          </template>

          <template #cell(createdDate)="{ item }">
            {{ item.createdDate }}
            <small class="text-muted">{{ item.createdTime }}</small>
          </template>

          <template #cell(openTill)="{ item }">
            {{ item.openTillDate }}
            <small class="text-muted">{{ item.openTillTime }}</small>
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
          <TablePagination v-model:currentPage="currentPage" :per-page="perPage" :total-items="totalRows" label="proposals" />
        </BCardFooter>
      </BCard>
    </BCol>
  </BRow>

  <BModal v-model="showCreateModal" title="Create New Proposal" no-footer size="lg">
    <form @submit.prevent="addProposal">
      <BRow class="g-3">
        <BCol md="6">
          <label for="proposalID" class="form-label">Proposal ID</label>
          <BFormInput type="text" id="proposalID" placeholder="Enter proposal ID (e.g. #PS008120)" required />
        </BCol>
        <BCol md="6">
          <label class="form-label">Subject</label>
          <BFormInput v-model="newProposal.subject" type="text" placeholder="Enter proposal subject" required />
        </BCol>

        <BCol md="6">
          <label class="form-label">Send To (Client)</label>
          <BFormInput v-model="newProposal.sendTo" type="text" placeholder="Enter client name" required />
        </BCol>

        <BCol md="6">
          <label class="form-label">Value (USD)</label>
          <BFormInput v-model="newProposal.value" type="number" placeholder="e.g. 15000" required />
        </BCol>

        <BCol md="6">
          <label class="form-label">Status</label>
          <BFormSelect v-model="newProposal.status" required>
            <option value="">Choose...</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="declined">Declined</option>
            <option value="sent">Sent</option>
            <option value="in-review">In Review</option>
          </BFormSelect>
        </BCol>

        <BCol md="6">
          <label for="proposalTags" class="form-label">Tags</label>
          <BFormInput type="text" id="proposalTags" placeholder="e.g. Marketing, Development, Design" />
        </BCol>

        <BCol md="6">
          <label for="createdDate" class="form-label">Created Date</label>
          <FlatPickr v-model="createdOn" class="form-control" type="date" :config="{ dateFormat: 'd M, Y', defaultDate: 'today' }" />
        </BCol>

        <BCol md="6">
          <label for="openTill" class="form-label">Open Till</label>
          <FlatPickr v-model="openTill" class="form-control" type="date" :config="{ dateFormat: 'd M, Y', defaultDate: 'today' }" />
        </BCol>
      </BRow>

      <div class="mt-3 d-flex justify-content-end gap-1">
        <BButton variant="light" @click="showCreateModal = false">Cancel</BButton>
        <BButton type="submit" variant="primary">Save Proposal</BButton>
      </div>
    </form>
  </BModal>
</template>

<script setup lang="ts">
import { BButton, BCard, BCardFooter, BCardHeader, BCol, BFormSelect, BModal, BRow, BTable } from 'bootstrap-vue-next'
import { computed, ref } from 'vue'
import FlatPickr from 'vue-flatpickr-component'
import TablePagination from '~/components/TablePagination.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { proposalData, type ProposalType } from './data'

// State
const proposals = ref([...proposalData])
const searchQuery = ref('')
const filterStatus = ref('')
const filterValueRange = ref('')
const selected = ref<ProposalType[]>([])
const showCreateModal = ref(false)
const createdOn = ref('')
const openTill = ref('')

// Pagination
const perPage = ref(8)
const currentPage = ref(1)
const perPageOptions = [5, 8, 10, 15, 20]

// Columns
const fields = ['select', 'id', 'subject', 'sendTo', 'value', 'createdDate', 'openTill', 'status', 'actions']

// Filtering logic
const filteredProposals = computed(() => {
  return proposals.value.filter((p) => {
    const matchesSearch = p.subject.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesStatus = !filterStatus.value || p.status === filterStatus.value

    let matchesValue = true
    if (filterValueRange.value) {
      const [min, max] = filterValueRange.value.split('-')
      const val = Number(p.value.replace(/[$,]/g, ''))
      matchesValue = max ? val >= Number(min) && val <= Number(max) : val >= Number(min)
    }

    return matchesSearch && matchesStatus && matchesValue
  })
})

const totalRows = computed(() => filteredProposals.value.length)

// Selection
const allSelected = computed(() => selected.value.length === filteredProposals.value.length)
const isIndeterminate = computed(() => selected.value.length > 0 && !allSelected.value)

const toggleRow = (item: ProposalType) => {
  if (selected.value.includes(item)) {
    selected.value = selected.value.filter((i) => i !== item)
  } else {
    selected.value.push(item)
  }
}

const toggleSelectAll = () => {
  selected.value = allSelected.value ? [] : [...filteredProposals.value]
}

const deleteItem = (item: ProposalType) => {
  proposals.value = proposals.value.filter((p) => p !== item)
}

const deleteSelected = () => {
  proposals.value = proposals.value.filter((p) => !selected.value.includes(p))
  selected.value = []
}

// Types
type NewProposalType = {
  subject: string
  sendTo: string
  value: string
  status: 'approved' | 'pending' | 'declined' | 'sent' | 'in-review'
}

// Create New Proposal
const newProposal = ref<NewProposalType>({
  subject: '',
  sendTo: '',
  value: '',
  status: 'pending',
})

const addProposal = () => {
  proposals.value.push({
    id: '#PS00' + (Math.random() * 100000).toFixed(0),
    subject: newProposal.value.subject,
    sendTo: { name: newProposal.value.sendTo, image: '/images/logos/google.svg' },
    value: `$${newProposal.value.value}`,
    createdDate: 'Today',
    createdTime: 'Now',
    openTillDate: '––',
    openTillTime: '––',
    status: newProposal.value.status,
  })
  showCreateModal.value = false
}

// Badge class map
const statusBadge = (status: string) =>
  ({
    approved: 'badge bg-success-subtle text-success',
    pending: 'badge bg-warning-subtle text-warning',
    declined: 'badge bg-danger-subtle text-danger',
    sent: 'badge bg-info-subtle text-info',
    'in-review': 'badge bg-primary-subtle text-primary',
  })[status]

const formatStatus = (value: string) => value.replace('-', ' ').replace(/\b\w/g, (ch) => ch.toUpperCase())
</script>
