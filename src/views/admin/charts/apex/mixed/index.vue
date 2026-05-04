<template>
  <PageBreadcrumb title="Mixed Apexchart" subtitle="Charts" />

  <BRow>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Line & Column Chart</BCardTitle>
        </BCardHeader>

        <BCardBody>
          <ApexChart :get-options="getLineColumnChart" :series="getLineColumnChart().series" type="line" :height="380" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Multiple Y-Axis Chart</BCardTitle>
        </BCardHeader>

        <BCardBody>
          <ApexChart :get-options="getMultipleYaxisMixedChart" :series="getMultipleYaxisMixedChart().series" type="line" :height="380" />
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>

  <BRow>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Line & Area Chart</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getLineAreaChart" :series="getLineAreaChart().series" type="line" :height="380" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Line, Column & Area Chart</BCardTitle>
        </BCardHeader>

        <BCardBody>
          <ApexChart :get-options="getAllMixedChart" :series="getAllMixedChart().series" type="line" :height="380" />
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BCard, BCardBody, BCardHeader, BCardTitle, BCol, BRow } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import ApexChart from '~/components/wrappers/ApexChart.vue'
import { getAllMixedChart, getLineAreaChart, getLineColumnChart, getMultipleYaxisMixedChart } from './data'
</script>
