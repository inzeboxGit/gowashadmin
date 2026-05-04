<template>
  <PageBreadcrumb title="Ticket Details" subtitle="Support" />
  <BRow>
    <BCol xxl="8">
      <TicketDetails />
    </BCol>
    <BCol xl="4">
      <Ticketchat />
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import Ticketchat from './components/Ticketchat.vue'
import TicketDetails from './components/TicketDetails.vue'
</script>
