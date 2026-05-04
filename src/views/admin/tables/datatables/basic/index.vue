<template>
  <PageBreadcrumb title="Basic" subtitle="Tables" />
  <BRow class="justify-content-center">
    <BCol xs="12">
      <BasicDataTable />
      <ComplexHeader />
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BCol, BRow } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import BasicDataTable from './components/BasicDataTable.vue'
import ComplexHeader from './components/ComplexHeader.vue'
</script>
