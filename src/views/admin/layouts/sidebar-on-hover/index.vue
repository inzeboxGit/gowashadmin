<template>
  <PageBreadcrumb title="On Hover Menu" subtitle="Layouts" />
  <LayoutInfo option="sidenavSize" value="on-hover" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import { useLayout } from '~/stores/layout'
import LayoutInfo from '../components/LayoutInfo.vue'

const layoutStore = useLayout()
const { updateLayout } = layoutStore

onMounted(() => {
  updateLayout({ sidenavSize: 'on-hover' })
})
</script>
