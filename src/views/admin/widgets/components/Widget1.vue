<template>
  <BCard no-body>
    <BCardBody>
      <div class="d-flex justify-content-between align-items-center">
        <div class="avatar fs-60 avatar-img-size flex-shrink-0">
          <span class="avatar-title rounded-circle fs-24" :class="widget.iconClassName">
            <IconifyIcon :icon="widget.icon" />
          </span>
        </div>
        <div class="text-end">
          <h3 class="mb-2 fw-normal">{{ widget.prefix }}{{ widget.count }}{{ widget.suffix }}</h3>
          <p class="mb-0 text-muted">
            <span>{{ widget.title }}</span>
          </p>
        </div>
      </div>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { Icon as IconifyIcon } from '@iconify/vue'
import { BCard, BCardBody } from 'bootstrap-vue-next'
import type { StatisticWidgetType } from './data'

defineProps<{
  widget: StatisticWidgetType
}>()
</script>
