<template>
  <PageBreadcrumb title="Proposals" subtitle="CRM" />

  <BRow class="row-cols-xxl-5 row-cols-md-3 row-cols-1 g-2">
    <BCol v-for="(item, idx) in proposalStatData" :key="idx">
      <ProposalCard :item="item" />
    </BCol>
  </BRow>

  <ProposalsTable />
</template>

<script setup lang="ts">
import { BCol, BRow } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import { proposalStatData } from './components/data'
import ProposalCard from './components/ProposalCard.vue'
import ProposalsTable from './components/ProposalsTable.vue'
</script>
