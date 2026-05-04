<template>
  <PageBreadcrumb title="Customers" subtitle="CRM" />
  <BRow>
    <BCol cols="12">
      <CustomersTable />
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BCol, BRow } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import CustomersTable from './components/CustomersTable.vue'
</script>
