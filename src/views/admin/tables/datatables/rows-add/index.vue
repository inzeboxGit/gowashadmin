<template>
  <PageBreadcrumb title="Add Rows" subtitle="DataTables" />
  <BRow class="justify-content-center">
    <BCol xs="12">
      <RowAdd />
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import RowAdd from './components/RowAdd.vue'
</script>
