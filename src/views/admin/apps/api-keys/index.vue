<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <PageBreadcrumb title="API Keys" subtitle="Apps" />
  <BRow>
    <BCol xs="12">
      <BCard no-body>
        <BCardHeader class="border-light justify-content-between">
          <div class="d-flex gap-2">
            <div class="app-search">
              <BFormInput v-model="searchQuery" type="text" placeholder="Search API clients..." />
              <Icon icon="search" class="app-search-icon text-muted" />
            </div>
            <BButton variant="secondary" type="submit" class="btn-icon" @click="showModal = !showModal">
              <Icon icon="plus" class="fs-lg" />
            </BButton>
            <BButton v-if="selected.length" variant="danger" @click="handleDeleteSelected"> Delete </BButton>
          </div>

          <div class="d-flex align-items-center gap-2">
            <span class="me-2 fw-semibold">Filter By:</span>
            <div class="app-search">
              <BFormSelect v-model="status" class="form-control my-1 my-md-0">
                <BFormSelectOption value="All">Status</BFormSelectOption>
                <BFormSelectOption value="Active">Active</BFormSelectOption>
                <BFormSelectOption value="Pending">Pending</BFormSelectOption>
                <BFormSelectOption value="Revoked">Revoked</BFormSelectOption>
                <BFormSelectOption value="Suspended">Suspended</BFormSelectOption>
                <BFormSelectOption value="Expired">Expired</BFormSelectOption>
              </BFormSelect>
              <Icon icon="check-circle" class="app-search-icon text-muted" />
            </div>

            <div class="app-search">
              <BFormSelect v-model="region" class="form-control my-1 my-md-0">
                <BFormSelectOption value="All">Region</BFormSelectOption>
                <BFormSelectOption value="US">USA</BFormSelectOption>
                <BFormSelectOption value="UK">UK</BFormSelectOption>
                <BFormSelectOption value="IN">India</BFormSelectOption>
                <BFormSelectOption value="DE">Germany</BFormSelectOption>
                <BFormSelectOption value="AU">Australia</BFormSelectOption>
              </BFormSelect>
              <Icon icon="earth" class="app-search-icon text-muted" />
            </div>

            <div>
              <BFormSelect v-model="perPage" :options="perPageOptions" class="form-control my-1 my-md-0" />
            </div>
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
          :items="apies"
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
          <template #cell(createdBy)="{ item }">
            <div class="d-flex justify-content-start align-items-center gap-2">
              <div class="avatar avatar-xs">
                <img :src="item.user.image" alt="avatar-2" class="img-fluid rounded-circle" />
              </div>
              <div>
                <h5 class="text-nowrap fs-sm mb-0 lh-base">{{ item.user.name }}</h5>
              </div>
            </div>
          </template>
          <template #cell(apiKey)="{ item }">
            <div class="input-group">
              <input type="text" class="form-control form-control-sm" id="keyOne" readonly :value="item.apiKey" />
              <button class="btn btn-sm btn-icon btn-default" type="button">
                <Icon icon="copy" class="fs-lg" />
              </button>
            </div>
          </template>
          <template #cell(status)="{ item }">
            <span class="badge badge-label" :class="item.status === 'active' ? 'bg-success-subtle text-success' : item.status === 'pending' ? 'bg-warning-subtle text-warning' : item.status === 'trial' ? 'bg-info-subtle text-info' : 'bg-danger-subtle text-danger'">{{
              toPascalCase(item.status)
            }}</span>
          </template>
          <template #cell(totalKeys)="{ item }">
            <span> {{ item.keyUsage }} / {{ item.totalKeys }} </span>
          </template>
          <template #cell(region)="{ item }">
            <span class="d-flex align-items-center fs-sm fw-bold"> <img :src="item.country.flag" alt="" class="rounded-circle me-1" height="12" /> {{ item.country.code }} </span>
          </template>

          <template #cell(action)="{ item }">
            <div class="d-flex justify-content-center gap-1">
              <BButton size="sm" class="btn-default btn-icon rounded-circle">
                <Icon icon="eye" class="fs-lg" />
              </BButton>
              <BButton size="sm" class="btn-default btn-icon rounded-circle">
                <Icon icon="square-pen" class="fs-lg" />
              </BButton>
              <BButton size="sm" class="btn-default btn-icon rounded-circle">
                <Icon icon="trash-2" class="fs-lg" @click="handleDeleteItem(item)" />
              </BButton>
            </div>
          </template>
        </BTable>
        <BCardFooter class="border-0">
          <TablePagination v-model:currentPage="currentPage" :per-page="perPage" :total-items="totalRows" label="apis" />
        </BCardFooter>
      </BCard>
    </BCol>
  </BRow>

  <BModal v-model="showModal" size="lg" class="fade" title="Add New API Key" ok-title="Add API Key" cancel-variant="light" tabindex="-1" aria-labelledby="addApiKeyModalLabel" aria-hidden="true">
    <form>
      <BRow class="g-3">
        <BCol md="6">
          <label class="form-label">Client Name</label>
          <BFormInput type="text" placeholder="Enter client name" />
        </BCol>

        <BCol md="6">
          <label class="form-label">Created By</label>
          <BFormSelect v-model="user" aria-label="Select user">
            <option value="All">Select user</option>
            <option>Mark Reynolds</option>
            <option>Sophia Turner</option>
            <option>Liam Watson</option>
            <option>Ava Turner</option>
          </BFormSelect>
        </BCol>

        <BCol md="6">
          <label class="form-label">API Key</label>
          <BInputGroup>
            <BFormInput id="apiKeyInput" type="text" placeholder="Enter or generate API key" />
            <BButton variant="secondary">Generate</BButton>
          </BInputGroup>
        </BCol>

        <BCol md="6">
          <label class="form-label">Status</label>
          <BFormSelect v-model="apiStatus">
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Revoked">Revoked</option>
            <option value="Suspended">Suspended</option>
            <option value="Trial">Trial</option>
          </BFormSelect>
        </BCol>

        <BCol md="6">
          <label class="form-label">Usage Limit</label>
          <BFormInput type="text" placeholder="e.g. 1000" />
        </BCol>

        <BCol md="6">
          <label class="form-label">Region</label>
          <BFormSelect v-model="region">
            <option value="All">🇩🇪 Germany</option>
            <option value="UK">🇬🇧 UK</option>
            <option value="IN">🇮🇳 India</option>
            <option value="US">🇺🇸 USA</option>
            <option value="AU">🇦🇺 Australia</option>
            <option value="CA">🇨🇦 Canada</option>
          </BFormSelect>
        </BCol>

        <BCol md="6">
          <label class="form-label">Created On</label>
          <FlatPickr v-model="createdOn" class="form-control" type="date" :config="{ dateFormat: 'd M, Y', defaultDate: 'today' }" />
        </BCol>

        <BCol md="6">
          <label class="form-label">Expires On</label>
          <FlatPickr v-model="expiresOn" class="form-control" type="date" :config="{ dateFormat: 'd M, Y', defaultDate: 'today' }" />
        </BCol>
      </BRow>
    </form>
  </BModal>
