<template>
  <div class="sidenav-menu">
    <!-- 
    style="background: #fff !important
    -->
    <RouterLink to="/" class="logo">
      <span class=" logo logo-light">
        <!-- <span class="logo-lg"><img src="/images/logo.png" alt="logo" /></span> -->
        <!-- <span class="logo-sm"><img src="/images/logo-sm.png" alt="small logo" /></span> -->
        <h1 style="color: #fff !important; height:70px">GoWash</h1>
        <!-- <br /> -->
        <!-- <b style="color: #fff !important">Salon Management System</b> -->
      </span>

      <span class=" logo logo-dark">
        <!-- <span class="logo-lg"><img src="/images/logo-black.png" alt="dark logo" /></span>
          <span class="logo-sm"><img src="/images/logo-sm.png" alt="small logo" /></span> -->
        <h1 style="color: #000 !important">GoWash</h1>
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
