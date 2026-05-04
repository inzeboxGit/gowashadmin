<template>
  <PageBreadcrumb title="Other Charts" subtitle="Charts" />
  <BRow>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h5">Bubble</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <div class="mt-3" style="height: 300px">
            <ChartJs type="bubble" :getOptions="getbubbleData" />
          </div>
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h5">Combo Bar & Line</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <div class="mt-3" style="height: 300px">
            <ChartJs type="bar" :getOptions="getInterpolationChart" />
          </div>
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h5">Stacked Bar & Line</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <div class="mt-3" style="height: 300px">
            <ChartJs type="bar" :getOptions="getStackedBarLineChart" />
          </div>
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h5">Doughnut</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <div class="mt-3" style="height: 300px">
            <ChartJs type="doughnut" :getOptions="getDoughnutChart" />
          </div>
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h5">Multi Series Pie</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <div class="mt-3" style="height: 300px">
            <ChartJs type="doughnut" :getOptions="getMultiPieChart" />
          </div>
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h5">Pie</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <div class="mt-3" style="height: 300px">
            <ChartJs type="pie" :getOptions="getPieChart" />
          </div>
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h5">Polar Area</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <div class="mt-3" style="height: 300px">
            <ChartJs type="polarArea" :getOptions="getPolarChart" />
          </div>
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h5">Radar</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <div class="mt-3" style="height: 300px">
            <ChartJs type="radar" :getOptions="getRadarChart" />
          </div>
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h5">Scatter</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <div class="mt-3" style="height: 300px">
            <ChartJs type="scatter" :getOptions="getScatterChart" />
          </div>
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BCard, BCardBody, BCardHeader, BCardTitle, BCol, BRow } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import ChartJs from '~/components/wrappers/ChartJs.vue'
import { getbubbleData, getDoughnutChart, getInterpolationChart, getMultiPieChart, getPieChart, getPolarChart, getRadarChart, getScatterChart, getStackedBarLineChart } from './data'
</script>
