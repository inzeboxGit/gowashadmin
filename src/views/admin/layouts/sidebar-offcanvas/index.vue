<template>
  <PageBreadcrumb title="Offcanvas Menu" subtitle="Layouts" />
  <LayoutInfo option="sidenavSize" value="offcanvas" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import { useLayout } from '~/stores/layout'
import LayoutInfo from '../components/LayoutInfo.vue'

const layoutStore = useLayout()
const { updateLayout } = layoutStore

onMounted(() => {
  updateLayout({ sidenavSize: 'offcanvas' })
})
</script>
