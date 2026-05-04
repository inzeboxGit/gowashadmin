<template>
  <PageBreadcrumb title="Scatter Apexcharts" subtitle="Charts" />
  <BRow>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Scatter (XY) Chart</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getBasicScatter" :series="getBasicScatter().series" type="scatter" :height="380" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Scatter Chart - Datetime</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getDateTimeScatterChart" :series="getDateTimeScatterChart().series" type="scatter" :height="380" />
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>

  <BRow>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Scatter - Images</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getImageScatterChart" :series="getImageScatterChart().series" type="scatter" :height="380" />
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BCard, BCardBody, BCardHeader, BCardTitle, BCol, BRow } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import ApexChart from '~/components/wrappers/ApexChart.vue'
import { getBasicScatter, getDateTimeScatterChart, getImageScatterChart } from './data'
</script>
