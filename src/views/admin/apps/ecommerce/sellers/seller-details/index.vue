<template>
  <PageBreadcrumb title="Seller Details" subtitle="Ecommerce" />

  <BRow>
    <BCol xl="3">
      <SellerProfile />
    </BCol>

    <BCol xl="9">
      <BRow class="row-cols-xxl-4 row-cols-md-2 row-cols-1 g-3 align-items-center">
        <BCol v-for="(item, idx) in sellerStatData" :key="idx">
          <SellerStatisticWidget :stat="item" />
        </BCol>
      </BRow>
      <SellerOverview />

      <h4 class="my-4">My Products</h4>

      <BRow>
        <BCol xs="12">
          <SellerProducts />
        </BCol>
      </BRow>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BCol, BRow } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import { sellerStatData } from './components/data'
import SellerOverview from './components/SellerOverview.vue'
import SellerProducts from './components/SellerProducts.vue'
import SellerProfile from './components/SellerProfile.vue'
import SellerStatisticWidget from './components/SellerStatisticWidget.vue'
</script>

<style scoped></style>
