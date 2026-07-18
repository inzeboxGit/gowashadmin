<template>
  <div class="sidenav-menu">
    <!-- 
    style="background: #fff !important
    -->
    <RouterLink to="/" class="logo text-decoration-none">
      <span class="logo logo-light">
        <span class="logo-lg"><h1 style="color: #fff !important; height:70px; line-height: 70px; margin: 0;">GoWash</h1></span>
        <span class="logo-sm"><h3 style="color: #fff !important; height:70px; line-height: 70px; margin: 0;">GW</h3></span>
      </span>

      <span class="logo logo-dark">
        <span class="logo-lg"><h1 style="color: #000 !important; height:70px; line-height: 70px; margin: 0;">GoWash</h1></span>
        <span class="logo-sm"><h3 style="color: #000 !important; height:70px; line-height: 70px; margin: 0;">GW</h3></span>
      </span>
    </RouterLink>

    <OnHoverToggle />

    <OffcanvasToggle />

    <simplebar id="sidenav" class="scrollbar">
      <UserProfileSettings />

      <AppMenu />
    </simplebar>
  </div>
</template>

<script setup lang="ts">
import simplebar from 'simplebar-vue'
import AppMenu from './components/AppMenu.vue'
import UserProfileSettings from './components/UserProfileSettings.vue'

import OffcanvasToggle from './components/OffcanvasToggle.vue'
import OnHoverToggle from './components/OnHoverToggle.vue'
</script>
