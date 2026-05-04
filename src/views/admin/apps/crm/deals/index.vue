<template>
  <PageBreadcrumb title="Deals" subtitle="CRM" />

  <BRow class="row-cols-xxl-5 row-cols-md-3 row-cols-1 g-2">
    <BCol v-for="(item, idx) in dealStatData" :key="idx">
      <DealCard :item="item" />
    </BCol>
  </BRow>

  <BRow>
    <BCol cols="12">
      <Deals />
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BCol, BRow } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import DealCard from './components/DealCard.vue'
import Deals from './components/Deals.vue'
import { dealStatData } from './components/data'
</script>
