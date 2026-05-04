<template>
  <div id="loot-box" class="topbar-item d-none d-xl-flex">
    <BDropdown toggle-class="topbar-link btn shadow-none btn-link fw-medium btn-link drop-arrow-none">
      <template #button-content>
        Loot Box
        <Icon icon="chevron-down" class="ms-1" />
      </template>
      <BDropdownItem>
        <Icon icon="circle-user-round" class="me-1 fs-lg align-middle" />
        <span class="align-middle">Secret Identity</span>
      </BDropdownItem>

      <BDropdownItem>
        <Icon icon="bolt" class="me-1 fs-lg align-middle" />
        <span class="align-middle">Control Panel</span>
      </BDropdownItem>

      <BDropdownItem>
        <Icon icon="headset" class="me-1 fs-lg align-middle" />
        <span class="align-middle">Help Squad</span>
      </BDropdownItem>
    </BDropdown>
  </div>
</template>

<script setup lang="ts">
import Icon from '~/components/wrappers/Icon.vue'
</script>
