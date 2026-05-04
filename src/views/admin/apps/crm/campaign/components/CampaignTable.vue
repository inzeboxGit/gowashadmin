<template>
  <BCol cols="12">
    <BCard no-body>
      <BCardHeader class="border-light justify-content-between">
        <div class="d-flex gap-2">
          <div class="app-search">
            <BFormInput v-model="searchQuery" type="search" placeholder="Search campaign..." />
            <Icon icon="search" class="app-search-icon text-muted" />
          </div>

          <BButton variant="primary" @click="showCreateModal = true">
            <Icon icon="plus" class="me-1" /> Create Campaign
          </BButton>

          <BButton v-if="selected.length" variant="danger" @click="deleteSelected"> Delete </BButton>
        </div>

        <div class="d-flex align-items-center gap-2 flex-wrap">
          <span class="fw-semibold">Filter By:</span>

          <div class="app-search">
            <BFormSelect v-model="filterStatus" class="form-control my-1 my-md-0">
              <option value="">Status</option>
              <option value="success">Success</option>
              <option value="in-progress">In Progress</option>
              <option value="scheduled">Scheduled</option>
              <option value="failed">Failed</option>
              <option value="ongoing">Ongoing</option>
            </BFormSelect>
            <Icon icon="shuffle" class="app-search-icon text-muted" />
          </div>

          <div class="app-search">
            <BFormSelect v-model="filterBudgetRange" class="form-control my-1 my-md-0">
              <option value="">Budget Range</option>
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

      <BTable hover responsive show-empty empty-text="No campaigns found." v-model:selected-rows="selected"
        :items="filteredCampaigns" :fields="fields" :current-page="currentPage" :per-page="perPage"
        class="table-custom table-centered table-select table-hover w-100 mb-0"
        thead-class="bg-light align-middle bg-opacity-25 thead-sm text-nowrap">
        <template #head()="data">
          <span class="text-uppercase fs-xxs">{{ data.label }}</span>
        </template>

        <template #head(select)>
          <input class="form-check-input fs-14" type="checkbox" :checked="allSelected" :indeterminate="isIndeterminate"
            @change="toggleSelectAll" />
        </template>

        <template #cell(select)="{ item }">
          <input class="form-check-input fs-14" type="checkbox" :checked="selected.includes(item)"
            @change="() => toggleRow(item)" />
        </template>

        <template #cell(creator)="{ item }">
          <div class="d-flex align-items-center gap-2">
            <img :src="item.creator.image" class="avatar-xs rounded-circle" />
            <span>{{ item.creator.name }}</span>
          </div>
        </template>

        <template #cell(tags)="{ item }">
          <span v-for="tag in item.tags" :key="tag" class="badge badge-label text-bg-light me-1">{{ tag }}</span>
        </template>

        <template #cell(dateCreated)="{ item }">
          {{ item.createdDate }}
          <small class="text-muted">{{ item.createdTime }}</small>
        </template>

        <template #cell(status)="{ item }">
          <span :class="statusBadge(item.status)">{{ formatStatus(item.status) }}</span>
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
        <TablePagination v-model:currentPage="currentPage" :per-page="perPage" :total-items="totalRows"
          label="Campaigns" />
      </BCardFooter>
    </BCard>
  </BCol>

  <BModal v-model="showCreateModal" title="Create New Campaign" ok-title="Save Campaign" cancel-variant="light"
    size="lg">
    <form @submit.prevent="addCampaign">
      <BRow class="g-3">
        <BCol md="6">
          <label class="form-label">Campaign Name</label>
          <BFormInput v-model="newCampaign.name" type="text" placeholder="Enter campaign name" required />
        </BCol>

        <BCol md="6">
          <label class="form-label">Creator</label>
          <BFormInput v-model="newCampaign.creatorName" type="text" placeholder="Enter campaign creator" required />
        </BCol>

        <BCol md="6">
          <label class="form-label">Budget (USD)</label>
          <BFormInput v-model="newCampaign.budget" type="number" placeholder="e.g. 7500" required />
        </BCol>

        <BCol md="6">
          <label class="form-label">Goal (USD)</label>
          <BFormInput v-model="newCampaign.goal" type="number" placeholder="e.g. 50000" required />
        </BCol>

        <BCol md="6">
          <label class="form-label">Status</label>
          <BFormSelect v-model="newCampaign.status" required>
            <option value="">Select status</option>
            <option value="success">Success</option>
            <option value="in-progress">In Progress</option>
            <option value="scheduled">Scheduled</option>
            <option value="failed">Failed</option>
            <option value="ongoing">Ongoing</option>
          </BFormSelect>
        </BCol>

        <BCol md="6">
          <label class="form-label">Tags</label>
          <BFormInput v-model="newCampaign.tags" type="text" placeholder="e.g. Email, Webinar, Retargeting" required />
        </BCol>
        <BCol md="6">
          <label for="launchDate" class="form-label">Launch Date</label>
          <FlatPickr v-model="launchDate" class="form-control" type="date"
            :config="{ dateFormat: 'd M, Y', defaultDate: 'today' }" />
        </BCol>

        <BCol md="6">
          <label for="launchTime" class="form-label">Launch Time</label>
          <FlatPickr v-model="launchTime" class="form-control" type="time"
            :config="{ dateFormat: 'h:i K', defaultDate: 'today', noCalendar: true, enableTime: true }" />
        </BCol>
      </BRow>
    </form>
  </BModal>
