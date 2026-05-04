<template>
  <PageBreadcrumb title="Data Rendering" subtitle="Datatables" />
  <BRow class="justify-content-center">
    <BCol xs="12">
      <RenderingTable />
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import RenderingTable from './components/RenderingTable.vue'
</script>
