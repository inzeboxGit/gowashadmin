<template>
  <PageBreadcrumb title="Wizard" subtitle="Forms" />

  <BRow class="justify-content-center">
    <BCol xxl="12">
      <BasicWizard />
      <WizardWithProgress />
      <VerticalWizard />
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BCol, BRow } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import BasicWizard from './components/BasicWizard.vue'
import VerticalWizard from './components/VerticalWizard.vue'
import WizardWithProgress from './components/WizardWithProgress.vue'
</script>
