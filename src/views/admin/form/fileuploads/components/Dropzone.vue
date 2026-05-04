<template>
  <BCard no-body>
    <BCardHeader class="d-block">
      <BCardTitle as="h4" class="mb-1">Dropzone</BCardTitle>
      <p class="text-muted mb-0">DropzoneJS is an open source library that provides drag’n’drop file uploads with image previews.</p>
    </BCardHeader>

    <BCardBody>
      <FileUploader />
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { BCard, BCardBody, BCardHeader, BCardTitle } from 'bootstrap-vue-next'
import FileUploader from '~/components/FileUploader.vue'
</script>
