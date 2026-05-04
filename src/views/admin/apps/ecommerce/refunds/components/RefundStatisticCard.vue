<template>
  <BCard no-body class="mb-1">
    <BCardBody>
      <div class="d-flex align-items-center gap-2 mb-3">
        <div class="avatar-md flex-shrink-0">
          <span :class="clsx('avatar-title  rounded-circle fs-22', item.iconClassName)">
            <Icon :icon="item.icon" />
          </span>
        </div>
        <h3 class="mb-0">{{ item.value }}</h3>
      </div>
      <p class="mb-0">
        {{ item.title }}
        <span :class="clsx('float-end badge', item.badgeClassName)">{{ item.change > 0 ? '+' : '' }}{{ item.change }}%</span>
      </p>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { BCard, BCardBody } from 'bootstrap-vue-next'
import clsx from 'clsx'
import Icon from '~/components/wrappers/Icon.vue'
import type { RefundStatType } from './data'

defineProps<{
  item: RefundStatType
}>()
</script>
