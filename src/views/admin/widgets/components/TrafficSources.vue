<template>
  <CardWithAction title="Traffic Sources" isCloseable isCollapsable isReloadable>
    <BRow class="mb-2">
      <BCol lg>
        <h3 class="mb-2 fw-bold" id="live-visitors">
          {{ currentVisitors.toLocaleString() }}
        </h3>
        <p class="mb-2 fw-semibold text-muted">Right Now</p>
      </BCol>
      <BCol lg="auto" class="align-self-center">
        <ul class="list-unstyled mb-0 lh-lg">
          <li>
            <IconifyIcon icon="tabler:caret-right-filled" class="align-middle text-primary me-1" />
            <span class="text-muted">Organic</span>
          </li>
          <li>
            <IconifyIcon icon="tabler:caret-right-filled" class="align-middle text-success me-1" />
            <span class="text-muted">Direct</span>
          </li>
          <li>
            <IconifyIcon icon="tabler:caret-right-filled" class="align-middle me-1" />
            <span class="text-muted">Campaign</span>
          </li>
        </ul>
      </BCol>
    </BRow>

    <BProgress height="10px" class="mb-3">
      <BProgressBar value="25" />
      <BProgressBar bg-variant="success" value="50" />
      <BProgressBar bg-variant="info" value="15" />
    </BProgress>

    <div class="table-responsive">
      <BTableSimple small hover responsive class="table-custom table-nowrap table-centered mb-0">
        <thead class="bg-light align-middle bg-opacity-25 thead-sm">
          <tr class="text-uppercase fs-xxs">
            <th class="text-muted">URL</th>
            <th class="text-muted text-end">Views</th>
            <th class="text-muted text-end">Uniques</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(source, index) in trafficData" :key="index">
            <td class="text-decoration-underline">{{ source.pageLink }}</td>
            <td class="text-end">{{ source.views }}k</td>
            <td class="text-end">{{ source.unique }}k</td>
          </tr>
        </tbody>
      </BTableSimple>
    </div>

    <div class="text-center mt-3">
      <RouterLink to="/apps/chat" class="link-reset text-decoration-underline fw-semibold link-offset-3">
        View all Links
        <IconifyIcon icon="tabler:link" width="13" />
      </RouterLink>
    </div>
  </CardWithAction>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { Icon as IconifyIcon } from '@iconify/vue'
import { BCol, BProgress, BProgressBar, BRow, BTableSimple } from 'bootstrap-vue-next'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import CardWithAction from '~/components/CardWithAction.vue'
import { trafficData } from './data'

const currentVisitors = ref(getRandomNumber(8900, 8950))
let interval: any = null

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function updateLiveVisitors() {
  const change = getRandomNumber(-20, 20)
  currentVisitors.value = Math.max(100, currentVisitors.value + change)
}

onMounted(() => {
  interval = setInterval(updateLiveVisitors, 1000)
})

onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>
