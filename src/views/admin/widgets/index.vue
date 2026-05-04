<template>
  <PageBreadcrumb title="Widgets" subtitle="Pages" />

  <BRow class="row-cols-xxl-4 row-cols-md-2 row-cols-1">
    <BCol v-for="(item, idx) in statisticWidget1Data" :key="idx">
      <Widget1 :widget="item" />
    </BCol>
  </BRow>

  <BRow class="row-cols-xxl-4 row-cols-md-2 row-cols-1">
    <BCol v-for="(item, idx) in statisticWidget2Data" :key="idx">
      <Widget2 :item="item" />
    </BCol>
  </BRow>

  <BRow class="row-cols-xxl-4 row-cols-md-2 row-cols-1 g-3 align-items-center">
    <BCol v-for="(item, idx) in statisticWidget3Data" :key="idx">
      <Widget3 :item="item" />
    </BCol>
  </BRow>

  <BRow class="row-cols-xxl-4 row-cols-md-2 row-cols-1 g-3 align-items-center">
    <BCol v-for="(item, idx) in statisticWidget4Data" :key="idx">
      <Widget4 :item="item" />
    </BCol>
  </BRow>

  <BRow class="row-cols-xxl-4 row-cols-md-2 row-cols-1 g-3 align-items-center">
    <BCol v-for="(item, idx) in statisticWidget5Data" :key="idx">
      <Widget5 :item="item" />
    </BCol>
  </BRow>

  <BRow class="row-cols-xxl-4 row-cols-md-2 row-cols-1 g-3 align-items-center">
    <BCol v-for="(item, idx) in statisticWidget6Data" :key="idx">
      <Widget6 :item="item" />
    </BCol>
  </BRow>

  <BCard no-body>
    <BCardBody class="p-0">
      <div class="p-3 bg-light-subtle border-bottom border-dashed">
        <BRow>
          <BCol>
            <h4 class="fs-sm mb-1">Would you like the full report?</h4>
            <small class="text-muted fs-xs mb-0"> All 120 orders have been successfully delivered </small>
          </BCol>
          <div class="col-auto align-self-center">
            <button type="button" class="btn btn-sm btn-default rounded-circle btn-icon" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Download">
              <IconifyIcon icon="tabler:download" class="fs-xl" />
            </button>
          </div>
        </BRow>
      </div>
      <BRow class="row-cols-xxl-5 row-cols-md-3 row-cols-1 g-2 p-3">
        <BCol v-for="(item, idx) in statisticWidget7Data" :key="idx">
          <Widget7 :item="item" />
        </BCol>
      </BRow>
      <div class="text-center mb-3">
        <RouterLink to="#!" class="link-reset text-decoration-underline fw-semibold link-offset-3"> View all Reports <Icon icon="link" /> </RouterLink>
      </div>
    </BCardBody>
  </BCard>

  <BRow>
    <BCol xl="4">
      <ChatCard />
    </BCol>
    <BCol xxl="4" lg="6">
      <TrafficSources />
    </BCol>
    <BCol xxl="4" lg="6">
      <TopCountries />
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { Icon as IconifyIcon } from '@iconify/vue'
import { BCardBody, BCol, BRow } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import Icon from '~/components/wrappers/Icon.vue'
import ChatCard from './components/ChatCard.vue'
import { statisticWidget1Data, statisticWidget2Data, statisticWidget3Data, statisticWidget4Data, statisticWidget5Data, statisticWidget6Data, statisticWidget7Data } from './components/data'
import TopCountries from './components/TopCountries.vue'
import TrafficSources from './components/TrafficSources.vue'
import Widget1 from './components/Widget1.vue'
import Widget2 from './components/Widget2.vue'
import Widget3 from './components/Widget3.vue'
import Widget4 from './components/Widget4.vue'
import Widget5 from './components/Widget5.vue'
import Widget6 from './components/Widget6.vue'
import Widget7 from './components/Widget7.vue'
</script>
