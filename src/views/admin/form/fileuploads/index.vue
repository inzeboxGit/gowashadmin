<template>
  <PageBreadcrumb title="File Uploads" subtitle="Forms" />
  <BRow class="mt-3">
    <BCol cols="12">
      <Dropzone />

      <FilePond />
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BCol, BRow } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import Dropzone from './components/Dropzone.vue'
import FilePond from './components/FilePond.vue'
</script>
