<template>
  <simplebar no-body class="card w-100 h-100 mb-0 rounded-end-0">
    <BCardBody>
      <BButton variant="danger" class="fw-medium w-100"> Upload Files </BButton>

      <BListGroup flush class="list-custom mt-3">
        <BListGroupItem v-for="(item, idx) in sidebarMenuItemData" :key="idx" :to="''" action :class="idx === 0 ? 'active' : ''">
          <Icon :icon="item.icon" class="align-middle me-1 opacity-75 fs-lg" />
          <span class="align-middle">{{ item.name }}</span>

          <span v-if="item.badge" :class="['badge align-middle float-end fs-xxs', item.badge.className]">
            {{ item.badge.label }}
          </span>
        </BListGroupItem>

        <BListGroupItem class="mt-2">
          <span class="align-middle">Categories</span>
        </BListGroupItem>

        <BListGroupItem v-for="(item, idx) in categoryData" :key="idx" :to="''" action>
          <Icon :icon="item.icon" size="14" :class="['align-middle me-1 opacity-75 fs-lg', item.iconClassName]" />
          <span class="align-middle">{{ item.name }}</span>
        </BListGroupItem>
      </BListGroup>
    </BCardBody>
  </simplebar>
</template>

<script setup lang="ts">
import { BButton, BCardBody, BListGroup, BListGroupItem } from 'bootstrap-vue-next'
import simplebar from 'simplebar-vue'
import Icon from '~/components/wrappers/Icon.vue'
import { categoryData, sidebarMenuItemData } from './data'
</script>
