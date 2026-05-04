<template>
  <PageBreadcrumb title="Fixed Header" subtitle="DataTables" />
  <BRow class="justify-content-center">
    <BCol xs="12">
      <FixHeader />
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import FixHeader from './components/FixHeader.vue'
</script>
