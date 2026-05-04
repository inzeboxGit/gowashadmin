<template>
  <BCard no-body>
    <BCardBody>
      <div class="d-flex justify-content-between">
        <h5 :title="stat.title">{{ stat.title }}</h5>
      </div>

      <div class="d-flex align-items-center gap-2 my-2">
        <div class="avatar-md flex-shrink-0">
          <span :class="clsx('avatar-title bg-opacity-90 fs-22 rounded-circle', stat.iconClassName)">
            <Icon :icon="stat.icon" />
          </span>
        </div>
        <h3 class="mb-0">{{ stat.prefix }}{{ stat.value }}{{ stat.suffix }}</h3>
      </div>

      <p class="mb-0">
        <span :class="stat.bulletClassName" class="me-1">
          <Icon icon="circle" />
        </span>
        <span class="text-nowrap text-muted">{{ stat.subTitle }}</span>
        <span class="float-end">
          <b>{{ stat.totalCount }}</b>
        </span>
      </p>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { BCard, BCardBody } from 'bootstrap-vue-next'
import clsx from 'clsx'
import Icon from '~/components/wrappers/Icon.vue'
import type { SellerStatType } from './data'

defineProps<{
  stat: SellerStatType
}>()
</script>

<style scoped></style>
