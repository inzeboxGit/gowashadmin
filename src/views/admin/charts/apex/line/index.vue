<template>
  <PageBreadcrumb title="Line Apexchart" subtitle="Charts" />
  <BRow>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Simple line chart</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getSimpleLineChart" :series="getSimpleLineChart().series" type="line" :height="380" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Line with Data Labels</BCardTitle>
        </BCardHeader>

        <BCardBody>
          <ApexChart :get-options="getLineChart" :series="getLineChart().series" type="line" :height="380" />
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>

  <BRow>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Zoomable Timeseries</BCardTitle>
        </BCardHeader>

        <BCardBody>
          <ApexChart :get-options="getZoomableTimeSeriesChart" :series="getZoomableTimeSeriesChart().series" type="area" :height="380" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Line Chart with Annotations</BCardTitle>
        </BCardHeader>

        <BCardBody>
          <ApexChart :get-options="getLineChartWithAnnotations" :series="getLineChartWithAnnotations().series" type="area" :height="380" />
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>

  <BRow>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Syncing charts</BCardTitle>
        </BCardHeader>

        <BCardBody>
          <ApexChart :get-options="getSyncingCharts2" :series="getSyncingCharts2().series" type="line" :height="200" />
          <ApexChart :get-options="getSyncingCharts" :series="getSyncingCharts().series" type="line" :height="180" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Gradient Line Chart</BCardTitle>
        </BCardHeader>

        <BCardBody>
          <ApexChart :get-options="getGradientLineChart" :series="getGradientLineChart().series" type="line" :height="380" />
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>

  <BRow>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Missing / Null values</BCardTitle>
        </BCardHeader>

        <BCardBody>
          <ApexChart :get-options="getMissingLineChart" :series="getMissingLineChart().series" type="line" :height="380" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Dashed Line Chart</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getDashedLineChart" :series="getDashedLineChart().series" type="line" :height="380" />
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>

  <BRow>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Stepline Chart</BCardTitle>
        </BCardHeader>

        <BCardBody>
          <ApexChart :get-options="getStepLineChart" :series="getStepLineChart().series" type="line" :height="360" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Brush Chart</BCardTitle>
        </BCardHeader>

        <BCardBody>
          <ApexChart :get-options="getBrushChart" :series="getBrushChart().series" type="line" :height="230" />
          <ApexChart :get-options="getBrushChart2" :series="getBrushChart2().series" type="area" :height="130" />
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>

  <BRow>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Realtime Chart</BCardTitle>
        </BCardHeader>

        <BCardBody>
          <RealTimeChart />
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BCard, BCardBody, BCardHeader, BCardTitle, BCol, BRow } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import ApexChart from '~/components/wrappers/ApexChart.vue'
import { getBrushChart, getBrushChart2, getDashedLineChart, getGradientLineChart, getLineChart, getLineChartWithAnnotations, getMissingLineChart, getSimpleLineChart, getStepLineChart, getSyncingCharts, getSyncingCharts2, getZoomableTimeSeriesChart } from './components/data'
import RealTimeChart from './components/RealTimeChart.vue'
</script>