</template>

<script setup lang="ts">
import { BButton, BCard, BCardHeader, BCol, BFormSelect, BRow, type TableFieldRaw } from 'bootstrap-vue-next'
import { ref } from 'vue'
import FlatPickr from 'vue-flatpickr-component'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import TablePagination from '~/components/TablePagination.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { useTableActions } from '~/composables/useTableActions'
import { toPascalCase } from '~/utils/helpers'
import { apiClientData, type ApiClientType } from './components/data'

const status = ref('All')
const region = ref('All')
const user = ref('All')
const apiStatus = ref('Active')
const showModal = ref(false)
const createdOn = ref('')
const expiresOn = ref('')

const fields: Exclude<TableFieldRaw<ApiClientType>, string>[] = [
  { key: 'id', label: 'Id' },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'apiKey', label: 'Api Key', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'createdAtDate', label: 'Created', sortable: true },
  { key: 'expireAtDate', label: 'Expired', sortable: true },
  { key: 'action', label: 'Action', sortable: false },
]

const searchQuery = ref('')

const perPageOptions = [5, 8, 10, 20, 50]

const currentPage = ref(1)
const perPage = ref(8)
const totalRows = ref(apiClientData.length)
const apies = ref<ApiClientType[]>(apiClientData)

function onFiltered(filteredItems: ApiClientType[]) {
  totalRows.value = filteredItems.length
  currentPage.value = 1
}

function adjustPage() {
  const totalPages = Math.ceil(apies.value.length / perPage.value)
  if (currentPage.value > totalPages) {
    currentPage.value = totalPages || 1
  }
}

function handleDeleteItem(item: ApiClientType) {
  deleteItem(item)
  totalRows.value = apies.value.length
  adjustPage()
}

function handleDeleteSelected() {
  deleteSelected()
  totalRows.value = apies.value.length
  adjustPage()
}

const { selected, toggleSelectAll, onToggleRow, deleteSelected, deleteItem, allSelected, isIndeterminate } = useTableActions(apies)
</script>

<style scoped></style>
