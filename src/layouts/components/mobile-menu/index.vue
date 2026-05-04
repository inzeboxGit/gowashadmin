<template>
  
    <BOffcanvas v-model="isMobileMenuOpen" no-header width="235px" class="p-0 bg-transparent" body-class="p-0">
      <Sidenav />
    </BOffcanvas>
  
</template>

<script setup lang="ts">
import { BOffcanvas } from 'bootstrap-vue-next'
import { storeToRefs } from 'pinia'
import Sidenav from '~/layouts/components/sidenav/index.vue'
import { useLayout } from '~/stores/layout'

const layoutStore = useLayout()
const { isMobileMenuOpen } = storeToRefs(layoutStore)
</script>
