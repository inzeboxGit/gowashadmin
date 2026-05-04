<template>
  <section id="plans" class="section-custom">
    <BContainer>
      <BRow>
        <BCol cols="12" class="text-center">
          <span class="text-muted rounded-3 d-inline-block">💰 Simple & Transparent Plans</span>
          <h2 class="mt-3 fw-bold mb-5">
            Choose the
            <span class="text-primary">Pricing</span> Plan That Fits Your Needs
          </h2>
        </BCol>
      </BRow>

      <BRow class="justify-content-center">
        <BCol xxl="11">
          <BRow>
            <BCol v-for="(plan, idx) in pricingData" :key="idx" lg="4" :class="{ 'my-4 my-lg-0': plan.isPopular }">
              <PricingCard :plan="plan" />
            </BCol>
          </BRow>
        </BCol>
      </BRow>
    </BContainer>
  </section>
</template>

<script setup lang="ts">
import { BCol, BContainer, BRow } from 'bootstrap-vue-next'
import PricingCard from './PricingCard.vue'
import { pricingData } from './data'
</script>
