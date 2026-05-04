<template>
  <BCard class="mb-1" no-body>
    <BCardBody>
      <div class="d-flex align-items-center justify-content-between gap-2 mb-3">
        <h3 class="mb-0">
          <CountUp :options="{ suffix: item.suffix || '', decimalPlaces: Number.isInteger(item.value) ? 0 : 2 }" :end-val="item.value" />
        </h3>
        <div class="avatar-md flex-shrink-0">
          <span :class="['avatar-title rounded-circle fs-22', item.className]">
            <Icon :icon="item.icon" />
          </span>
        </div>
      </div>

      <p class="mb-0 text-uppercase fs-xs fw-bold">
        {{ item.title }}
        <span :class="`float-end badge badge-soft-${item.change > 0 ? 'success' : 'danger'}`">{{ item.change > 0 ? '+' : '' }} {{ item.change }}% </span>
      </p>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import CountUp from 'vue-countup-v3'
import Icon from '~/components/wrappers/Icon.vue'
import type { OrderStatType } from './data'
defineProps<{ item: OrderStatType }>()
</script>
