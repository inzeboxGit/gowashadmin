<template>
  <PageBreadcrumb title="Scroll" subtitle="Datatables" />

  <BRow class="justify-content-center">
    <BCol xs="12">
      <VerticalScroll />
      <HorizontalScroll />
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import HorizontalScroll from './components/HorizontalScroll.vue'
import VerticalScroll from './components/VerticalScroll.vue'
</script>
