<template>
  <PageBreadcrumb title="Gray Menu" subtitle="Layouts" />
  <LayoutInfo option="sidenavColor" value="gray" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import { useLayout } from '~/stores/layout'
import LayoutInfo from '../components/LayoutInfo.vue'

const layoutStore = useLayout()
const { updateLayout } = layoutStore

onMounted(() => {
  updateLayout({ sidenavColor: 'gray' })
})
</script>
