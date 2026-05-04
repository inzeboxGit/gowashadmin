<template>
  <PageBreadcrumb title="Area Charts" subtitle="Charts" />

  <div class="row">
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h5">Basic Area</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <div class="mt-3">
            
              <ChartJs type="line" :getOptions="getBasicAreaChart" height="300px" />
            
          </div>
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h5">Different Dataset</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <div class="mt-3">
            
              <ChartJs type="line" :getOptions="getDiffDatasetAreaChart" height="300px" />
            
          </div>
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h5">Stacked</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <div class="mt-3">
            
              <ChartJs type="line" :getOptions="getStackedChart" height="300px" />
            
          </div>
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h5">Boundaries</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <div class="mt-3">
            
              <ChartJs type="line" :getOptions="getBoundariesAreaChart" height="300px" />
            
          </div>
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h5">Draw Time</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <div class="mt-3">
            
              <ChartJs type="line" :getOptions="getDrawTimeAreaChart" height="300px" />
            
          </div>
        </BCardBody>
      </BCard>
    </BCol>
  </div>
</template>

<script setup lang="ts">
import { BCard, BCardBody, BCardHeader, BCardTitle, BCol } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import ChartJs from '~/components/wrappers/ChartJs.vue'
import { getBasicAreaChart, getBoundariesAreaChart, getDiffDatasetAreaChart, getDrawTimeAreaChart, getStackedChart } from './data'
</script>
