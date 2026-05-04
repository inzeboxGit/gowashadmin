<template>
  <CardWithAction title="Top Countries" isCloseable isCollapsable isReloadable>
    <div v-for="(country, idx) in topCountryData" :key="idx" :class="['d-flex align-items-center gap-2', idx !== topCountryData.length - 1 ? 'mb-3' : '']">
      <img :src="country.image" :alt="country.name" class="avatar-xxs rounded" height="16" width="16" />

      <h5 class="mb-0 fw-medium">
        <RouterLink to="" class="link-reset">
          {{ country.name }}&nbsp;<small class="text-muted">Pop: {{ country.population }}</small>
        </RouterLink>
      </h5>
      <div class="ms-auto">
        <div class="d-flex align-items-center gap-3 text-end">
          <p class="mb-0 fw-medium">
            {{ country.visitors.toLocaleString() }}
          </p>
          <p class="badge badge-label fs-xxs mb-0" :class="[country.change > 0 ? 'badge-soft-success' : country.change < 0 ? 'badge-soft-danger' : 'badge-soft-warning']">{{ country.change > 0 ? '+' : '' }}{{ country.change }}%</p>
        </div>
      </div>
    </div>

    <div class="text-center mt-4">
      <RouterLink to="/apps/chat" class="link-reset text-decoration-underline fw-semibold link-offset-3">
        View all Countries
        <IconifyIcon icon="tabler:world" />
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
