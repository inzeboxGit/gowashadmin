<template>
  <PageBreadcrumb title="Polar Area" subtitle="Charts" />
  <BRow>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Basic Polar Area Chart</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getBasicPolarAreaChart" :series="getBasicPolarAreaChart().series" type="polarArea" :height="380" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Monochrome Polar Area</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getMonochromePolarAreaChart" :series="getMonochromePolarAreaChart().series" type="polarArea" :height="380" />
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BCard, BCardBody, BCardHeader, BCardTitle, BCol, BRow } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import ApexChart from '~/components/wrappers/ApexChart.vue'
import { getBasicPolarAreaChart, getMonochromePolarAreaChart } from './data'
</script>
