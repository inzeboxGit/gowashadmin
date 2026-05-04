<template>
  <PageBreadcrumb title="Tickets" subtitle="Support" />
  <BRow class="row-cols-xxl-5 row-cols-md-3 row-cols-1 g-2">
    <div v-for="item in ticketStatData" :key="item.id" class="col">
      <TicketWidget :item="item" />
    </div>
  </BRow>
  <Ticket />
</template>

<script setup lang="ts">
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import Ticket from './components/Ticket.vue'
import TicketWidget from './components/TicketWidget.vue'
import { ticketStatData } from './components/data'
</script>
