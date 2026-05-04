<template>
  <BCard no-body>
    <BCardHeader class="border-dashed card-tabs d-flex align-items-center">
      <div class="flex-grow-1">
        <h4 class="card-title">Project Overview</h4>
      </div>
      <ul class="nav nav-tabs nav-justified card-header-tabs nav-bordered">
        <li class="nav-item">
          <a href="#today-ct" data-bs-toggle="tab" aria-expanded="false" class="nav-link">
            <IconifyIcon icon="tabler:home" class="d-md-none d-block"></IconifyIcon>
            <span class="d-none d-md-block">Today</span>
          </a>
        </li>
        <li class="nav-item">
          <a href="#monthly-ct" data-bs-toggle="tab" aria-expanded="true" class="nav-link active">
            <IconifyIcon icon="tabler:user-circle" class="d-md-none d-block"></IconifyIcon>
            <span class="d-none d-md-block">Monthly</span>
          </a>
        </li>
        <li class="nav-item">
          <a href="#annual-ct" data-bs-toggle="tab" aria-expanded="false" class="nav-link">
            <IconifyIcon icon="tabler:settings" class="d-md-none d-block"></IconifyIcon>
            <span class="d-none d-md-block">Annual</span>
          </a>
        </li>
      </ul>
    </BCardHeader>
    <BCardBody>
      <ApexChart :get-options="getProjectOverviewChart" :series="getProjectOverviewChart().series" type="area" :height="330" />
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { Icon as IconifyIcon } from '@iconify/vue'
import { BCard, BCardBody, BCardHeader } from 'bootstrap-vue-next'
import ApexChart from '~/components/wrappers/ApexChart.vue'
import { getProjectOverviewChart } from './data'
</script>
