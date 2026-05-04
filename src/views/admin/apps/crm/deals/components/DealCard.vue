<template>
  <BCard class="mb-2" no-body>
    <BCardBody>
      <div class="mb-3 d-flex justify-content-between align-items-center">
        <h5 class="fs-xl mb-0">{{ item.prefix }} {{ item.value }} {{ item.suffix }}</h5>
        <span>
          {{ item.change }}%
          <Icon icon="arrow-up" class="text-success" />
        </span>
      </div>
      <p class="text-muted mb-2">{{ item.title }}</p>
      <BProgress :class="`bg-opacity-25 progress-sm mb-0 bg-${item.className}`" height="5px" :width="item.progress">
        <BProgressBar :value="item.progress" :class="`bg-${item.className}`" />
      </BProgress>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { BCard, BProgress, BProgressBar } from 'bootstrap-vue-next'
import Icon from '~/components/wrappers/Icon.vue'
import type { DealStatType } from './data'

defineProps<{ item: DealStatType }>()
</script>
