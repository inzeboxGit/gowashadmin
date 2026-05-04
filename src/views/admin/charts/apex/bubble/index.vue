<template>
  <PageBreadcrumb title="Bubble Apexchart" subtitle="Charts" />
  <BRow>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Simple Bubble Charts</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getSimpleBubbleChart" :series="getSimpleBubbleChart().series" type="bubble" :height="350" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">3D Bubble Charts</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getThreeDBubbleChart" :series="getThreeDBubbleChart().series" type="bubble" :height="350" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Bubble Charts</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getThreeBubbleChart" :series="getThreeBubbleChart().series" type="bubble" :height="350" />
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import ApexChart from '~/components/wrappers/ApexChart.vue'
import { getSimpleBubbleChart, getThreeBubbleChart, getThreeDBubbleChart } from './data'
</script>
