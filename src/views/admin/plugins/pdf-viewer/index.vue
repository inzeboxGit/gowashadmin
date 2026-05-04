<template>
  <PageBreadcrumb title="PDF Viewer" subtitle="Plugins" />
  <BRow>
    <BCol cols="12">
      <BCard no-body>
        <BCardBody>
          <div class="text-center">
            <div class="btn-group text-nowrap">
              <BButton variant="dark" id="prev" @click="prevPage" :disabled="pageNumber <= 1">
                <Icon icon="arrow-left" />
                <span class="d-none d-sm-inline ms-2">Previous</span>
              </BButton>

              <BButton variant="dark" id="next" @click="nextPage" :disabled="totalPages > 0 && pageNumber >= totalPages">
                <Icon icon="arrow-right" />
                <span class="d-none d-sm-inline ms-2">Next</span>
              </BButton>

              <BButton variant="dark" id="zoomin" @click="onZoomIn">
                <Icon icon="zoom-in" />
                <span class="d-none d-sm-inline ms-2">Zoom In</span>
              </BButton>

              <BButton variant="dark" id="zoomout" @click="onZoomOut">
                <Icon icon="zoom-out" />
                <span class="d-none d-sm-inline ms-2">Zoom Out</span>
              </BButton>

              <BButton variant="dark" id="zoomfit" class="rounded-end-3" @click="onZoomReset">100%</BButton>

              <BFormInput type="text" class="rounded-end-0 ms-1" v-model.number="pageInput" @change="onPageInputChange" style="width: 50px" />
              <span class="input-group-text rounded-start-0 border-start-0">/ {{ totalPages || '--' }}</span>
            </div>
          </div>
          <div class="text-center overflow-auto mt-3">
            <PDF
              ref="pdfRef"
              :src="pdfSrc"
              :show-progress="true"
              :pdf-width="calculatedWidth + 'px'"
              @num-pages="onPages"
              @numpages="onPages"
              @on-numpages="onPages"
              @pdf-init="onPdfInit"
              @on-pdf-init="onPdfInit"
              @page-change="onPageChangeInternal"
              @on-page-change="onPageChangeInternal"
              v-model:page="pageNumber"
            />
          </div>
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BButton, BCard, BCardBody, BCol, BFormInput, BRow } from 'bootstrap-vue-next'
import { computed, ref, watch } from 'vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import Icon from '~/components/wrappers/Icon.vue'

const pdfSrc = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf'

const pdfRef = ref<any>(null)
const totalPages = ref(0)
const pageNumber = ref(1)
const pageInput = ref(1)
const scale = ref(1.5)

const calculatedWidth = computed(() => {
  return Math.round(920 * scale.value)
})

watch(pageNumber, (newVal) => {
  pageInput.value = newVal
})

const onPages = (n: any) => {
  if (typeof n === 'number') {
    totalPages.value = n
  } else if (n && typeof n.numPages === 'number') {
    totalPages.value = n.numPages
  } else if (typeof n === 'string') {
    const parsed = parseInt(n)
    if (!isNaN(parsed)) totalPages.value = parsed
  }
}

const onPdfInit = (pdf: any) => {
  if (pdf && typeof pdf.numPages === 'number') {
    totalPages.value = pdf.numPages
  }
}

const onPageChangeInternal = (page: any) => {
  if (typeof page === 'number') {
    pageNumber.value = page
  }
}

const nextPage = () => {
  if (totalPages.value === 0 || pageNumber.value < totalPages.value) {
    pageNumber.value++
  }
}

const prevPage = () => {
  if (pageNumber.value > 1) {
    pageNumber.value--
  }
}

const onZoomIn = () => {
  if (scale.value >= 3) return
  scale.value = Number((scale.value + 0.2).toFixed(1))
}

const onZoomOut = () => {
  if (scale.value <= 0.5) return
  scale.value = Number((scale.value - 0.2).toFixed(1))
}

const onZoomReset = () => {
  scale.value = 1
}

const onPageInputChange = () => {
  const value = pageInput.value
  if (!isNaN(value) && value > 0 && (totalPages.value === 0 || value <= totalPages.value)) {
    pageNumber.value = value
  } else {
    pageInput.value = pageNumber.value
  }
}
</script>

<style scoped></style>
