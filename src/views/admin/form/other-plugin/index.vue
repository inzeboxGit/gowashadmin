<template>
  <PageBreadcrumb title="Other Plugins" subtitle="Forms" />

  <BRow>
    <BCol cols="12">
      <FormInputMasks />

      <Typeaheads />

      <InputTouchspin />
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BCol, BRow } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import FormInputMasks from './components/FormInputMasks.vue'
import InputTouchspin from './components/InputTouchspin.vue'
import Typeaheads from './components/Typeaheads.vue'
</script>
