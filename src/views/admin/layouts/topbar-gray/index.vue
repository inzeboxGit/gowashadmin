<template>
  <PageBreadcrumb title="Gray Topbar" subtitle="Layouts" />
  <LayoutInfo option="topbarColor" value="dark" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import { useLayout } from '~/stores/layout'
import LayoutInfo from '../components/LayoutInfo.vue'

const layoutStore = useLayout()
const { updateLayout } = layoutStore

onMounted(() => {
  updateLayout({ topbarColor: 'gray' })
})
</script>
