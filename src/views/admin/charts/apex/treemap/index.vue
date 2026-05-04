<template>
  <PageBreadcrumb title="Treemap Apexchart" subtitle="Charts" />
  <BRow>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Basic Treemap</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getBasicTreemapChart" :series="getBasicTreemapChart().series" type="treemap" :height="350" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Treemap Multiple Series</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getTreemapMultipleChart" :series="getTreemapMultipleChart().series" type="treemap" :height="350" />
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>

  <BRow>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Distributed Treemap</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getDistributedTreemapChart" :series="getDistributedTreemapChart().series" type="treemap" :height="350" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Color Range Treemap</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getColorRangeTreemapChart" :series="getColorRangeTreemapChart().series" type="treemap" :height="350" />
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BCard, BCardBody, BCardHeader, BCardTitle, BCol, BRow } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import ApexChart from '~/components/wrappers/ApexChart.vue'
import { getBasicTreemapChart, getColorRangeTreemapChart, getDistributedTreemapChart, getTreemapMultipleChart } from './data'
</script>
