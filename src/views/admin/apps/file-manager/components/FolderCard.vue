<template>
  <BCard no-body class="border border-dashed mb-0">
    <BCardBody class="p-2">
      <div class="d-flex align-items-center justify-content-between gap-2">
        <div class="flex-shrink-0 avatar-md bg-light bg-opacity-50 text-muted rounded-2">
          <span class="avatar-title">
            <Icon icon="folder" class="fs-24" />
          </span>
        </div>

        <div class="flex-grow-1">
          <h5 class="mb-1 fs-sm">
            <RouterLink to="" class="link-reset">
              {{ folder.name }}
            </RouterLink>
          </h5>
          <p class="text-muted mb-0 fs-xs">{{ formatBytes(folder.size) }}</p>
        </div>

        <BDropdown variant="link" toggle-class="dropdown-toggle drop-arrow-none fs-xxl link-reset p-0" class="flex-shrink-0 text-muted" end>
          <template #button-content>
            <Icon icon="ellipsis-vertical" />
          </template>

          <BDropdownItem> <Icon icon="share-2" class="me-1" /> Share </BDropdownItem>
          <BDropdownItem> <Icon icon="link" class="me-1" /> Get Sharable Link </BDropdownItem>
          <BDropdownItem> <Icon icon="download" class="me-1" /> Download </BDropdownItem>
          <BDropdownItem> <Icon icon="pin" class="me-1" /> Pin </BDropdownItem>
          <BDropdownItem> <Icon icon="square-pen" class="me-1" /> Edit </BDropdownItem>
          <BDropdownItem> <Icon icon="trash-2" class="me-1" /> Delete </BDropdownItem>
        </BDropdown>
      </div>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { BCard, BCardBody, BDropdown, BDropdownItem } from 'bootstrap-vue-next'
import Icon from '~/components/wrappers/Icon.vue'
import { formatBytes } from '~/utils/helpers'
import type { FolderType } from './data'

defineProps<{ folder: FolderType }>()
</script>
