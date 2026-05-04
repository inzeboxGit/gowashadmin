<template>
  <PageBreadcrumb title="Layouts" subtitle="Forms" />

  <BRow>
    <BCol lg="12">
      <BasicForm />

      <FormWithModal />

      <BasicExample />

      <HorizontalForm />

      <LabelSizing />

      <InlineForm />

      <RowForm />

      <FormWithFloatingLabels />
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BCol, BRow } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import BasicExample from './components/BasicExample.vue'
import BasicForm from './components/BasicForm.vue'
import FormWithFloatingLabels from './components/FormWithFloatingLabels.vue'
import FormWithModal from './components/FormWithModal.vue'
import HorizontalForm from './components/HorizontalForm.vue'
import InlineForm from './components/InlineForm.vue'
import LabelSizing from './components/LabelSizing.vue'
import RowForm from './components/RowForm.vue'
</script>
