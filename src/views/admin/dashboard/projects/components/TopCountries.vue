<template>
  <CardWithAction title="Top Projects by Country" isCloseable isTogglable isReloadable>
    <div v-for="item in topCountryData" :key="item.name" class="d-flex align-items-center gap-2 mb-3">
      <img :src="item.image" :alt="item.name" class="avatar-xxs rounded" />

      <h5 class="mb-0 fw-medium">
        <RouterLink to="" class="link-reset"> {{ item.name }}&nbsp;</RouterLink><small class="text-muted">{{ item.population }} </small>
      </h5>

      <div class="ms-auto">
        <div class="d-flex align-items-center gap-3 text-end">
          <p class="mb-0 fw-medium">
            {{ item.visitors }}
          </p>
          <p :class="['badge badge-label fs-xxs mb-0', item.change > 0 ? 'badge-soft-success' : item.change < 0 ? 'badge-soft-danger' : 'badge-soft-warning']">{{ item.change > 0 ? '+' : '' }}{{ item.change }}%</p>
        </div>
      </div>
    </div>

    <div class="text-center mt-4">
      <RouterLink to="" class="link-reset text-decoration-underline fw-semibold link-offset-3">
        View all Projects
        <IconifyIcon icon="tabler:briefcase" />
      </RouterLink>
    </div>
  </CardWithAction>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { Icon as IconifyIcon } from '@iconify/vue'
import CardWithAction from '~/components/CardWithAction.vue'
import { topCountryData } from './data'
</script>
