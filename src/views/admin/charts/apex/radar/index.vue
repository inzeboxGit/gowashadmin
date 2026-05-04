<template>
  <PageBreadcrumb title="Radar Apexchart" subtitle="Charts" />
  <BRow>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Basic Radar Chart</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :getOptions="getBasicRadarChart" :series="getBasicRadarChart().series" type="radar" height="350" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Radar with Polygon-fill</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :getOptions="getRadarPolygonChart" :series="getRadarPolygonChart().series" type="radar" height="350" />
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>

  <BRow>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Radar – Multiple Series</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :getOptions="() => ({ ...getRadarMultiPleSeriesChart(), series: series })" :series="series" type="radar" height="350" />
          <div class="text-center mt-2">
            <BButton size="sm" variant="primary" @click="handleUpdate"> Update </BButton>
          </div>
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BCard, BCardBody, BCardHeader, BCardTitle, BCol, BRow } from 'bootstrap-vue-next'
import { ref } from 'vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import ApexChart from '~/components/wrappers/ApexChart.vue'
import { generateRandomSeries, getBasicRadarChart, getRadarMultiPleSeriesChart, getRadarPolygonChart } from './data'

const series = ref(generateRandomSeries())

const handleUpdate = () => {
  series.value = generateRandomSeries()
}
</script>
