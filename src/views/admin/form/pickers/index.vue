<template>
  <PageBreadcrumb title="Pickers" subtitle="Forms" />

  <BRow>
    <BCol lg="12">
      <Flatpickers />

      <ColorPickers />
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BCol, BRow } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import ColorPickers from './components/ColorPickers.vue'
import Flatpickers from './components/Flatpickers.vue'
</script>
