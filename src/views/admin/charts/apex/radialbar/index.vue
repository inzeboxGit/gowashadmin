<template>
  <PageBreadcrumb title="RadialBar Apexcharts" subtitle="Charts" />
  <BRow>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Basic RadialBar Chart</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getBasicRadialBarChart" :series="getBasicRadialBarChart().series" type="radialBar" :height="320" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Multiple RadialBars</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getMultipleRadialBarChart" :series="getMultipleRadialBarChart().series" type="radialBar" :height="320" />
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>

  <BRow>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Circle Chart - Custom Angle</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getCircleAngleChart" :series="getCircleAngleChart().series" type="radialBar" :height="380" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Circle Chart with Image</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getImageRadialBarChart" :series="getImageRadialBarChart().series" type="radialBar" :height="360" />
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>

  <BRow>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Stroked Circular Guage</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getStrokedGuageRadialChart" :series="getStrokedGuageRadialChart().series" type="radialBar" :height="380" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Gradient Circular Chart</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getGuageCircularRadialChart" :series="getGuageCircularRadialChart().series" type="radialBar" :height="330" />
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>

  <BRow>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Semi Circle Gauge</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getSemiCircleGuageRadialChart" :series="getSemiCircleGuageRadialChart().series" type="radialBar" :height="380" />
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BCard, BCardBody, BCardHeader, BCardTitle, BCol, BRow } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import ApexChart from '~/components/wrappers/ApexChart.vue'
import { getBasicRadialBarChart, getCircleAngleChart, getGuageCircularRadialChart, getImageRadialBarChart, getMultipleRadialBarChart, getSemiCircleGuageRadialChart, getStrokedGuageRadialChart } from './data'
</script>
