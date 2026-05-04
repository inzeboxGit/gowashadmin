<template>
  <PageBreadcrumb title="Slope Apexcharts" subtitle="Charts" />
  <BRow>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Basic Slope</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getBasicSlopeChart" :series="getBasicSlopeChart().series" type="line" :height="350" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Multi Slope</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getMultiSlopeChart" :series="getMultiSlopeChart().series" type="line" :height="350" :width="600" />
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BCard, BCardBody, BCardHeader, BCardTitle, BCol, BRow } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import ApexChart from '~/components/wrappers/ApexChart.vue'
import { getBasicSlopeChart, getMultiSlopeChart } from './data'
</script>
