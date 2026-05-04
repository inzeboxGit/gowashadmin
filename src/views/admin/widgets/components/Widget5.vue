<template>
  <BCard no-body>
    <BCardBody>
      <div class="d-flex justify-content-between align-items-start">
        <div class="avatar avatar-lg flex-shrink-0">
          <span class="avatar-title rounded fs-24" :class="item.bgClass">
            <IconifyIcon :icon="item.icon" />
          </span>
        </div>
        <div class="text-end">
          <h4 class="mb-0">{{ item.value }}</h4>
          <p class="mb-0 text-muted">{{ item.title }}</p>
        </div>
      </div>
      <div class="mt-4">
        <div class="d-flex justify-content-between mb-1">
          <span class="text-muted fs-xs fw-semibold">{{ item.progressLabel }}</span>
          <span class="text-muted">{{ item.progress }}%</span>
        </div>
        <BProgress class="progress" style="height: 6px">
          <BProgressBar :variant="item.progressBgClass" :style="{ width: item.progress + '%' }"></BProgressBar>
        </BProgress>
      </div>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { Icon as IconifyIcon } from '@iconify/vue'
import { BCard, BCardBody, BProgress } from 'bootstrap-vue-next'
import type { StatisticWidget5Type } from './data'

defineProps<{ item: StatisticWidget5Type }>()
</script>
