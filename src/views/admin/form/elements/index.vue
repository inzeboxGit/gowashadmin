<template>
  <PageBreadcrumb title="Basic Elements" subtitle="Forms" />

  <BRow>
    <BCol xl="12">
      <InputTextFieldType />

      <InputType />

      <InputGroups />

      <FloatingLabels />

      <InputSizes />

      <ChecksRadiosSwitches />
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BCol, BRow } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import ChecksRadiosSwitches from './components/ChecksRadiosSwitches.vue'
import FloatingLabels from './components/FloatingLabels.vue'
import InputGroups from './components/InputGroups.vue'
import InputSizes from './components/InputSizes.vue'
import InputTextFieldType from './components/InputTextFieldType.vue'
import InputType from './components/InputType.vue'
</script>
