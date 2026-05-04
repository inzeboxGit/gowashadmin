<template>
  <PageBreadcrumb title="Select" subtitle="Tables" />
  <BRow class="justify-content-center">
    <BCol xs="12">
      <SingleItemSelect />
      <MultiItemSelection />
      <CellSelection />
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import CellSelection from './components/CellSelection.vue'
import MultiItemSelection from './components/MultiItemSelection.vue'
import SingleItemSelect from './components/SingleItemSelect.vue'
</script>

<style scoped></style>
