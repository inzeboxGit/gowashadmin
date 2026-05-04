<template>
  <BCard no-body class="h-100 h-100 my-4 my-lg-0" :class="plan.isPopular ? 'text-bg-primary' : 'border-dashed border bg-light bg-opacity-40 shadow-none'">
    <BCardBody class="p-lg-4 pb-0 text-center">
      <h3 class="fw-bold mb-1">{{ plan.name }}</h3>
      <p class="mb-0" :class="plan.isPopular ? 'text-white-50' : 'text-muted'">{{ plan.description }}</p>

      <div class="my-4">
        <h1 class="display-6 fw-bold mb-0">${{ plan.price }}</h1>
        <small class="d-block fs-base" :class="plan.isPopular ? 'text-white-50' : 'text-muted'">Billed monthly</small>
        <small class="d-block" :class="plan.isPopular ? 'text-white-50' : 'text-muted'">{{ plan.title }}</small>
      </div>

      <ul class="list-unstyled text-start fs-sm mb-0">
        <li v-for="(feature, index) in plan.features" :key="index" class="mb-2">
          <IconifyIcon v-if="feature.included" icon="tabler:check" class="me-2 fs-5 text-success" />
          <IconifyIcon v-else icon="tabler:x" class="me-2 fs-5 text-danger" />
          {{ feature.title }}
        </li>
      </ul>
    </BCardBody>

    <BCardFooter class="bg-transparent border-0 px-5 pb-4">
      <RouterLink to="" class="btn w-100 py-2 fw-semibold rounded-pill" :class="plan.btnClass"> Choose {{ plan.name }} </RouterLink>
    </BCardFooter>
  </BCard>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { Icon as IconifyIcon } from '@iconify/vue'
import { BCard, BCardBody, BCardFooter } from 'bootstrap-vue-next'
import type { PricingPlanType } from './data'

defineProps<{
  plan: PricingPlanType
}>()
</script>
