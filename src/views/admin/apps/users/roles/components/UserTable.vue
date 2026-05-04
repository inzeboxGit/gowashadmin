<template>
  <BCard no-body>
    <BCardHeader class="border-light justify-content-between">
      <div class="d-flex gap-2">
        <div class="app-search">
          <BFormInput v-model="searchQuery" type="search" placeholder="Search users..." />
          <Icon icon="search" class="app-search-icon text-muted" />
        </div>
        <BButton v-if="selected.length" variant="danger" @click="handleDeleteSelected"> Delete </BButton>
      </div>

      <div class="d-flex align-items-center gap-2">
        <span class="me-2 fw-semibold">Filter By:</span>

        <div class="app-search">
          <BFormSelect v-model="roles" class="form-control my-1 my-md-0">
            <option value="All">Role</option>
            <option value="Security Officer">Security Officer</option>
            <option value="Project Manager">Project Manager</option>
            <option value="Developer">Developer</option>
            <option value="Support Lead">Support Lead</option>
          </BFormSelect>
          <Icon icon="shield-user" class="app-search-icon text-muted" />
        </div>

        <div class="app-search">
          <BFormSelect v-model="status" class="form-control my-1 my-md-0">
            <option value="All">Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
          </BFormSelect>
          <Icon icon="user-check" class="app-search-icon text-muted" />
        </div>

        <div>
          <BFormSelect v-model="perPage" :options="perPageOptions" class="form-control my-1 my-md-0" />
        </div>

        <BButton variant="secondary" type="submit" v-b-modal.addUserModal>Add User</BButton>
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
      :items="users"
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
      <template #cell(id)="{ item }">
        <h5 class="m-0">
          <RouterLink to="" class="link-reset">{{ item.id }}</RouterLink>
        </h5>
      </template>
      <template #cell(user)="{ item }">
        <div class="d-flex align-items-center gap-2">
          <div class="avatar avatar-sm">
            <img :src="item.image" class="img-fluid rounded-circle" alt="" />
          </div>
          <div>
            <h5 class="fs-base mb-0">
              <RouterLink to="" class="link-reset">{{ item.name }}</RouterLink>
            </h5>
            <p class="text-muted fs-xs mb-0">{{ item.email }}</p>
          </div>
        </div>
      </template>
      <template #cell(lastUpdated)="{ item }">
        {{ item.date }} <small class="text-muted">{{ item.time }}</small>
      </template>
      <template #cell(status)="{ item }">
        <span class="badge badge-label" :class="item.status === 'suspended' ? 'bg-danger-subtle text-danger' : item.status === 'inactive' ? 'bg-warning-subtle text-warning' : 'bg-success-subtle text-success'">{{ toPascalCase(item.status) }}</span>
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
      <TablePagination v-model:currentPage="currentPage" :per-page="perPage" :total-items="totalRows" label="roles" />
    </BCardFooter>
  </BCard>

  <BModal id="addUserModal" size="lg" ok-title="Add User" cancel-variant="light" class="fade" tabindex="-1" title="Add New User" aria-hidden="true">
    <BForm id="addUserForm">
      <BRow class="g-3">
        <BCol md="6">
          <BFormGroup label="Full Name" label-for="userFullName">
            <BFormInput type="text" id="userFullName" placeholder="Enter full name" required class="form-control" />
          </BFormGroup>
        </BCol>

        <BCol md="6">
          <BFormGroup label="Email Address" label-for="userEmail">
            <BFormInput type="email" id="userEmail" placeholder="Enter email" required class="form-control" />
          </BFormGroup>
        </BCol>

        <BCol md="6">
          <BFormGroup label="Role" label-for="userRole">
            <BFormSelect v-model="userRole" id="userRole" required class="form-select">
              <option value="">Select role</option>
              <option value="Project Manager">Project Manager</option>
              <option value="Developer">Developer</option>
              <option value="Support Lead">Support Lead</option>
              <option value="Security Officer">Security Officer</option>
            </BFormSelect>
          </BFormGroup>
        </BCol>

        <BCol md="6">
          <BFormGroup label="Status" label-for="userStatus">
            <BFormSelect v-model="userStatus" id="userStatus" required class="form-select">
              <option value="">Select status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </BFormSelect>
          </BFormGroup>
        </BCol>

        <BCol md="6">
          <BFormGroup label="User Avatar" label-for="userAvatar" class="mb-0">
            <BFormFile id="userAvatar" accept="image/*" class="form-control" />
            <small class="text-muted">Optional: Upload avatar image</small>
          </BFormGroup>
        </BCol>
      </BRow>
    </BForm>
  </BModal>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { BCard, BCardFooter, BCardHeader, BFormSelect, BTable, type TableFieldRaw } from 'bootstrap-vue-next'
import { vBModal } from 'bootstrap-vue-next/directives'
import { ref } from 'vue'
import TablePagination from '~/components/TablePagination.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { useTableActions } from '~/composables/useTableActions'
import { toPascalCase } from '~/utils/helpers'
import { userData, type UserType } from './data'

const fields: Exclude<TableFieldRaw<UserType>, string>[] = [
  { key: 'checkbox', label: '' },
  { key: 'id', label: 'Id', sortable: true },
  { key: 'user', label: 'User', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'lastUpdated', label: 'Last Updated', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'action', label: 'Action', sortable: false },
]

const searchQuery = ref('')
const roles = ref('All')
const status = ref('All')
const userRole = ref('')
const userStatus = ref('')
const perPageOptions = [5, 8, 10, 20, 50]

const currentPage = ref(1)
const perPage = ref(8)
const totalRows = ref(userData.length)
const users = ref<UserType[]>(userData)

function onFiltered(filteredItems: UserType[]) {
  totalRows.value = filteredItems.length
  currentPage.value = 1
}

function adjustPage() {
  const totalPages = Math.ceil(users.value.length / perPage.value)
  if (currentPage.value > totalPages) {
    currentPage.value = totalPages || 1
  }
}

function handleDeleteItem(item: UserType) {
  deleteItem(item)
  totalRows.value = users.value.length
  adjustPage()
}

function handleDeleteSelected() {
  deleteSelected()
  totalRows.value = users.value.length
  adjustPage()
}

const { selected, toggleSelectAll, onToggleRow, deleteSelected, deleteItem, allSelected, isIndeterminate } = useTableActions(users)
</script>

<style scoped></style>
