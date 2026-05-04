<template>
  <PageBreadcrumb title="Projects" subtitle="Dashboard" />

  <BRow class="row-cols-xxl-4 row-cols-md-2 row-cols-1 g-3 align-items-center">
    <BCol v-for="(item, idx) in statItem" :key="idx">
      <ProjectStats :item="item" />
    </BCol>
  </BRow>

  <BRow>
    <BCol xxl="6">
      <ProjectOverview />
    </BCol>
    <BCol xxl="6">
      <TaskProgress />
    </BCol>
  </BRow>

  <BRow>
    <BCol xl="4">
      <Chat />
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
import { BCol, BRow } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import Chat from './components/Chat.vue'
import { statItem } from './components/data'
import ProjectOverview from './components/ProjectOverview.vue'
import ProjectStats from './components/ProjectStats.vue'
import TaskProgress from './components/TaskProgress.vue'
import TopCountries from './components/TopCountries.vue'
import TrafficSources from './components/TrafficSources.vue'
</script>
