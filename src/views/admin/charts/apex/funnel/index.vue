<template>
  <PageBreadcrumb title="Funnel Apexcharts" subtitle="Charts" />
  <BRow>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Basic Funnel</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getBasicFunnelChart" :series="getBasicFunnelChart().series" type="bar" :height="350" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Pyramid Funnel</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getPyramidFunnelChart" :series="getPyramidFunnelChart().series" type="bar" :height="350" />
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BCard, BCardBody, BCardHeader, BCardTitle, BCol, BRow } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import ApexChart from '~/components/wrappers/ApexChart.vue'
import { getBasicFunnelChart, getPyramidFunnelChart } from './data'
</script>
