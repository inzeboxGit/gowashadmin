<template>
  <PageBreadcrumb title="Pricing" subtitle="Pages" />

  <BRow class="mb-4">
    <BCol v-for="(plan, idx) in pricingPlanData" :key="idx" md="6" xl="3">
      <PricingCard :plan="plan" />
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BCol, BRow } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import PricingCard from './components/PricingCard.vue'
import { pricingPlanData } from './components/data'
</script>
