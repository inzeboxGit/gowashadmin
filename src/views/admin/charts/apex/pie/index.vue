<template>
  <PageBreadcrumb title="Pie Apexchart" subtitle="Charts" />
  <BRow>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Simple Pie Chart</BCardTitle>
        </BCardHeader>

        <BCardBody>
          <ApexChart :get-options="getSimplePieChart" :series="getSimplePieChart().series" type="pie" :height="320" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Simple Donut Chart</BCardTitle>
        </BCardHeader>

        <BCardBody>
          <ApexChart :get-options="getSimpleDonutChart" :series="getSimpleDonutChart().series" type="pie" :height="320" />
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>

  <BRow>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Monochrome Pie Chart</BCardTitle>
        </BCardHeader>

        <BCardBody>
          <ApexChart :get-options="getMonochromeChart" :series="getMonochromeChart().series" type="pie" :height="320" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Gradient Donut Chart</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getGradientDonutChart" :series="getGradientDonutChart().series" type="pie" :height="320" />
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>

  <BRow>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Patterned Donut Chart</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getPatternedDonutChart" :series="getPatternedDonutChart().series" type="donut" :height="320" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Pie Chart with Image fill</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getImagePieChart" :series="getImagePieChart().series" type="pie" :height="320" />
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>

  <BRow>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Donut Update</BCardTitle>
        </BCardHeader>

        <BCardBody>
          <ApexChart :get-options="() => getDonutOptions(series)" :series="series" type="donut" :height="320" />

          <div class="text-center mt-2 d-flex justify-content-center gap-1 flex-wrap">
            <BButton variant="primary" size="sm" @click="series = randomize(series)"> RANDOMIZE </BButton>
            <BButton variant="primary" size="sm" @click="series = appendData(series)"> ADD </BButton>
            <BButton variant="primary" size="sm" @click="series = removeData(series)"> REMOVE </BButton>
            <BButton variant="primary" size="sm" @click="series = initialSeries"> RESET </BButton>
          </div>
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BButton, BCard, BCardBody, BCardHeader, BCardTitle, BCol, BRow } from 'bootstrap-vue-next'
import { ref } from 'vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import ApexChart from '~/components/wrappers/ApexChart.vue'
import { appendData, getDonutOptions, getGradientDonutChart, getImagePieChart, getMonochromeChart, getPatternedDonutChart, getSimpleDonutChart, getSimplePieChart, initialSeries, randomize, removeData } from './data'

const series = ref<number[]>(initialSeries)
</script>
