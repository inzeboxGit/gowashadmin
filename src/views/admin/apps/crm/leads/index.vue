<template>
  <PageBreadcrumb title="Leads" subtitle="CRM" />

  <BRow class="row-cols-2 row-cols-md-4 row-cols-xl-6 g-1 mb-1">
    <BCol v-for="(item, idx) in leadStatData" :key="idx">
      <LeadCard :item="item" />
    </BCol>
  </BRow>

  <BRow>
    <BCol cols="12">
      <LeadsTable />
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BCol, BRow } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import LeadCard from './components/LeadCard.vue'
import LeadsTable from './components/LeadsTable.vue'
import { leadStatData } from './components/data'
</script>
