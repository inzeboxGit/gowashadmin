<template>
  <PageBreadcrumb title="Line Charts" subtitle="Charts" />
  <BRow>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h5">Basic Line</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <div class="mt-3" style="height: 300px">
            <ChartJs type="line" :getOptions="getBasicLineChart" />
          </div>
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h5">Interpolation</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <div class="mt-3" style="height: 300px">
            <ChartJs type="line" :getOptions="getInterpolationChart" />
          </div>
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h5">Multi-Axes</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <div class="mt-3" style="height: 300px">
            <ChartJs type="line" :getOptions="getMultiAxisChart" />
          </div>
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h5">Point Styling</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <div class="mt-3" style="height: 300px">
            <ChartJs type="line" :getOptions="getPointChart" />
          </div>
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h5">Line Segment</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <div class="mt-3" style="height: 300px">
            <ChartJs type="line" :getOptions="getLineSegmentChart" />
          </div>
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h5">Stepped</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <div class="mt-3" style="height: 300px">
            <ChartJs type="line" :getOptions="getSteppedLineChart" />
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
import { getBasicLineChart, getInterpolationChart, getLineSegmentChart, getMultiAxisChart, getPointChart, getSteppedLineChart } from './data'
</script>
