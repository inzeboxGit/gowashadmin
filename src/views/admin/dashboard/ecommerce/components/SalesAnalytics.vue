<template>
  <div class="px-4 py-3">
    <div class="d-flex justify-content-between mb-3">
      <h4 class="card-title">Sales Analytics</h4>
      <RouterLink to="" class="link-reset text-decoration-underline fw-semibold link-offset-3">View Reports <IconifyIcon icon="tabler:arrow-right" /></RouterLink>
    </div>

    <div dir="ltr">
      <div class="mt-3" style="height: 330px">
        <ChartJs type="bar" :getOptions="salesAnalyticsChartOptions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { Icon as IconifyIcon } from '@iconify/vue'
import ChartJs from '~/components/wrappers/ChartJs.vue'
import { salesAnalyticsChartOptions } from './data'
</script>
