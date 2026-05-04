<template>
  <BCard :class="['h-100 my-4 my-lg-0', plan.highlight ? 'text-bg-primary' : '']" no-body>
    <BCardBody class="p-lg-4 pb-0 text-center">
      <h3 class="fw-bold mb-1">{{ plan.title }}</h3>
      <p :class="[plan.highlight ? 'text-white-50' : 'text-muted', 'mb-0']">
        {{ plan.description }}
      </p>

      <div class="my-4">
        <h1 class="display-6 fw-bold mb-0">
          {{ plan.price }}
        </h1>
        <small class="d-block fs-base" :class="plan.highlight ? 'text-white-50' : 'text-muted'">
          {{ plan.billing }}
        </small>
        <small class="d-block" :class="plan.highlight ? 'text-white-50' : 'text-muted'">
          {{ plan.projectInfo }}
        </small>
      </div>

      <ul class="list-unstyled text-start fs-sm mb-0">
        <li v-for="(feature, fIdx) in plan.features" :key="fIdx" class="mb-2">
          <Icon icon="check" v-if="feature.included" class="text-success me-2 fs-5" />
          <Icon icon="x" v-else class="text-danger me-2 fs-5" />
          {{ feature.text }}
        </li>
      </ul>
    </BCardBody>

    <BCardFooter class="bg-transparent px-5 pb-4">
      <RouterLink :to="plan.link" class="btn w-100 py-2 fw-semibold rounded-pill" :class="`btn-${plan.variant}`"> {{ plan.buttonText }}</RouterLink>
    </BCardFooter>
  </BCard>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { BCard, BCardBody, BCardFooter } from 'bootstrap-vue-next'
import Icon from '~/components/wrappers/Icon.vue'
import type { PlanType } from './data'

defineProps<{ plan: PlanType }>()
</script>
