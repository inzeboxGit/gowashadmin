<template>
  <PageBreadcrumb title="Boxed" subtitle="Layouts" />
  <LayoutInfo option="width" value="boxed" />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import { useLayout } from '~/stores/layout'
import LayoutInfo from '../components/LayoutInfo.vue'

const layoutStore = useLayout()
const { updateLayout } = layoutStore

onMounted(() => {
  updateLayout({ width: 'boxed' })
})

onUnmounted(() => {
  updateLayout({ width: 'fluid' })
})
</script>
