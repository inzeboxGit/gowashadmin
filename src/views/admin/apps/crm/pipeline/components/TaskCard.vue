<template>
  <BCard no-body class="shadow mb-2">
    <BCardBody class="p-3">
      <div class="d-flex align-items-start mb-2">
        <div>
          <h5 class="mb-0 fw-semibold">
            <RouterLink to="" class="link-reset">{{ item.user.title }}</RouterLink>
          </h5>
          <small class="text-muted">{{ item.company }}</small>
        </div>
        <div class="ms-auto">
          <BDropdown size="sm" toggle-class="btn-ghost-light text-muted px-1" no-caret placement="bottom-end">
            <template #button-content>
              <Icon icon="ellipsis-vertical" class="fs-lg" />
            </template>
            <BDropdownItem><Icon icon="share-2" class="me-2" /> Share </BDropdownItem>
            <BDropdownItem><Icon icon="square-pen" class="me-2" /> Edit </BDropdownItem>
            <BDropdownItem><Icon icon="user-check" class="me-2" /> Assign </BDropdownItem>
            <BDropdownItem class="text-danger"> <Icon icon="trash-2" class="me-2" /> Delete </BDropdownItem>
          </BDropdown>
        </div>
      </div>

      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center gap-1">
          <img :src="item.user.image" class="rounded-circle avatar-xs" alt="Alex Carter" />
          <span class="fw-medium text-muted fs-sm">{{ item.user.name }}</span>
        </div>
        <div class="d-flex align-items-center gap-1">
          <Icon icon="calendar-clock" v-if="item.status === 'won'" class="text-success" />
          <Icon icon="calendar" v-else-if="item.status === 'lost'" class="text-danger" />
          <Icon icon="calendar-clock" v-else />
          <h5 class="fs-base mb-0 fw-medium">{{ item.date }}</h5>
        </div>
      </div>

      <div class="mt-2">
        <div class="d-flex justify-content-between align-items-center">
          <div v-if="item.messages" class="d-flex align-items-center gap-2 fs-sm">
            <span class="d-flex align-items-center gap-1">
              <Icon icon="message-square" class="text-muted fs-lg" />
              {{ item.messages }}
            </span>
            <span class="d-flex align-items-center gap-1">
              <Icon icon="list-check" class="text-muted fs-lg" />
              {{ item.tasks }}
            </span>
          </div>
          <div v-if="item.status === 'won'" class="d-flex align-items-center gap-2 fs-sm">
            <Icon icon="medal" class="text-success fs-lg" />
            Won
          </div>
          <div v-if="item.status === 'lost'" class="d-flex align-items-center gap-2 fs-sm">
            <Icon icon="x" class="text-danger fs-lg" />
            Lost
          </div>
          <span :class="['fw-semibold', item.status === 'won' ? '' : item.status === 'lost' ? 'text-danger' : '']">{{ item.amount }}</span>
        </div>
      </div>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { BCard, BCardBody, BDropdown, BDropdownItem } from 'bootstrap-vue-next'
import Icon from '~/components/wrappers/Icon.vue'
import type { PipelineType } from './data'

defineProps<{
  item: PipelineType
}>()
</script>
