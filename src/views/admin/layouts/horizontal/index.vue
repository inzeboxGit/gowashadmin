<template>
  <PageBreadcrumb title="Horizontal" subtitle="Layouts" />
  <LayoutInfo option="orientation" value="horizontal" />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import { useLayout } from '~/stores/layout'
import LayoutInfo from '../components/LayoutInfo.vue'

const layoutStore = useLayout()
const { updateLayout } = layoutStore

onMounted(() => {
  updateLayout({ orientation: 'horizontal' })
})

onUnmounted(() => {
  updateLayout({ orientation: 'vertical' })
})
</script>
