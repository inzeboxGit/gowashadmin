<template>
  <PageBreadcrumb title="Estimations" subtitle="CRM" />
  <BRow class="row-cols-xxl-5 row-cols-md-3 row-cols-1 g-2">
    <BCol v-for="(item, idx) in estimationStatData" :key="idx">
      <EstimationCard :item="item" />
    </BCol>
  </BRow>

  <BRow>
    <BCol cols="12">
      <EstimationTable />
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BCol, BRow } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import EstimationCard from './components/EstimationCard.vue'
import EstimationTable from './components/EstimationTable.vue'
import { estimationStatData } from './components/data'
</script>
