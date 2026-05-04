<template>
  <PageBreadcrumb title="Sparklines Apexcharts" subtitle="Charts" />
  <BRow>
    <BCol xs="12">
      <BCard no-body>
        <BCardBody>
          <BRow class="g-3" dir="ltr">
            <BCol md="4">
              <ApexChart :get-options="getSpark1Chart" :series="getSpark1Chart().series" type="area" :height="160" />
            </BCol>
            <BCol md="4">
              <ApexChart :get-options="getSpark2Chart" :series="getSpark2Chart().series" type="area" :height="160" />
            </BCol>
            <BCol md="4">
              <ApexChart :get-options="getSpark3Chart" :series="getSpark3Chart().series" type="area" :height="160" />
            </BCol>
          </BRow>
        </BCardBody>

        <BRow>
          <BCol xs="12">
            <div class="table-responsive">
              <table class="table table-centered table-custom mb-0">
                <thead class="bg-light bg-opacity-50 fs-xxs thead-sm text-uppercase">
                  <tr>
                    <th>Total Value</th>
                    <th>Percentage of Portfolio</th>
                    <th>Last 10 days</th>
                    <th>Volume</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>$32,554</td>
                    <td>15%</td>
                    <td>
                      <ApexChart :get-options="getChart1" :series="getChart1().series" type="line" :height="60" :width="140" />
                    </td>
                    <td>
                      <ApexChart :get-options="getChart5" :series="getChart5().series" type="bar" :height="60" :width="100" />
                    </td>
                  </tr>
                  <tr>
                    <td>$23,533</td>
                    <td>7%</td>
                    <td>
                      <ApexChart :get-options="getChart2" :series="getChart2().series" type="line" :height="60" :width="140" />
                    </td>
                    <td>
                      <ApexChart :get-options="getChart6" :series="getChart6().series" type="bar" :height="60" :width="100" />
                    </td>
                  </tr>
                  <tr>
                    <td>$54,276</td>
                    <td>9%</td>
                    <td>
                      <ApexChart :get-options="getChart3" :series="getChart3().series" type="line" :height="60" :width="140" />
                    </td>
                    <td>
                      <ApexChart :get-options="getChart7" :series="getChart7().series" type="bar" :height="60" :width="100" />
                    </td>
                  </tr>
                  <tr>
                    <td>$11,533</td>
                    <td>2%</td>
                    <td>
                      <ApexChart :get-options="getChart4" :series="getChart4().series" type="line" :height="60" :width="140" />
                    </td>
                    <td>
                      <ApexChart :get-options="getChart8" :series="getChart8().series" type="bar" :height="60" :width="100" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </BCol>
        </BRow>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BCard, BCardBody, BCol, BRow } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import ApexChart from '~/components/wrappers/ApexChart.vue'
import { getChart1, getChart2, getChart3, getChart4, getChart5, getChart6, getChart7, getChart8, getSpark1Chart, getSpark2Chart, getSpark3Chart } from './data'
</script>
