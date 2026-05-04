<template>
  <PageBreadcrumb title="Bar" subtitle="Apex" />
  <BRow>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle>Basic Bar Charts</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getBasicBarChart" :series="getBasicBarChart().series" type="bar" :height="350" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle>Grouped Bar Chart</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getGroupedBarChart" :series="getGroupedBarChart().series" type="bar" :height="350" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle>Stacked Bar Chart</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getFullStackedBarChart" :series="getFullStackedBarChart().series" type="bar" :height="350" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle>100% Stacked Bar Chart</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getStackedBarChart" :series="getStackedBarChart().series" type="bar" :height="350" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle>Grouped Stacked Bars</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getGroupedStackedBarChart" :series="getGroupedStackedBarChart().series" type="bar" :height="350" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle>Bar with Negative Values</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getNegativeBarChart" :series="getNegativeBarChart().series" type="bar" :height="350" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle>Reversed Bar Chart</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getReversedBarChart" :series="getReversedBarChart().series" type="bar" :height="350" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle>Bar with Image Fill</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getImageFillBarChart" :series="getImageFillBarChart().series" type="bar" :height="350" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle>Custom DataLabels Bar</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getCustomDataLabelsBarChart" :series="getCustomDataLabelsBarChart().series" type="bar" :height="350" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle>Patterned Bar Chart</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getPatternedBarChart" :series="getPatternedBarChart().series" type="bar" :height="350" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle>Bar with Markers</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getMarkersBarChart" :series="getMarkersBarChart().series" type="bar" :height="350" />
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BCard, BCardBody, BCardHeader, BCardTitle, BCol } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import ApexChart from '~/components/wrappers/ApexChart.vue'
import { getBasicBarChart, getCustomDataLabelsBarChart, getFullStackedBarChart, getGroupedBarChart, getGroupedStackedBarChart, getImageFillBarChart, getMarkersBarChart, getNegativeBarChart, getPatternedBarChart, getReversedBarChart, getStackedBarChart } from './data'
</script>
