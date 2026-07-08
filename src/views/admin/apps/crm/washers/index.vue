<template>
  <PageBreadcrumb title="Laveurs" subtitle="CRM Go Wash" />
  <BRow>
    <BCol cols="12">
      <WashersTable />
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BCol, BRow } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import WashersTable from './components/WashersTable.vue'
</script>
