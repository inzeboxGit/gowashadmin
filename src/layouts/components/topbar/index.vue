<template>
  <header ref="topbar" class="app-topbar" :class="{ 'topbar-active': isActive }">
    <BContainer fluid class="topbar-menu">
      <div class="d-flex align-items-center gap-2">
        <!-- Topbar Brand Logo -->
        <div class="logo-topbar">
          <RouterLink to="/" class="logo-light">
            <span class="logo-lg">
              <!-- <img src="/images/logo.png" alt="logo" /> -->
              <h1 class="text-primary">Gowash</h1>
            </span>
            <span class="logo-sm">
              <img src="/images/logo-sm.png" alt="small logo" />
            </span>
          </RouterLink>

          <RouterLink to="/" class="logo-dark">
            <span class="logo-lg">
              <img src="/images/logo-black.png" alt="dark logo" />
            </span>
            <span class="logo-sm">
              <img src="/images/logo-sm.png" alt="small logo" />
            </span>
          </RouterLink>
        </div>

        <!-- Sidebar Menu Toggle Button -->
        <MenuToggler />

        <!-- Horizontal Menu Toggle Button -->
        <button class="topnav-toggle-button px-2" data-bs-toggle="collapse" data-bs-target="#topnav-menu">
          <Icon icon="menu" />
        </button>

      </div>

      <div class="d-flex align-items-center gap-2">
        <ThemeDropdown />

        <NotificationDropdownPeople />

        <FullscreenToggler />

        <MonochromeToggler />

        <SimpleUserDropdown />
      </div>
    </BContainer>
  </header>
</template>

<script setup lang="ts">
import Icon from '~/components/wrappers/Icon.vue'
import MenuToggler from './components/MenuToggler.vue'

import ThemeDropdown from './components/ThemeDropdown.vue'

import NotificationDropdownPeople from './components/NotificationDropdownPeople.vue'

import FullscreenToggler from './components/FullscreenToggler.vue'
import MonochromeToggler from './components/MonochromeToggler.vue'

import SimpleUserDropdown from './components/SimpleUserDropdown.vue'

import { onMounted, onUnmounted, ref } from 'vue'

const isActive = ref(false)
const topbar = ref<HTMLElement | null>(null)

const onScroll = () => {
  isActive.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>
