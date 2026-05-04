<template>
  <BCard no-body>
    <BCardHeader class="justify-content-between">
      <BCardTitle as="h4">Basic Wizard</BCardTitle>
      <span class="badge badge-soft-success badge-label fs-xxs py-1">Exclusive</span>
    </BCardHeader>
    <BCardBody>
      <ul class="nav nav-tabs wizard-tabs">
        <li class="nav-item" v-for="(step, index) in stepData" :key="index">
          <a
            class="nav-link"
            href=""
            @click.prevent="activeTabIndex = index"
            :class="{
              'wizard-item-done': index < activeTabIndex,
              active: index === activeTabIndex,
            }"
          >
            <span class="d-flex align-items-center">
              <Icon :icon="step.icon" class="fs-32" />
              <span class="flex-grow-1 ms-2 text-truncate">
                <span class="mb-0 lh-base d-block fw-semibold text-body fs-base">{{ step.title }}</span>
                <span class="fs-xxs mb-0">{{ step.subtitle }}</span>
              </span>
            </span>
          </a>
        </li>
      </ul>

      <div class="tab-content pt-3">
        <div v-if="activeTabIndex === 0">
          <Step1 />
        </div>

        <div v-else-if="activeTabIndex === 1">
          <Step2 />
        </div>

        <div v-else-if="activeTabIndex === 2">
          <Step3 />
        </div>

        <div v-else-if="activeTabIndex === 3">
          <Step4 />
        </div>

        <div v-else>
          <Step5 />
        </div>
      </div>

      <div class="d-flex justify-content-between mt-3">
        <BButton variant="secondary" @click="prevStep" v-if="activeTabIndex != 0">← Back</BButton>
        <BButton variant="primary" class="ms-auto" @click="activeTabIndex === stepData.length - 1 ? nextStep() : nextStep()">
          {{ activeTabIndex === stepData.length - 1 ? 'Submit Application' : 'Next: Address Info →' }}
        </BButton>
      </div>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { BCard, BCardBody, BCardHeader, BCardTitle } from 'bootstrap-vue-next'
import { ref } from 'vue'
import Icon from '~/components/wrappers/Icon.vue'
import { stepData } from './data'
import Step1 from './Step1.vue'
import Step2 from './Step2.vue'
import Step3 from './Step3.vue'
import Step4 from './Step4.vue'
import Step5 from './Step5.vue'

const activeTabIndex = ref(0)

const nextStep = () => {
  if (activeTabIndex.value < stepData.length - 1) activeTabIndex.value++
}

const prevStep = () => {
  if (activeTabIndex.value > 0) activeTabIndex.value--
}
</script>

<style scoped></style>
