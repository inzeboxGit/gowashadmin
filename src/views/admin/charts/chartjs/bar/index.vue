<template>
  <PageBreadcrumb title="Bar Charts" subtitle="Charts" />
  <BRow>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h5">Basic Bar</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <div class="mt-3" style="height: 300px">
            <ChartJs type="bar" :getOptions="getBasicBarChart" />
          </div>
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h5">Border Radius</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <div class="mt-3" style="height: 300px">
            <ChartJs type="bar" :getOptions="getBorderRadiusChart" />
          </div>
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h5">Floating</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <div class="mt-3" style="height: 300px">
            <ChartJs type="bar" :getOptions="getFloatingBarChart" />
          </div>
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h5">Horizontal</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <div class="mt-3" style="height: 300px">
            <ChartJs type="bar" :getOptions="getHorizontalBarChart" />
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
          <div class="mt-3" style="height: 300px">
            <ChartJs type="bar" :getOptions="getStackedBarChart" />
          </div>
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h5">Stacked with Groups</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <div class="mt-3" style="height: 300px">
            <ChartJs type="bar" :getOptions="getStackedGroupsChart" />
          </div>
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h5">Vertical</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <div class="mt-3" style="height: 300px">
            <ChartJs type="bar" :getOptions="getVerticalChart" />
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
import { getBasicBarChart, getBorderRadiusChart, getFloatingBarChart, getHorizontalBarChart, getStackedBarChart, getStackedGroupsChart, getVerticalChart } from './data'
</script>
