<template>
  <BCard no-body class="mb-2">
    <BCardBody>
      <div class="mb-3 d-flex justify-content-between align-items-center">
        <h5 class="fs-xl mb-0">
          {{ item.prefix }}{{ item.value }} <small class="fs-6">{{ item.suffix }}</small>
        </h5>
        <span>
          {{ item.change > 0 ? '+' : '' }} {{ item.change }}%
          <Icon icon="arrow-up" v-if="item.change > 0" class="text-success" />
          <Icon icon="arrow-down" v-else class="text-danger" />
        </span>
      </div>
      <p class="text-muted mb-0">{{ item.description }}</p>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { BCard, BCardBody } from 'bootstrap-vue-next'
import Icon from '~/components/wrappers/Icon.vue'
import type { CampaignStatType } from './data'
defineProps<{ item: CampaignStatType }>()
</script>
