<template>
  <PageBreadcrumb title="Boxplot Apexchart" subtitle="Charts" />
  <BRow>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle>Basic Boxplot</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getBasicBoxplotChart" :series="getBasicBoxplotChart().series" type="boxPlot" :height="350" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle>Scatter Boxplot</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getScatterBoxplotChart" :series="getScatterBoxplotChart().series" type="boxPlot" :height="350" />
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>

  <BRow>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle>Horizontal BoxPlot</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getHorizontalBoxplotChart" :series="getHorizontalBoxplotChart().series" type="boxPlot" :height="350" />
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import ApexChart from '~/components/wrappers/ApexChart.vue'
import { getBasicBoxplotChart, getHorizontalBoxplotChart, getScatterBoxplotChart } from './data'
</script>
