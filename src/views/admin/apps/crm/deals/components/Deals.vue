<template>
  <BCard no-body>
    <BCardHeader class="border-light justify-content-between">
      <div class="d-flex gap-2">
        <div class="app-search">
          <BFormInput v-model="searchQuery" type="search" placeholder="Search deals..." />
          <Icon icon="search" class="app-search-icon text-muted" />
        </div>

        <BButton variant="primary" @click="showCreateDealModal = true"> <Icon icon="plus" class="me-1" /> Create Deal </BButton>

        <BButton v-if="selected.length" variant="danger" @click="handleDeleteSelected"> Delete </BButton>
      </div>

      <div class="d-flex align-items-center gap-2 flex-wrap">
        <span class="me-2 fw-semibold">Filter By:</span>

        <div class="app-search">
          <BFormSelect v-model="filterStage" class="form-control">
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
          <BFormSelect v-model="filterRange" class="form-control">
            <option value="">Amount Range</option>
            <option value="0-10000">$0 - $10000</option>
            <option value="10001-25000">$10001 - $25000</option>
            <option value="25001-50000">$25001 - $50000</option>
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
      empty-text="No deals found."
      v-model:selected-rows="selected"
      :items="filteredDeals"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
      thead-class="bg-light align-middle bg-opacity-25 thead-sm text-nowrap"
      class="table-custom table-centered table-select mb-0 w-100"
    >
      <template #head()="item">
        <span class="text-uppercase fs-xxs">{{ item.label }}</span>
      </template>

      <template #head(select)>
        <input class="form-check-input form-check-input-light fs-14 mt-0" type="checkbox" :checked="allSelected" :indeterminate="isIndeterminate" @change="toggleSelectAll" />
      </template>

      <template #head(actions)>
        <span class="text-uppercase d-flex justify-content-center fs-xxs">Actions</span>
      </template>

      <template #cell(select)="{ item }">
        <input class="form-check-input form-check-input-light fs-14 mt-0" type="checkbox" :checked="selected.includes(item)" @change="(e) => onToggleRow(item, e)" />
      </template>

      <template #cell(name)="{ item }">
        {{ item.name }}
      </template>

      <template #cell(company)="{ item }">
        <div class="d-flex align-items-center">
          <div class="avatar-sm border flex-shrink-0 border-dashed rounded-circle me-2 justify-content-center d-flex align-items-center">
            <img :src="item.image" alt="Logo" height="20" />
          </div>
          <RouterLink to="#!" class="link-reset">{{ item.company }}</RouterLink>
        </div>
      </template>

      <template #cell(amount)="{ item }">{{ item.amount.toLocaleString() }} </template>

      <template #cell(stage)="{ item }">
        {{ item.stage }}
      </template>

      <template #cell(probability)="{ item }">
        <div class="d-flex align-items-center gap-2">
          <div class="d-flex gap-1">
            <div
              v-for="i in 5"
              :key="i"
              class="prob-bar bg-success"
              :class="{
                'opacity-100': i <= Math.ceil(item.probability / 20),
                'opacity-25': i > Math.ceil(item.probability / 20),
              }"
            />
          </div>
          <strong class="text-dark">{{ item.probability }}%</strong>
        </div>
      </template>

      <template #cell(date)="{ item }">
        {{ item.date }}
      </template>

      <template #cell(actions)="{ item }">
        <div class="d-flex justify-content-center gap-1">
          <BButton size="sm" class="btn-default btn-icon rounded rounded-circle">
            <Icon icon="eye" class="fs-lg" />
          </BButton>
          <BButton size="sm" class="btn-default btn-icon rounded rounded-circle">
            <Icon icon="square-pen" class="fs-lg" />
          </BButton>
          <BButton size="sm" class="btn-default btn-icon rounded rounded-circle" @click="handleDeleteItem(item)">
            <Icon icon="trash-2" class="fs-lg" />
          </BButton>
        </div>
      </template>
    </BTable>

    <BCardFooter class="border-0">
      <TablePagination v-model:currentPage="currentPage" :per-page="perPage" :total-items="totalRows" label="Deals" />
    </BCardFooter>
  </BCard>

  <BModal v-model="showCreateDealModal" title="Create New Deal" size="lg" ok-title="Save Deal" cancel-variant="light">
    <form @submit.prevent="addDeal">
      <BRow class="g-3">
        <BCol md="6">
          <label for="dealName" class="form-label">Deal Name</label>
          <BFormInput v-model="newDeal.name" type="text" id="dealName" placeholder="Enter deal name" required />
        </BCol>

        <BCol md="6">
          <label for="companyName" class="form-label">Company</label>
          <BFormInput v-model="newDeal.company" type="text" id="company" placeholder="Enter company name" required />
        </BCol>

        <BCol md="6">
          <label for="amount" class="form-label">Amount (USD)</label>
          <BFormInput v-model.number="newDeal.amount" type="number" id="amount" placeholder="e.g. 100000" required />
        </BCol>

        <BCol md="6">
          <label for="stage" class="form-label">Stage</label>
          <BFormSelect v-model="newDeal.stage" id="stage" required>
            <option value="">Select stage</option>
            <option value="Qualification">Qualification</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Negotiation">Negotiation</option>
            <option value="Won">Won</option>
            <option value="Lost">Lost</option>
          </BFormSelect>
        </BCol>

        <BCol md="6">
          <label for="probability" class="form-label">Probability (%)</label>
          <BFormInput type="number" id="probability" placeholder="e.g. 75" min="0" max="100" required />
        </BCol>

        <BCol md="6">
          <label for="date" class="form-label">Expected Closing Date</label>
          <FlatPickr v-model="newDeal.date" class="form-control" type="date" :config="{ dateFormat: 'd M, Y', defaultDate: 'today' }" />
        </BCol>
      </BRow>
    </form>
  </BModal>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { BButton, BCard, BCardFooter, BCardHeader, BCol, BFormSelect, BModal, BRow, BTable } from 'bootstrap-vue-next'
