<template>
  <Vertical v-if="layout.orientation === 'vertical'">
    <router-view />
  </Vertical>

  <Horizontal v-if="layout.orientation === 'horizontal'">
    <router-view />
  </Horizontal>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Horizontal from '~/layouts/horizontal.vue'
import Vertical from '~/layouts/vertical.vue'
import { useLayout } from '~/stores/layout'

const layoutStore = useLayout()
const { layout } = storeToRefs(layoutStore)
</script>
