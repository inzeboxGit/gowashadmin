<template>
  <BCard no-body>
    <BCardBody>
      <div class="d-flex justify-content-between">
        <h5 title="Number of Orders">{{ item.title }}</h5>
        <p class="mb-0 fs-lg"><IconifyIcon icon="tabler:info-hexagon-filled" class="text-muted"></IconifyIcon></p>
      </div>
      <div class="d-flex align-items-center gap-2 my-3">
        <div class="avatar-md flex-shrink-0">
          <span class="avatar-title rounded-circle fs-22" :class="item.iconClassName">
            <IconifyIcon :icon="item.icon" />
          </span>
        </div>
        <h3 class="mb-0">{{ item.count }}</h3>
      </div>
      <p class="mb-0">
        <span class="text-success"><IconifyIcon icon="tabler:point-filled" /></span>
        <span class="text-nowrap text-muted">{{ item.subTitle }}</span>
        <span class="float-end"
          ><b>{{ item.metric }}</b></span
        >
      </p>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { Icon as IconifyIcon } from '@iconify/vue'
import { BCard, BCardBody } from 'bootstrap-vue-next'
import type { StatisticWidget3Type } from './data'

defineProps<{
  item: StatisticWidget3Type
}>()
</script>
