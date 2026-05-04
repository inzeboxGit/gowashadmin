<template>
  <BCard no-body class="text-center p-3 mb-0">
    <p :class="`mb-1 text-${item.className}`">{{ item.title }}</p>
    <h4 :class="`mb-0 text-${item.className}`">
       <CountUp class="d-inline-flex" :endVal="item.value" :duration="2" :startVal="0" :decimalPlaces="Number.isInteger(item.value) ? 0 : 2" /> {{ item.suffix }} 
    </h4>
  </BCard>
</template>

<script setup lang="ts">
import { BCard } from 'bootstrap-vue-next'
import CountUp from 'vue-countup-v3'
import type { LeadStatType } from './data'

defineProps<{ item: LeadStatType }>()
</script>
