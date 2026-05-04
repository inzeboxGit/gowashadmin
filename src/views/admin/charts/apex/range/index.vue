<template>
  <PageBreadcrumb title="Range Apexcharts" subtitle="Charts" />
  <BRow>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Basic Range Area</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getBasicRangeArea" :series="getBasicRangeArea().series" type="rangeArea" :height="350" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Range Area With Line</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getComboRangeArea" :series="getComboRangeArea().series" type="rangeArea" :height="350" />
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BCard, BCardBody, BCardHeader, BCardTitle, BCol, BRow } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import ApexChart from '~/components/wrappers/ApexChart.vue'
import { getBasicRangeArea, getComboRangeArea } from './data'
</script>
