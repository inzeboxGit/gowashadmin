<template>
  <PageBreadcrumb title="Timeline Apexchart" subtitle="Charts" />

  <BRow>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Basic Timeline</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getTimelineChart" :series="getTimelineChart().series" type="rangeBar" :height="350" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Distributed Timeline</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getDistributedTimelineChart" :series="getDistributedTimelineChart().series" type="rangeBar" :height="350" />
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>

  <BRow>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Multi Series Timeline</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getMultiSeriesTimelineChart" :series="getMultiSeriesTimelineChart().series" type="rangeBar" :height="350" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Advanced Timeline</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getAdvanceTimelineChart" :series="getAdvanceTimelineChart().series" type="rangeBar" :height="350" />
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>

  <BRow>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Multiple Series - Group Rows</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getGroupRowTimelineChart" :series="getGroupRowTimelineChart().series" type="rangeBar" :height="350" />
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BCard, BCardBody, BCardHeader, BCardTitle, BCol, BRow } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import ApexChart from '~/components/wrappers/ApexChart.vue'
import { getAdvanceTimelineChart, getDistributedTimelineChart, getGroupRowTimelineChart, getMultiSeriesTimelineChart, getTimelineChart } from './data'
</script>
