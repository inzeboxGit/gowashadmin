<template>
  <BCard no-body>
    <BCardBody class="d-flex align-items-center">
      <div class="me-3">
        <img :src="item.image" alt="User" class="rounded-circle avatar-xl" />
      </div>
      <div>
        <h5 class="mb-1">{{ item.name }}</h5>
        <p class="text-muted fs-xs mb-0">{{ item.role }}</p>
      </div>
      <BButton type="button" class="btn-icon ms-auto" :class="item.className"><IconifyIcon :icon="item.icon" class="fs-lg" /></BButton>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { Icon as IconifyIcon } from '@iconify/vue'
import { BButton, BCard, BCardBody } from 'bootstrap-vue-next'
import type { StatisticWidget6Type } from './data'

defineProps<{ item: StatisticWidget6Type }>()
</script>
