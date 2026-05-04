<template>
  <PageBreadcrumb title="Heatmap Apexchart" subtitle="Charts" />
  <BRow>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Heatmap - Single Series</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getHeatmapSingleSeriesChart" :series="getHeatmapSingleSeriesChart().series" type="heatmap" :height="350" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Multiple Series</BCardTitle>
        </BCardHeader>

        <BCardBody>
          <ApexChart :get-options="getMultipleSeries" :series="getMultipleSeries().series" type="heatmap" :height="350" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Heatmap - Color Range</BCardTitle>
        </BCardHeader>

        <BCardBody>
          <ApexChart :get-options="getHeatmapColorRange" :series="getHeatmapColorRange().series" type="heatmap" :height="350" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Heatmap - Range without Shades</BCardTitle>
        </BCardHeader>

        <BCardBody>
          <ApexChart :get-options="getRangeWithoutShades" :series="getRangeWithoutShades().series" type="heatmap" :height="350" />
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BCard, BCardBody, BCardHeader, BCardTitle, BCol, BRow } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import ApexChart from '~/components/wrappers/ApexChart.vue'
import { getHeatmapColorRange, getHeatmapSingleSeriesChart, getMultipleSeries, getRangeWithoutShades } from './data'
</script>
