<template>
  <BCard no-body>
    <BCardBody>
      <div class="d-flex justify-content-between align-items-center">
        <div class="avatar fs-60 avatar-img-size flex-shrink-0">
          <span class="avatar-title rounded-circle fs-24" :class="item.textClass">
            <IconifyIcon :icon="item.icon" />
          </span>
        </div>
        <div class="text-end">
          <h3 class="mb-2 fw-normal">
            <CountUp :end-val="item.value" :options="{ decimalPlaces: Number.isInteger(item.value) ? 0 : 2, prefix: item.prefix || '', suffix: item.suffix || '' }" />
          </h3>
          <p class="mb-0 text-muted">
            <span>{{ item.title }}</span>
          </p>
        </div>
      </div>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { Icon as IconifyIcon } from '@iconify/vue'
import { BCard, BCardBody } from 'bootstrap-vue-next'
import CountUp from 'vue-countup-v3'
import type { StatisticsWidgetType } from './data'

type PropsType = {
  item: StatisticsWidgetType
}

defineProps<PropsType>()
</script>
