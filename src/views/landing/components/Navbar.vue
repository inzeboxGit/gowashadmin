<template>
  <header>
    <BNavbar id="landing-navbar" :container="false" toggleable="lg"
      :class="['py-2', 'sticky-top', isSticky ? 'top-scroll-up top-fixed' : '']">
      <BContainer>
        <div class="auth-brand mb-0">
          <RouterLink to="/" class="logo-dark">
            <img src="/images/logo.png" alt="dark logo" height="24" />
          </RouterLink>
          <RouterLink to="/" class="logo-light">
            <!-- <img src="/images/logo.png" alt="logo" height="24" /> -->
          </RouterLink>
        </div>

        <BNavbarToggle target="nav-collapse" />

        <BCollapse id="nav-collapse" v-model="isCollapsed" is-nav>
          <BNavbarNav class="text-uppercase fw-bold gap-2 fs-sm mx-auto mt-2 mt-lg-0">
            <BNavItem v-for="item in navItems" class="fs-xs" :key="item" href="" @click="scroll.scrollTo(item)">
              {{ item }}
            </BNavItem>
          </BNavbarNav>

          <div>
            <BButton variant="link" class="btn-icon fw-semibold nav-link me-2" @click="toggleTheme">
              <IconifyIcon icon="tabler:contrast" class="fs-22" />&nbsp;
            </BButton>
            <RouterLink to="/auth/sign-up" class="btn btn-sm btn-light"> Try for Free </RouterLink>
          </div>
        </BCollapse>
      </BContainer>
    </BNavbar>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { Icon as IconifyIcon } from '@iconify/vue'
import { BButton, BCollapse, BContainer, BNavbar, BNavbarNav, BNavbarToggle, BNavItem } from 'bootstrap-vue-next'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useLayout } from '~/stores/layout'

const showDismissibleAlert = ref(true)
const isCollapsed = ref(false)
const isSticky = ref(false)
const layoutStore = useLayout()

const { layout } = storeToRefs(layoutStore)
const { updateLayout } = layoutStore

const toggleTheme = () => {
  updateLayout({ theme: layout.value.theme === 'light' ? 'dark' : 'light' })
}

const navItems = ['Home', 'Services', 'Features', 'Plans', 'Reviews', 'Contact']

const scroll = {
  scrollTo: (section: string) => {
    document.getElementById(section.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  },
}

const closeAlert = () => {
  showDismissibleAlert.value = false
}
onMounted(() => {
  window.addEventListener('scroll', () => {
    isSticky.value = window.scrollY > 20
  })
})
</script>

<style scoped></style>
