<template>
  <BCard no-body>
    <BCardBody>
      <div class="d-flex justify-content-between">
        <h6 class="mb-0 fs-sm text-uppercase">{{ item.title }}</h6>
        <p class="mb-0 fs-lg">
          <IconifyIcon icon="tabler:info-hexagon-filled" class="text-muted" data-bs-toggle="tooltip" data-bs-placement="bottom" :title="item.description"></IconifyIcon>
        </p>
      </div>
      <h3 class="my-3 text-primary text-center">
        <CountUp :end-val="item.count" :options="{ prefix: item.prefix || '', suffix: item.suffix || '', duration: 1 }" />
      </h3>
      <p class="mb-0">
        <span :class="item.changeClassName"><IconifyIcon icon="point-filled"></IconifyIcon></span>
        <span class="text-muted">{{ item.subTitle }}: {{ item.metric }}</span>
        <span class="float-end"
          ><IconifyIcon icon="tabler:trending-up" :class="item.changeClassName"></IconifyIcon> <b>{{ item.change }}</b></span
        >
      </p>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { Icon as IconifyIcon } from '@iconify/vue'
import { BCard, BCardBody } from 'bootstrap-vue-next'
import CountUp from 'vue-countup-v3'
import type { StatisticWidget4Type } from './data'

defineProps<{ item: StatisticWidget4Type }>()
</script>
