<template>
  <BCard no-body>
    <BCardBody class="d-flex justify-content-between align-items-center">
      <div>
        <h3 class="mb-2 fw-normal">
          <CountUp :end-val="item.count" :options="{ prefix: item.prefix || '', suffix: item.suffix || '', duration: 1 }" />
        </h3>
        <p class="mb-0 text-muted">{{ item.title }}</p>
      </div>
      <div class="avatar fs-60 avatar-img-size">
        <span class="avatar-title rounded-circle fs-24" :class="item.iconClassName">
          <IconifyIcon :icon="item.icon" />
        </span>
      </div>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { Icon as IconifyIcon } from '@iconify/vue'
import { BCard, BCardBody } from 'bootstrap-vue-next'
import CountUp from 'vue-countup-v3'
import type { StatisticWidgetType } from './data'

defineProps<{
  item: StatisticWidgetType
}>()
</script>
