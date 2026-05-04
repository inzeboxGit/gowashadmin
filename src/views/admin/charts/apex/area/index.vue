<template>
  <PageBreadcrumb title="Area Apexchart" subtitle="Charts" />

  <BRow>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Basic Area Chart</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getBasicAreaChart" :series="getBasicAreaChart().series" type="area" :height="380" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Spline Area</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <ApexChart :get-options="getSplineAreaChart" :series="getSplineAreaChart().series" type="area" :height="380" />
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>

  <BRow>
    <BCol xl="6">
      <DatetimeChart />
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Area with Negative Values</BCardTitle>
        </BCardHeader>

        <BCardBody>
          <ApexChart :get-options="getAreaWithNegativeChart" :series="getAreaWithNegativeChart().series" type="area" :height="380" />
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>

  <BRow>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Selection - Github Style</BCardTitle>
        </BCardHeader>

        <BCardBody>
          <div dir="ltr">
            <ApexChart :get-options="getAreaSelectionGithubChart2" :series="getAreaSelectionGithubChart2().series" type="area" :height="175" />
            <div class="pt-2 pb-1">
              <div class="d-flex justify-content-center align-items-center gap-2">
                <img src="/images/logo-sm.png" class="avatar-sm rounded" alt="file-image" />
                <RouterLink to="" class="text-muted fw-bold fs-md">{{ META_DATA.name }}</RouterLink>
              </div>
            </div>
            <ApexChart :get-options="getAreaSelectionGithubChart" :series="getAreaSelectionGithubChart().series" type="area" :height="200" />
          </div>
        </BCardBody>
      </BCard>
    </BCol>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Stacked Area</BCardTitle>
        </BCardHeader>

        <BCardBody>
          <ApexChart :get-options="getStackedAreaChart" :series="getStackedAreaChart().series" type="area" :height="422" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Irregular TimeSeries</BCardTitle>
        </BCardHeader>

        <BCardBody>
          <ApexChart :get-options="getAreaTimeSeriesChart" :series="getAreaTimeSeriesChart().series" type="area" :height="380" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle as="h4">Area Chart with Null values</BCardTitle>
        </BCardHeader>

        <BCardBody>
          <ApexChart :get-options="getAreaChartWithNullValues" :series="getAreaChartWithNullValues().series" type="area" :height="380" />
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import ApexChart from '~/components/wrappers/ApexChart.vue'
import { META_DATA } from '~/config/constants'
import { getAreaChartWithNullValues, getAreaSelectionGithubChart, getAreaSelectionGithubChart2, getAreaTimeSeriesChart, getAreaWithNegativeChart, getBasicAreaChart, getSplineAreaChart, getStackedAreaChart } from './components/data'
import DatetimeChart from './components/DatetimeChart.vue'
</script>
