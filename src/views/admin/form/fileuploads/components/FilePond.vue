<template>
  <BCard no-body>
    <BCardHeader class="d-block">
      <BCardTitle class="mb-1">Vue FilePond</BCardTitle>
      <p class="text-muted mb-0">A JavaScript library that can upload anything you throw at it, optimizes images for faster uploads, and offers a great, accessible, silky smooth user experience.</p>
    </BCardHeader>

    <BCardBody>
      <div class="mb-3">
        <h5 class="mb-3">Basic Example</h5>
        <div class="filepond-uploader">
          <FilePond class="filepond" :files="files" :allow-multiple="true" :max-files="5" :allow-reorder="true" @updatefiles="handleUpdateFiles($event, 'files')" />
        </div>
      </div>

      <div class="mb-3">
        <h5 class="mb-3">Two Grid Example</h5>
        <div class="filepond-uploader two-grid">
          <FilePond class="filepond" :files="files2" :allow-multiple="true" :max-files="5" :allow-reorder="true" @updatefiles="handleUpdateFiles($event, 'files2')" />
        </div>
      </div>

      <div>
        <h5 class="mb-3">Three Grid Example</h5>
        <div class="filepond-uploader three-grid">
          <FilePond class="filepond" :files="files3" :allow-multiple="true" :max-files="5" :allow-reorder="true" @updatefiles="handleUpdateFiles($event, 'files3')" />
        </div>
      </div>
    </BCardBody>

    <div class="border-top border-dashed" />

    <BCardBody>
      <BCardTitle class="mb-2">Profile Picture</BCardTitle>
      <p class="text-muted">FilePond is a JavaScript library with profile picture-shaped file upload variation.</p>

      <BRow>
        <BCol sm="6">
          <div class="avatar-xxl">
            <FilePond class="filepond filepond-input-circle" :allow-multiple="false" :max-files="1" :accepted-file-types="['image/png', 'image/jpeg', 'image/gif']" style-panel-aspect-ratio="1:1" :label-idle="cameraSvg" />
          </div>
        </BCol>
        <BCol sm="6">
          <div class="avatar-xxl">
            <FilePond class="filepond rounded" :allow-multiple="false" :max-files="1" :accepted-file-types="['image/png', 'image/jpeg', 'image/gif']" style-panel-aspect-ratio="1:1" :label-idle="cameraSvg" />
          </div>
        </BCol>
      </BRow>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { BCard, BCardBody, BCardHeader, BCardTitle, BCol, BRow } from 'bootstrap-vue-next'
import { ref } from 'vue'
import vueFilePond from 'vue-filepond'

import FilePondPluginImageCrop from 'filepond-plugin-image-crop'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageResize from 'filepond-plugin-image-resize'
import FilePondPluginImageTransform from 'filepond-plugin-image-transform'

const FilePond = vueFilePond(FilePondPluginImagePreview, FilePondPluginImageExifOrientation, FilePondPluginImageCrop, FilePondPluginImageTransform, FilePondPluginImageResize)

type FilePondFile = {
  lastModified: number
  name: string
  size: number
  type: string
  webkitRelativePath: string
  arrayBuffer: () => Promise<ArrayBuffer>
  slice: (start?: number, end?: number, contentType?: string) => Blob
  stream: () => ReadableStream<Uint8Array>
  text: () => Promise<string>
}

type FileType = string | Blob | FilePondFile

const files = ref<FileType[]>([])
const files2 = ref<FileType[]>([])
const files3 = ref<FileType[]>([])

type FilePondFileItem = {
  file: FileType
  [key: string]: unknown
}

const handleUpdateFiles = (fileItems: FilePondFileItem[], key: 'files' | 'files2' | 'files3') => {
  if (key === 'files') files.value = fileItems.map((f) => f.file)
  if (key === 'files2') files2.value = fileItems.map((f) => f.file)
  if (key === 'files3') files3.value = fileItems.map((f) => f.file)
}

const cameraSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
 fill="none" stroke="#9ba6b7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
 class="icon icon-tabler icons-tabler-outline icon-tabler-camera">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2"/>
  <path d="M9 13a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"/>
</svg>
`
</script>
