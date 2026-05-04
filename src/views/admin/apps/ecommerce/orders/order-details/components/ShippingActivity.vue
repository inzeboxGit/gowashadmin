<template>
  <BCard no-body>
    <BCardHeader>
      <BCardTitle as="h4">Shipping Activity</BCardTitle>
    </BCardHeader>
    <BCardBody class="p-4">
      <div class="timeline">
        <div v-for="(item, idx) in shippingTimelineData" :key="idx" class="timeline-item d-flex align-items-stretch">
          <div class="timeline-time pe-3 text-muted">{{ item.time ?? '' }}</div>
          <div :class="`timeline-dot bg-${item.variant}`" />
          <div :class="`timeline-content ps-3 ${idx !== shippingTimelineData.length - 1 ? 'pb-5' : ''}`">
            <h5 class="mb-1">{{ item.title }}</h5>
            <p class="mb-1 text-muted">{{ item.description }}</p>
            <p class="mb-1 text-muted fs-xxs">
              Tracking No:
              <RouterLink to="" class="link-primary fw-semibold text-decoration-underline">
                {{ item.trackingNo }}
              </RouterLink>
            </p>
            <span class="fw-semibold fs-xxs">By {{ item.trackingBy }}</span>
          </div>
        </div>
      </div>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { BCard, BCardBody, BCardHeader, BCardTitle } from 'bootstrap-vue-next'
import { shippingTimelineData } from './data'
</script>
