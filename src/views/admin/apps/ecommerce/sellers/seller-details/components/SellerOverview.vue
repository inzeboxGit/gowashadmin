<template>
  <BCard no-body>
    <BCardHeader>
      <BCardTitle>Seller Overview</BCardTitle>
    </BCardHeader>

    <BCardBody class="pb-0">
      <div style="min-height: 385px">
        <ApexChart :getOptions="getSellerChartOptions" :series="getSellerChartOptions().series" />
      </div>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { BCard, BCardBody } from 'bootstrap-vue-next'
import ApexChart from '~/components/wrappers/ApexChart.vue'
import { getSellerChartOptions } from './data'
</script>

<style scoped></style>
