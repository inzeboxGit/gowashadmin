<template>
  <component :is="is ?? 'div'" ref="dropdown" class="dropdown" v-bind="$attrs">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { Dropdown } from 'bootstrap'
import { onMounted, ref } from 'vue'

type DropDownPropType = {
  is?: string
}

defineProps<DropDownPropType>()

const dropdown = ref()

onMounted(() => {
  if (dropdown.value && typeof window !== 'undefined' && document.readyState !== 'loading') {
    Dropdown.getOrCreateInstance(dropdown.value)
  }
})
</script>
