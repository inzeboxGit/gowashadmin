<template>
  <PageBreadcrumb title="Attributes" subtitle="Ecommerce" />
  <BRow>
    <BCol cols="12">
      <BCard no-body>
        <BCardHeader class="border-light justify-content-between">
          <div class="d-flex gap-2">
            <div class="app-search">
              <BFormInput v-model="searchQuery" type="search" class="form-control" placeholder="Search attributes..." />
              <Icon icon="search" class="app-search-icon text-muted" />
            </div>
            <BButton v-if="selected.length" variant="danger" @click="handleDeleteSelected"> Delete </BButton>
          </div>

          <div class="d-flex align-items-center gap-2 flex-wrap">
            <span class="me-2 fw-semibold">Filter By:</span>

            <div class="app-search">
              <BFormSelect v-model="atrributeType" class="form-control my-1 my-md-0">
                <option value="All">Type</option>
                <option value="Dropdown">Dropdown</option>
                <option value="Text">Text</option>
                <option value="Number">Number</option>
              </BFormSelect>
              <Icon icon="wand-sparkles" class="app-search-icon text-muted" />
            </div>

            <div>
              <BFormSelect v-model="perPage" :options="perPageOptions" class="form-control my-1 my-md-0" />
            </div>
          </div>

          <div class="d-flex gap-1">
            <BButton variant="danger" class="ms-1" v-b-modal.addAttributeModal>
              <Icon icon="plus" class="fs-sm me-2" />
              Add Attribute
            </BButton>
          </div>
        </BCardHeader>

        <BTable
          show-empty
          :filter="searchQuery"
          empty-text="No products found."
          v-model:selected-rows="selected"
          thead-class="bg-light align-middle bg-opacity-25 thead-sm"
          hover
          :fields="fields"
          :items="attributes"
          :per-page="perPage"
          :current-page="currentPage"
          @filtered="onFiltered"
          responsive
          class="table table-custom table-nowrap table-centered mb-0 w-100"
        >
          <template #head()="data">
            <span class="text-uppercase fs-xxs">{{ data.label }}</span>
          </template>
          <template #head(checkbox)>
            <input class="form-check-input form-check-input-light fs-14 mt-0" type="checkbox" id="select-all-products" value="option" :checked="allSelected" :indeterminate="isIndeterminate" @change="toggleSelectAll" />
          </template>
          <template #head(action)>
            <span class="text-uppercase d-flex justify-content-center fs-xxs">Actions</span>
          </template>
          <template #cell(checkbox)="data">
            <input class="form-check-input form-check-input-light fs-14 product-item-check mt-0" type="checkbox" :value="data.item" :checked="selected.includes(data.item)" @change="onToggleRow(data.item, $event)" />
          </template>

          <template #cell(attribute)="{ item }">
            <h6 class="mb-0 fw-medium fs-base">{{ item.attribute }}</h6>
          </template>
          <template #cell(values)="{ item }">
            <span class="text-muted">{{ item.options.join(', ') }}</span>
          </template>
          <template #cell(isActive)="{ item }">
            <BFormCheckbox switch :checked="item.isActive" />
          </template>
          <template #cell(createdDate)="{ item }">
            {{ item.createdDate }} <small class="text-muted">{{ item.createdTime }}</small></template
          >
          <template #cell(updatedDate)="{ item }">
            {{ item.updatedDate }} <small class="text-muted">{{ item.updatedTime }}</small>
          </template>
          <template #cell(user)="{ item }">
            <div class="d-flex align-items-center gap-2">
              <div class="avatar avatar-sm">
                <img :src="item.user.image" :alt="item.user.name" class="img-fluid rounded-circle" />
              </div>
              <div>
                <h6 class="mb-0 fw-semibold">{{ item.user.name }}</h6>
                <p class="text-muted fs-xs mb-0">{{ item.user.role }}</p>
              </div>
            </div>
          </template>

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
          <TablePagination v-model:currentPage="currentPage" :per-page="perPage" :total-items="totalRows" label="products" />
        </BCardFooter>
      </BCard>
    </BCol>
  </BRow>
  <AddAttribute />
</template>

<script setup lang="ts">
import { BButton, BFormSelect, BTable } from 'bootstrap-vue-next'
import { vBModal } from 'bootstrap-vue-next/directives/BModal'
import { computed, ref } from 'vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import TablePagination from '~/components/TablePagination.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { useTableActions } from '~/composables/useTableActions'
import AddAttribute from './components/AddAttribute.vue'
import { attributeData, type AttributeType } from './components/data'

const fields = [
  { key: 'checkbox', label: 'Select', sortable: false },
  { key: 'attribute', label: 'Attribute Name', sortable: true },
  { key: 'inputType', label: 'Type', sortable: true },
  { key: 'values', label: 'Values', sortable: true },
  { key: 'isActive', label: 'Status', sortable: false },
  { key: 'createdDate', label: 'Created Date', sortable: true },
  { key: 'updatedDate', label: 'Last Updated', sortable: true },
  { key: 'user', label: 'Last Modified By', sortable: false },
  { key: 'action', label: 'Actions' },
]

const atrributeType = ref('All')
const searchQuery = ref('')
const perPageOptions = [5, 8, 10, 20, 50]

const currentPage = ref(1)
const perPage = ref(8)
const totalRows = ref(attributeData.length)
const attributes = ref<AttributeType[]>(attributeData)

function onFiltered(filteredItems: AttributeType[]) {
  totalRows.value = filteredItems.length
  currentPage.value = 1
}

const totalItems = computed(() => attributes.value.length)

const start = computed(() => (totalItems.value === 0 ? 0 : (currentPage.value - 1) * perPage.value + 1))

const end = computed(() => Math.min(currentPage.value * perPage.value, totalItems.value))

function adjustPage() {
  const totalPages = Math.ceil(attributes.value.length / perPage.value)
  if (currentPage.value > totalPages) {
    currentPage.value = totalPages || 1
  }
}

function handleDeleteItem(item: AttributeType) {
  deleteItem(item)
  totalRows.value = attributes.value.length
  adjustPage()
}

function handleDeleteSelected() {
  deleteSelected()
  totalRows.value = attributes.value.length
  adjustPage()
}

const { selected, toggleSelectAll, onToggleRow, deleteSelected, deleteItem, allSelected, isIndeterminate } = useTableActions(attributes)
</script>
<style scoped></style>
