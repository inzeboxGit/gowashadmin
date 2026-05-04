<template>
  <BCard no-body>
    <BCardBody class="p-0">
      <BCardHeader class="border-light d-flex justify-content-between flex-wrap gap-2">
        <div class="d-flex flex-wrap gap-2 align-items-center">
          <div class="app-search">
            <BFormInput v-model="searchQuery" type="text" class="form-control" placeholder="Search tickets..." />
            <Icon icon="search" class="app-search-icon text-muted" />
          </div>

          <BButton v-if="selected.length" class="btn btn-danger" @click="handleDeleteSelected"> Delete </BButton>

          <RouterLink to="/apps/ticket/create" class="btn btn-primary"> <Icon icon="plus" class="me-1" /> New Ticket </RouterLink>
        </div>

        <div class="d-flex flex-wrap align-items-center gap-2">
          <span class="me-2 fw-semibold">Filter By:</span>

          <div class="app-search">
            <select class="form-select form-control my-1 my-md-0">
              <option value="">Status</option>
              <option value="Open">Open</option>
              <option value="Pending">Pending</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
              <option value="Escalated">Escalated</option>
            </select>
            <Icon icon="shuffle" class="app-search-icon text-muted" />
          </div>

          <div class="app-search">
            <select class="form-select form-control my-1 my-md-0">
              <option value="">Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
            <Icon icon="alert-triangle" class="app-search-icon text-muted" />
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
        thead-class="bg-light align-middle bg-opacity-25 thead-sm"
        v-model:selected-rows="selected"
        hover
        :fields="fields"
        :items="tickets"
        :per-page="perPage"
        :current-page="currentPage"
        @filtered="onFiltered"
        responsive
        class="table table-custom table-centered table-select table-hover w-100 mb-0"
      >
        <template #head()="data">
          <span class="text-uppercase fs-xxs">{{ data.label }}</span>
        </template>
        <template #head(select)>
          <input class="form-check-input form-check-input-light fs-14 mt-0" type="checkbox" id="select-all-products" value="option" :checked="allSelected" :indeterminate="isIndeterminate" @change="toggleSelectAll" />
        </template>
        <template #head(action)>
          <span class="text-uppercase d-flex justify-content-center fs-xxs">Actions</span>
        </template>
        <template #cell(select)="data">
          <input class="form-check-input form-check-input-light fs-14 product-item-check mt-0" type="checkbox" :value="data.item" :checked="selected.includes(data.item)" @change="onToggleRow(data.item, $event)" />
        </template>
        <template #cell(requestedBy)="{ item }">
          <div class="d-flex gap-2 align-items-center">
            <img :src="item.requestedBy.image" alt="Requested By" class="avatar-xs rounded-circle" />
            <span>{{ item.requestedBy.name }}</span>
          </div>
        </template>

        <template #cell(agent)="{ item }">
          <div class="d-flex gap-2 align-items-center">
            <img :src="item.agent.image" alt="Agent" class="avatar-xs rounded-circle" />
            <RouterLink to="" class="link-reset">{{ item.agent.name }}</RouterLink>
          </div>
        </template>
        <template #cell(priority)="{ item }">
          <span
            :class="{
              'badge text-bg-danger': item.priority === 'high',
              'badge text-bg-warning': item.priority === 'medium',
              'badge text-bg-success': item.priority === 'low',
              'badge text-bg-primary': item.priority === 'urgent',
            }"
          >
            {{ toPascalCase(item.priority) }}
          </span>
        </template>
        <template #cell(status)="{ item }">
          <span
            class="badge badge-label"
            :class="{
              'bg-warning-subtle text-warning': item.status === 'pending',
              'bg-info-subtle text-info': item.status === 'in-progress',
              'bg-success-subtle text-success': item.status === 'resolved',
              'bg-secondary-subtle text-secondary': item.status === 'closed',
              'bg-danger-subtle text-danger': item.status === 'escalated',
            }"
          >
            {{ toPascalCase(item.status) }}
          </span>
        </template>

        <template #cell(createdAt)="{ item }">
          <span
            >{{ item.createdAtDate }}<small class="text-muted">{{ item.createdAtTime }}</small></span
          >
        </template>

        <template #cell(action)>
          <div class="d-flex justify-content-center gap-1">
            <RouterLink to="apps/ticket/details" class="btn btn-default btn-icon btn-sm rounded-circle">
              <Icon icon="eye" class="fs-lg" />
            </RouterLink>
            <RouterLink to="" class="btn btn-default btn-icon btn-sm rounded-circle">
              <Icon icon="square-pen" class="fs-lg" />
            </RouterLink>
            <BButton size="sm" class="btn-default btn-icon rounded-circle" @click="handleDeleteSelected">
              <Icon icon="trash-2" class="fs-lg" />
            </BButton>
          </div>
        </template>
      </BTable>

      <BCardFooter class="border-0">
        <TablePagination v-model:currentPage="currentPage" :per-page="perPage" :total-items="totalRows" label="tickets" />
      </BCardFooter>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { BButton } from 'bootstrap-vue-next'
import { ref } from 'vue'
import TablePagination from '~/components/TablePagination.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { useTableActions } from '~/composables/useTableActions'
import { toPascalCase } from '~/utils/helpers'
import { ticketsData, type TicketType } from './data'

const fields = [
  { key: 'select', label: '' },
  { key: 'id', label: 'ID', sortable: true },
  { key: 'requestedBy', label: 'Requested By' },
  { key: 'subject', label: 'Ticket Subject', sortable: true },
  { key: 'agent', label: 'Assigned Agent' },
  { key: 'priority', label: 'Priority', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'createdAt', label: 'Date Created', sortable: true },
  { key: 'dueDate', label: 'Due Date', sortable: true },
  { key: 'action', label: 'Actions' },
]

const searchQuery = ref('')

const perPageOptions = [5, 8, 10, 20, 50]

const currentPage = ref(1)
const perPage = ref(8)
const totalRows = ref(ticketsData.length)
const tickets = ref<TicketType[]>(ticketsData)

function onFiltered(filteredItems: TicketType[]) {
  totalRows.value = filteredItems.length
  currentPage.value = 1
}

function adjustPage() {
  const totalPages = Math.ceil(tickets.value.length / perPage.value)
  if (currentPage.value > totalPages) {
    currentPage.value = totalPages || 1
  }
}

function handleDeleteSelected() {
  deleteSelected()
  totalRows.value = tickets.value.length
  adjustPage()
}

const { selected, toggleSelectAll, onToggleRow, deleteSelected, allSelected, isIndeterminate } = useTableActions(tickets)
</script>
