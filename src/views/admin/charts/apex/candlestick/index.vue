<template>
  <PageBreadcrumb title="Candlestick Apexchart" subtitle="Charts" />

  <BRow>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Simple Candlestick Charts</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getCandlestickChart" :series="getCandlestickChart().series" type="candlestick" :height="350" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Combo Candlestick Charts</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getComboCandlestickCharts" :series="getComboCandlestickCharts().series" type="candlestick" :height="220" />
          <ApexChart :get-options="getComboBarCandlestickChart" :series="getComboBarCandlestickChart().series" type="bar" :height="130" />
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>

  <BRow>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Category X-Axis</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getXAxisCandlestickChart" :series="getXAxisCandlestickChart().series" type="candlestick" :height="380" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Candlestick with Line</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getCandlestickWithLineChart" :series="getCandlestickWithLineChart().series" type="candlestick" :height="380" />
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BCard, BCardBody, BCardHeader, BCardTitle, BCol, BRow } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import ApexChart from '~/components/wrappers/ApexChart.vue'
import { getCandlestickChart, getCandlestickWithLineChart, getComboBarCandlestickChart, getComboCandlestickCharts, getXAxisCandlestickChart } from './data'
</script>
