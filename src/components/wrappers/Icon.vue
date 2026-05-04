<template>
  <IconifyIcon v-bind="$props" :icon="`lucide:${icon}`" />
</template>

<script setup lang="ts">
import { Icon as IconifyIcon } from '@iconify/vue'

type Props = { icon: string }

defineProps<Props>()
</script>
