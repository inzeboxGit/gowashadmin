<template>
  <button class="btn btn-default sidenav-toggle-button btn-icon" @click="toggleSideNav">
    <Icon icon="menu" />
  </button>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Icon from '~/components/wrappers/Icon.vue'
import { useLayout } from '~/stores/layout'

const layoutStore = useLayout()

const { layout } = storeToRefs(layoutStore)
const { updateLayout, toggleMobileMenu } = layoutStore

const toggleSideNav = () => {
  const currentSize = layout.value.sidenavSize

  if (currentSize === 'offcanvas') {
    toggleMobileMenu()
  } else if (currentSize === 'compact') {
    updateLayout({ sidenavSize: 'condensed' })
  } else {
    updateLayout({ sidenavSize: currentSize === 'condensed' ? 'default' : 'condensed' })
  }
}
</script>
