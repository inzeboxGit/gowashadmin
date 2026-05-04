<template>
  <BCard class="mb-2" no-body>
    <BCardBody>
      <div class="d-flex gap-3">
        <div class="avatar-lg rounded-circle d-flex align-items-center justify-content-center" :class="item.changeColor">
          <Icon :icon="item.icon" class="fs-xxl" />
        </div>

        <div class="flex-grow-1">
          <div class="mb-2 d-flex justify-content-between align-items-center">
            <h5 class="fs-xl mb-0">
              {{ item.count }}
              <small class="fs-6">{{ item.unit }}</small>
            </h5>
            <span v-if="item.change" class="d-flex justify-content-center align-items-center gap-1">
              {{ item.change }}
              <Icon icon="arrow-up" class="text-success" v-if="item.isPositive" />
              <Icon icon="arrow-down" class="text-danger" v-else />
            </span>
          </div>
          <p class="text-muted mb-0">{{ item.label }}</p>
        </div>
      </div>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import Icon from '~/components/wrappers/Icon.vue'
import type { TicketStatType } from './data'

defineProps<{ item: TicketStatType }>()
</script>
