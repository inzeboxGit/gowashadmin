<template>
  <CardWithAction title="Active Projects Overview" isCloseable isTogglable isReloadable>
    <BRow class="mb-2">
      <div class="col-lg">
        <h3 class="mb-2 fw-bold">
          <CountUp :end-val="4852" />
        </h3>
        <p class="mb-2 fw-semibold text-muted">Projects in Progress</p>
      </div>

      <div class="col-lg-auto align-self-center">
        <ul class="list-unstyled mb-0 lh-lg">
          <li>
            <IconifyIcon icon="tabler:caret-right-filled" class="fs-lg align-middle text-primary" />
            <span class="text-muted">Web Development</span>
          </li>
          <li>
            <IconifyIcon icon="tabler:caret-right-filled" class="fs-lg align-middle text-success" />
            <span class="text-muted">Mobile Apps</span>
          </li>
          <li>
            <IconifyIcon icon="tabler:caret-right-filled" class="fs-lg align-middle text-info" />
            <span class="text-muted">UI/UX Design</span>
          </li>
        </ul>
      </div>
    </BRow>

    <BProgress class="mb-3" style="height: 10px">
      <BProgressBar :value="25" variant="primary" />
      <BProgressBar :value="50" variant="success" />
      <BProgressBar :value="25" variant="info" />
    </BProgress>

    <div class="table-responsive">
      <table class="table table-sm table-custom table-nowrap table-hover table-centered mb-0">
        <thead class="bg-light align-middle bg-opacity-25 thead-sm">
          <tr class="text-uppercase fs-xxs">
            <th class="text-muted">Project</th>
            <th class="text-muted text-end">Tasks Completed</th>
            <th class="text-muted text-end">Deadline</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in trafficData" :key="item.pageLink">
            <td class="text-decoration-underline">
              {{ item.pageLink }}
            </td>
            <td class="text-end">{{ item.views }}</td>
            <td class="text-end">{{ item.unique }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="text-center mt-3">
      <RouterLink to="" class="link-reset text-decoration-underline fw-semibold link-offset-3">
        View all Projects
        <IconifyIcon icon="tabler:link" />
      </RouterLink>
    </div>
  </CardWithAction>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { Icon as IconifyIcon } from '@iconify/vue'
import { BProgress, BProgressBar } from 'bootstrap-vue-next'
import CountUp from 'vue-countup-v3'
import CardWithAction from '~/components/CardWithAction.vue'
import { trafficData } from './data'
</script>
