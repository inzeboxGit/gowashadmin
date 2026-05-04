<template>
  <PageBreadcrumb title="Opportunities" subtitle="CRM" />

  <BRow class="justify-content-center">
    <BCol cols="12">
      <BCard no-body>
        <BCardHeader class="border-light justify-content-between">
          <div class="d-flex gap-2">
            <div class="app-search">
              <BFormInput v-model="searchQuery" type="text" placeholder="Search opportunity..." />
              <Icon icon="search" class="app-search-icon text-muted" />
            </div>

            <BButton v-if="selected.length" variant="danger" @click="handleDeleteSelected"> Delete </BButton>
          </div>

          <div class="d-flex align-items-center gap-2">
            <span class="me-2 fw-semibold">Filter By:</span>

            <div class="app-search">
              <BFormSelect v-model="stageFilter" class="form-control my-1 my-md-0">
                <option value="">Stage</option>
                <option value="Qualification">Qualification</option>
                <option value="Proposal Sent">Proposal Sent</option>
                <option value="Negotiation">Negotiation</option>
                <option value="Won">Won</option>
                <option value="Lost">Lost</option>
              </BFormSelect>
              <Icon icon="shuffle" class="app-search-icon text-muted" />
            </div>

            <div class="app-search">
              <BFormSelect v-model="statusFilter" class="form-control my-1 my-md-0">
                <option value="">Status</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="closed">Closed</option>
              </BFormSelect>
              <Icon icon="circle-check" class="app-search-icon text-muted" />
            </div>

            <div class="app-search">
              <BFormSelect v-model="priorityFilter" class="form-control my-1 my-md-0">
                <option value="">Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </BFormSelect>
              <Icon icon="circle-alert" class="app-search-icon text-muted" />
            </div>

            <div>
              <BFormSelect v-model="perPage" :options="perPageOptions" class="form-control my-1 my-md-0" />
            </div>
          </div>
        </BCardHeader>

        <BTable
          show-empty
          :filter="searchQuery"
          empty-text="No opportunities found."
          v-model:selected-rows="selected"
          thead-class="bg-light align-middle bg-opacity-25 thead-sm"
          hover
          :fields="fields"
          :items="paginatedOpportunities"
          responsive
          class="table table-custom table-nowrap table-centered mb-0 w-100"
          @filtered="onFiltered"
        >
          <template #head()="data">
            <span class="text-uppercase fs-xxs">{{ data.label }}</span>
          </template>

          <template #cell(product)="data">
            <div class="d-flex align-items-center">
              <div class="avatar-sm border border-dashed rounded me-2 d-flex justify-content-center align-items-center">
                <img :src="data.item.product.image" alt="Logo" height="20" />
              </div>
              <div>
                <p class="mb-0 fw-medium">{{ data.item.product.name }}</p>
                <p class="text-muted mb-0 small">By: {{ data.item.product.seller }}</p>
              </div>
            </div>
          </template>

          <template #cell(contact)="data">
            <div class="d-flex align-items-center">
              <div class="avatar-sm me-2">
                <img :src="data.item.customer.image" alt="User" class="img-fluid rounded-circle" />
              </div>
              <div>
                <p class="mb-0 fw-medium">{{ data.item.customer.name }}</p>
                <p class="text-muted mb-0 small">{{ data.item.customer.email }}</p>
              </div>
            </div>
          </template>

          <template #cell(status)="data">
            <span
              class="badge badge-label fs-xs"
              :class="{
                'badge-soft-success': data.item.status === 'open',
                'badge-soft-warning': data.item.status === 'in-progress',
                'badge-soft-danger': data.item.status === 'closed',
              }"
            >
              {{ toPascalCase(data.item.status) }}
            </span>
          </template>

          <template #cell(priority)="data">
            <span
              class="badge fs-xs"
              :class="{
                'text-bg-danger': data.item.priority === 'high',
                'text-bg-warning': data.item.priority === 'medium',
                'text-bg-success': data.item.priority === 'low',
              }"
            >
              {{ toPascalCase(data.item.priority) }}
            </span>
          </template>
        </BTable>

        <BCardFooter class="border-0">
          <TablePagination v-model:currentPage="currentPage" :per-page="perPage" :total-items="filteredOpportunities.length" label="Opportunities" />
        </BCardFooter>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BButton, BCard, BCardFooter, BCardHeader, BCol, BFormSelect, BRow, BTable } from 'bootstrap-vue-next'
import { computed, ref } from 'vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import TablePagination from '~/components/TablePagination.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { toPascalCase } from '~/utils/helpers'
import { opportunitiesData, type OpportunityType } from './components/data'

// reactive states
const searchQuery = ref('')
const stageFilter = ref('')
const statusFilter = ref('')
const priorityFilter = ref('')
const currentPage = ref(1)
const perPage = ref(8)
const selected = ref<OpportunityType['id'][]>([])

const perPageOptions = [
  { value: 5, text: '5' },
  { value: 8, text: '8' },
  { value: 10, text: '10' },
  { value: 15, text: '15' },
  { value: 20, text: '20' },
]

// Table fields
const fields = [
  { key: 'id', label: 'Id', sortable: true },
  { key: 'product', label: 'Opportunity' },
  { key: 'contact', label: 'Contact Person' },
  { key: 'stage', label: 'Stage', sortable: true },
  { key: 'amount', label: 'Value (USD)', sortable: true },
  { key: 'closeDate', label: 'Close Date', sortable: true },
  { key: 'source', label: 'Lead Source', sortable: true },
  { key: 'owner', label: 'Owner' },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'priority', label: 'Priority', sortable: true },
]

// Filtered data
const filteredOpportunities = computed(() => {
  return opportunitiesData.filter((item) => {
    const matchSearch = item.product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchStage = !stageFilter.value || item.stage === stageFilter.value
    const matchStatus = !statusFilter.value || item.status === statusFilter.value
    const matchPriority = !priorityFilter.value || item.priority === priorityFilter.value
    return matchSearch && matchStage && matchStatus && matchPriority
  })
})

// Paginated data
const paginatedOpportunities = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  const end = start + perPage.value
  return filteredOpportunities.value.slice(start, end)
})

// Handlers
function handleDeleteSelected() {
  alert(`Deleting ${selected.value.length} selected opportunities...`)
  selected.value = []
}

function onFiltered() {
  currentPage.value = 1
}
</script>
