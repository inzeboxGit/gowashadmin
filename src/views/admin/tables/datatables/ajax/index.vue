<template>
  <PageBreadcrumb title="Ajax" subtitle="DataTables" />

  <BRow class="justify-content-center">
    <BCol xs="12">
      <AjexTable />
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import AjexTable from './components/AjexTable.vue'
</script>