import { computed, ref } from 'vue'
import FlatPickr from 'vue-flatpickr-component'
import TablePagination from '~/components/TablePagination.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { useTableActions } from '~/composables/useTableActions'
import { dealData, type DealType } from './data'

// Reactive states
const showCreateDealModal = ref(false)
const searchQuery = ref('')
const filterStage = ref('')
const filterRange = ref('')
const currentPage = ref(1)
const perPage = ref(8)
const perPageOptions = [5, 8, 10, 15, 20]
const deals = ref<DealType[]>([...dealData])
const totalRows = ref(deals.value.length)

// Table fields
const fields = [
  { key: 'select', label: '', thStyle: { width: '40px' } },
  { key: 'name', label: 'Deal Name', sortable: true },
  { key: 'company', label: 'Company', sortable: false },
  { key: 'amount', label: 'Amount (USD)', sortable: true },
  { key: 'stage', label: 'Stage', sortable: true },
  { key: 'probability', label: 'Probability', sortable: true },
  { key: 'date', label: 'Closing Date', sortable: true },
  { key: 'actions', label: 'Actions', sortable: false },
]

// Table selection actions
const { selected, toggleSelectAll, onToggleRow, deleteItem, deleteSelected, allSelected, isIndeterminate } = useTableActions(deals)

// Filters
const filteredDeals = computed(() =>
  deals.value.filter((d) => {
    const amount = parseFloat(d.amount.replace(/[^0-9.]/g, '')) // Remove non-numeric characters and convert to number
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || d.company.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStage = !filterStage.value || d.stage === filterStage.value
    const matchesRange =
      !filterRange.value ||
      (filterRange.value === '0-10000' && amount <= 10000) ||
      (filterRange.value === '10001-25000' && amount > 10000 && amount <= 25000) ||
      (filterRange.value === '25001-50000' && amount > 25000 && amount <= 50000) ||
      (filterRange.value === '50000+' && amount > 50000)
    return matchesSearch && matchesStage && matchesRange
  })
)
// Update pagination
function updateTotalRows() {
  totalRows.value = filteredDeals.value.length
  if (currentPage.value > Math.ceil(totalRows.value / perPage.value)) currentPage.value = 1
}

// New deal
const newDeal = ref<DealType>({
  name: '',
  company: '',
  image: '/images/logos/default.svg',
  amount: '',
  stage: '',
  probability: 0,
  date: '',
})

function addDeal() {
  deals.value.unshift({ ...newDeal.value })
  showCreateDealModal.value = false
  updateTotalRows()
  newDeal.value = {
    name: '',
    company: '',
    image: '/images/logos/default.svg',
    amount: '',
    stage: '',
    probability: 0,
    date: '',
  }
}

function handleDeleteItem(item: DealType) {
  deleteItem(item)
  updateTotalRows()
}

function handleDeleteSelected() {
  deleteSelected()
  updateTotalRows()
}
</script>
