<template>
  <PageBreadcrumb title="Pipeline" subtitle="CRM" />
  <div class="outlook-box kanban-app">
    <BCard no-body class="h-100 mb-0 flex-grow-1">
      <BCardHeader class="d-none d-lg-flex border-light align-items-center gap-2">
        <div class="app-search">
          <BFormInput type="search" placeholder="Search deals..." />
          <Icon icon="search" class="app-search-icon text-muted" />
        </div>

        <div class="d-flex flex-wrap align-items-center gap-2">
          <div class="app-search">
            <BFormSelect v-model="stage" class="form-control">
              <option value="All">Stage</option>
              <option value="Qualification">Qualification</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Negotiation">Negotiation</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </BFormSelect>
            <Icon icon="shuffle" class="app-search-icon text-muted" />
          </div>

          <div class="app-search">
            <BFormSelect v-model="closingDate" class="form-control">
              <option value="All">Closing Date</option>
              <option value="Today">Today</option>
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
            </BFormSelect>
            <Icon icon="calendar" class="app-search-icon text-muted" />
          </div>
        </div>

        <BButton variant="secondary" class="ms-lg-auto">
          <Icon icon="plus" class="me-1" />
          Add New Deal
        </BButton>
      </BCardHeader>

      <BCardBody class="p-0">
        <div class="kanban-content">
          <div class="kanban-board bg-opacity-10" :class="variants[idx]" v-for="(status, idx) in statuses" :key="idx">
            <div class="kanban-item py-2 px-3 d-flex align-items-center">
              <h5 class="m-0">{{ toTitleCase(status) }} ({{ tasksByStatus(status).length }})</h5>
              <BButton variant="primary" size="sm" class="ms-auto btn-icon rounded-circle" @click="showModal = !showModal">
                <Icon icon="plus" class="fs-md" />
              </BButton>
            </div>
            <simplebar class="kanban-board-group px-2">
              <ul data-plugins="sortable">
                <li class="kanban-item" v-for="(task, idx) in tasksByStatus(status)" :key="idx">
                  <VueDraggableNext group="project-task">
                    <TaskCard :item="task" />
                  </VueDraggableNext>
                </li>
              </ul>
            </simplebar>
          </div>
        </div>
      </BCardBody>
    </BCard>
  </div>
</template>

<script setup lang="ts">
import { BCard, BCardBody, BCardHeader, BFormSelect } from 'bootstrap-vue-next'
import simplebar from 'simplebar-vue'
import { ref } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { toTitleCase } from '~/utils/helpers'
import { pipelineData, type PipelineType } from './components/data'
import TaskCard from './components/TaskCard.vue'

const statuses: PipelineType['status'][] = ['lead', 'negotiation', 'won', 'lost']
const variants: PipelineType['className'][] = ['bg-warning', 'bg-info', 'bg-success', 'bg-danger']

const tasksByStatus = (status: string) => {
  return pipelineData.filter((task: PipelineType) => task.status === status)
}

const stage = ref('All')
const closingDate = ref('All')
const showModal = ref(false)
</script>
