<template>
  <BCard no-body class="border border-dashed shadow-none rounded-4 p-3 card-h-100">
    <BCardBody class="pb-0 text-center">
      <div class="avatar avatar-xl mx-auto mb-3">
        <img :src="testimonial.image" :alt="testimonial.name" class="img-fluid rounded-circle" />
      </div>
      <Rating :rating="testimonial.rating" class="gap-1 fs-lg mb-3" />
      <h4 class="mb-2 fs-md">{{ testimonial.title }}</h4>
      <p class="text-muted mb-3 fst-italic fs-sm">"{{ testimonial.description }}"</p>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { BCard, BCardBody } from 'bootstrap-vue-next'
import Rating from '~/components/Rating.vue'
import type { TestimonialType } from './data'

defineProps<{
  testimonial: TestimonialType
}>()
</script>
