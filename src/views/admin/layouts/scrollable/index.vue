<template>
  <PageBreadcrumb title="Scrollable" subtitle="Layouts" />
  <LayoutInfo option="position" value="scrollable" />

  <div style="height: 1000px"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import { useLayout } from '~/stores/layout'
import LayoutInfo from '../components/LayoutInfo.vue'

const layoutStore = useLayout()
const { updateLayout } = layoutStore

onMounted(() => {
  updateLayout({ position: 'scrollable' })
})

onUnmounted(() => {
  updateLayout({ position: 'fixed' })
})
</script>
