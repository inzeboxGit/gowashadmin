<template>
  <PageBreadcrumb title="Social Feed" subtitle="Apps" />
  <BRow>
    <BCol xl="3" lg="6" class="order-lg-1 order-xl-1">
      <SocialProfile />
    </BCol>

    <BCol xl="6" lg="12" class="order-lg-2 order-xl-1">
      <Feeds />
    </BCol>

    <BCol xl="3" lg="6" class="order-lg-1 order-xl-2">
      <SidebarWidgets />
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import Feeds from './components/Feeds.vue'
import SidebarWidgets from './components/SidebarWidgets.vue'
import SocialProfile from './components/SocialProfile.vue'
</script>
