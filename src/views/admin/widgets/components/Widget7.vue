<template>
  <BCard no-body class="border shadow-none border-dashed mb-0" :class="item.cardClass">
    <BCardBody>
      <div class="mb-3 d-flex justify-content-between align-items-center">
        <h5 class="fs-xl mb-0">{{ item.count }} {{ item.title }}</h5>
        <span>{{ item.change }} <IconifyIcon :icon="item.icon" :class="item.changeClassName" class="flex align-baseline"></IconifyIcon></span>
      </div>
      <p class="text-muted mb-2">
        <span>{{ item.progressTitle }}</span>
      </p>
      <BProgress class="progress-sm mb-0 bg-opacity-25" :class="item.progressBgClass">
        <BProgressBar :class="item.progressBgClass" role="progressbar" :style="{ width: item.progress + '%' }" :aria-valuenow="item.progress" aria-valuemin="0" aria-valuemax="100"></BProgressBar>
      </BProgress>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { Icon as IconifyIcon } from '@iconify/vue'
import { BCard, BCardBody, BProgress, BProgressBar } from 'bootstrap-vue-next'
import type { StatisticWidget7Type } from './data'

defineProps<{ item: StatisticWidget7Type }>()
</script>