</template>

<script setup lang="ts">
import { BButton, BCard, BCardFooter, BCardHeader, BCol, BFormSelect, BModal, BRow, BTable } from 'bootstrap-vue-next'
import { computed, ref } from 'vue'
import FlatPickr from 'vue-flatpickr-component'
import TablePagination from '~/components/TablePagination.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { campaignData as initialData, type CampaignType } from './data'

const campaigns = ref([...initialData])
const searchQuery = ref('')
const filterStatus = ref('')
const filterBudgetRange = ref('')
const launchDate = ref('')
const launchTime = ref('')
const selected = ref<CampaignType[]>([])
const showCreateModal = ref(false)

// Pagination
const perPage = ref(8)
const currentPage = ref(1)
const perPageOptions = [5, 8, 10, 15, 20]

// Table fields
const fields = ['select', 'name', 'creator', 'budget', 'goal', 'status', 'tags', 'dateCreated', 'actions']

// Filters
const filteredCampaigns = computed(() => {
  return campaigns.value.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesStatus = !filterStatus.value || c.status === filterStatus.value

    let matchesBudget = true
    if (filterBudgetRange.value) {
      const [min, max] = filterBudgetRange.value.split('-')
      const budget = Number(c.budget.replace(/[$,]/g, ''))
      if (max) matchesBudget = Number(min) <= budget && budget <= Number(max)
      else matchesBudget = budget >= Number(min)
    }

    return matchesSearch && matchesStatus && matchesBudget
  })
})

const totalRows = computed(() => filteredCampaigns.value.length)

// Select helpers
const allSelected = computed(() => selected.value.length === filteredCampaigns.value.length)
const isIndeterminate = computed(() => selected.value.length > 0 && !allSelected.value)

const toggleRow = (item: CampaignType) => {
  selected.value = selected.value.includes(item) ? selected.value.filter((i) => i !== item) : [...selected.value, item]
}

const toggleSelectAll = () => {
  selected.value = allSelected.value ? [] : [...filteredCampaigns.value]
}

// Delete
const deleteItem = (item: CampaignType) => {
  campaigns.value = campaigns.value.filter((c) => c !== item)
}

const deleteSelected = () => {
  campaigns.value = campaigns.value.filter((c) => !selected.value.includes(c))
  selected.value = []
}

// Badge CSS
type CampaignStatus = 'success' | 'in-progress' | 'scheduled' | 'failed' | 'ongoing'

const statusBadge = (status: CampaignStatus): string => {
  const map: Record<CampaignStatus, string> = {
    success: 'badge bg-success-subtle text-success',
    'in-progress': 'badge bg-warning-subtle text-warning',
    scheduled: 'badge bg-info-subtle text-info',
    failed: 'badge bg-danger-subtle text-danger',
    ongoing: 'badge bg-primary-subtle text-primary',
  }
  return map[status]
}

const formatStatus = (val: string) => val.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())

// Add campaign
const newCampaign = ref({
  name: '',
  creatorName: '',
  budget: '',
  goal: '',
  status: '' as 'in-progress' | 'success' | 'scheduled' | 'failed' | 'ongoing',
  tags: '',
})

const addCampaign = () => {
  campaigns.value.push({
    name: newCampaign.value.name,
    creator: { name: newCampaign.value.creatorName, image: '/images/users/user-6.jpg' },
    budget: `$${newCampaign.value.budget}`,
    goal: `$${newCampaign.value.goal}`,
    status: newCampaign.value.status,
    tags: newCampaign.value.tags.split(',').map((t) => t.trim()),
    createdDate: new Date().toLocaleDateString(),
    createdTime: new Date().toLocaleTimeString(),
  })

  Object.assign(newCampaign.value, { name: '', creatorName: '', budget: '', goal: '', status: '', tags: '' })
  showCreateModal.value = false
}
</script>
