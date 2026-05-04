<template>
  <div class="p-3 border-end border-dashed">
    <h4 class="card-title mb-0">Total Sales</h4>
    <p class="text-muted fs-xs">You have 21 pending orders awaiting fulfillment.</p>

    <BRow class="mt-4">
      <BCol lg="12">
        <ChartJs type="doughnut" :getOptions="getMultiPieChart" />
      </BCol>
    </BRow>
  </div>

  <hr class="d-xxl-none border-light m-0" />
</template>

<script setup lang="ts">
import { BCol, BRow } from 'bootstrap-vue-next'
import ChartJs from '~/components/wrappers/ChartJs.vue'
import { getMultiPieChart } from './data'
</script>
