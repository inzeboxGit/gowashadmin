<template>
  <PageBreadcrumb title="Campaign" subtitle="CRM" />

  <BRow class="row-cols-xxl-5 row-cols-md-3 row-cols-1 g-2">
    <BCol v-for="(item, idx) in campaignStatData" :key="idx">
      <CampaignCard :item="item" />
    </BCol>
  </BRow>
  <BRow>
    <CampaignTable />
  </BRow>
</template>

<script setup lang="ts">
import { BCol, BRow } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import CampaignCard from './components/CampaignCard.vue'
import CampaignTable from './components/CampaignTable.vue'
import { campaignStatData } from './components/data'
</script>
